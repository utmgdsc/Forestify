import ee
import folium

ee.Authenticate()
ee.Initialize(project='forestify-project')

def authenticate_and_initialize(project_id):
    """
    Authenticate and initialize Google Earth Engine.
    """
    ee.Authenticate()
    ee.Initialize(project=project_id)

def get_forest_mask(poi, year=2020):
    """
    Create a mask for forest areas using the MODIS Land Cover Type product.
    """
    modis_land_cover = ee.ImageCollection('MODIS/006/MCD12Q1').filterDate(f'{year}-01-01', f'{year}-12-31').first()
    forest_mask = modis_land_cover.select('LC_Type1').eq(1) # LC_Type1 value of 1 corresponds to 'Evergreen Needleleaf Forest'
    return forest_mask

def get_ndvi_image(poi, start_date, end_date, cloud_cover_sort='CLOUD_COVER', year=2020):
    """
    Get the least cloudy image within a date range, compute the NDVI, and mask it to forest areas.
    """
    l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    forest_mask = get_forest_mask(poi, year)
    image = ee.Image(
        l8.filterBounds(poi)
        .filterDate(start_date, end_date)
        .sort(cloud_cover_sort)
        .first()
    ).updateMask(forest_mask)
    nir = image.select('B5')
    red = image.select('B4')
    ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI')
    return ndvi

def add_ee_layer(self, ee_image_object, vis_params, name):
    """
    Add an Earth Engine layer to a Folium map.
    """
    map_id_dict = ee.Image(ee_image_object).getMapId(vis_params)
    folium.raster_layers.TileLayer(
        tiles=map_id_dict['tile_fetcher'].url_format,
        attr='Map Data &copy; <a href="https://earthengine.google.com/">Google Earth Engine</a>',
        name=name,
        overlay=True,
        control=True
    ).add_to(self)

# Extend the Folium Map class to include the add_ee_layer method
folium.Map.add_ee_layer = add_ee_layer
