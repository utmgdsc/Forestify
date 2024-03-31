import ee
import folium
from earth_engine_utils import authenticate_and_initialize, define_aoi, get_image, compute_ndvi, get_forest_ndvi_image, calculate_mann_kendall_test_for_forest, add_ee_layer_to_map

# Project ID and area of interest
project_id = 'forestify-project'
authenticate_and_initialize(project_id)

analysis_type = input("Enter analysis type (NDVI/Mann-Kendall): ").strip()
x = float(input("Enter longitude: "))
y = float(input("Enter latitude: "))
start_date = input("Enter start date (YYYY-MM-DD): ")
end_date = input("Enter end date (YYYY-MM-DD): ")

aoi = define_aoi(x, y)

def main(analysis_type, aoi, start_date, end_date):
    image = get_image(aoi, start_date, end_date)

    image = get_forest_ndvi_image(image)

    # Create a folium map centered on the AOI
    m = folium.Map(location=[y, x], zoom_start=10)

    if analysis_type.upper() == 'NDVI':
        ndvi = compute_ndvi(image)
        add_ee_layer_to_map(m, ndvi, {'min': -1, 'max': 1, 'palette': ['red', 'yellow', 'green']}, 'NDVI')
    elif analysis_type.upper() == 'MANN-KENDALL':
        ndvi_trend = calculate_mann_kendall_test_for_forest(aoi, start_date, end_date)
        add_ee_layer_to_map(m, ndvi_trend.select('NDVI_tau'), {'min': -1, 'max': 1, 'palette': ['red', 'white', 'green']}, 'Mann-Kendall Test')
    else:
        print("Invalid analysis type. Please choose either 'NDVI' or 'Mann-Kendall'.")

    # Display the map
    map_file = 'index.html'
    m.save(map_file)
    print(f"Map has been saved to {map_file}")


if __name__ == '__main__':
    main(analysis_type, aoi, start_date, end_date)
