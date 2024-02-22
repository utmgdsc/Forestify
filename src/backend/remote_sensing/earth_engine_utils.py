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

def get_ndvi_image(poi, start_date, end_date, cloud_cover_sort='CLOUD_COVER'):
    """
    Get the least cloudy image within a date range and compute the NDVI.
    """
    l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    image = ee.Image(
        l8.filterBounds(poi)
        .filterDate(start_date, end_date)
        .sort(cloud_cover_sort)
        .first()
    )
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
