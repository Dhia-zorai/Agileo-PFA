from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Story, StoryBase
from ..database import get_db_data, save_db_data

router = APIRouter()

@router.get("/projects/{project_id}/stories", response_model=List[Story])
def get_stories(project_id: str):
    db = get_db_data()
    return [s for s in db.stories if s.project_id == project_id]

@router.post("/stories", response_model=Story)
def create_story(story_in: StoryBase):
    db = get_db_data()
    new_story = Story(**story_in.model_dump())
    db.stories.append(new_story)
    save_db_data(db)
    return new_story
