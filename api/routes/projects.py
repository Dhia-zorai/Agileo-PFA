from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Project, ProjectBase
from ..database import get_db_data, save_db_data
from datetime import datetime

router = APIRouter()

@router.get("/projects", response_model=List[Project])
def get_projects():
    db = get_db_data()
    return db.projects

@router.post("/projects", response_model=Project)
def create_project(project_in: ProjectBase):
    db = get_db_data()
    new_project = Project(**project_in.model_dump())
    db.projects.append(new_project)
    save_db_data(db)
    return new_project

@router.get("/projects/{project_id}", response_model=Project)
def get_project(project_id: str):
    db = get_db_data()
    for p in db.projects:
        if p.id == project_id:
            return p
    raise HTTPException(status_code=404, detail="Project not found")
