@echo off
chcp 65001 >nul

echo ========================================
echo     HAI TUO Website - Startup Script
echo ========================================
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found!
    echo Please install Python first: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [INFO] Starting local server...
echo [INFO] Server URL: http://localhost:8000
echo [INFO] Press Ctrl+C to stop server
echo.

start http://localhost:8000
python -m http.server 8000
