import ee
import folium

def authenticate_and_initialize(project_id):
    """
    Authenticate and initialize Google Earth Engine.
    """
    ee.Authenticate()
    ee.Initialize(project=project_id)

def define_aoi(x=-122.292, y=37.9018):
    """
    Define an area of interest (AOI) as a point.
    """
    aoi = ee.Geometry.Point([x, y])
    return aoi

def get_image(aoi, start_date='2015-01-01', end_date='2015-12-31'):
    """
    Get an image collection from Google Earth Engine.
    """
    
    l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')

    image = ee.Image(
        l8.filterBounds(aoi)
          .filterDate(start_date, end_date)
          .sort('CLOUD_COVER')
          .first()
    )

    return image

def get_forest_image(image, year='2015'):
    """
    Filter the given image for forest areas using land cover classification for a specific year.
    """
    # Load the land cover classification image collection for the specified year
    landcover = ee.ImageCollection("MODIS/006/MCD12Q1").filter(ee.Filter.calendarRange(int(year), int(year), 'year')).first().select('LC_Type1')

    # Define a mask for forested areas (Using MODIS land cover type codes for forests)
    # MODIS land cover types for forests are typically 1 to 5, but you should adjust these based on your specific needs and the MODIS documentation
    forest_mask = landcover.eq(1).Or(landcover.eq(2)).Or(landcover.eq(3)).Or(landcover.eq(4)).Or(landcover.eq(5))

    # Apply the mask to the image
    forest_image = image.updateMask(forest_mask)

    return forest_image

def get_forest_ndvi_image(image):
    """
    Identify forested areas in a given LANDSAT image based on NDVI values.
    Forested areas are typically associated with high NDVI values.
    """
    # Calculate NDVI = (NIR - Red) / (NIR + Red)
    # LANDSAT 8 band names: B5 (NIR), B4 (Red)
    ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI')
    
    # Define a threshold for NDVI to consider as forest
    # This is an example threshold, and it may need adjustment based on the region and specific forest characteristics
    ndvi_threshold = 0.3
    
    # Create a mask where NDVI values are greater than the threshold
    forest_mask = ndvi.gte(ndvi_threshold)
    
    # Apply the mask to the image to only keep forested areas
    forest_image = image.updateMask(forest_mask)
    
    return forest_image

def compute_ndvi(image):
    """
    Compute the Normalized Difference Vegetation Index (NDVI).
    """
    nir = image.select('B5')
    red = image.select('B4')
    ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI')

    return ndvi

def add_ee_layer(self, ee_image_object, vis_params, name):
    """
    Add a Google Earth Engine raster layer to a folium map.
    """
    map_id_dict = ee.Image(ee_image_object).getMapId(vis_params)
    folium.raster_layers.TileLayer(
        tiles=map_id_dict['tile_fetcher'].url_format,
        attr='Map Data &copy; <a href="https://earthengine.google.com/">Google Earth Engine</a>',
        name=name,
        overlay=True,
        control=True
    ).add_to(self)

def calculate_mann_kendall_test(aoi, date_start, date_end):
    # Load MODIS NDVI
    l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA') \
        .filterBounds(aoi) \
        .filterDate(date_start, date_end)
    
    # Function to calculate NDVI for each image in the collection
    def add_ndvi(image):
        ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI')
        return image.addBands(ndvi)
    
    # Map the NDVI calculation over the image collection
    ndvi_collection = l8.map(add_ndvi)
    
    # Perform the Mann-Kendall test on the NDVI band
    ndviTrend = ndvi_collection.select('NDVI').reduce(ee.Reducer.kendallsCorrelation())
    
    return ndviTrend

def calculate_mann_kendall_test_for_forest(aoi, date_start, date_end, ndvi_threshold=0.3):
    """
    Calculate the Mann-Kendall test for NDVI trends, focusing on forested areas.
    """
    # Load LANDSAT NDVI
    l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA') \
        .filterBounds(aoi) \
        .filterDate(date_start, date_end)
    
    # Function to calculate NDVI and identify forested areas
    def add_ndvi_and_forest_mask(image):
        ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI')
        forest_mask = ndvi.gte(ndvi_threshold)  # Mask for forested areas
        forest_ndvi = ndvi.updateMask(forest_mask)  # Apply mask to keep only forested areas
        return image.addBands(forest_ndvi)
    
    # Map the NDVI calculation and forest masking over the image collection
    forest_ndvi_collection = l8.map(add_ndvi_and_forest_mask)
    
    # Perform the Mann-Kendall test on the NDVI band of forested areas
    ndvi_trend = forest_ndvi_collection.select('NDVI').reduce(ee.Reducer.kendallsCorrelation())
    
    return ndvi_trend

def add_ee_layer_to_map(map_object, ee_image_object, vis_params, layer_name):
    """Add a Google Earth Engine layer to a folium map."""
    map_id_dict = ee.Image(ee_image_object).getMapId(vis_params)
    folium.raster_layers.TileLayer(
        tiles=map_id_dict['tile_fetcher'].url_format,
        attr='Map Data &copy; <a href="https://earthengine.google.com/">Google Earth Engine</a>',
        name=layer_name,
        overlay=True,
        control=True
    ).add_to(map_object)

folium.Map.add_ee_layer = add_ee_layer