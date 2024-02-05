from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
from pprint import pprint
import json
import urllib

credentials = service_account.Credentials.from_service_account_file('private-key.json')
scoped_credentials = credentials.with_scopes(
    ['https://www.googleapis.com/auth/cloud-platform'])

authed_session = AuthorizedSession(scoped_credentials)

project = 'projects/earthengine-public'
asset_id = 'UMD/hansen/global_forest_change_2022_v1_10'

name = '{}/assets/{}'.format(project, asset_id)

url = 'https://earthengine.googleapis.com/v1alpha/{}'.format(name)

response = authed_session.get(url)

pprint(response.json()['bands'][1])