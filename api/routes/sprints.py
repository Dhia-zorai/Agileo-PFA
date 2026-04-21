from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Sprint, SprintBase
from ..database import get_db_data, save_db_data

router = APIRouter()

@router.get("/projects/{project_id}/sprints", response_model=List[Sprint])
def get_sprints(project_id: str):
    db = get_db_data()
    return [s for s in db.sprints if s.project_id == project_id]

@router.post("/sprints", response_model=Sprint)
def create_sprint(sprint_in: SprintBase):
    db = get_db_data()
    new_sprint = Sprint(**sprint_in.model_dump())
    db.sprints.append(new_sprint)
    save_db_data(db)
    return new_sprint
