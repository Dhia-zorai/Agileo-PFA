from fastapi import APIRouter, HTTPException
from api.database import get_db
from api.models import SprintCreate, SprintUpdate, SprintStatusUpdate

router = APIRouter()

@router.get("/projects/{project_id}/sprints", response_model=list[dict])
def get_sprints(project_id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")

        cursor.execute("SELECT * FROM sprints WHERE project_id = ? ORDER BY id DESC", (project_id,))
        return [dict(row) for row in cursor.fetchall()]

@router.post("/projects/{project_id}/sprints", response_model=dict)
def create_sprint(project_id: int, sprint: SprintCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")

        cursor.execute(
            """INSERT INTO sprints (project_id, name, goal, start_date, end_date, capacity) 
               VALUES (?, ?, ?, ?, ?, ?)""",
            (project_id, sprint.name, sprint.goal, sprint.start_date, sprint.end_date, sprint.capacity)
        )
        conn.commit()
        sprint_id = cursor.lastrowid
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (sprint_id,))
        return dict(cursor.fetchone())

@router.put("/sprints/{id}", response_model=dict)
def update_sprint(id: int, sprint: SprintUpdate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Sprint not found")
        
        fields = []
        values = []
        for key, value in sprint.dict(exclude_unset=True).items():
            fields.append(f"{key} = ?")
            values.append(value)
            
        if not fields:
            cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
            return dict(cursor.fetchone())
            
        query = f"UPDATE sprints SET {', '.join(fields)} WHERE id = ?"
        values.append(id)
        
        cursor.execute(query, tuple(values))
        conn.commit()
        
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        return dict(cursor.fetchone())

@router.delete("/sprints/{id}")
def delete_sprint(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Sprint not found")
            
        cursor.execute("DELETE FROM sprints WHERE id = ?", (id,))
        conn.commit()
        return {"message": "Sprint deleted successfully"}

@router.patch("/sprints/{id}/start", response_model=dict)
def start_sprint(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Sprint not found")
            
        cursor.execute("UPDATE sprints SET status = 'ACTIVE' WHERE id = ?", (id,))
        conn.commit()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        return dict(cursor.fetchone())

@router.patch("/sprints/{id}/complete", response_model=dict)
def complete_sprint(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Sprint not found")
            
        cursor.execute("UPDATE sprints SET status = 'COMPLETED' WHERE id = ?", (id,))
        conn.commit()
        cursor.execute("SELECT * FROM sprints WHERE id = ?", (id,))
        return dict(cursor.fetchone())
