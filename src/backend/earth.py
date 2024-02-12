from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
from pprint import pprint
import json
import urllib
import ee
import folium


ee.Authenticate()
ee.Initialize(project='forestify-project')


aoi = ee.Geometry.Rectangle([-106.3468, 56.1304, -98.3468, 60.1304])


sentinel_1 = ee.ImageCollection('COPERNICUS/S1_GRD')\
    .filterBounds(aoi)\
    .filterDate('2023-01-01', '2023-12-31')\
    .filter(ee.Filter.eq('instrumentMode', 'IW'))\
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))\
    .select('VV')

sentinel_2 = ee.ImageCollection('COPERNICUS/S2')\
    .filterBounds(aoi)\
    .filterDate('2023-01-01', '2023-12-31')\
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))\
    .select(['B4', 'B3', 'B2', 'B8'])


vis_params_s1 = {
    'min': -25,
    'max': 0,
    'palette': ['blue', 'green', 'red']
}


vis_params_s2 = {
    'min': 0,
    'max': 3000,
    'bands': ['B4', 'B3', 'B2']  # True color composite
}

map_id_s1 = ee.Image(sentinel_1.mean()).getMapId(vis_params_s1)
map_id_s2 = ee.Image(sentinel_2.mean()).getMapId(vis_params_s2)


html_template = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Sentinel Map Visualization</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style> #map {{ width: 100%; height: 600px; }} </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
        var map = L.map('map').setView([58.1304, -102.3468], 5);
        L.tileLayer('https://earthengine.googleapis.com/v1alpha/{map_id_s1['mapid']}/tiles/{{z}}/{{x}}/{{y}}?access_token={map_id_s1['token']}').addTo(map);
        L.tileLayer('https://earthengine.googleapis.com/v1alpha/{map_id_s2['mapid']}/tiles/{{z}}/{{x}}/{{y}}?access_token={map_id_s2['token']}').addTo(map);
    </script>
</body>
</html>
"""


with open('map_visualization.html', 'w') as file:
    file.write(html_template)