@echo off
echo Starting X DKV TWO Website Server...
echo.

REM Try Python 3 first
python -m http.server 8000 --bind 127.0.0.1 >nul 2>&1
if %errorlevel% equ 0 (
    echo Server started successfully!
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    python -m http.server 8000 --bind 127.0.0.1
    goto :end
)

REM Try Python 2 if Python 3 fails
python -m SimpleHTTPServer 8000 >nul 2>&1
if %errorlevel% equ 0 (
    echo Server started successfully!
    echo Open your browser and go to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    python -m SimpleHTTPServer 8000
    goto :end
)

REM If Python is not available, try Node.js if installed
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js detected. Installing live-server...
    npm install -g live-server
    if %errorlevel% equ 0 (
        echo Starting live-server...
        live-server --port=3000 --host=localhost --open=/
        goto :end
    )
)

REM Fallback: Direct file opening
echo.
echo No server software found. Opening index.html directly...
start index.html
echo Website opened in default browser.
echo Note: Some features may not work without a local server.

:end
pause
