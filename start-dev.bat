@echo off
echo ========================================================
echo Starting Agileo Local Development Environment
echo ========================================================

:: 1. Start the FastAPI Backend in a new command window
echo [1/2] Launching FastAPI Backend on http://localhost:8000 ...
start "Agileo API Backend" cmd /c "cd api && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) else (echo Warning: No venv found. Using global python.) && python -m uvicorn index:app --reload --port 8000"

:: 2. Start the React Frontend in a new command window
echo [2/2] Launching React Frontend on http://localhost:3000 ...
start "Agileo React Frontend" cmd /c "cd frontend && npm start"

echo.
echo Both servers are starting up! 
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000/api/
echo.
echo Note: Close the new command windows to stop the servers.
echo ========================================================
pause
