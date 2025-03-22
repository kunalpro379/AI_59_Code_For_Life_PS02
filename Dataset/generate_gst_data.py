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

# Generate HSN Codes
def generate_hsn_codes(num_records=100):
    codes = []
    for _ in range(num_records):
        code = {
            "hsn_id": fake.uuid4(),
            "hsn_code": f"{random.randint(1, 99):02d}{random.randint(1000, 9999)}",
            "description": fake.text(max_nb_chars=200),
            "gst_rate": random.choice([0, 5, 12, 18, 28]),
            "cgst_rate": random.choice([0, 2.5, 6, 9, 14]),
            "sgst_rate": random.choice([0, 2.5, 6, 9, 14]),
            "igst_rate": random.choice([0, 5, 12, 18, 28]),
            "is_active": random.choice([True, False]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        codes.append(code)
    return codes

# Generate SAC Codes
def generate_sac_codes(num_records=50):
    codes = []
    for _ in range(num_records):
        code = {
            "sac_id": fake.uuid4(),
            "sac_code": f"{random.randint(99, 99)}{random.randint(1000, 9999)}",
            "description": fake.text(max_nb_chars=200),
            "gst_rate": random.choice([0, 5, 12, 18, 28]),
            "cgst_rate": random.choice([0, 2.5, 6, 9, 14]),
            "sgst_rate": random.choice([0, 2.5, 6, 9, 14]),
            "igst_rate": random.choice([0, 5, 12, 18, 28]),
            "is_active": random.choice([True, False]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        codes.append(code)
    return codes

# Generate GSTIN Records
def generate_gstin_records(num_records=500):
    records = []
    for _ in range(num_records):
        record = {
            "gstin_id": fake.uuid4(),
            "gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "legal_name": fake.company(),
            "trade_name": fake.company(),
            "address": fake.address(),
            "state_code": f"{random.randint(1, 37):02d}",
            "registration_type": random.choice(["Regular", "Composition", "Unregistered", "Input Service Distributor"]),
            "registration_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "status": random.choice(["Active", "Inactive", "Suspended", "Cancelled"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        records.append(record)
    return records

# Generate E-Invoices
def generate_e_invoices(num_records=1000):
    invoices = []
    for _ in range(num_records):
        invoice_date = fake.date_time_between(start_date="-1y", end_date="now")
        invoice = {
            "invoice_id": f"EINV{fake.random_number(digits=8)}",
            "invoice_date": invoice_date.isoformat(),
            "invoice_number": f"INV{fake.random_number(digits=8)}",
            "customer_gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "hsn_code": f"{random.randint(1, 99):02d}{random.randint(1000, 9999)}",
            "taxable_amount": round(random.uniform(1000, 100000), 2),
            "cgst_amount": round(random.uniform(50, 5000), 2),
            "sgst_amount": round(random.uniform(50, 5000), 2),
            "igst_amount": round(random.uniform(100, 10000), 2),
            "total_amount": round(random.uniform(1100, 110000), 2),
            "irn": fake.uuid4(),
            "qr_code": fake.uuid4(),
            "status": random.choice(["Generated", "Cancelled", "Amended"]),
            "created_by": fake.name(),
            "created_date": invoice_date.isoformat(),
            "last_updated": (invoice_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        invoices.append(invoice)
    return invoices

# Generate E-Way Bills
def generate_e_way_bills(num_records=500):
    bills = []
    for _ in range(num_records):
        bill_date = fake.date_time_between(start_date="-1y", end_date="now")
        bill = {
            "eway_bill_id": f"EWB{fake.random_number(digits=8)}",
            "bill_date": bill_date.isoformat(),
            "bill_number": f"EWB{fake.random_number(digits=8)}",
            "invoice_id": f"INV{fake.random_number(digits=8)}",
            "from_gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "to_gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "transport_mode": random.choice(["Road", "Rail", "Air", "Ship"]),
            "vehicle_number": f"VEH{fake.random_number(digits=6)}",
            "distance_km": random.randint(10, 1000),
            "value": round(random.uniform(50000, 500000), 2),
            "status": random.choice(["Generated", "Cancelled", "Expired"]),
            "created_by": fake.name(),
            "created_date": bill_date.isoformat(),
            "last_updated": (bill_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        bills.append(bill)
    return bills

# Generate Credit/Debit Notes
def generate_credit_debit_notes(num_records=200):
    notes = []
    for _ in range(num_records):
        note_date = fake.date_time_between(start_date="-1y", end_date="now")
        note = {
            "note_id": f"CDN{fake.random_number(digits=8)}",
            "note_date": note_date.isoformat(),
            "note_number": f"CDN{fake.random_number(digits=8)}",
            "invoice_id": f"INV{fake.random_number(digits=8)}",
            "customer_gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "note_type": random.choice(["Credit", "Debit"]),
            "reason": random.choice(["Rate Difference", "Quantity Difference", "Quality Issue", "Service Issue"]),
            "taxable_amount": round(random.uniform(1000, 10000), 2),
            "cgst_amount": round(random.uniform(50, 500), 2),
            "sgst_amount": round(random.uniform(50, 500), 2),
            "igst_amount": round(random.uniform(100, 1000), 2),
            "total_amount": round(random.uniform(1100, 11000), 2),
            "status": random.choice(["Draft", "Posted", "Cancelled"]),
            "created_by": fake.name(),
            "created_date": note_date.isoformat(),
            "last_updated": (note_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        notes.append(note)
    return notes

# Generate RCM Transactions
def generate_rcm_transactions(num_records=100):
    transactions = []
    for _ in range(num_records):
        trans_date = fake.date_time_between(start_date="-1y", end_date="now")
        transaction = {
            "rcm_id": f"RCM{fake.random_number(digits=8)}",
            "transaction_date": trans_date.isoformat(),
            "supplier_gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "invoice_number": f"INV{fake.random_number(digits=8)}",
            "invoice_date": trans_date.isoformat(),
            "hsn_code": f"{random.randint(1, 99):02d}{random.randint(1000, 9999)}",
            "taxable_amount": round(random.uniform(1000, 10000), 2),
            "cgst_amount": round(random.uniform(50, 500), 2),
            "sgst_amount": round(random.uniform(50, 500), 2),
            "igst_amount": round(random.uniform(100, 1000), 2),
            "total_amount": round(random.uniform(1100, 11000), 2),
            "status": random.choice(["Pending", "Paid", "Cancelled"]),
            "created_by": fake.name(),
            "created_date": trans_date.isoformat(),
            "last_updated": (trans_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        transactions.append(transaction)
    return transactions

# Generate GSTR-1 (Outward Supplies)
def generate_gstr1(num_records=12):
    returns = []
    for _ in range(num_records):
        return_date = fake.date_time_between(start_date="-1y", end_date="now")
        gstr1 = {
            "return_id": f"GSTR1{fake.random_number(digits=8)}",
            "return_period": return_date.strftime("%Y-%m"),
            "filing_date": return_date.isoformat(),
            "total_invoices": random.randint(100, 1000),
            "total_taxable_value": round(random.uniform(1000000, 10000000), 2),
            "total_cgst": round(random.uniform(50000, 500000), 2),
            "total_sgst": round(random.uniform(50000, 500000), 2),
            "total_igst": round(random.uniform(100000, 1000000), 2),
            "total_cess": round(random.uniform(10000, 100000), 2),
            "status": random.choice(["Draft", "Filed", "Amended"]),
            "filing_status": random.choice(["Pending", "Filed", "Late"]),
            "created_by": fake.name(),
            "created_date": return_date.isoformat(),
            "last_updated": (return_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        returns.append(gstr1)
    return returns

# Generate GSTR-3B (Monthly Summary)
def generate_gstr3b(num_records=12):
    returns = []
    for _ in range(num_records):
        return_date = fake.date_time_between(start_date="-1y", end_date="now")
        gstr3b = {
            "return_id": f"GSTR3B{fake.random_number(digits=8)}",
            "return_period": return_date.strftime("%Y-%m"),
            "filing_date": return_date.isoformat(),
            "outward_supplies": round(random.uniform(1000000, 10000000), 2),
            "inward_supplies": round(random.uniform(800000, 8000000), 2),
            "input_tax_credit": round(random.uniform(100000, 1000000), 2),
            "output_tax": round(random.uniform(150000, 1500000), 2),
            "net_tax": round(random.uniform(50000, 500000), 2),
            "status": random.choice(["Draft", "Filed", "Amended"]),
            "filing_status": random.choice(["Pending", "Filed", "Late"]),
            "created_by": fake.name(),
            "created_date": return_date.isoformat(),
            "last_updated": (return_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        returns.append(gstr3b)
    return returns

# Generate GSTR-2A (Auto-drafted Inward Supplies)
def generate_gstr2a(num_records=12):
    returns = []
    for _ in range(num_records):
        return_date = fake.date_time_between(start_date="-1y", end_date="now")
        gstr2a = {
            "return_id": f"GSTR2A{fake.random_number(digits=8)}",
            "return_period": return_date.strftime("%Y-%m"),
            "generation_date": return_date.isoformat(),
            "total_invoices": random.randint(50, 500),
            "total_taxable_value": round(random.uniform(800000, 8000000), 2),
            "total_cgst": round(random.uniform(40000, 400000), 2),
            "total_sgst": round(random.uniform(40000, 400000), 2),
            "total_igst": round(random.uniform(80000, 800000), 2),
            "total_cess": round(random.uniform(8000, 80000), 2),
            "status": random.choice(["Generated", "Reconciled", "Pending"]),
            "created_by": fake.name(),
            "created_date": return_date.isoformat(),
            "last_updated": (return_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        returns.append(gstr2a)
    return returns

# Generate GST Reconciliation Reports
def generate_gst_reconciliation(num_records=12):
    reports = []
    for _ in range(num_records):
        report_date = fake.date_time_between(start_date="-1y", end_date="now")
        report = {
            "report_id": f"REC{fake.random_number(digits=8)}",
            "report_period": report_date.strftime("%Y-%m"),
            "generation_date": report_date.isoformat(),
            "gstr1_value": round(random.uniform(1000000, 10000000), 2),
            "gstr3b_value": round(random.uniform(1000000, 10000000), 2),
            "gstr2a_value": round(random.uniform(800000, 8000000), 2),
            "difference_amount": round(random.uniform(-100000, 100000), 2),
            "reconciliation_status": random.choice(["Matched", "Unmatched", "Partially Matched"]),
            "created_by": fake.name(),
            "created_date": report_date.isoformat(),
            "last_updated": (report_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        reports.append(report)
    return reports

# Generate GST Audit Reports (GSTR-9, GSTR-9C)
def generate_gst_audit_reports(num_records=2):
    reports = []
    for _ in range(num_records):
        report_date = fake.date_time_between(start_date="-1y", end_date="now")
        report = {
            "report_id": f"GSTR9{fake.random_number(digits=8)}",
            "report_type": random.choice(["GSTR-9", "GSTR-9C"]),
            "financial_year": report_date.strftime("%Y"),
            "generation_date": report_date.isoformat(),
            "total_turnover": round(random.uniform(10000000, 100000000), 2),
            "total_tax_paid": round(random.uniform(1000000, 10000000), 2),
            "total_input_tax_credit": round(random.uniform(800000, 8000000), 2),
            "audit_status": random.choice(["Draft", "Final", "Filed"]),
            "auditor_name": fake.name(),
            "created_by": fake.name(),
            "created_date": report_date.isoformat(),
            "last_updated": (report_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        reports.append(report)
    return reports

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    hsn_codes = generate_hsn_codes()
    sac_codes = generate_sac_codes()
    gstin_records = generate_gstin_records()
    e_invoices = generate_e_invoices()
    e_way_bills = generate_e_way_bills()
    credit_debit_notes = generate_credit_debit_notes()
    rcm_transactions = generate_rcm_transactions()
    gstr1 = generate_gstr1()
    gstr3b = generate_gstr3b()
    gstr2a = generate_gstr2a()
    gst_reconciliation = generate_gst_reconciliation()
    gst_audit_reports = generate_gst_audit_reports()

    # Save datasets to JSON files
    datasets = {
        'hsn_codes.json': hsn_codes,
        'sac_codes.json': sac_codes,
        'gstin_records.json': gstin_records,
        'e_invoices.json': e_invoices,
        'e_way_bills.json': e_way_bills,
        'credit_debit_notes.json': credit_debit_notes,
        'rcm_transactions.json': rcm_transactions,
        'gstr1.json': gstr1,
        'gstr3b.json': gstr3b,
        'gstr2a.json': gstr2a,
        'gst_reconciliation.json': gst_reconciliation,
        'gst_audit_reports.json': gst_audit_reports
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All GST compliance datasets have been generated successfully in the 'data' folder!") 