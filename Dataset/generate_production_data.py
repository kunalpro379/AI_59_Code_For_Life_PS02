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

# Generate Raw Material Master Data
def generate_raw_material_master(num_records=1000):
    materials = []
    categories = ["Chemicals", "Metals", "Plastics", "Textiles", "Electronics", "Packaging"]
    product_types = ["Raw", "Processed", "Refined", "Basic", "Premium", "Industrial"]
    
    for _ in range(num_records):
        # Generate a realistic material name by combining words
        material_name = f"{random.choice(product_types)} {random.choice(categories)} {fake.word()}"
        
        material = {
            "material_id": fake.uuid4(),
            "material_code": f"RM{fake.random_number(digits=8)}",
            "material_name": material_name,  # Using our custom material name
            "category": random.choice(categories),
            "description": fake.text(max_nb_chars=200),
            "unit_of_measure": random.choice(["KG", "PCS", "MTR", "LTR", "BOX"]),
            "standard_cost": round(random.uniform(100, 10000), 2),
            "minimum_stock": random.randint(100, 1000),
            "maximum_stock": random.randint(1000, 10000),
            "current_stock": random.randint(0, 10000),
            "shelf_life_days": random.randint(30, 365),
            "storage_requirements": random.choice(["Room Temperature", "Refrigerated", "Humidity Controlled"]),
            "quality_parameters": {
                "parameter1": random.choice(["pH", "Viscosity", "Density", "Moisture"]),
                "parameter2": random.choice(["Color", "Odor", "Texture", "Purity"]),
                "parameter3": random.choice(["Size", "Shape", "Hardness", "Flexibility"])
            },
            "status": random.choice(["Active", "Discontinued", "Under Review"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        materials.append(material)
    return materials

# Generate Production Process Definitions
def generate_process_definitions(num_records=100):
    processes = []
    process_types = ["Assembly", "Mixing", "Molding", "Cutting", "Welding", "Testing", "Packaging"]
    for _ in range(num_records):
        process = {
            "process_id": fake.uuid4(),
            "process_code": f"PRC{fake.random_number(digits=8)}",
            "process_name": random.choice(process_types),
            "description": fake.text(max_nb_chars=200),
            "standard_time_minutes": random.randint(5, 480),
            "setup_time_minutes": random.randint(5, 120),
            "cleanup_time_minutes": random.randint(5, 60),
            "required_skills": random.sample(["Basic", "Intermediate", "Advanced", "Expert"], random.randint(1, 3)),
            "required_tools": random.sample(["Hand Tools", "Power Tools", "Measuring Tools", "Safety Equipment"], random.randint(1, 4)),
            "quality_checkpoints": random.randint(1, 5),
            "temperature_requirements": {
                "min": random.randint(15, 25),
                "max": random.randint(25, 35)
            } if random.choice([True, False]) else None,
            "status": random.choice(["Active", "Inactive", "Under Review"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        processes.append(process)
    return processes

# Generate Batch Card Entries
def generate_batch_cards(num_records=1000):
    batches = []
    for _ in range(num_records):
        batch_date = fake.date_time_between(start_date="-1y", end_date="now")
        batch = {
            "batch_id": f"BCH{fake.random_number(digits=8)}",
            "product_code": f"PRD{fake.random_number(digits=8)}",
            "batch_number": f"B{fake.random_number(digits=6)}",
            "start_date": batch_date.isoformat(),
            "planned_end_date": (batch_date + timedelta(days=random.randint(1, 30))).isoformat(),
            "actual_end_date": (batch_date + timedelta(days=random.randint(1, 30))).isoformat(),
            "planned_quantity": random.randint(100, 10000),
            "actual_quantity": random.randint(100, 10000),
            "status": random.choice(["Planned", "In Progress", "Completed", "Cancelled", "On Hold"]),
            "quality_status": random.choice(["Pending", "Passed", "Failed", "Under Review"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": batch_date.isoformat(),
            "last_updated": (batch_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        batches.append(batch)
    return batches

# Generate Work Orders
def generate_work_orders(num_records=1000):
    orders = []
    for _ in range(num_records):
        order_date = fake.date_time_between(start_date="-1y", end_date="now")
        order = {
            "work_order_id": f"WO{fake.random_number(digits=8)}",
            "batch_id": f"BCH{fake.random_number(digits=8)}",  # This should match with batch_cards
            "process_id": fake.uuid4(),  # This should match with process_definitions
            "order_date": order_date.isoformat(),
            "planned_start_date": (order_date + timedelta(days=random.randint(1, 5))).isoformat(),
            "planned_end_date": (order_date + timedelta(days=random.randint(6, 30))).isoformat(),
            "actual_start_date": (order_date + timedelta(days=random.randint(1, 5))).isoformat(),
            "actual_end_date": (order_date + timedelta(days=random.randint(6, 30))).isoformat(),
            "planned_quantity": random.randint(100, 10000),
            "actual_quantity": random.randint(100, 10000),
            "status": random.choice(["Planned", "In Progress", "Completed", "Cancelled", "On Hold"]),
            "priority": random.choice(["Low", "Medium", "High", "Urgent"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": order_date.isoformat(),
            "last_updated": (order_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        orders.append(order)
    return orders

# Generate Job Card Entries
def generate_job_cards(num_records=2000):
    jobs = []
    for _ in range(num_records):
        job_date = fake.date_time_between(start_date="-1y", end_date="now")
        job = {
            "job_card_id": f"JC{fake.random_number(digits=8)}",
            "work_order_id": f"WO{fake.random_number(digits=8)}",  # This should match with work_orders
            "operator_id": f"OP{fake.random_number(digits=6)}",
            "machine_id": f"MCH{fake.random_number(digits=6)}",
            "start_time": job_date.isoformat(),
            "end_time": (job_date + timedelta(hours=random.randint(1, 8))).isoformat(),
            "planned_quantity": random.randint(10, 1000),
            "actual_quantity": random.randint(10, 1000),
            "rejected_quantity": random.randint(0, 50),
            "status": random.choice(["In Progress", "Completed", "Paused", "Cancelled"]),
            "quality_status": random.choice(["Pending", "Passed", "Failed", "Under Review"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": job_date.isoformat(),
            "last_updated": (job_date + timedelta(hours=random.randint(1, 8))).isoformat()
        }
        jobs.append(job)
    return jobs

# Generate Production Inventory
def generate_production_inventory(num_records=1000):
    inventory = []
    for _ in range(num_records):
        inventory_date = fake.date_time_between(start_date="-1y", end_date="now")
        inventory_entry = {
            "inventory_id": fake.uuid4(),
            "product_code": f"PRD{fake.random_number(digits=8)}",
            "batch_id": f"BCH{fake.random_number(digits=8)}",  # This should match with batch_cards
            "location": random.choice(["Raw Material Store", "Work in Progress", "Finished Goods", "Quality Control"]),
            "quantity": random.randint(0, 10000),
            "unit_of_measure": random.choice(["KG", "PCS", "MTR", "LTR", "BOX"]),
            "status": random.choice(["Available", "Reserved", "In Transit", "Blocked"]),
            "quality_status": random.choice(["Pending", "Passed", "Failed", "Under Review"]),
            "last_movement_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
            "created_date": inventory_date.isoformat(),
            "last_updated": (inventory_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        inventory.append(inventory_entry)
    return inventory

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    raw_material_master = generate_raw_material_master()
    process_definitions = generate_process_definitions()
    batch_cards = generate_batch_cards()
    work_orders = generate_work_orders()
    job_cards = generate_job_cards()
    production_inventory = generate_production_inventory()

    # Save datasets to JSON files
    datasets = {
        'raw_material_master.json': raw_material_master,
        'process_definitions.json': process_definitions,
        'batch_cards.json': batch_cards,
        'work_orders.json': work_orders,
        'job_cards.json': job_cards,
        'production_inventory.json': production_inventory
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All production module datasets have been generated successfully in the 'data' folder!") 