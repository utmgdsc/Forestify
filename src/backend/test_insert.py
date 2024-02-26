# Get the database using the method we defined in pymongo_test_insert file
from dbinit import get_database
dbname = get_database()
collection_name = dbname["users"]
collection_name2 = dbname["images"]

item_1 = {
  "name" : "Bob",
  "password" : "password",
}

item_2 = {
  "image1" : "some_sentinel2_imagery"
}

collection_name.insert_one(item_1)
collection_name2.insert_one(item_2)