from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Story, StoryCreate, StoryUpdate
from ..database import get_db_data, save_db_data

router = APIRouter()

@router.get("/projects/{project_id}/stories", response_model=List[Story])
def get_stories(project_id: str):
    db = get_db_data()
    return [s for s in db.stories if s.project_id == project_id]

@router.post("/projects/{project_id}/stories", response_model=Story)
def create_story(project_id: str, story_in: StoryCreate):
    db = get_db_data()
    payload = story_in.model_dump()
    payload["project_id"] = project_id
    new_story = Story(**payload)
    db.stories.append(new_story)
    save_db_data(db)
    return new_story


@router.put("/stories/{story_id}", response_model=Story)
def update_story(story_id: str, story_in: StoryUpdate):
    db = get_db_data()
    for idx, story in enumerate(db.stories):
        if story.id == story_id:
            updates = story_in.model_dump(exclude_unset=True)
            updated = story.model_copy(update=updates)
            db.stories[idx] = updated
            save_db_data(db)
            return updated
    raise HTTPException(status_code=404, detail="Story not found")


@router.patch("/stories/{story_id}/assign", response_model=Story)
def assign_story(story_id: str, payload: StoryUpdate):
    db = get_db_data()
    for idx, story in enumerate(db.stories):
        if story.id == story_id:
            updated = story.model_copy(update={"sprint_id": payload.sprint_id})
            db.stories[idx] = updated
            save_db_data(db)
            return updated
    raise HTTPException(status_code=404, detail="Story not found")


@router.delete("/stories/{story_id}")
def delete_story(story_id: str):
    db = get_db_data()
    exists = any(s.id == story_id for s in db.stories)
    if not exists:
        raise HTTPException(status_code=404, detail="Story not found")
    db.stories = [s for s in db.stories if s.id != story_id]
    db.tasks = [t for t in db.tasks if t.story_id != story_id]
    save_db_data(db)
    return {"message": "Story deleted"}
