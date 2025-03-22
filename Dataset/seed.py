import os
import json
from pymongo import MongoClient
from pymongo.errors import OperationFailure, ConnectionFailure
from dotenv import load_dotenv
import sys

# Load environment variables from .env file
load_dotenv()

# MongoDB credentials from environment variables
MONGO_URI = os.getenv('MONGO_URI')
MONGO_DB_NAME = os.getenv('MONGO_DB_NAME')

# Debugging: Print the environment variables (redacted version for security)
if MONGO_URI:
    # Show only part of the connection string for security
    redacted_uri = MONGO_URI[:10] + "..." + MONGO_URI[-10:] if len(MONGO_URI) > 20 else "..."
    print(f"MONGO_URI detected (redacted for security)")
else:
    print(f"MONGO_URI not found in environment variables")

print(f"MONGO_DB_NAME: {MONGO_DB_NAME}")

# Connect to MongoDB with improved error handling
try:
    # Test the connection before proceeding
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # Force a connection to verify credentials
    client.admin.command('ping')
    db = client[MONGO_DB_NAME]
    print("Successfully connected to MongoDB!")
except ConnectionFailure:
    print("Failed to connect to MongoDB server. Please check if the server is running.")
    sys.exit(1)
except OperationFailure as e:
    if "auth" in str(e).lower():
        print("Authentication failed. Please check your username and password in the connection string.")
        print("Tip: Ensure your MongoDB Atlas username and password are correct and properly URL-encoded.")
    else:
        print(f"MongoDB operation failed: {e}")
    sys.exit(1)
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    sys.exit(1)

# Function to insert JSON data into MongoDB
def insert_json_into_mongodb(file_path, collection_name):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Get or create the collection
        collection = db[collection_name]
        
        # Insert data into the collection
        result = None
        if isinstance(data, list):
            if not data:  # Check if the list is empty
                print(f"Warning: Empty list in {file_path}, skipping.")
                return
            result = collection.insert_many(data)  # Insert multiple documents
            print(f"Inserted {len(result.inserted_ids)} documents from {file_path}")
        else:
            result = collection.insert_one(data)  # Insert a single document
            print(f"Inserted document with ID {result.inserted_id} from {file_path}")
    except json.JSONDecodeError:
        print(f"Error: {file_path} contains invalid JSON. Please check the file format.")
    except OperationFailure as e:
        print(f"MongoDB operation failed for {file_path}: {e}")
        if "authentication" in str(e).lower():
            print("Please check your MongoDB credentials and permissions.")
    except Exception as e:
        print(f"Error inserting data from {file_path}: {e}")

# Function to process all JSON files in the data folder
def process_json_files(data_folder):
    json_files = [f for f in os.listdir(data_folder) if f.endswith('.json')]
    
    if not json_files:
        print(f"No JSON files found in '{data_folder}' directory.")
        return
        
    print(f"Found {len(json_files)} JSON files to process.")
    
    for filename in json_files:
        file_path = os.path.join(data_folder, filename)
        collection_name = os.path.splitext(filename)[0]  # Use filename as collection name
        print(f"Processing {filename} into collection '{collection_name}'...")
        insert_json_into_mongodb(file_path, collection_name)

# Main function
if __name__ == "__main__":
    data_folder = 'data'  # Folder containing JSON files
    if not os.path.exists(data_folder):
        print(f"Error: The folder '{data_folder}' does not exist.")
        print(f"Current working directory: {os.getcwd()}")
        print("Available directories and files:")
        for item in os.listdir('.'):
            print(f" - {item}")
    else:
        print(f"Starting data insertion from '{data_folder}' into MongoDB...")
        process_json_files(data_folder)
        print("Process completed.")