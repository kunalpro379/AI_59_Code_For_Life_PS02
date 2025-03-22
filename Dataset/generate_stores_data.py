import json
from faker import Faker
import random
from datetime import datetime, timedelta
import os

# Initialize Faker
fake = Faker()

# Create data directory if it doesn't exist
if not os.path.exists('data'):
    os.makedirs('data')

# Generate Inventory Zones Data
def generate_inventory_zones(num_records=10):
    zones = []
    zone_types = ["Main Store", "Stock Preparation Store", "Raw Material Store", "Finished Goods Store", "Quality Control Store"]
    for _ in range(num_records):
        zone = {
            "zone_id": fake.uuid4(),
            "zone_name": random.choice(zone_types),
            "location_code": f"LOC{fake.random_number(digits=6)}",
            "description": fake.text(max_nb_chars=200),
            "capacity": random.randint(1000, 10000),
            "current_occupancy": random.randint(0, 100),
            "temperature_controlled": random.choice([True, False]),
            "temperature_range": {
                "min": random.randint(15, 25),
                "max": random.randint(25, 35)
            } if random.choice([True, False]) else None,
            "status": random.choice(["Active", "Maintenance", "Full", "Inactive"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        zones.append(zone)
    return zones

# Generate Stock Categories Data
def generate_stock_categories(num_records=50):
    categories = []
    main_categories = ["Raw Materials", "Work in Progress", "Finished Goods", "Spare Parts", "Consumables", "Packaging"]
    for _ in range(num_records):
        category = {
            "category_id": fake.uuid4(),
            "category_name": random.choice(main_categories),
            "sub_category": fake.word(),
            "description": fake.text(max_nb_chars=200),
            "unit_of_measure": random.choice(["KG", "PCS", "MTR", "LTR", "BOX", "SET"]),
            "reorder_level": random.randint(10, 100),
            "maximum_level": random.randint(100, 1000),
            "shelf_life_days": random.randint(30, 365),
            "storage_requirements": random.choice(["Room Temperature", "Refrigerated", "Frozen", "Humidity Controlled"]),
            "status": random.choice(["Active", "Inactive"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        categories.append(category)
    return categories

# Generate Stock Items Data
def generate_stock_items(num_records=1000):
    items = []
    item_types = ["Standard", "Premium", "Basic", "Industrial", "Commercial", "Professional"]
    item_categories = ["Tool", "Component", "Material", "Supply", "Equipment", "Accessory"]
    
    for _ in range(num_records):
        # Generate a realistic item name by combining words
        item_name = f"{random.choice(item_types)} {random.choice(item_categories)} {fake.word()}"
        
        item = {
            "item_id": fake.uuid4(),
            "item_code": f"STK{fake.random_number(digits=8)}",
            "item_name": item_name,  # Using our custom item name
            "category_id": fake.uuid4(),  # This should match with stock_categories
            "description": fake.text(max_nb_chars=200),
            "unit_of_measure": random.choice(["KG", "PCS", "MTR", "LTR", "BOX", "SET"]),
            "current_stock": random.randint(0, 1000),
            "reorder_level": random.randint(10, 100),
            "maximum_level": random.randint(100, 1000),
            "average_consumption": random.randint(1, 100),
            "last_received_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
            "last_issued_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
            "status": random.choice(["Active", "Discontinued", "Out of Stock"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        items.append(item)
    return items

# Generate Goods Issue Notes
def generate_goods_issue_notes(num_records=1000):
    gins = []
    for _ in range(num_records):
        gin_date = fake.date_time_between(start_date="-1y", end_date="now")
        gin = {
            "gin_id": f"GIN{fake.random_number(digits=8)}",
            "issue_date": gin_date.isoformat(),
            "requisition_number": f"REQ{fake.random_number(digits=8)}",
            "department": random.choice(["Production", "Maintenance", "Quality Control", "Sales", "R&D"]),
            "purpose": random.choice(["Production", "Maintenance", "Quality Testing", "Sales", "Sample"]),
            "total_quantity": random.randint(10, 1000),
            "total_value": round(random.uniform(1000, 100000), 2),
            "status": random.choice(["Draft", "Approved", "Issued", "Cancelled"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": gin_date.isoformat(),
            "last_updated": (gin_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        gins.append(gin)
    return gins

# Generate Stock Transfers
def generate_stock_transfers(num_records=500):
    transfers = []
    for _ in range(num_records):
        transfer_date = fake.date_time_between(start_date="-1y", end_date="now")
        transfer = {
            "transfer_id": f"TRF{fake.random_number(digits=8)}",
            "transfer_date": transfer_date.isoformat(),
            "source_zone_id": fake.uuid4(),  # This should match with inventory_zones
            "destination_zone_id": fake.uuid4(),  # This should match with inventory_zones
            "transfer_type": random.choice(["Internal", "Inter-Company", "Customer Return"]),
            "total_items": random.randint(1, 50),
            "total_quantity": random.randint(10, 1000),
            "total_value": round(random.uniform(1000, 100000), 2),
            "status": random.choice(["Draft", "In Transit", "Completed", "Cancelled"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": transfer_date.isoformat(),
            "last_updated": (transfer_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        transfers.append(transfer)
    return transfers

# Generate Stock Aging Data
def generate_stock_aging(num_records=1000):
    aging = []
    for _ in range(num_records):
        aging_date = fake.date_time_between(start_date="-1y", end_date="now")
        aging_entry = {
            "aging_id": fake.uuid4(),
            "item_id": fake.uuid4(),  # This should match with stock_items
            "aging_date": aging_date.isoformat(),
            "current_stock": random.randint(0, 1000),
            "stock_value": round(random.uniform(1000, 100000), 2),
            "age_brackets": {
                "0-30_days": random.randint(0, 500),
                "31-60_days": random.randint(0, 300),
                "61-90_days": random.randint(0, 200),
                "90_plus_days": random.randint(0, 100)
            },
            "last_movement_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
            "created_date": aging_date.isoformat(),
            "last_updated": (aging_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        aging.append(aging_entry)
    return aging

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    inventory_zones = generate_inventory_zones()
    stock_categories = generate_stock_categories()
    stock_items = generate_stock_items()
    goods_issue_notes = generate_goods_issue_notes()
    stock_transfers = generate_stock_transfers()
    stock_aging = generate_stock_aging()

    # Save datasets to JSON files
    datasets = {
        'inventory_zones.json': inventory_zones,
        'stock_categories.json': stock_categories,
        'stock_items.json': stock_items,
        'goods_issue_notes.json': goods_issue_notes,
        'stock_transfers.json': stock_transfers,
        'stock_aging.json': stock_aging
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All stores module datasets have been generated successfully in the 'data' folder!") 