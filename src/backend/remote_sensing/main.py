import ee
import folium
from earth_engine_utils import authenticate_and_initialize, get_ndvi_image

# Project ID and area of interest
project_id = 'forestify-project'
aoi = ee.Geometry.Point([-122.292, 37.9018])

# NDVI visualization parameters
ndvi_vis_params = {
    'min': 0.0,
    'max': 1.0,
    'palette': ['red', 'yellow', 'green']
}

def main():
    # Authenticate and initialize Earth Engine
    authenticate_and_initialize(project_id)

    # Compute the NDVI
    ndvi = get_ndvi_image(aoi, '2015-01-01', '2015-12-31')

    # Create a folium map object centered on the point of interest
    my_map = folium.Map(location=[37.9018, -122.292], zoom_start=10)

    # Add the NDVI layer to the map
    my_map.add_ee_layer(ndvi, ndvi_vis_params, 'NDVI')

    # Add a layer control panel to the map
    my_map.add_child(folium.LayerControl())

    # Save the map to an HTML file
    my_map.save('NDVI_Visualization.html')

if __name__ == '__main__':
    main()
