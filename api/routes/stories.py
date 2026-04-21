from fastapi import APIRouter, HTTPException
from api.database import get_db
from api.models import UserStoryCreate, UserStoryUpdate, UserStoryAssign

router = APIRouter()

@router.get("/projects/{project_id}/stories", response_model=list[dict])
def get_user_stories(project_id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")

        cursor.execute("SELECT * FROM user_stories WHERE project_id = ? ORDER BY id DESC", (project_id,))
        return [dict(row) for row in cursor.fetchall()]

@router.post("/projects/{project_id}/stories", response_model=dict)
def create_user_story(project_id: int, story: UserStoryCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Project not found")

        cursor.execute(
            """INSERT INTO user_stories (project_id, sprint_id, as_a, i_want, so_that, priority, story_points) 
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (project_id, story.sprint_id, story.as_a, story.i_want, story.so_that, story.priority, story.story_points)
        )
        conn.commit()
        story_id = cursor.lastrowid
        cursor.execute("SELECT * FROM user_stories WHERE id = ?", (story_id,))
        return dict(cursor.fetchone())

@router.put("/stories/{id}", response_model=dict)
def update_user_story(id: int, story: UserStoryUpdate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_stories WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User story not found")
        
        fields = []
        values = []
        for key, value in story.dict(exclude_unset=True).items():
            fields.append(f"{key} = ?")
            values.append(value)
            
        if not fields:
            cursor.execute("SELECT * FROM user_stories WHERE id = ?", (id,))
            return dict(cursor.fetchone())
            
        query = f"UPDATE user_stories SET {', '.join(fields)} WHERE id = ?"
        values.append(id)
        
        cursor.execute(query, tuple(values))
        conn.commit()
        
        cursor.execute("SELECT * FROM user_stories WHERE id = ?", (id,))
        return dict(cursor.fetchone())

@router.delete("/stories/{id}")
def delete_user_story(id: int):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_stories WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User story not found")
            
        cursor.execute("DELETE FROM user_stories WHERE id = ?", (id,))
        conn.commit()
        return {"message": "User story deleted successfully"}

@router.patch("/stories/{id}/assign", response_model=dict)
def assign_user_story(id: int, assign: UserStoryAssign):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_stories WHERE id = ?", (id,))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="User story not found")
            
        cursor.execute("UPDATE user_stories SET sprint_id = ? WHERE id = ?", (assign.sprint_id, id))
        conn.commit()
        cursor.execute("SELECT * FROM user_stories WHERE id = ?", (id,))
        return dict(cursor.fetchone())
