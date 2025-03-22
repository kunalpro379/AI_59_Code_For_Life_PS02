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

# Generate Customer Master Data
def generate_customer_master(num_records=1000):
    customers = []
    for _ in range(num_records):
        customer = {
            "customer_id": fake.uuid4(),
            "customer_name": fake.company(),
            "contact_person": fake.name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "address": fake.address(),
            "city": fake.city(),
            "state": fake.state(),
            "country": fake.country(),
            "pincode": fake.postcode(),
            "gst_number": f"GST{fake.random_number(digits=10)}",
            "credit_limit": round(random.uniform(10000, 1000000), 2),
            "payment_terms": random.choice(["Net 30", "Net 45", "Net 60", "Immediate"]),
            "status": random.choice(["Active", "Inactive", "Blocked"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        customers.append(customer)
    return customers

# Generate SKU Master Data
def generate_sku_master(num_records=1000):
    skus = []
    categories = ["Electronics", "Clothing", "Food", "Furniture", "Books", "Sports"]
    for _ in range(num_records):
        category = random.choice(categories)
        sku = {
            "sku_id": f"SKU{fake.random_number(digits=6)}",
            "product_name": f"{fake.word().title()} {category.rstrip('s')}",
            "category": category,
            "unit_price": round(random.uniform(100, 10000), 2),
            "unit_cost": round(random.uniform(50, 8000), 2),
            "stock_quantity": random.randint(0, 1000),
            "manufacturer": fake.company(),
            "description": fake.sentence(),
            "created_date": fake.date_time_this_year().isoformat(),
            "hsn_code": f"{random.randint(1, 99):02d}{random.randint(1000, 9999)}",
            "gst_percentage": random.choice([0, 5, 12, 18, 28]),
            "reorder_level": random.randint(10, 100),
            "status": random.choice(["Active", "Discontinued", "Out of Stock"]),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        skus.append(sku)
    return skus

# Generate Logistics Master Data
def generate_logistics_master(num_records=100):
    logistics = []
    transport_modes = ["Road", "Rail", "Air", "Sea"]
    for _ in range(num_records):
        logistics_entry = {
            "partner_id": fake.uuid4(),
            "partner_name": fake.company(),
            "transport_mode": random.choice(transport_modes),
            "contact_person": fake.name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "address": fake.address(),
            "service_area": random.choice(["Local", "Regional", "National", "International"]),
            "rating": round(random.uniform(1, 5), 1),
            "status": random.choice(["Active", "Inactive", "Suspended"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        logistics.append(logistics_entry)
    return logistics

# Generate Sales Orders
def generate_sales_orders(num_records=1000):
    orders = []
    for _ in range(num_records):
        order_date = fake.date_time_between(start_date="-1y", end_date="now")
        order = {
            "order_id": f"SO{fake.random_number(digits=8)}",
            "customer_id": fake.uuid4(),  # This should match with customer_master
            "order_date": order_date.isoformat(),
            "delivery_date": (order_date + timedelta(days=random.randint(1, 30))).isoformat(),
            "order_status": random.choice(["Draft", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"]),
            "payment_status": random.choice(["Pending", "Partial", "Completed"]),
            "total_amount": round(random.uniform(1000, 100000), 2),
            "tax_amount": round(random.uniform(100, 10000), 2),
            "shipping_amount": round(random.uniform(50, 1000), 2),
            "grand_total": round(random.uniform(1150, 111000), 2),
            "created_by": fake.name(),
            "created_date": order_date.isoformat(),
            "last_updated": (order_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        orders.append(order)
    return orders

# Generate Dispatch Requests
def generate_dispatch_requests(num_records=1000):
    dispatches = []
    for _ in range(num_records):
        dispatch_date = fake.date_time_between(start_date="-1y", end_date="now")
        dispatch = {
            "drn_id": f"DRN{fake.random_number(digits=8)}",
            "order_id": f"SO{fake.random_number(digits=8)}",  # This should match with sales_orders
            "customer_id": fake.uuid4(),  # This should match with customer_master
            "dispatch_date": dispatch_date.isoformat(),
            "transport_partner_id": fake.uuid4(),  # This should match with logistics_master
            "status": random.choice(["Pending", "In Transit", "Delivered", "Cancelled"]),
            "shipping_address": fake.address(),
            "tracking_number": fake.uuid4(),
            "created_by": fake.name(),
            "created_date": dispatch_date.isoformat(),
            "last_updated": (dispatch_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        dispatches.append(dispatch)
    return dispatches

# Generate Invoices
def generate_invoices(num_records=1000):
    invoices = []
    for _ in range(num_records):
        invoice_date = fake.date_time_between(start_date="-1y", end_date="now")
        invoice = {
            "invoice_id": f"INV{fake.random_number(digits=8)}",
            "order_id": f"SO{fake.random_number(digits=8)}",  # This should match with sales_orders
            "customer_id": fake.uuid4(),  # This should match with customer_master
            "invoice_date": invoice_date.isoformat(),
            "due_date": (invoice_date + timedelta(days=random.randint(15, 60))).isoformat(),
            "payment_status": random.choice(["Pending", "Partial", "Completed", "Overdue"]),
            "total_amount": round(random.uniform(1000, 100000), 2),
            "tax_amount": round(random.uniform(100, 10000), 2),
            "shipping_amount": round(random.uniform(50, 1000), 2),
            "grand_total": round(random.uniform(1150, 111000), 2),
            "eway_bill_number": f"EWB{fake.random_number(digits=12)}",
            "created_by": fake.name(),
            "created_date": invoice_date.isoformat(),
            "last_updated": (invoice_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        invoices.append(invoice)
    return invoices

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    customer_master = generate_customer_master()
    sku_master = generate_sku_master()
    logistics_master = generate_logistics_master()
    sales_orders = generate_sales_orders()
    dispatch_requests = generate_dispatch_requests()
    invoices = generate_invoices()

    # Save datasets to JSON files
    datasets = {
        'customer_master.json': customer_master,
        'sku_master.json': sku_master,
        'logistics_master.json': logistics_master,
        'sales_orders.json': sales_orders,
        'dispatch_requests.json': dispatch_requests,
        'invoices.json': invoices
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All datasets have been generated successfully in the 'data' folder!") 