from pymongo import MongoClient
import certifi
def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://limjun2:xN68uyeylPPyO06U@cluster0.yfshzov.mongodb.net/"
 
   # Create a connection using MongoClient
   client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
 
   # Create the database
   return client['database']
  
#function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()