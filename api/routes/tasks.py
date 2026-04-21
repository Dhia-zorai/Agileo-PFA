from fastapi import APIRouter, HTTPException
from api.database import get_db
from api.models import TaskCreate, TaskUpdate, TaskStatusUpdate

router = APIRouter()

@router.get("/sprints/{sprint_id}/tasks", response_model=list[dict])
def get_tasks(sprint_id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (sprint_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Sprint not found")

        cursor.execute("SELECT * FROM tasks WHERE sprint_id = ? ORDER BY sort_order ASC, id DESC", (sprint_id,))
        return [dict(row) for row in cursor.fetchall()]

@router.post("/sprints/{sprint_id}/tasks", response_model=dict)
def create_task(sprint_id: int, task: TaskCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (sprint_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Sprint not found")

        cursor.execute(
            """INSERT INTO tasks (sprint_id, story_id, title, description, assignee) 
               VALUES (?, ?, ?, ?, ?)""",
            (sprint_id, task.story_id, task.title, task.description, task.assignee)
        )
        conn.commit()
        task_id = cursor.lastrowid
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
        return dict(cursor.fetchone())

@router.put("/tasks/{id}", response_model=dict)
def update_task(id: int, task: TaskUpdate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
        
        fields = []
        values = []
        for key, value in task.dict(exclude_unset=True).items():
            fields.append(f"{key} = ?")
            values.append(value)
            
        if not fields:
            cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
            return dict(cursor.fetchone())
            
        query = f"UPDATE tasks SET {', '.join(fields)} WHERE id = ?"
        values.append(id)
        
        cursor.execute(query, tuple(values))
        conn.commit()
        
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        return dict(cursor.fetchone())

@router.delete("/tasks/{id}")
def delete_task(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
            
        cursor.execute("DELETE FROM tasks WHERE id = ?", (id,))
        conn.commit()
        return {"message": "Task deleted successfully"}

@router.patch("/tasks/{id}/status", response_model=dict)
def update_task_status(id: int, status_update: TaskStatusUpdate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Task not found")
            
        cursor.execute("UPDATE tasks SET status = ? WHERE id = ?", (status_update.status, id))
        conn.commit()
        cursor.execute("SELECT * FROM tasks WHERE id = ?", (id,))
        return dict(cursor.fetchone())
