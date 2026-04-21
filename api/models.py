from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Base models
def generate_id():
    return str(uuid.uuid4())

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: str = "ACTIVE"

class Project(ProjectBase):
    id: str = Field(default_factory=generate_id)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SprintBase(BaseModel):
    project_id: str
    name: str
    goal: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    capacity: int = 0
    status: str = "PLANNED"

class Sprint(SprintBase):
    id: str = Field(default_factory=generate_id)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StoryBase(BaseModel):
    project_id: str
    sprint_id: Optional[str] = None
    as_a: str
    i_want: str
    so_that: str
    priority: str = "SHOULD"
    story_points: int = 1
    status: str = "BACKLOG"

class Story(StoryBase):
    id: str = Field(default_factory=generate_id)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TaskBase(BaseModel):
    sprint_id: str
    story_id: Optional[str] = None
    title: str
    description: Optional[str] = None
    status: str = "TODO" # TODO, IN_PROGRESS, REVIEW, DONE
    priority: str = "MEDIUM"
    order: float = 0.0 # Lexicographical order for DND sorting
    assignee: Optional[str] = None
    assignee_avatar: Optional[str] = None

class Task(TaskBase):
    id: str = Field(default_factory=generate_id)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SprintMetrics(BaseModel):
    velocity: int = 0
    completed_tasks: int = 0
    active_blockers: int = 0
    cycle_lead_time_days: float = 0.0

class DatabaseSchema(BaseModel):
    projects: List[Project] = []
    sprints: List[Sprint] = []
    stories: List[Story] = []
    tasks: List[Task] = []
