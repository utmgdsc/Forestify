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

# Get the loss info for Canada

loss = lc.select('loss')
loss_canada = loss.reduceRegion(reducer=ee.Reducer.sum(), geometry=ee.Geometry.Rectangle(-140, 50, -52, 60), scale=30, maxPixels=1e9, bestEffort=True)
print(loss_canada.getInfo())

# Get the gain info for Canada

gain = lc.select('gain')
gain_canada = gain.reduceRegion(reducer=ee.Reducer.sum(), geometry=ee.Geometry.Rectangle(-140, 50, -52, 60), scale=30, maxPixels=1e9, bestEffort=True)
print(gain_canada.getInfo())

# Get the tree cover info for Canada

tree_cover = lc.select('treecover2000')
tree_cover_canada = tree_cover.reduceRegion(reducer=ee.Reducer.mean(), geometry=ee.Geometry.Rectangle(-140, 50, -52, 60), scale=30, maxPixels=1e9, bestEffort=True)
print(tree_cover_canada.getInfo())