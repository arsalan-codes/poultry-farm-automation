@echo off
echo Installing Poultry Farm Automation System...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js is installed.
echo Installing dependencies...
echo.

REM Clean install
if exist node_modules (
    echo Cleaning old dependencies...
    rmdir /s /q node_modules
)

if exist package-lock.json (
    del package-lock.json
)

npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies!
    echo Trying with legacy peer deps...
    npm install --legacy-peer-deps
)

if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Then open your browser and visit: http://localhost:3000
echo.
echo Demo accounts:
echo Admin: admin / admin123
echo Manager: manager / manager123
echo User: user / user123
echo.
pause