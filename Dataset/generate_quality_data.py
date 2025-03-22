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

# Generate Inspection Checklists
def generate_inspection_checklists(num_records=100):
    checklists = []
    for _ in range(num_records):
        checklist = {
            "checklist_id": fake.uuid4(),
            "checklist_code": f"CHK{fake.random_number(digits=8)}",
            "checklist_name": fake.word() + " Inspection Checklist",
            "category": random.choice(["Raw Material", "In-Process", "Final Product", "Packaging"]),
            "description": fake.text(max_nb_chars=200),
            "checkpoints": [
                {
                    "point_id": fake.uuid4(),
                    "checkpoint_name": fake.word() + " Check",
                    "description": fake.text(max_nb_chars=100),
                    "acceptance_criteria": fake.text(max_nb_chars=100),
                    "measurement_unit": random.choice(["mm", "cm", "kg", "°C", "pH", "N/A"]),
                    "is_mandatory": random.choice([True, False])
                } for _ in range(random.randint(3, 8))
            ],
            "status": random.choice(["Active", "Inactive", "Under Review"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        checklists.append(checklist)
    return checklists

# Generate Standard Specifications
def generate_standard_specifications(num_records=200):
    specifications = []
    for _ in range(num_records):
        spec = {
            "specification_id": fake.uuid4(),
            "specification_code": f"SPEC{fake.random_number(digits=8)}",
            "specification_name": fake.word() + " Specification",
            "category": random.choice(["Physical", "Chemical", "Microbiological", "Visual"]),
            "description": fake.text(max_nb_chars=200),
            "parameters": [
                {
                    "parameter_id": fake.uuid4(),
                    "parameter_name": fake.word(),
                    "unit": random.choice(["mm", "cm", "kg", "°C", "pH", "N/A"]),
                    "min_value": round(random.uniform(0, 100), 2),
                    "max_value": round(random.uniform(100, 200), 2),
                    "target_value": round(random.uniform(50, 150), 2)
                } for _ in range(random.randint(2, 5))
            ],
            "status": random.choice(["Active", "Inactive", "Under Review"]),
            "created_date": fake.date_time_between(start_date="-2y", end_date="now").isoformat(),
            "last_updated": fake.date_time_between(start_date="-1y", end_date="now").isoformat()
        }
        specifications.append(spec)
    return specifications

# Generate Material Inspections (MRN)
def generate_material_inspections(num_records=1000):
    inspections = []
    for _ in range(num_records):
        inspection_date = fake.date_time_between(start_date="-1y", end_date="now")
        inspection = {
            "inspection_id": f"MRN{fake.random_number(digits=8)}",
            "material_code": f"RM{fake.random_number(digits=8)}",
            "batch_number": f"B{fake.random_number(digits=6)}",
            "inspection_date": inspection_date.isoformat(),
            "checklist_id": fake.uuid4(),  # This should match with inspection_checklists
            "specification_id": fake.uuid4(),  # This should match with standard_specifications
            "inspector_id": f"INS{fake.random_number(digits=6)}",
            "results": [
                {
                    "checkpoint_id": fake.uuid4(),
                    "measured_value": round(random.uniform(0, 200), 2),
                    "status": random.choice(["Pass", "Fail", "Marginal"]),
                    "remarks": fake.text(max_nb_chars=100)
                } for _ in range(random.randint(3, 8))
            ],
            "overall_status": random.choice(["Passed", "Failed", "Conditional Pass"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": inspection_date.isoformat(),
            "last_updated": (inspection_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        inspections.append(inspection)
    return inspections

# Generate PDIR Entries
def generate_pdir_entries(num_records=500):
    pdirs = []
    for _ in range(num_records):
        pdir_date = fake.date_time_between(start_date="-1y", end_date="now")
        pdir = {
            "pdir_id": f"PDIR{fake.random_number(digits=8)}",
            "product_code": f"PRD{fake.random_number(digits=8)}",
            "batch_number": f"B{fake.random_number(digits=6)}",
            "inspection_date": pdir_date.isoformat(),
            "checklist_id": fake.uuid4(),  # This should match with inspection_checklists
            "specification_id": fake.uuid4(),  # This should match with standard_specifications
            "inspector_id": f"INS{fake.random_number(digits=6)}",
            "results": [
                {
                    "checkpoint_id": fake.uuid4(),
                    "measured_value": round(random.uniform(0, 200), 2),
                    "status": random.choice(["Pass", "Fail", "Marginal"]),
                    "remarks": fake.text(max_nb_chars=100)
                } for _ in range(random.randint(3, 8))
            ],
            "overall_status": random.choice(["Passed", "Failed", "Conditional Pass"]),
            "remarks": fake.text(max_nb_chars=200),
            "created_by": fake.name(),
            "created_date": pdir_date.isoformat(),
            "last_updated": (pdir_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        pdirs.append(pdir)
    return pdirs

# Generate Batch Release Records
def generate_batch_releases(num_records=1000):
    releases = []
    for _ in range(num_records):
        release_date = fake.date_time_between(start_date="-1y", end_date="now")
        release = {
            "release_id": f"REL{fake.random_number(digits=8)}",
            "batch_id": f"BCH{fake.random_number(digits=8)}",
            "product_code": f"PRD{fake.random_number(digits=8)}",
            "release_date": release_date.isoformat(),
            "quality_status": random.choice(["Released", "On Hold", "Rejected"]),
            "release_type": random.choice(["Full", "Conditional", "Rejected"]),
            "conditions": [
                {
                    "condition_id": fake.uuid4(),
                    "description": fake.text(max_nb_chars=100),
                    "status": random.choice(["Met", "Not Met", "Pending"])
                } for _ in range(random.randint(1, 3))
            ],
            "approved_by": fake.name(),
            "remarks": fake.text(max_nb_chars=200),
            "created_date": release_date.isoformat(),
            "last_updated": (release_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        releases.append(release)
    return releases

# Generate Material Re-validation Records
def generate_material_revalidation(num_records=200):
    revalidations = []
    for _ in range(num_records):
        reval_date = fake.date_time_between(start_date="-1y", end_date="now")
        reval = {
            "revalidation_id": f"REV{fake.random_number(digits=8)}",
            "material_code": f"RM{fake.random_number(digits=8)}",
            "batch_number": f"B{fake.random_number(digits=6)}",
            "revalidation_date": reval_date.isoformat(),
            "reason": random.choice(["Storage Extension", "Temperature Deviation", "Customer Request", "Regulatory Requirement"]),
            "test_results": [
                {
                    "parameter_id": fake.uuid4(),
                    "measured_value": round(random.uniform(0, 200), 2),
                    "status": random.choice(["Pass", "Fail", "Marginal"]),
                    "remarks": fake.text(max_nb_chars=100)
                } for _ in range(random.randint(2, 5))
            ],
            "overall_status": random.choice(["Passed", "Failed", "Conditional Pass"]),
            "valid_until": (reval_date + timedelta(days=random.randint(30, 365))).isoformat(),
            "approved_by": fake.name(),
            "remarks": fake.text(max_nb_chars=200),
            "created_date": reval_date.isoformat(),
            "last_updated": (reval_date + timedelta(days=random.randint(1, 5))).isoformat()
        }
        revalidations.append(reval)
    return revalidations

# Generate and save all datasets
def generate_all_datasets():
    # Generate datasets
    inspection_checklists = generate_inspection_checklists()
    standard_specifications = generate_standard_specifications()
    material_inspections = generate_material_inspections()
    pdir_entries = generate_pdir_entries()
    batch_releases = generate_batch_releases()
    material_revalidation = generate_material_revalidation()

    # Save datasets to JSON files
    datasets = {
        'inspection_checklists.json': inspection_checklists,
        'standard_specifications.json': standard_specifications,
        'material_inspections.json': material_inspections,
        'pdir_entries.json': pdir_entries,
        'batch_releases.json': batch_releases,
        'material_revalidation.json': material_revalidation
    }

    for filename, data in datasets.items():
        with open(os.path.join('data', filename), 'w') as f:
            json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_all_datasets()
    print("All quality module datasets have been generated successfully in the 'data' folder!") 