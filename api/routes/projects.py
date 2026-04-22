from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Project, ProjectBase, ProjectUpdate
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


@router.put("/projects/{project_id}", response_model=Project)
def update_project(project_id: str, payload: ProjectUpdate):
    db = get_db_data()
    for idx, project in enumerate(db.projects):
        if project.id == project_id:
            updates = payload.model_dump(exclude_unset=True)
            updates["updated_at"] = datetime.utcnow()
            updated = project.model_copy(update=updates)
            db.projects[idx] = updated
            save_db_data(db)
            return updated
    raise HTTPException(status_code=404, detail="Project not found")


@router.delete("/projects/{project_id}")
def delete_project(project_id: str):
    db = get_db_data()

    exists = any(p.id == project_id for p in db.projects)
    if not exists:
        raise HTTPException(status_code=404, detail="Project not found")

    sprint_ids = [s.id for s in db.sprints if s.project_id == project_id]
    story_ids = [s.id for s in db.stories if s.project_id == project_id]

    db.projects = [p for p in db.projects if p.id != project_id]
    db.sprints = [s for s in db.sprints if s.project_id != project_id]
    db.stories = [s for s in db.stories if s.project_id != project_id]
    db.tasks = [
        t
        for t in db.tasks
        if t.sprint_id not in sprint_ids and (not t.story_id or t.story_id not in story_ids)
    ]

    save_db_data(db)
    return {"message": "Project deleted"}
