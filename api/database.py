import sqlite3
import os
from contextlib import contextmanager

# Vercel Serverless Functions have read-only filesystems. Only /tmp is writable.
DB_PATH = "/tmp/agileo.db" if os.environ.get("VERCEL") else "agileo.db"

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    # Return rows as dictionary-like objects
    conn.row_factory = sqlite3.Row
    # Enable foreign keys
    conn.execute("PRAGMA foreign_keys = ON;")
    try:
        yield conn
    finally:
        conn.close()

def init_db():
    with get_db() as conn:
        cursor = conn.cursor()

        # Projects Table
        cursor.execute("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)")
        
        # Add columns to projects safely
        try:
            cursor.execute("ALTER TABLE projects ADD COLUMN description TEXT;")
        except sqlite3.OperationalError:
            pass # Column exists
            
        try:
            cursor.execute("ALTER TABLE projects ADD COLUMN status TEXT DEFAULT 'ACTIVE';")
        except sqlite3.OperationalError:
            pass
            
        try:
            cursor.execute("ALTER TABLE projects ADD COLUMN created_at TEXT DEFAULT (datetime('now'));")
        except sqlite3.OperationalError:
            pass

        # Sprints Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sprints (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                goal TEXT,
                start_date TEXT,
                end_date TEXT,
                capacity INTEGER DEFAULT 0,
                status TEXT DEFAULT 'PLANNING',
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)

        # User Stories Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_stories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                sprint_id INTEGER REFERENCES sprints(id) ON DELETE SET NULL,
                as_a TEXT NOT NULL,
                i_want TEXT NOT NULL,
                so_that TEXT NOT NULL,
                priority TEXT DEFAULT 'SHOULD',
                story_points INTEGER DEFAULT 1,
                status TEXT DEFAULT 'TODO',
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)

        # Tasks Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sprint_id INTEGER NOT NULL REFERENCES sprints(id) ON DELETE CASCADE,
                story_id INTEGER REFERENCES user_stories(id) ON DELETE SET NULL,
                title TEXT NOT NULL,
                description TEXT,
                assignee TEXT,
                status TEXT DEFAULT 'TODO',
                sort_order INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)

        conn.commit()

# Initialize DB on import
init_db()
