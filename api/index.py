from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import projects, sprints, stories, tasks

app = FastAPI(title="Agileo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router, prefix="/api", tags=["Projects"])
app.include_router(sprints.router, prefix="/api", tags=["Sprints"])
app.include_router(stories.router, prefix="/api", tags=["User Stories"])
app.include_router(tasks.router, prefix="/api", tags=["Tasks"])

@app.get("/api/")
def home():
    return {"message": "Agileo API is Online", "sprint": 1}

# Keep root for vercel generic routing if it hits it
@app.get("/")
def home_root():
    return {"message": "Agileo API is Online", "sprint": 1}
