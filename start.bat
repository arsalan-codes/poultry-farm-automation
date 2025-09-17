@echo off
echo Starting Poultry Farm Automation System...
echo.

REM Check if dependencies are installed
if not exist node_modules (
    echo Dependencies not found! Installing...
    call install.bat
)

echo Opening browser at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

REM Try to open the browser after a short delay
start "" timeout /t 3 /nobreak >nul && start http://localhost:3000

REM Start the development server
npm run dev