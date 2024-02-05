from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
from pprint import pprint
import json
import urllib
import ee

ee.Authenticate()
ee.Initialize(project='forestify-project')


asset_id = 'UMD/hansen/global_forest_change_2022_v1_10'

lc = ee.Image(asset_id)
print(lc.getInfo())
print('\n')

countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
canada = countries.filter(ee.Filter.eq('country_na', 'Canada'))

lossImage = lc.select('loss')

stats = lossImage.reduceRegion(
    reducer=ee.Reducer.sum(),
    geometry=canada.geometry(),
    scale=30,
    maxPixels=1e9,
    bestEffort=True
    )

print(stats.getInfo())