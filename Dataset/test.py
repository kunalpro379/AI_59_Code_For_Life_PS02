from pymongo import MongoClient

# Step 1: Connect to MongoDB
client = MongoClient("mongodb+srv://kunal:kunal@cluster0.gvmm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  # Replace with your MongoDB connection string
db = client["ERP"]  # Replace with your database name

# Step 2: Get a list of all collections in the database
collections = db.list_collection_names()

# Step 3: Print one document from each collection
for collection_name in collections:
    collection = db[collection_name]  # Access the collection
    document = collection.find_one()  # Fetch the first document in the collection
    
    if document:
        print(f"Collection: {collection_name}")
        print(document)
        print("-" * 50)  # Separator for readability
    else:
        print(f"Collection: {collection_name} is empty.")