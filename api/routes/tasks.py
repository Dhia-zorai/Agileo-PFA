from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from ..models import Task, TaskBase, SprintMetrics
from ..database import get_db_data, save_db_data
from datetime import datetime

router = APIRouter()

@router.get("/sprints/{sprint_id}/tasks", response_model=List[Task])
def get_tasks(sprint_id: str):
    db = get_db_data()
    tasks = [t for t in db.tasks if t.sprint_id == sprint_id]
    return sorted(tasks, key=lambda x: x.order)

@router.post("/tasks", response_model=Task)
def create_task(task_in: TaskBase):
    db = get_db_data()
    new_task = Task(**task_in.model_dump())
    db.tasks.append(new_task)
    save_db_data(db)
    return new_task

@router.patch("/tasks/{task_id}", response_model=Task)
def update_task_status_and_order(task_id: str, update_data: Dict[str, Any]):
    db = get_db_data()
    for task in db.tasks:
        if task.id == task_id:
            if "status" in update_data:
                task.status = update_data["status"]
            if "order" in update_data:
                task.order = update_data["order"]
            task.updated_at = datetime.utcnow()
            save_db_data(db)
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@router.get("/metrics/dashboard", response_model=SprintMetrics)
def get_dashboard_metrics():
    db = get_db_data()
    completed = sum(1 for t in db.tasks if t.status == "DONE")
    blockers = sum(1 for t in db.tasks if t.priority == "HIGH" and t.status != "DONE")
    
    return SprintMetrics(
        velocity=completed * 3, 
        completed_tasks=completed,
        active_blockers=blockers,
        cycle_lead_time_days=2.4
    )
