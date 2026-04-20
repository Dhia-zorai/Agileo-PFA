# Agileo

Agileo is a lightweight, modern project management application designed to facilitate Agile workflows. It features a high-performance REST API and a responsive, Neobrutalist-inspired user interface.

## System Architecture

*   **Frontend:** React.js (Custom Neobrutalist CSS styling)
*   **Backend:** Python 3.10+ with FastAPI
*   **Database:** SQLite (Development)

## Prerequisites

Before running the application, ensure you have the following installed:
*   [Python 3.10+](https://www.python.org/downloads/)
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

To run the application locally, you will need to start both the backend server and the frontend development server.

### 1. Backend Setup

The backend runs on FastAPI and serves the REST API.

```bash
cd backend

# Create and activate a virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`. You can view the interactive API documentation at `http://localhost:8000/docs`.

### 2. Frontend Setup

The frontend is a React application that consumes the FastAPI backend.

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
The application will automatically open in your default browser at `http://localhost:3000`.

## Roadmap

*   **Database Migration:** Transition from raw SQLite queries to an ORM (SQLAlchemy/SQLModel).
*   **Backend Restructuring:** Refactor `main.py` into a modular architecture (routers, models, schemas).
*   **Expanded CRUD Operations:** Implement update and delete functionalities for project entities.
*   **Authentication:** Introduce secure user authentication and session management.
*   **Containerization:** Add Docker support for streamlined deployment.
