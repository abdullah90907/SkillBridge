@echo off
echo Starting Gemma AI Resume Analyzer...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd /d backend && npm start"

timeout /t 3 >nul

echo Starting Frontend Application...
start "Frontend" cmd /k "cd /d frontend && npm start"

echo.
echo Both servers are starting...
echo Backend will run on http://localhost:8000
echo Frontend will run on http://localhost:3000
echo.
pause
