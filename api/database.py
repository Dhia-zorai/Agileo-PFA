import json
import os
from .models import DatabaseSchema

DB_FILE = "/tmp/agileo_db.json" if os.environ.get("VERCEL") else "agileo_db.json"

def get_db_data() -> DatabaseSchema:
    if not os.path.exists(DB_FILE):
        return DatabaseSchema()
    try:
        with open(DB_FILE, "r") as f:
            data = json.load(f)
            return DatabaseSchema(**data)
    except (json.JSONDecodeError, FileNotFoundError):
        return DatabaseSchema()

def save_db_data(data: DatabaseSchema):
    with open(DB_FILE, "w") as f:
        f.write(data.model_dump_json())
