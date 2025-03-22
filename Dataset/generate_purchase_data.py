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

# Generate Supplier Master Data
def generate_supplier_master(num_records=1000):
    suppliers = []
    for _ in range(num_records):
        supplier = {
            "supplier_id": fake.uuid4(),
            "supplier_name": fake.company(),
            "contact_person": fake.name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "address": fake.address(),
            "city": fake.city(),
            "state": fake.state(),
            "country": fake.country(),
            "pincode": fake.postcode(),
            "gst_number": f"GST{fake.random_number(digits=10)}",
            "pan_number": f"PAN{fake.random_number(digits=10)}",
            "credit_limit": round(random.uniform(50000, 2000000), 2),
            "payment_terms": random.choice(["Net 30", "Net 45", "Net 60", "Immediate"]),
            "bank_details": {
                "account_number": fake.random_number(digits=12),
                "bank_name": fake.company(),
                "ifsc_code": f"IFSC{fake.random_number(digits=8)}"
            },
            "status": random.choice(["Active", "Inactive", "Blocked"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        suppliers.append(supplier)
    return suppliers

# Generate Item Master Data
def generate_item_master(num_records=1000):
    items = []
    categories = ["Raw Materials", "Packaging", "Machinery", "Spare Parts", "Consumables", "Services"]
    units = ["KG", "PCS", "MTR", "LTR", "BOX", "SET", "HRS"]
    
    for _ in range(num_records):
        item = {
            "item_id": fake.uuid4(),
            "item_code": f"ITEM{fake.random_number(digits=8)}",
            "item_name": fake.product_name(),
            "category": random.choice(categories),
            "description": fake.text(max_nb_chars=200),
            "unit_of_measure": random.choice(units),
            "hsn_code": f"{random.randint(1, 99):02d}{random.randint(1000, 9999)}",
            "gst_percentage": random.choice([0, 5, 12, 18, 28]),
            "standard_cost": round(random.uniform(100, 10000), 2),
            "minimum_order_quantity": random.randint(1, 100),
            "lead_time_days": random.randint(1, 30),
            "reorder_level": random.randint(10, 100),
            "status": random.choice(["Active", "Discontinued", "Out of Stock"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        items.append(item)
    return items

# Generate Purchase Orders
def generate_purchase_orders(num_records=1000):
    orders = []
    for _ in range(num_records):
        order_date = fake.date_time_between(start_date="-1y", end_date="now")
        order = {
            "po_id": f"PO{fake.random_number(digits=8)}",
            "supplier_id": fake.uuid4(),  # This should match with supplier_master
            "order_date": order_date.isoformat(),
            "expected_delivery_date": (order_date + timedelta(days=random.randint(1, 30))).isoformat(),
            "order_status": random.choice(["Draft", "Sent", "Acknowledged", "In Transit", "Received", "Cancelled"]),
            "payment_status": random.choice(["Pending", "Partial", "Completed"]),
            "total_amount": round(random.uniform(10000, 500000), 2),
            "tax_amount": round(random.uniform(1000, 50000), 2),
            "shipping_amount": round(random.uniform(500, 5000), 2),
            "grand_total": round(random.uniform(11500, 555000), 2),
            "terms_and_conditions": fake.text(max_nb_chars=500),
            "created_by": fake.name(),
            "created_date": order_date.isoformat(),
            "last_updated": (order_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        orders.append(order)
    return orders

# Generate Goods Receipt Notes
def generate_grn(num_records=1000):
    grns = []
    for _ in range(num_records):
        grn_date = fake.date_time_between(start_date="-1y", end_date="now")
        grn = {
            "grn_id": f"GRN{fake.random_number(digits=8)}",
            "po_id": f"PO{fake.random_number(digits=8)}",  # This should match with purchase_orders
            "supplier_id": fake.uuid4(),  # This should match with supplier_master
            "receipt_date": grn_date.isoformat(),
            "receipt_status": random.choice(["Partial", "Complete", "Rejected"]),
            "quality_status": random.choice(["Accepted", "Rejected", "Under Review"]),
            "total_quantity": random.randint(10, 1000),
            "total_amount": round(random.uniform(10000, 500000), 2),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": grn_date.isoformat(),
            "last_updated": (grn_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        grns.append(grn)
    return grns

# Generate Job Work Orders
def generate_job_work_orders(num_records=500):
    jwos = []
    for _ in range(num_records):
        jwo_date = fake.date_time_between(start_date="-1y", end_date="now")
        jwo = {
            "jwo_id": f"JWO{fake.random_number(digits=8)}",
            "supplier_id": fake.uuid4(),  # This should match with supplier_master
            "order_date": jwo_date.isoformat(),
            "expected_completion_date": (jwo_date + timedelta(days=random.randint(5, 60))).isoformat(),
            "work_status": random.choice(["Draft", "In Progress", "Completed", "Cancelled"]),
            "work_description": fake.text(max_nb_chars=500),
            "total_amount": round(random.uniform(5000, 200000), 2),
            "advance_payment": round(random.uniform(1000, 50000), 2),
            "payment_status": random.choice(["Pending", "Partial", "Completed"]),
            "created_by": fake.name(),
            "created_date": jwo_date.isoformat(),
            "last_updated": (jwo_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        jwos.append(jwo)
    return jwos

# Generate Purchase Debit Notes
def generate_purchase_debit_notes(num_records=200):
    debit_notes = []
    for _ in range(num_records):
        note_date = fake.date_time_between(start_date="-1y", end_date="now")
        note = {
            "debit_note_id": f"DN{fake.random_number(digits=8)}",
            "po_id": f"PO{fake.random_number(digits=8)}",  # This should match with purchase_orders
            "supplier_id": fake.uuid4(),  # This should match with supplier_master
            "note_date": note_date.isoformat(),
            "reason": random.choice(["Quality Issue", "Price Adjustment", "Quantity Discrepancy", "Service Issue"]),
            "amount": round(random.uniform(1000, 50000), 2),
            "status": random.choice(["Draft", "Sent", "Acknowledged", "Settled"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": note_date.isoformat(),
            "last_updated": (note_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        debit_notes.append(note)
    return debit_notes

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    supplier_master = generate_supplier_master()
    item_master = generate_item_master()
    purchase_orders = generate_purchase_orders()
    grn = generate_grn()
    job_work_orders = generate_job_work_orders()
    purchase_debit_notes = generate_purchase_debit_notes()

    # Save datasets to JSON files
    datasets = {
        'supplier_master.json': supplier_master,
        'item_master.json': item_master,
        'purchase_orders.json': purchase_orders,
        'grn.json': grn,
        'job_work_orders.json': job_work_orders,
        'purchase_debit_notes.json': purchase_debit_notes
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All purchase module datasets have been generated successfully in the 'data' folder!") 