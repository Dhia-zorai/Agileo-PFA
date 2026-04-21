from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# Projects
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    status: Optional[str] = 'ACTIVE'

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    status: str
    created_at: str

# Sprints
class SprintCreate(BaseModel):
    name: str
    goal: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    capacity: Optional[int] = 0

class SprintUpdate(BaseModel):
    name: Optional[str] = None
    goal: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    capacity: Optional[int] = None
    status: Optional[str] = None

class SprintResponse(BaseModel):
    id: int
    project_id: int
    name: str
    goal: Optional[str]
    start_date: Optional[str]
    end_date: Optional[str]
    capacity: int
    status: str
    created_at: str

class SprintStatusUpdate(BaseModel):
    pass # Empty body for /start or /complete, but let's allow it
    
# User Stories
class UserStoryCreate(BaseModel):
    as_a: str
    i_want: str
    so_that: str
    priority: Optional[str] = 'SHOULD'
    story_points: Optional[int] = 1
    sprint_id: Optional[int] = None

class UserStoryUpdate(BaseModel):
    as_a: Optional[str] = None
    i_want: Optional[str] = None
    so_that: Optional[str] = None
    priority: Optional[str] = None
    story_points: Optional[int] = None
    status: Optional[str] = None

class UserStoryAssign(BaseModel):
    sprint_id: Optional[int]

class UserStoryResponse(BaseModel):
    id: int
    project_id: int
    sprint_id: Optional[int]
    as_a: str
    i_want: str
    so_that: str
    priority: str
    story_points: int
    status: str
    created_at: str

# Tasks
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    story_id: Optional[int] = None
    assignee: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    story_id: Optional[int] = None
    assignee: Optional[str] = None
    status: Optional[str] = None
    sort_order: Optional[int] = None

class TaskStatusUpdate(BaseModel):
    status: str # "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"

class TaskResponse(BaseModel):
    id: int
    sprint_id: int
    story_id: Optional[int]
    title: str
    description: Optional[str]
    assignee: Optional[str]
    status: str
    sort_order: int
    created_at: str
