import json
import os
import random
from datetime import datetime, timedelta

# Constants for data generation
MODULES = ['Sales', 'Purchase', 'Finance', 'Inventory', 'HR', 'GST']
GST_TYPES = ['CGST', 'SGST', 'IGST', 'UTGST']
TRANSACTION_TYPES = ['Invoice', 'Return', 'Payment', 'Credit Note', 'Debit Note', 'E-way Bill']
USER_ROLES = ['Sales Manager', 'Purchase Officer', 'Finance Executive', 'GST Officer', 'Inventory Manager']
CATEGORIES = ['Process', 'Report', 'Configuration', 'Compliance', 'Transaction', 'Analysis']

# Additional variables for realistic data
CUSTOMER_NAMES = ['ABC Ltd', 'XYZ Corp', 'PQR Industries', 'LMN Enterprises', 'RST Solutions']
VENDOR_NAMES = ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E']
BANKS = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank']
ITEMS = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E']
EMPLOYEES = ['Employee 1', 'Employee 2', 'Employee 3', 'Employee 4', 'Employee 5']

def generate_structured_query(module: str) -> dict:
    """Generate a structured business query with more variability"""
    templates = {
        'Sales': [
            "How do I generate a sales invoice for customer {customer}?",
            "What is the status of sales order {order_id}?",
            "How can I check the pending payments for {customer}?",
            "Can you provide the sales report for {period}?",
            "How do I process a return for invoice {invoice_id}?"
        ],
        'GST': [
            "How do I file GSTR-1 for period {period}?",
            "What is the ITC amount available for {period}?",
            "How can I generate e-way bill for invoice {invoice_id}?",
            "What are the GST filing deadlines for {period}?",
            "How do I reconcile GST mismatches for {period}?"
        ],
        'Finance': [
            "How do I reconcile bank statement for {bank}?",
            "What is the current outstanding amount for {vendor}?",
            "How can I generate financial reports for {period}?",
            "What is the status of payment for invoice {invoice_id}?",
            "How do I process a credit note for {vendor}?"
        ],
        'Inventory': [
            "What is the current stock level for item {item_id}?",
            "How do I issue stock for production order {order_id}?",
            "Can you provide the stock aging report for {period}?",
            "How do I transfer stock from {location1} to {location2}?",
            "What is the reorder level for item {item_id}?"
        ],
        'HR': [
            "How do I process payroll for {period}?",
            "What is the leave balance for employee {employee_id}?",
            "Can you generate the attendance report for {period}?",
            "How do I update employee details for {employee_id}?",
            "What is the status of recruitment for position {position_id}?"
        ]
    }
    
    # Fill in template variables
    query = random.choice(templates.get(module, ["How do I process {transaction} in {module}?"]))
    query = query.format(
        customer=random.choice(CUSTOMER_NAMES),
        order_id=f"SO-2024-{random.randint(1000,9999)}",
        period=f"{random.choice(['January', 'February', 'March'])} 2024",
        invoice_id=f"INV-2024-{random.randint(1000,9999)}",
        bank=random.choice(BANKS),
        vendor=random.choice(VENDOR_NAMES),
        item_id=f"ITEM-{random.randint(1000,9999)}",
        location1="Main Store",
        location2="Production Store",
        employee_id=f"EMP-{random.randint(1000,9999)}",
        position_id=f"POS-{random.randint(1000,9999)}",
        transaction=random.choice(TRANSACTION_TYPES),
        module=module
    )
    
    return {
        "question": query,
        "category": random.choice(CATEGORIES),
        "erp_module": module,
        "gst_type": random.choice(GST_TYPES) if module == "GST" else None,
        "transaction_type": random.choice(TRANSACTION_TYPES),
        "user_role": random.choice(USER_ROLES)
    }

def generate_structured_response(query: dict) -> str:
    """Generate a structured business response with more variability"""
    templates = {
        'Sales': [
            "Sales invoice {inv_id} has been generated for {customer}. Total amount: ₹{amount}",
            "Sales order {order_id} status: {status}. Expected delivery: {date}",
            "Pending payment for {customer}: ₹{amount}. Due date: {date}",
            "Sales report for {period} has been generated. Total sales: ₹{amount}",
            "Return processed for invoice {invoice_id}. Credit note {credit_note_id} issued."
        ],
        'GST': [
            "GSTR-1 for {period} has been filed successfully. ARN: {arn}",
            "Available ITC for {period}: ₹{amount}. Utilized: ₹{utilized}",
            "E-way bill {ewb_id} generated for invoice {invoice_id}. Valid till: {date}",
            "GST filing deadlines for {period}: GSTR-1 by {gstr1_date}, GSTR-3B by {gstr3b_date}",
            "GST mismatches for {period} have been reconciled. {count} discrepancies resolved."
        ],
        'Finance': [
            "Bank reconciliation completed for {bank}. {count} transactions matched",
            "Outstanding amount for {vendor}: ₹{amount}. Due date: {date}",
            "Financial reports for {period} have been generated and saved",
            "Payment status for invoice {invoice_id}: {status}. Amount: ₹{amount}",
            "Credit note {credit_note_id} processed for {vendor}. Amount: ₹{amount}"
        ],
        'Inventory': [
            "Current stock level for item {item_id}: {quantity} units",
            "Stock issued for production order {order_id}. Quantity: {quantity}",
            "Stock aging report for {period} has been generated. Total value: ₹{amount}",
            "Stock transferred from {location1} to {location2}. Quantity: {quantity}",
            "Reorder level for item {item_id}: {quantity} units"
        ],
        'HR': [
            "Payroll for {period} has been processed. Total amount: ₹{amount}",
            "Leave balance for employee {employee_id}: {leave_balance} days",
            "Attendance report for {period} has been generated. Total working days: {days}",
            "Employee details for {employee_id} have been updated successfully",
            "Recruitment status for position {position_id}: {status}"
        ]
    }
    
    # Fill in template variables
    response = random.choice(templates.get(query['erp_module'], 
                           ["Transaction processed successfully. Reference ID: {ref_id}"]))
    
    # Ensure all placeholders are provided with default values
    placeholder_values = {
        "inv_id": f"INV-2024-{random.randint(1000,9999)}",
        "customer": random.choice(CUSTOMER_NAMES),
        "amount": f"{random.randint(10000,1000000):,}",
        "order_id": f"SO-2024-{random.randint(1000,9999)}",
        "status": random.choice(["Pending", "Processed", "Completed", "On Hold"]),
        "date": (datetime.now() + timedelta(days=random.randint(1,30))).strftime("%d-%m-%Y"),
        "period": f"{random.choice(['January', 'February', 'March'])} 2024",
        "arn": f"AA240324{random.randint(1000000,9999999)}",
        "utilized": f"{random.randint(5000,500000):,}",
        "ewb_id": f"EWB{random.randint(10000000,99999999)}",
        "bank": random.choice(BANKS),
        "count": random.randint(50,500),
        "vendor": random.choice(VENDOR_NAMES),
        "ref_id": f"REF{random.randint(100000,999999)}",
        "credit_note_id": f"CN-2024-{random.randint(1000,9999)}",
        "item_id": f"ITEM-{random.randint(1000,9999)}",
        "quantity": random.randint(10,1000),
        "location1": "Main Store",
        "location2": "Production Store",
        "employee_id": f"EMP-{random.randint(1000,9999)}",
        "leave_balance": random.randint(0,30),
        "days": random.randint(20,30),
        "position_id": f"POS-{random.randint(1000,9999)}",
        "gstr1_date": (datetime.now() + timedelta(days=10)).strftime("%d-%m-%Y"),
        "gstr3b_date": (datetime.now() + timedelta(days=15)).strftime("%d-%m-%Y"),
        "invoice_id": f"INV-2024-{random.randint(1000,9999)}"  # Added missing placeholder
    }
    
    return response.format(**placeholder_values)

def generate_faq_dataset(num_records=200):
    """Generate FAQ dataset"""
    faqs = []
    for _ in range(num_records):
        module = random.choice(MODULES)
        query = generate_structured_query(module)
        faq = {
            "id": f"FAQ{_+1:04d}",
            "question": query["question"],
            "answer": generate_structured_response(query),
            "category": query["category"],
            "erp_module": query["erp_module"],
            "gst_type": query["gst_type"],
            "transaction_type": query["transaction_type"],
            "user_role": query["user_role"]
        }
        faqs.append(faq)
    return faqs

def generate_conversation_dataset(num_records=200):
    """Generate conversation dataset"""
    conversations = []
    for _ in range(num_records):
        module = random.choice(MODULES)
        initial_query = generate_structured_query(module)
        
        conversation = {
            "id": f"CONV{_+1:04d}",
            "module": module,
            "category": initial_query["category"],
            "user_role": initial_query["user_role"],
            "dialogue": [
                {
                    "turn": 1,
                    "query": initial_query["question"],
                    "response": generate_structured_response(initial_query),
                    "timestamp": datetime.now().isoformat()
                }
            ]
        }
        
        # Add follow-up exchanges
        for turn in range(2, random.randint(3, 5)):
            follow_up_query = generate_structured_query(module)
            conversation["dialogue"].append({
                "turn": turn,
                "query": follow_up_query["question"],
                "response": generate_structured_response(follow_up_query),
                "timestamp": (datetime.now() + timedelta(minutes=turn*5)).isoformat()
            })
        
        conversations.append(conversation)
    return conversations

def generate_all_datasets():
    """Generate all datasets"""
    datasets = {
        'faqs.json': generate_faq_dataset(200),
        'conversations.json': generate_conversation_dataset(200)
    }

    if not os.path.exists('data'):
        os.makedirs('data')

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    print("Starting data generation...")
    generate_all_datasets()
    print("All datasets have been generated successfully in the 'data' folder!")

    # import json
# from faker import Faker
# import random
# from datetime import datetime, timedelta
# import os
# import openai
# from typing import Optional

# # Initialize Faker
# fake = Faker()

# # OpenAI API Configuration

# # Create data directory if it doesn't exist
# if not os.path.exists('data'):
#     os.makedirs('data')

# # Define constants
# ERP_MODULES = [
#     "Sales", "Purchase", "Finance", "Inventory", "HR", "Production",
#     "Quality", "Dispatch", "GST", "Reports"
# ]

# USER_ROLES = [
#     "Sales Manager", "Purchase Officer", "Finance Executive", "Inventory Manager",
#     "HR Manager", "Production Manager", "Quality Manager", "Dispatch Manager",
#     "GST Executive", "System Admin"
# ]

# PERMISSIONS = [
#     "View", "Create", "Edit", "Delete", "Approve", "Reject",
#     "Export", "Import", "Print", "Share", "Admin"
# ]

# QUERY_CATEGORIES = [
#     "Status Check", "Report Generation", "Data Entry", "Process Flow",
#     "Configuration", "Troubleshooting", "Training", "Support"
# ]

# # Define domain-specific templates for different types of queries
# QUERY_TEMPLATES = {
#     "Sales": [
#         "How do I create a new sales order for {customer}?",
#         "What is the status of sales order {order_id}?",
#         "How can I generate a sales invoice for {customer}?",
#         "What are the pending sales orders for {customer}?",
#         "How do I process a sales return for order {order_id}?"
#     ],
#     "Purchase": [
#         "How do I create a purchase order for {supplier}?",
#         "What is the status of purchase order {order_id}?",
#         "How can I generate a purchase invoice for {supplier}?",
#         "What are the pending purchase orders for {supplier}?",
#         "How do I process a purchase return for order {order_id}?"
#     ],
#     "Finance": [
#         "How do I create a journal entry for {transaction_type}?",
#         "What is the balance of account {account_code}?",
#         "How can I generate a financial report for {period}?",
#         "What are the pending payments for {vendor}?",
#         "How do I process a bank reconciliation for {bank}?"
#     ],
#     "Inventory": [
#         "What is the current stock level of {item}?",
#         "How do I create a stock transfer from {location1} to {location2}?",
#         "What is the stock valuation report for {warehouse}?",
#         "How do I process a stock adjustment for {item}?",
#         "What are the low stock alerts for {category}?"
#     ],
#     "HR": [
#         "How do I process payroll for {department}?",
#         "What is the attendance record for {employee}?",
#         "How can I generate an employee report for {department}?",
#         "What are the pending leave requests for {department}?",
#         "How do I update employee details for {employee}?"
#     ],
#     "GST": [
#         "How do I generate a GST invoice for {customer}?",
#         "What is the GST return status for {period}?",
#         "How can I file GSTR-1 for {period}?",
#         "What are the pending GST payments for {period}?",
#         "How do I process a GST credit note for {invoice_id}?"
#     ]
# }

# # Define sample data for template filling
# SAMPLE_DATA = {
#     "customer": ["ABC Corp", "XYZ Ltd", "Global Industries", "Tech Solutions", "Smart Systems"],
#     "supplier": ["Raw Materials Inc", "Components Ltd", "Office Supplies Co", "IT Solutions", "Logistics Corp"],
#     "order_id": [f"ORD{fake.random_number(digits=6)}" for _ in range(10)],
#     "transaction_type": ["Sales", "Purchase", "Expense", "Income", "Transfer"],
#     "account_code": [f"ACC{fake.random_number(digits=4)}" for _ in range(10)],
#     "period": ["January 2024", "February 2024", "March 2024", "Q1 2024", "Q2 2024"],
#     "vendor": ["Vendor A", "Vendor B", "Vendor C", "Vendor D", "Vendor E"],
#     "bank": ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Bank"],
#     "item": ["Product A", "Product B", "Product C", "Product D", "Product E"],
#     "location1": ["Warehouse A", "Warehouse B", "Store A", "Store B", "Location X"],
#     "location2": ["Warehouse C", "Warehouse D", "Store C", "Store D", "Location Y"],
#     "warehouse": ["Main Warehouse", "Regional Warehouse", "Distribution Center", "Retail Store"],
#     "category": ["Electronics", "Furniture", "Office Supplies", "Raw Materials", "Finished Goods"],
#     "department": ["Sales", "Marketing", "IT", "HR", "Finance", "Operations"],
#     "employee": [f"EMP{fake.random_number(digits=4)}" for _ in range(10)],
#     "invoice_id": [f"INV{fake.random_number(digits=6)}" for _ in range(10)]
# }

# # Define response templates
# responses = {
#     "Sales": [
#         "The sales order has been created successfully. Order number: {order_id}",
#         "The sales invoice has been generated and sent to the customer.",
#         "The sales return has been processed and inventory has been updated.",
#         "Here are the pending sales orders for your review.",
#         "The order status has been updated to {status}."
#     ],
#     "Purchase": [
#         "The purchase order has been created successfully. Order number: {order_id}",
#         "The purchase invoice has been generated and sent to the supplier.",
#         "The purchase return has been processed and inventory has been updated.",
#         "Here are the pending purchase orders for your review.",
#         "The order status has been updated to {status}."
#     ],
#     "Finance": [
#         "The journal entry has been created successfully. Entry number: {entry_id}",
#         "The current balance for account {account_code} is {amount}.",
#         "The financial report has been generated and is ready for review.",
#         "Here are the pending payments that require your attention.",
#         "The bank reconciliation has been completed successfully."
#     ],
#     "Inventory": [
#         "The current stock level for {item} is {quantity} units.",
#         "The stock transfer has been processed successfully.",
#         "The stock valuation report has been generated for your review.",
#         "The stock adjustment has been processed and inventory has been updated.",
#         "Here are the items with low stock levels that require attention."
#     ],
#     "HR": [
#         "The payroll has been processed successfully for {department}.",
#         "The attendance record has been updated for {employee}.",
#         "The employee report has been generated and is ready for review.",
#         "Here are the pending leave requests that require your approval.",
#         "The employee details have been updated successfully."
#     ],
#     "GST": [
#         "The GST invoice has been generated successfully. Invoice number: {invoice_id}",
#         "The GST return status for {period} is {status}.",
#         "The GSTR-1 has been filed successfully for {period}.",
#         "Here are the pending GST payments that require your attention.",
#         "The GST credit note has been processed successfully."
#     ]
# }

# def generate_with_gpt(prompt: str, max_tokens: int = 100) -> Optional[str]:
#     """Generate text using OpenAI's GPT model"""
#     try:
#         response = openai.Completion.create(
#             engine="text-davinci-003",
#             prompt=prompt,
#             max_tokens=max_tokens,
#             temperature=0.7,
#             n=1,
#             stop=None
#         )
#         return response.choices[0].text.strip()
#     except Exception as e:
#         print(f"Error generating with GPT: {e}")
#         return None

# def generate_company_name() -> str:
#     """Generate a unique company name using GPT"""
#     prompt = "Generate a realistic company name for a business that could be a customer or supplier in an ERP system. Return only the name, nothing else."
#     return generate_with_gpt(prompt, max_tokens=30) or fake.company()

# def generate_product_name() -> str:
#     """Generate a unique product name using GPT"""
#     prompt = "Generate a realistic product name that could be sold or purchased in an ERP system. Return only the name, nothing else."
#     return generate_with_gpt(prompt, max_tokens=30) or fake.word()

# def generate_meaningful_query(module: str) -> str:
#     """Generate a meaningful query using GPT or templates"""
#     if not openai.api_key:
#         # Fallback to template-based generation if no API key
#         return generate_meaningful_query_template(module)
    
#     prompt = f"""Generate a realistic question that a user might ask about {module} in an ERP system.
#     The question should be specific and business-oriented.
#     Return only the question, nothing else."""
    
#     query = generate_with_gpt(prompt, max_tokens=100)
#     return query if query else generate_meaningful_query_template(module)

# def generate_meaningful_response(module: str, query: str) -> str:
#     """Generate a meaningful response using GPT or templates"""
#     if not openai.api_key:
#         # Fallback to template-based generation if no API key
#         return generate_meaningful_response_template(module)
    
#     prompt = f"""Given this question about {module} in an ERP system: "{query}"
#     Generate a realistic and helpful response that a system would provide.
#     The response should be specific and include relevant details.
#     Return only the response, nothing else."""
    
#     response = generate_with_gpt(prompt, max_tokens=150)
#     return response if response else generate_meaningful_response_template(module)

# def generate_meaningful_query_template(module: str) -> str:
#     """Fallback function for generating queries using templates"""
#     if module in QUERY_TEMPLATES:
#         template = random.choice(QUERY_TEMPLATES[module])
#         for key, value in SAMPLE_DATA.items():
#             if "{" + key + "}" in template:
#                 template = template.replace("{" + key + "}", random.choice(value))
#         return template
#     return fake.sentence(nb_words=10) + "?"

# def generate_meaningful_response_template(module: str) -> str:
#     """Fallback function for generating responses using templates"""
#     if module in responses:
#         response = random.choice(responses[module])
#         for key, value in SAMPLE_DATA.items():
#             if "{" + key + "}" in response:
#                 response = response.replace("{" + key + "}", random.choice(value))
#         return response
#     return fake.paragraph(nb_sentences=2)

# def generate_business_query(module: str) -> str:
#     """Generate a realistic business query using GPT"""
#     industry_context = """You are an ERP system user in a manufacturing company. 
#     Generate a realistic business question that an actual user would ask about their daily work."""
    
#     prompt = f"""Based on this context: {industry_context}
#     Generate a specific, realistic question about {module} that a business user would actually ask.
#     The question should reflect real business scenarios and use proper business terminology.
#     Example: For Sales - "How can I modify the payment terms for customer ABC Corp's pending order #ORD123456?"
#     For Finance - "Can I view the reconciliation status of our HDFC bank account for March 2024?"
#     Return only the question, nothing else."""
    
#     return generate_with_gpt(prompt, max_tokens=100) or generate_meaningful_query_template(module)

# def generate_business_response(module: str, query: str) -> str:
#     """Generate a realistic business response using GPT"""
#     business_context = """You are an ERP system providing accurate, professional responses to business users.
#     Responses should include specific details like reference numbers, amounts, dates, and status updates."""
    
#     prompt = f"""Based on this context: {business_context}
#     Given this business query about {module}: "{query}"
#     Generate a realistic, detailed business response that includes:
#     - Specific reference numbers (orders, invoices, etc.)
#     - Actual business metrics (amounts, quantities, dates)
#     - Clear status information
#     - Next steps or actions if applicable
#     Example: "Order #ORD123456 for ABC Corp has been modified. New payment terms: Net 30 days. Updated total amount: ₹45,000. Pending approval from Finance Manager."
#     Return only the response, nothing else."""
    
#     return generate_with_gpt(prompt, max_tokens=150) or generate_meaningful_response_template(module)

# def generate_company_profile() -> dict:
#     """Generate a realistic company profile using GPT"""
#     prompt = """Generate a realistic Indian company profile with the following details:
#     - Company name
#     - Industry type
#     - Annual revenue range
#     - Employee count
#     - Location
#     - Main products/services
#     Format as JSON. Make it realistic for an Indian business context."""
    
#     try:
#         response = generate_with_gpt(prompt, max_tokens=200)
#         return json.loads(response) if response else {}
#     except:
#         return {}

# def generate_business_data() -> dict:
#     """Generate realistic business data using GPT"""
#     prompt = """Generate realistic business data for an Indian company including:
#     - Product names with codes and categories
#     - Department names with employee counts
#     - Vendor names with categories
#     - Customer segments
#     - Location codes
#     - Bank account details (format: Bank - Branch - Account Type)
#     Format as JSON. Make it specific to Indian business context."""
    
#     try:
#         response = generate_with_gpt(prompt, max_tokens=300)
#         return json.loads(response) if response else {}
#     except:
#         return {}

# def update_sample_data():
#     """Update sample data with realistic business information"""
#     if not openai.api_key:
#         return
    
#     # Get company profile and business data
#     company_data = generate_company_profile()
#     business_data = generate_business_data()
    
#     # Update SAMPLE_DATA with realistic information
#     SAMPLE_DATA.update({
#         "customer": business_data.get("customers", SAMPLE_DATA["customer"]),
#         "supplier": business_data.get("vendors", SAMPLE_DATA["supplier"]),
#         "item": business_data.get("products", SAMPLE_DATA["item"]),
#         "department": business_data.get("departments", SAMPLE_DATA["department"]),
#         "bank": business_data.get("bank_accounts", SAMPLE_DATA["bank"]),
#         "location1": business_data.get("locations", SAMPLE_DATA["location1"]),
#         "warehouse": business_data.get("warehouses", SAMPLE_DATA["warehouse"]),
#         "category": business_data.get("categories", SAMPLE_DATA["category"])
#     })

# # Generate FAQs
# def generate_faqs(num_records=200):
#     faqs = []
#     for _ in range(num_records):
#         module = random.choice(ERP_MODULES)
#         query = generate_business_query(module)
#         faq = {
#             "faq_id": f"FAQ{fake.random_number(digits=6)}",
#             "question": query,
#             "answer": generate_business_response(module, query),
#             "category": random.choice(QUERY_CATEGORIES),
#             "erp_module": module,
#             "user_role": random.choice(USER_ROLES),
#             "keywords": generate_with_gpt(
#                 f"Generate 5 relevant business keywords for this question: {query}",
#                 max_tokens=50
#             ).split() if openai.api_key else [fake.word() for _ in range(random.randint(3, 6))],
#             "created_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
#             "last_updated": fake.date_time_between(start_date="-6m", end_date="now").isoformat()
#         }
#         faqs.append(faq)
#     return faqs

# # Generate Query Logs
# def generate_query_logs(num_records=1000):
#     logs = []
#     for _ in range(num_records):
#         module = random.choice(ERP_MODULES)
#         query_time = fake.date_time_between(start_date="-1y", end_date="now")
#         query = generate_meaningful_query(module)
#         log = {
#             "log_id": f"LOG{fake.random_number(digits=8)}",
#             "user_id": f"USR{fake.random_number(digits=6)}",
#             "user_role": random.choice(USER_ROLES),
#             "query": query,
#             "response": generate_meaningful_response(module, query),
#             "erp_module": module,
#             "category": random.choice(QUERY_CATEGORIES),
#             "query_time": query_time.isoformat(),
#             "response_time": (query_time + timedelta(seconds=random.randint(1, 30))).isoformat(),
#             "success": random.choice([True, False]),
#             "feedback": random.choice(["Positive", "Neutral", "Negative", None]),
#             "created_date": query_time.isoformat(),
#             "last_updated": (query_time + timedelta(days=random.randint(1, 5))).isoformat()
#         }
#         logs.append(log)
#     return logs

# # Generate Intent Recognition Data
# def generate_intent_data(num_records=500):
#     intents = []
#     for _ in range(num_records):
#         intent = {
#             "intent_id": f"INT{fake.random_number(digits=6)}",
#             "intent_name": random.choice([
#                 "Check Status", "Generate Report", "Create Record",
#                 "Update Record", "Delete Record", "View Details",
#                 "Process Transaction", "Configure Settings", "Request Support"
#             ]),
#             "example_queries": [
#                 fake.sentence(nb_words=8) + "?"
#                 for _ in range(random.randint(3, 6))
#             ],
#             "erp_module": random.choice(ERP_MODULES),
#             "user_role": random.choice(USER_ROLES),
#             "required_permissions": random.sample(PERMISSIONS, random.randint(1, 4)),
#             "created_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
#             "last_updated": fake.date_time_between(start_date="-6m", end_date="now").isoformat()
#         }
#         intents.append(intent)
#     return intents

# # Generate Contextual Data
# def generate_contextual_data(num_records=300):
#     contexts = []
#     for _ in range(num_records):
#         context = {
#             "context_id": f"CTX{fake.random_number(digits=6)}",
#             "session_id": f"SES{fake.random_number(digits=8)}",
#             "user_id": f"USR{fake.random_number(digits=6)}",
#             "user_role": random.choice(USER_ROLES),
#             "conversation_history": [
#                 {
#                     "timestamp": fake.date_time_between(start_date="-1h", end_date="now").isoformat(),
#                     "speaker": random.choice(["User", "System"]),
#                     "message": fake.sentence(nb_words=8) + "?"
#                 }
#                 for _ in range(random.randint(2, 5))
#             ],
#             "current_context": {
#                 "erp_module": random.choice(ERP_MODULES),
#                 "category": random.choice(QUERY_CATEGORIES),
#                 "reference_id": f"REF{fake.random_number(digits=8)}",
#                 "last_action": random.choice([
#                     "View", "Create", "Edit", "Delete", "Process", "Generate"
#                 ])
#             },
#             "created_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
#             "last_updated": fake.date_time_between(start_date="-1h", end_date="now").isoformat()
#         }
#         contexts.append(context)
#     return contexts

# # Generate Role-Based Access Control Data
# def generate_rbac_data(num_records=100):
#     rbac = []
#     for _ in range(num_records):
#         role = {
#             "role_id": f"ROL{fake.random_number(digits=4)}",
#             "role_name": random.choice(USER_ROLES),
#             "description": fake.text(max_nb_chars=200),
#             "module_permissions": [
#                 {
#                     "module": module,
#                     "permissions": random.sample(PERMISSIONS, random.randint(1, len(PERMISSIONS)))
#                 }
#                 for module in random.sample(ERP_MODULES, random.randint(1, len(ERP_MODULES)))
#             ],
#             "data_access_rules": [
#                 {
#                     "module": random.choice(ERP_MODULES),
#                     "access_level": random.choice(["Full", "Partial", "Read-only"]),
#                     "restrictions": random.sample([
#                         "Own Records Only", "Department Only", "Location Based",
#                         "Amount Based", "Time Based"
#                     ], random.randint(1, 3))
#                 }
#                 for _ in range(random.randint(1, 5))
#             ],
#             "is_active": random.choice([True, False]),
#             "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
#             "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
#         }
#         rbac.append(role)
#     return rbac

# # Generate Role-Specific Queries
# def generate_role_queries(num_records=500):
#     queries = []
#     for _ in range(num_records):
#         query = {
#             "query_id": f"QRY{fake.random_number(digits=6)}",
#             "user_role": random.choice(USER_ROLES),
#             "query_text": fake.sentence(nb_words=10) + "?",
#             "erp_module": random.choice(ERP_MODULES),
#             "category": random.choice(QUERY_CATEGORIES),
#             "required_permissions": random.sample(PERMISSIONS, random.randint(1, 4)),
#             "example_response": fake.paragraph(nb_sentences=2),
#             "created_date": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
#             "last_updated": fake.date_time_between(start_date="-6m", end_date="now").isoformat()
#         }
#         queries.append(query)
#     return queries

# # Update the main function to use GPT-generated content
# def generate_all_datasets():
#     # Update sample data with GPT-generated content
#     update_sample_data()
    
#     # Generate datasets
#     faqs = generate_faqs()
#     query_logs = generate_query_logs()
#     intent_data = generate_intent_data()
#     contextual_data = generate_contextual_data()
#     rbac_data = generate_rbac_data()
#     role_queries = generate_role_queries()

#     # Save datasets to JSON files
#     datasets = {
#         'faqs.json': faqs,
#         'query_logs.json': query_logs,
#         'intent_data.json': intent_data,
#         'contextual_data.json': contextual_data,
#         'rbac_data.json': rbac_data,
#         'role_queries.json': role_queries
#     }

#     for filename, data in datasets.items():
#         with open(os.path.join('data', filename), 'w') as f:
#             json.dump(data, f, indent=2)

# if __name__ == "__main__":
#     generate_all_datasets()
#     print("All user interaction and role-based access control datasets have been generated successfully in the 'data' folder!") 

