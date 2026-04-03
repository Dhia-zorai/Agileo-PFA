from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# This is CRITICAL to allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Agileo API is Online", "sprint": 1}

@app.get("/projects")
def get_projects():
    # Placeholder for US1
    return [{"id": 1, "name": "Projet PFA", "status": "In Progress"}]