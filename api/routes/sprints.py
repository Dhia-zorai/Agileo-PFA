from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Sprint, SprintCreate, SprintUpdate
from ..database import get_db_data, save_db_data

router = APIRouter()

@router.get("/projects/{project_id}/sprints", response_model=List[Sprint])
def get_sprints(project_id: str):
    db = get_db_data()
    return [s for s in db.sprints if s.project_id == project_id]


@router.post("/projects/{project_id}/sprints", response_model=Sprint)
def create_sprint(project_id: str, sprint_in: SprintCreate):
    db = get_db_data()
    payload = sprint_in.model_dump()
    payload["project_id"] = project_id
    new_sprint = Sprint(**payload)
    db.sprints.append(new_sprint)
    save_db_data(db)
    return new_sprint


@router.put("/sprints/{sprint_id}", response_model=Sprint)
def update_sprint(sprint_id: str, sprint_in: SprintUpdate):
    db = get_db_data()
    for idx, sprint in enumerate(db.sprints):
        if sprint.id == sprint_id:
            payload = sprint_in.model_dump(exclude_unset=True)
            updated = sprint.model_copy(update=payload)
            db.sprints[idx] = updated
            save_db_data(db)
            return updated
    raise HTTPException(status_code=404, detail="Sprint not found")


@router.delete("/sprints/{sprint_id}")
def delete_sprint(sprint_id: str):
    db = get_db_data()
    exists = any(s.id == sprint_id for s in db.sprints)
    if not exists:
        raise HTTPException(status_code=404, detail="Sprint not found")

    db.sprints = [s for s in db.sprints if s.id != sprint_id]
    db.stories = [s for s in db.stories if s.sprint_id != sprint_id]
    db.tasks = [t for t in db.tasks if t.sprint_id != sprint_id]
    save_db_data(db)
    return {"message": "Sprint deleted"}


@router.patch("/sprints/{sprint_id}/start", response_model=Sprint)
def start_sprint(sprint_id: str):
    db = get_db_data()
    target = None

    for idx, sprint in enumerate(db.sprints):
        if sprint.id == sprint_id:
            target = idx
            break

    if target is None:
        raise HTTPException(status_code=404, detail="Sprint not found")

    project_id = db.sprints[target].project_id
    db.sprints = [
        s.model_copy(update={"status": "COMPLETED"}) if s.project_id == project_id and s.status == "ACTIVE" else s
        for s in db.sprints
    ]
    updated = db.sprints[target].model_copy(update={"status": "ACTIVE"})
    db.sprints[target] = updated
    save_db_data(db)
    return updated


@router.patch("/sprints/{sprint_id}/complete", response_model=Sprint)
def complete_sprint(sprint_id: str):
    db = get_db_data()
    for idx, sprint in enumerate(db.sprints):
        if sprint.id == sprint_id:
            updated = sprint.model_copy(update={"status": "COMPLETED"})
            db.sprints[idx] = updated
            save_db_data(db)
            return updated
    raise HTTPException(status_code=404, detail="Sprint not found")
