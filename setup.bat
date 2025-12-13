@echo off
REM QUICK SETUP SCRIPT - Aplikasi Administrasi Kepegawaian (Windows)

echo.
echo ==========================================
echo 🚀 APLIKASI ADMINISTRASI KEPEGAWAIAN
echo ==========================================
echo.

REM Check Node.js
echo 1. Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js v18+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found
echo.

REM Check MongoDB
echo 2. Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB not found in PATH
    echo Please ensure MongoDB is installed and running
) else (
    echo ✅ MongoDB found
)
echo.

REM Setup Backend
echo 3. Setting up Backend...
cd backend
echo 📦 Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

REM Create .env if not exists
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo MONGO_URI=mongodb://127.0.0.1:27017/kepegawaian
        echo JWT_SECRET=your_super_secret_jwt_key_2025
        echo PORT=5000
        echo NODE_ENV=development
        echo AUTO_OPEN=true
    ) > .env
    echo ✅ .env created (update JWT_SECRET for production)
) else (
    echo ✅ .env file exists
)
echo.

REM Setup Frontend
echo 4. Setting up Frontend...
cd ../frontend
echo 📦 Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

REM Summary
echo ==========================================
echo ✅ SETUP COMPLETE!
echo ==========================================
echo.
echo Next steps:
echo.
echo 1️⃣  Start MongoDB (in separate Command Prompt^):
echo    mongod
echo.
echo 2️⃣  Start Backend (in separate Command Prompt^):
echo    cd backend
echo    npm run dev
echo    Backend will run on: http://localhost:5000
echo.
echo 3️⃣  Start Frontend (in separate Command Prompt^):
echo    cd frontend
echo    npm start
echo    Frontend will open on: http://localhost:4200
echo.
echo 4️⃣  Seed database (optional, from backend directory^):
echo    npm run seed
echo.
echo Default Login Credentials:
echo    Username: admin
echo    Password: admin123
echo.
echo 📚 For more information, read README.md
echo.
pause
