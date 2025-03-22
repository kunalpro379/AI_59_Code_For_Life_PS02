import json
from faker import Faker
from datetime import datetime, timedelta
import random
import uuid

fake = Faker()

def generate_pdir_entries(existing_file, count=100):
    # Load existing data to match patterns
    with open(existing_file) as f:
        data = json.load(f)
    
    # Extract existing patterns
    product_codes = {entry['product_code'] for entry in data}
    batch_numbers = {entry['batch_number'] for entry in data}
    
    new_entries = []
    for _ in range(count):
        entry = {
            "pdir_id": f"PDIR{fake.random_number(digits=8)}",
            "product_code": random.choice(list(product_codes)),
            "batch_number": random.choice(list(batch_numbers)),
            "inspection_date": (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat(),
            "checklist_id": str(uuid.uuid4()),
            "specification_id": str(uuid.uuid4()),
            "inspector_id": f"INS{fake.random_number(digits=6)}",
            "results": [
                {
                    "checkpoint_id": str(uuid.uuid4()),
                    "measured_value": round(random.uniform(1, 200), 2),
                    "status": random.choice(["Pass", "Fail", "Marginal"]),
                    "remarks": fake.sentence()
                } for _ in range(random.randint(2, 5))
            ],
            "overall_status": random.choice(["Passed", "Failed"]),
            "remarks": fake.paragraph(),
            "created_by": fake.name(),
            "created_date": (datetime.now() - timedelta(days=random.randint(1, 30))).isoformat(),
            "last_updated": datetime.now().isoformat()
        }
        new_entries.append(entry)
    
    # Append to existing file
    data.extend(new_entries)
    with open(existing_file, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    generate_pdir_entries(
        existing_file="e:/Hackathon/PS2/AI_59_Code_For_Life_PS02/Dataset/data/pdir_entries.json",
        count=150
    )
    print("Generated 150 additional PDIR entries")