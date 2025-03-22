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

# Generate Shipping Modes
def generate_shipping_modes(num_records=20):
    modes = []
    for _ in range(num_records):
        mode = {
            "mode_id": fake.uuid4(),
            "mode_code": f"SHM{fake.random_number(digits=6)}",
            "mode_name": random.choice(["Road Transport", "Rail Transport", "Air Freight", "Sea Freight", "Express Delivery"]),
            "description": fake.text(max_nb_chars=200),
            "transit_time_days": random.randint(1, 30),
            "cost_per_kg": round(random.uniform(10, 1000), 2),
            "max_weight_kg": random.randint(100, 10000),
            "max_volume_cbm": round(random.uniform(1, 100), 2),
            "is_active": random.choice([True, False]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        modes.append(mode)
    return modes

# Generate Transport Partners
def generate_transport_partners(num_records=100):
    partners = []
    for _ in range(num_records):
        partner = {
            "partner_id": fake.uuid4(),
            "partner_code": f"TP{fake.random_number(digits=8)}",
            "partner_name": fake.company(),
            "contact_person": fake.name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "address": fake.address(),
            "gst_number": f"GST{fake.random_number(digits=10)}",
            "pan_number": f"PAN{fake.random_number(digits=10)}",
            "service_areas": random.sample(["Local", "Regional", "National", "International"], random.randint(1, 4)),
            "shipping_modes": random.sample([f"SHM{fake.random_number(digits=6)}" for _ in range(5)], random.randint(1, 5)),
            "rating": round(random.uniform(1, 5), 1),
            "status": random.choice(["Active", "Inactive", "Suspended"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        partners.append(partner)
    return partners

# Generate Sales Order Dispatches (DRN)
def generate_sales_dispatches(num_records=1000):
    dispatches = []
    for _ in range(num_records):
        dispatch_date = fake.date_time_between(start_date="-1y", end_date="now")
        dispatch = {
            "drn_id": f"DRN{fake.random_number(digits=8)}",
            "order_id": f"SO{fake.random_number(digits=8)}",  # This should match with sales_orders
            "customer_id": fake.uuid4(),  # This should match with customer_master
            "dispatch_date": dispatch_date.isoformat(),
            "expected_delivery_date": (dispatch_date + timedelta(days=random.randint(1, 30))).isoformat(),
            "transport_partner_id": fake.uuid4(),  # This should match with transport_partners
            "shipping_mode_id": fake.uuid4(),  # This should match with shipping_modes
            "vehicle_number": f"VEH{fake.random_number(digits=6)}",
            "driver_name": fake.name(),
            "driver_contact": fake.phone_number(),
            "total_packages": random.randint(1, 100),
            "total_weight_kg": round(random.uniform(10, 1000), 2),
            "total_volume_cbm": round(random.uniform(1, 50), 2),
            "status": random.choice(["Pending", "In Transit", "Delivered", "Cancelled"]),
            "tracking_number": fake.uuid4(),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": dispatch_date.isoformat(),
            "last_updated": (dispatch_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        dispatches.append(dispatch)
    return dispatches

# Generate Advance Shipment Notices (ASN)
def generate_advance_shipment_notices(num_records=500):
    asns = []
    for _ in range(num_records):
        asn_date = fake.date_time_between(start_date="-1y", end_date="now")
        asn = {
            "asn_id": f"ASN{fake.random_number(digits=8)}",
            "drn_id": f"DRN{fake.random_number(digits=8)}",  # This should match with sales_dispatches
            "customer_id": fake.uuid4(),  # This should match with customer_master
            "asn_date": asn_date.isoformat(),
            "expected_arrival_date": (asn_date + timedelta(days=random.randint(1, 30))).isoformat(),
            "transport_partner_id": fake.uuid4(),  # This should match with transport_partners
            "shipping_mode_id": fake.uuid4(),  # This should match with shipping_modes
            "vehicle_number": f"VEH{fake.random_number(digits=6)}",
            "driver_name": fake.name(),
            "driver_contact": fake.phone_number(),
            "total_packages": random.randint(1, 100),
            "total_weight_kg": round(random.uniform(10, 1000), 2),
            "total_volume_cbm": round(random.uniform(1, 50), 2),
            "status": random.choice(["Pending", "In Transit", "Delivered", "Cancelled"]),
            "tracking_number": fake.uuid4(),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": asn_date.isoformat(),
            "last_updated": (asn_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        asns.append(asn)
    return asns

# Generate Dispatch Status Reports
def generate_dispatch_status_reports(num_records=1000):
    reports = []
    for _ in range(num_records):
        report_date = fake.date_time_between(start_date="-1y", end_date="now")
        report = {
            "report_id": f"DSR{fake.random_number(digits=8)}",
            "drn_id": f"DRN{fake.random_number(digits=8)}",  # This should match with sales_dispatches
            "report_date": report_date.isoformat(),
            "current_location": fake.city(),
            "current_status": random.choice(["In Transit", "At Hub", "Out for Delivery", "Delivered"]),
            "estimated_delivery_date": (report_date + timedelta(days=random.randint(1, 10))).isoformat(),
            "delay_reason": random.choice(["Traffic", "Weather", "Vehicle Breakdown", "Customer Not Available", "None"]) if random.choice([True, False]) else None,
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": report_date.isoformat(),
            "last_updated": (report_date + timedelta(hours=random.randint(1, 24))).isoformat()
        }
        reports.append(report)
    return reports

# Generate Sales Register
def generate_sales_register(num_records=1000):
    register = []
    for _ in range(num_records):
        sale_date = fake.date_time_between(start_date="-1y", end_date="now")
        sale = {
            "sale_id": f"SALE{fake.random_number(digits=8)}",
            "order_id": f"SO{fake.random_number(digits=8)}",  # This should match with sales_orders
            "customer_id": fake.uuid4(),  # This should match with customer_master
            "sale_date": sale_date.isoformat(),
            "product_code": f"PRD{fake.random_number(digits=8)}",  # This should match with sku_master
            "quantity": random.randint(1, 1000),
            "unit_price": round(random.uniform(100, 10000), 2),
            "total_amount": round(random.uniform(1000, 100000), 2),
            "tax_amount": round(random.uniform(100, 10000), 2),
            "shipping_amount": round(random.uniform(50, 5000), 2),
            "grand_total": round(random.uniform(1150, 115000), 2),
            "payment_status": random.choice(["Pending", "Partial", "Completed"]),
            "payment_terms": random.choice(["Net 30", "Net 45", "Net 60", "Immediate"]),
            "created_by": fake.name(),
            "created_date": sale_date.isoformat(),
            "last_updated": (sale_date + timedelta(days=random.randint(1, 10))).isoformat()
        }
        register.append(sale)
    return register

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    shipping_modes = generate_shipping_modes()
    transport_partners = generate_transport_partners()
    sales_dispatches = generate_sales_dispatches()
    advance_shipment_notices = generate_advance_shipment_notices()
    dispatch_status_reports = generate_dispatch_status_reports()
    sales_register = generate_sales_register()

    # Save datasets to JSON files
    datasets = {
        'shipping_modes.json': shipping_modes,
        'transport_partners.json': transport_partners,
        'sales_dispatches.json': sales_dispatches,
        'advance_shipment_notices.json': advance_shipment_notices,
        'dispatch_status_reports.json': dispatch_status_reports,
        'sales_register.json': sales_register
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All dispatch and logistics module datasets have been generated successfully in the 'data' folder!") 