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


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class SprintBase(BaseModel):
    project_id: str
    name: str
    goal: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    capacity: int = 0
    status: str = "PLANNING"


class SprintCreate(BaseModel):
    name: str
    goal: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    capacity: int = 0


class SprintUpdate(BaseModel):
    name: Optional[str] = None
    goal: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    capacity: Optional[int] = None
    status: Optional[str] = None

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


class StoryCreate(BaseModel):
    sprint_id: Optional[str] = None
    as_a: str
    i_want: str
    so_that: str
    priority: str = "SHOULD"
    story_points: int = 1
    status: str = "BACKLOG"


class StoryUpdate(BaseModel):
    sprint_id: Optional[str] = None
    as_a: Optional[str] = None
    i_want: Optional[str] = None
    so_that: Optional[str] = None
    priority: Optional[str] = None
    story_points: Optional[int] = None
    status: Optional[str] = None

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


class TaskCreate(BaseModel):
    story_id: Optional[str] = None
    title: str
    description: Optional[str] = None
    status: str = "TODO"
    priority: str = "MEDIUM"
    order: float = 0.0
    assignee: Optional[str] = None
    assignee_avatar: Optional[str] = None


class TaskUpdate(BaseModel):
    story_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    order: Optional[float] = None
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
    projects: List[Project] = Field(default_factory=list)
    sprints: List[Sprint] = Field(default_factory=list)
    stories: List[Story] = Field(default_factory=list)
    tasks: List[Task] = Field(default_factory=list)
