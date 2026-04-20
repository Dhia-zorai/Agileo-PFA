import os
import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Vercel Serverless Functions have read-only filesystems. Only /tmp is writable.
DB_PATH = "/tmp/agileo.db" if os.environ.get("VERCEL") else "agileo.db"

# 1. Create the App instance FIRST
app = FastAPI()

# 2. Add Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Database Logic
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT)")
    conn.commit()
    conn.close()

init_db()

class Project(BaseModel):
    name: str

# 4. Define Routes
@app.get("/api/")
def home():
    return {"message": "Agileo API is Online", "sprint": 1}

@app.get("/api/projects")
def get_projects():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects")
    data = cursor.fetchall()
    conn.close()
    return data

@app.post("/api/projects")
def create_project(project: Project):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO projects (name) VALUES (?)", (project.name,))
    conn.commit()
    conn.close()
    return {"message": "Project created"}
