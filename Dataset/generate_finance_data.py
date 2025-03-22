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

# Generate Ledger Accounts
def generate_ledger_accounts(num_records=500):
    accounts = []
    account_types = ["Asset", "Liability", "Income", "Expense", "Equity"]
    for _ in range(num_records):
        account = {
            "account_id": fake.uuid4(),
            "account_code": f"ACC{fake.random_number(digits=6)}",
            "account_name": fake.company(),
            "account_type": random.choice(account_types),
            "parent_account": f"ACC{fake.random_number(digits=6)}" if random.random() < 0.3 else None,
            "description": fake.text(max_nb_chars=200),
            "is_active": random.choice([True, False]),
            "opening_balance": round(random.uniform(-1000000, 1000000), 2),
            "current_balance": round(random.uniform(-1000000, 1000000), 2),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        accounts.append(account)
    return accounts

# Generate GST Configurations
def generate_gst_configurations(num_records=50):
    configs = []
    for _ in range(num_records):
        config = {
            "config_id": fake.uuid4(),
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
        configs.append(config)
    return configs

# Generate Payment Terms
def generate_payment_terms(num_records=20):
    terms = []
    for _ in range(num_records):
        term = {
            "term_id": fake.uuid4(),
            "term_code": f"PT{fake.random_number(digits=4)}",
            "term_name": random.choice(["Immediate", "Net 15", "Net 30", "Net 45", "Net 60", "Net 90"]),
            "days": random.choice([0, 15, 30, 45, 60, 90]),
            "description": fake.text(max_nb_chars=200),
            "is_active": random.choice([True, False]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        terms.append(term)
    return terms

# Generate Tax Codes
def generate_tax_codes(num_records=30):
    codes = []
    for _ in range(num_records):
        code = {
            "code_id": fake.uuid4(),
            "tax_code": f"TAX{fake.random_number(digits=4)}",
            "tax_name": random.choice(["VAT", "CST", "Service Tax", "Excise", "Customs"]),
            "rate": round(random.uniform(0, 28), 2),
            "description": fake.text(max_nb_chars=200),
            "is_active": random.choice([True, False]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        codes.append(code)
    return codes

# Generate Payment Processing Records
def generate_payment_processing(num_records=1000):
    payments = []
    for _ in range(num_records):
        payment_date = fake.date_time_between(start_date="-1y", end_date="now")
        payment = {
            "payment_id": f"PAY{fake.random_number(digits=8)}",
            "reference_id": f"REF{fake.random_number(digits=8)}",
            "payment_date": payment_date.isoformat(),
            "amount": round(random.uniform(1000, 100000), 2),
            "payment_mode": random.choice(["Cash", "Bank Transfer", "Cheque", "Credit Card", "UPI"]),
            "payment_type": random.choice(["Advance", "Regular", "Final", "Refund"]),
            "account_id": f"ACC{fake.random_number(digits=6)}",
            "status": random.choice(["Pending", "Completed", "Failed", "Cancelled"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": payment_date.isoformat(),
            "last_updated": (payment_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        payments.append(payment)
    return payments

# Generate Journal Entries
def generate_journal_entries(num_records=1000):
    entries = []
    for _ in range(num_records):
        entry_date = fake.date_time_between(start_date="-1y", end_date="now")
        entry = {
            "entry_id": f"JRN{fake.random_number(digits=8)}",
            "entry_date": entry_date.isoformat(),
            "reference": f"REF{fake.random_number(digits=8)}",
            "description": fake.text(max_nb_chars=200),
            "entries": [
                {
                    "account_id": f"ACC{fake.random_number(digits=6)}",
                    "debit_amount": round(random.uniform(0, 100000), 2),
                    "credit_amount": 0,
                    "description": fake.text(max_nb_chars=100)
                },
                {
                    "account_id": f"ACC{fake.random_number(digits=6)}",
                    "debit_amount": 0,
                    "credit_amount": round(random.uniform(0, 100000), 2),
                    "description": fake.text(max_nb_chars=100)
                }
            ],
            "total_debit": round(random.uniform(1000, 100000), 2),
            "total_credit": round(random.uniform(1000, 100000), 2),
            "status": random.choice(["Draft", "Posted", "Void"]),
            "created_by": fake.name(),
            "created_date": entry_date.isoformat(),
            "last_updated": (entry_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        entries.append(entry)
    return entries

# Generate GST Invoices
def generate_gst_invoices(num_records=1000):
    invoices = []
    for _ in range(num_records):
        invoice_date = fake.date_time_between(start_date="-1y", end_date="now")
        invoice = {
            "invoice_id": f"GST{fake.random_number(digits=8)}",
            "invoice_date": invoice_date.isoformat(),
            "invoice_number": f"INV{fake.random_number(digits=8)}",
            "customer_gstin": f"{random.randint(1, 37):02d}{fake.random_number(digits=10)}Z{fake.random_number(digits=1)}",
            "hsn_code": f"{random.randint(1, 99):02d}{random.randint(1000, 9999)}",
            "taxable_amount": round(random.uniform(1000, 100000), 2),
            "cgst_amount": round(random.uniform(50, 5000), 2),
            "sgst_amount": round(random.uniform(50, 5000), 2),
            "igst_amount": round(random.uniform(100, 10000), 2),
            "total_amount": round(random.uniform(1100, 110000), 2),
            "status": random.choice(["Draft", "Posted", "Cancelled"]),
            "created_by": fake.name(),
            "created_date": invoice_date.isoformat(),
            "last_updated": (invoice_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        invoices.append(invoice)
    return invoices

# Generate GST Return Filing Records
def generate_gst_returns(num_records=100):
    returns = []
    for _ in range(num_records):
        return_date = fake.date_time_between(start_date="-1y", end_date="now")
        gst_return = {
            "return_id": f"GST{fake.random_number(digits=8)}",
            "return_type": random.choice(["GSTR-1", "GSTR-3B"]),
            "return_period": return_date.strftime("%Y-%m"),
            "filing_date": return_date.isoformat(),
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
        returns.append(gst_return)
    return returns

# Generate Ledger Balance Reports
def generate_ledger_balance_reports(num_records=200):
    reports = []
    for _ in range(num_records):
        report_date = fake.date_time_between(start_date="-1y", end_date="now")
        report = {
            "report_id": f"LBR{fake.random_number(digits=8)}",
            "account_id": f"ACC{fake.random_number(digits=6)}",
            "report_date": report_date.isoformat(),
            "opening_balance": round(random.uniform(-1000000, 1000000), 2),
            "debit_total": round(random.uniform(0, 1000000), 2),
            "credit_total": round(random.uniform(0, 1000000), 2),
            "closing_balance": round(random.uniform(-1000000, 1000000), 2),
            "created_by": fake.name(),
            "created_date": report_date.isoformat(),
            "last_updated": (report_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        reports.append(report)
    return reports

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    ledger_accounts = generate_ledger_accounts()
    gst_configurations = generate_gst_configurations()
    payment_terms = generate_payment_terms()
    tax_codes = generate_tax_codes()
    payment_processing = generate_payment_processing()
    journal_entries = generate_journal_entries()
    gst_invoices = generate_gst_invoices()
    gst_returns = generate_gst_returns()
    ledger_balance_reports = generate_ledger_balance_reports()

    # Save datasets to JSON files
    datasets = {
        'ledger_accounts.json': ledger_accounts,
        'gst_configurations.json': gst_configurations,
        'payment_terms.json': payment_terms,
        'tax_codes.json': tax_codes,
        'payment_processing.json': payment_processing,
        'journal_entries.json': journal_entries,
        'gst_invoices.json': gst_invoices,
        'gst_returns.json': gst_returns,
        'ledger_balance_reports.json': ledger_balance_reports
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All Finance & Accounts datasets have been generated successfully in the 'data' folder!") 