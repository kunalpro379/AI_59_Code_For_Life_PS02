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

# Generate Employee Records
def generate_employee_records(num_records=500):
    employees = []
    departments = ["HR", "Finance", "IT", "Sales", "Marketing", "Operations", "Production", "Quality", "R&D"]
    designations = ["Manager", "Senior Executive", "Executive", "Associate", "Trainee", "Director", "Head"]
    
    for _ in range(num_records):
        join_date = fake.date_time_between(start_date="-5y", end_date="now")
        employee = {
            "employee_id": f"EMP{fake.random_number(digits=6)}",
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "date_of_birth": fake.date_of_birth(minimum_age=18, maximum_age=60).isoformat(),
            "gender": random.choice(["Male", "Female", "Other"]),
            "address": fake.address(),
            "department": random.choice(departments),
            "designation": random.choice(designations),
            "join_date": join_date.isoformat(),
            "employment_type": random.choice(["Full Time", "Part Time", "Contract", "Temporary"]),
            "status": random.choice(["Active", "On Leave", "Terminated", "Resigned"]),
            "created_date": join_date.isoformat(),
            "last_updated": fake.date_time_between(start_date=join_date, end_date="now").isoformat()
        }
        employees.append(employee)
    return employees

# Generate Payroll Details
def generate_payroll_details(num_records=500):
    payrolls = []
    for _ in range(num_records):
        payroll_date = fake.date_time_between(start_date="-1y", end_date="now")
        basic_salary = round(random.uniform(20000, 100000), 2)
        hra = round(basic_salary * random.uniform(0.2, 0.4), 2)
        da = round(basic_salary * random.uniform(0.1, 0.2), 2)
        allowances = round(random.uniform(5000, 20000), 2)
        deductions = round(random.uniform(5000, 15000), 2)
        
        payroll = {
            "payroll_id": f"PAY{fake.random_number(digits=8)}",
            "employee_id": f"EMP{fake.random_number(digits=6)}",
            "payroll_date": payroll_date.isoformat(),
            "basic_salary": basic_salary,
            "hra": hra,
            "da": da,
            "allowances": allowances,
            "deductions": deductions,
            "net_salary": round(basic_salary + hra + da + allowances - deductions, 2),
            "payment_status": random.choice(["Pending", "Processed", "Paid", "Failed"]),
            "payment_mode": random.choice(["Bank Transfer", "Cheque", "Cash"]),
            "bank_account": fake.bban(),
            "created_date": payroll_date.isoformat(),
            "last_updated": (payroll_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        payrolls.append(payroll)
    return payrolls

# Generate Role-Based Permissions
def generate_role_permissions(num_records=20):
    roles = []
    permissions = [
        "View", "Create", "Edit", "Delete", "Approve", "Reject",
        "Export", "Import", "Print", "Share", "Admin"
    ]
    
    for _ in range(num_records):
        role = {
            "role_id": f"ROL{fake.random_number(digits=4)}",
            "role_name": random.choice([
                "Admin", "Manager", "Supervisor", "Employee", "HR Manager",
                "Finance Manager", "IT Admin", "Sales Manager", "Quality Manager"
            ]),
            "description": fake.text(max_nb_chars=200),
            "permissions": random.sample(permissions, random.randint(1, len(permissions))),
            "is_active": random.choice([True, False]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        roles.append(role)
    return roles

# Generate User Access Management
def generate_user_access(num_records=500):
    users = []
    for _ in range(num_records):
        user = {
            "user_id": f"USR{fake.random_number(digits=6)}",
            "employee_id": f"EMP{fake.random_number(digits=6)}",
            "username": fake.user_name(),
            "email": fake.email(),
            "role_id": f"ROL{fake.random_number(digits=4)}",
            "is_active": random.choice([True, False]),
            "last_login": fake.date_time_between(start_date="-1y", end_date="now").isoformat(),
            "password_hash": fake.sha256(),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        users.append(user)
    return users

# Generate Payroll Processing Records
def generate_payroll_processing(num_records=100):
    processes = []
    for _ in range(num_records):
        process_date = fake.date_time_between(start_date="-1y", end_date="now")
        process = {
            "process_id": f"PRC{fake.random_number(digits=8)}",
            "payroll_month": process_date.strftime("%Y-%m"),
            "process_date": process_date.isoformat(),
            "total_employees": random.randint(100, 500),
            "total_amount": round(random.uniform(5000000, 50000000), 2),
            "status": random.choice(["In Progress", "Completed", "Failed", "Cancelled"]),
            "processed_by": fake.name(),
            "created_date": process_date.isoformat(),
            "last_updated": (process_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        processes.append(process)
    return processes

# Generate Leave Management Records
def generate_leave_management(num_records=1000):
    leaves = []
    leave_types = ["Annual", "Sick", "Maternity", "Paternity", "Bereavement", "Unpaid", "Other"]
    
    for _ in range(num_records):
        start_date = fake.date_time_between(start_date="-1y", end_date="now")
        days = random.randint(1, 30)
        leave = {
            "leave_id": f"LEV{fake.random_number(digits=8)}",
            "employee_id": f"EMP{fake.random_number(digits=6)}",
            "leave_type": random.choice(leave_types),
            "start_date": start_date.isoformat(),
            "end_date": (start_date + timedelta(days=days)).isoformat(),
            "days": days,
            "reason": fake.text(max_nb_chars=200),
            "status": random.choice(["Pending", "Approved", "Rejected", "Cancelled"]),
            "approved_by": fake.name() if random.random() < 0.7 else None,
            "created_date": start_date.isoformat(),
            "last_updated": (start_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        leaves.append(leave)
    return leaves

# Generate Employee Attendance Records
def generate_employee_attendance(num_records=5000):
    attendance = []
    for _ in range(num_records):
        date = fake.date_time_between(start_date="-1y", end_date="now")
        check_in = date.replace(hour=random.randint(8, 10), minute=random.randint(0, 59))
        check_out = date.replace(hour=random.randint(17, 19), minute=random.randint(0, 59))
        
        record = {
            "attendance_id": f"ATT{fake.random_number(digits=8)}",
            "employee_id": f"EMP{fake.random_number(digits=6)}",
            "date": date.isoformat(),
            "check_in": check_in.isoformat(),
            "check_out": check_out.isoformat(),
            "status": random.choice(["Present", "Late", "Early Exit", "Half Day", "Absent"]),
            "remarks": fake.text(max_nb_chars=200) if random.random() < 0.3 else None,
            "created_date": date.isoformat(),
            "last_updated": (date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        attendance.append(record)
    return attendance

# Generate Payroll Reports
def generate_payroll_reports(num_records=100):
    reports = []
    for _ in range(num_records):
        report_date = fake.date_time_between(start_date="-1y", end_date="now")
        report = {
            "report_id": f"PRR{fake.random_number(digits=8)}",
            "report_type": random.choice([
                "Monthly Payroll", "Tax Summary", "Deduction Summary",
                "Allowance Summary", "Department-wise Summary"
            ]),
            "report_period": report_date.strftime("%Y-%m"),
            "total_employees": random.randint(100, 500),
            "total_salary": round(random.uniform(5000000, 50000000), 2),
            "total_deductions": round(random.uniform(500000, 5000000), 2),
            "net_payment": round(random.uniform(4500000, 45000000), 2),
            "created_by": fake.name(),
            "created_date": report_date.isoformat(),
            "last_updated": (report_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        reports.append(report)
    return reports

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    employee_records = generate_employee_records()
    payroll_details = generate_payroll_details()
    role_permissions = generate_role_permissions()
    user_access = generate_user_access()
    payroll_processing = generate_payroll_processing()
    leave_management = generate_leave_management()
    employee_attendance = generate_employee_attendance()
    payroll_reports = generate_payroll_reports()

    # Save datasets to JSON files
    datasets = {
        'employee_records.json': employee_records,
        'payroll_details.json': payroll_details,
        'role_permissions.json': role_permissions,
        'user_access.json': user_access,
        'payroll_processing.json': payroll_processing,
        'leave_management.json': leave_management,
        'employee_attendance.json': employee_attendance,
        'payroll_reports.json': payroll_reports
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All HR & Admin datasets have been generated successfully in the 'data' folder!") 