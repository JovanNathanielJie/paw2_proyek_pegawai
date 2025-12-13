#!/bin/bash
# QUICK SETUP SCRIPT - Aplikasi Administrasi Kepegawaian

echo "=========================================="
echo "🚀 APLIKASI ADMINISTRASI KEPEGAWAIAN"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}1. Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v18+"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "✅ Node.js ${NODE_VERSION} found"
echo ""

# Check MongoDB
echo -e "${BLUE}2. Checking MongoDB...${NC}"
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found in PATH"
    echo "Please ensure MongoDB is installed and running"
    echo "Start MongoDB with: mongod"
else
    echo "✅ MongoDB found"
fi
echo ""

# Setup Backend
echo -e "${BLUE}3. Setting up Backend...${NC}"
cd backend
echo "📦 Installing backend dependencies..."
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo ""

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
MONGO_URI=mongodb://127.0.0.1:27017/kepegawaian
JWT_SECRET=your_super_secret_jwt_key_2025
PORT=5000
NODE_ENV=development
AUTO_OPEN=true
EOF
    echo "✅ .env created (update JWT_SECRET for production)"
else
    echo "✅ .env file exists"
fi
echo ""

# Setup Frontend
echo -e "${BLUE}4. Setting up Frontend...${NC}"
cd ../frontend
echo "📦 Installing frontend dependencies..."
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo ""

# Summary
echo -e "${GREEN}=========================================="
echo "✅ SETUP COMPLETE!"
echo "==========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo "1️⃣  Start MongoDB (in separate terminal):"
echo "   ${BLUE}mongod${NC}"
echo ""
echo "2️⃣  Start Backend (in separate terminal):"
echo "   ${BLUE}cd backend && npm run dev${NC}"
echo "   Backend will run on: http://localhost:5000"
echo ""
echo "3️⃣  Start Frontend (in separate terminal):"
echo "   ${BLUE}cd frontend && npm start${NC}"
echo "   Frontend will open on: http://localhost:4200"
echo ""
echo "4️⃣  Seed database (optional, from backend directory):"
echo "   ${BLUE}npm run seed${NC}"
echo ""
echo -e "${YELLOW}Default Login Credentials:${NC}"
echo "   Username: ${BLUE}admin${NC}"
echo "   Password: ${BLUE}admin123${NC}"
echo ""
echo "📚 For more information, read README.md"
echo ""
