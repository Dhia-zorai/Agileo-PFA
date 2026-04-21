from fastapi import APIRouter, HTTPException
from api.database import get_db
from api.models import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter()

@router.get("/projects", response_model=list[dict])
def get_projects():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects ORDER BY id DESC")
        data = [dict(row) for row in cursor.fetchall()]
        return data

@router.get("/projects/{id}", response_model=dict)
def get_project(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Project not found")
        return dict(row)

@router.post("/projects", response_model=dict)
def create_project(project: ProjectCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO projects (name, description, status) VALUES (?, ?, ?)",
            (project.name, project.description, project.status)
        )
        conn.commit()
        project_id = cursor.lastrowid
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        return dict(cursor.fetchone())

@router.put("/projects/{id}", response_model=dict)
def update_project(id: int, project: ProjectUpdate):
    with get_db() as conn:
        cursor = conn.cursor()
        # Check exists
        cursor.execute("SELECT * FROM projects WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")
        
        # Build query
        fields = []
        values = []
        for key, value in project.dict(exclude_unset=True).items():
            fields.append(f"{key} = ?")
            values.append(value)
            
        if not fields:
            return get_project(id) # nothing to update
            
        query = f"UPDATE projects SET {', '.join(fields)} WHERE id = ?"
        values.append(id)
        
        cursor.execute(query, tuple(values))
        conn.commit()
        
        cursor.execute("SELECT * FROM projects WHERE id = ?", (id,))
        return dict(cursor.fetchone())

@router.delete("/projects/{id}")
def delete_project(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")
            
        cursor.execute("DELETE FROM projects WHERE id = ?", (id,))
        conn.commit()
        return {"message": "Project deleted successfully"}
