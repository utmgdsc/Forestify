import ee
import folium
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from earth_engine_utils import authenticate_and_initialize, define_aoi, get_image, compute_ndvi, get_forest_image, calculate_mann_kendall_test, add_ee_layer_to_map

# Project ID and area of interest
project_id = 'forestify-project'

def main():
    # Authenticate and initialize Google Earth Engine
    authenticate_and_initialize(project_id)
    
    """
    
    # Define an area of interest (AOI) as a point
    aoi = define_aoi()
    
    # Get an image collection from Google Earth Engine
    image = get_image(aoi)

    # Filter the image for forest areas
    forest_image = get_forest_image(image)

    # Compute the Normalized Difference Vegetation Index (NDVI)
    ndvi = compute_ndvi(image)
    
    ndvi_info = ndvi.getInfo()

    """

    

    """
    
    
    uri = "mongodb+srv://limjun2:xN68uyeylPPyO06U@cluster0.yfshzov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    
    db = client.database

    collection = db.ndvi

    result = collection.insert_one(ndvi_info)

    print('One post: {0}'.format(result.inserted_id))

    """

    


    

    """
    # Create a folium map
    m = folium.Map(location=[37.9018, -122.292], zoom_start=10)

    print(m)

    # Add the NDVI layer to the map
    m.add_ee_layer(ndvi, {'min': -1, 'max': 1, 'palette': ['red', 'yellow', 'green']}, 'NDVI')

    # Display the map
    m.save('index.html')
    
    """
    
    
    aoi = define_aoi()
    
    # Define the start and end dates for the analysis
    date_start = '2001-01-01'
    date_end = '2018-12-31'
    
    # Calculate the Mann-Kendall test for the specified period
    ndviTrend = calculate_mann_kendall_test(aoi, date_start, date_end)
    
    # Create a folium map centered on the AOI
    m = folium.Map(location=[37.9018, -122.292], zoom_start=10)
    
    # Visualization parameters
    vis_params = {'min': -1, 'max': 1, 'palette': ['red', 'white', 'green']}
    
    # Add the Mann-Kendall test result as a layer on the map
    add_ee_layer_to_map(m, ndviTrend.select('NDVI_tau'), vis_params, 'Mann-Kendall Test')
    
    # Display the map
    m.save('index.html')

if __name__ == '__main__':
    main()
