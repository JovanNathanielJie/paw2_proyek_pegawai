# 🏢 Aplikasi Administrasi Kepegawaian (MEAN Stack)

Sistem informasi manajemen kepegawaian terintegrasi menggunakan **MongoDB, Express, Angular, Node.js** (MEAN Stack).

## 📋 Daftar Isi

- [Tentang Aplikasi](#tentang-aplikasi)
- [Teknologi](#teknologi)
- [Prasyarat](#prasyarat)
- [Instalasi & Konfigurasi](#instalasi--konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Fitur Utama](#fitur-utama)
- [Struktur Proyek](#struktur-proyek)
- [Testing API](#testing-api)
- [Troubleshooting](#troubleshooting)

## 🎯 Tentang Aplikasi

Aplikasi ini dirancang untuk mengelola data kepegawaian secara terintegrasi dengan fitur:

✅ **Manajemen Karyawan** - CRUD data karyawan dengan departemen dan posisi  
✅ **Pencatatan Absensi** - Recording jam masuk/keluar harian  
✅ **Manajemen Cuti** - Request dan approval cuti dengan tracking durasi  
✅ **Manajemen Departemen** - Master data departemen perusahaan  
✅ **Manajemen Posisi** - Master data posisi dan level dengan gaji  
✅ **Manajemen Pengguna** - User system dengan role-based access control  
✅ **Dashboard Statistik** - Overview keseluruhan sistem  
✅ **Autentikasi & Otorisasi** - JWT-based authentication dengan role middleware  

## 💻 Teknologi

### Backend Stack
- **Node.js** v22.15.0 - Runtime environment
- **Express** 5.1.0 - Web framework
- **MongoDB** 4.x - Database
- **Mongoose** 9.0.0 - ODM (Object Data Mapping)
- **JWT** (jsonwebtoken 9.0.2) - Authentication
- **bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.5 - Cross-origin requests
- **Dotenv** 17.2.3 - Environment variables

### Frontend Stack
- **Angular** 20.3.0 - SPA framework (standalone components)
- **TypeScript** 5.9.2 - Programming language
- **Bootstrap** 5.3.8 - CSS framework
- **RxJS** 7.8.0 - Reactive programming
- **HttpClient** - HTTP communication

## ✅ Prasyarat

Sebelum memulai, pastikan sudah install:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** 4.x ([Download](https://www.mongodb.com/try/download/community))
- **npm** atau **yarn** (biasanya bundled dengan Node.js)
- **Text Editor** (VS Code, Sublime, dll)
- **Postman** (optional, untuk testing API)

### Cek Versi

```bash
node --version    # v22.15.0 atau lebih tinggi
npm --version     # 10.x atau lebih tinggi
```

## 🚀 Instalasi & Konfigurasi

### 1️⃣ Clone/Extract Project

```bash
# Jika dari Git
git clone <repository-url>
cd backend_frontend_paw_2

# Jika dari ZIP, extract dan masuk direktori
cd backend_frontend_paw_2
```

### 2️⃣ Backend Setup

#### Step 1: Install Dependencies

```bash
cd backend
npm install
```

#### Step 2: Konfigurasi Environment

Buat file `.env` di direktori backend:

```bash
# Copy file template (jika ada) atau buat baru
cp .env.example .env
# atau
touch .env
```

Isi file `.env` dengan:

```env
# Database
MONGO_URI=mongodb://127.0.0.1:27017/kepegawaian

# JWT
JWT_SECRET=your_super_secret_jwt_key_2025

# Server
PORT=5000
NODE_ENV=development

# Browser Auto-Open (optional)
AUTO_OPEN=true
```

**⚠️ PENTING:**
- `MONGO_URI`: Sesuaikan jika MongoDB tidak di localhost atau port 27017
- `JWT_SECRET`: Ganti dengan string random yang aman (minimal 32 karakter)
- `PORT`: Port backend (default: 5000)

#### Step 3: Verifikasi MongoDB

```bash
# Pastikan MongoDB running
# Windows (Command Prompt atau PowerShell):
mongod

# Atau jika pakai MongoDB Atlas, update MONGO_URI di .env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kepegawaian?retryWrites=true&w=majority
```

#### Step 4: Seed Database (Optional tapi Recommended)

Untuk membuat data sample (admin user, departemen, posisi, karyawan):

```bash
npm run seed
```

**Output jika sukses:**
```
✓ Database connected successfully
✓ Admin user created: admin / admin123
✓ Department created: IT
✓ Position created: Developer
✓ Employee created: John Doe
```

#### Step 5: Jalankan Backend

```bash
# Development dengan auto-reload
npm run dev

# Atau production mode
npm start
```

**Output jika sukses:**
```
✓ Express server running on port 5000
✓ MongoDB connected to mongodb://127.0.0.1:27017/kepegawaian
✓ Browser opened at http://localhost:5000
```

### 3️⃣ Frontend Setup

**PENTING: Buka terminal/tab baru untuk frontend**

#### Step 1: Navigate ke Frontend

```bash
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Verifikasi Backend URL

Pastikan file services menunjuk ke backend yang benar.

Di `src/app/services/auth.service.ts` dan service files lainnya:

```typescript
private apiUrl = 'http://localhost:5000/api/auth';
```

Ubah `localhost:5000` jika backend berbeda.

#### Step 4: Jalankan Frontend

```bash
npm start
```

atau

```bash
ng serve
```

**Output jika sukses:**
```
✔ Compiled successfully.
✔ Application bundle generated successfully

Now open your browser and navigate to:
http://localhost:4200/
```

## 🎮 Menjalankan Aplikasi

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Akan menampilkan:
```
Express server running on port 5000
MongoDB connected to mongodb://127.0.0.1:27017/kepegawaian
```

### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

Akan membuka browser ke `http://localhost:4200` otomatis.

### Login ke Aplikasi

**Default Credentials** (dari seed script):
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Admin (akses penuh)

Setelah login, Anda akan melihat dashboard dengan statistik dan menu navigasi ke:
- 📋 Karyawan
- 📊 Absensi
- 🏖️ Cuti
- 🏢 Departemen
- 📌 Posisi
- 👥 Pengguna Sistem

## ✨ Fitur Utama

### 1. Autentikasi & Otorisasi
- Login dengan username/password
- JWT token-based authentication
- Role-based access control (Admin, HR, Viewer)
- Password hashing dengan bcryptjs
- Session persistence dengan localStorage

### 2. Dashboard
- Statistik real-time (total karyawan, departemen, posisi)
- Status kehadiran hari ini
- Cuti yang menunggu persetujuan
- Quick links ke semua modul

### 3. Manajemen Karyawan
- Create, Read, Update, Delete karyawan
- Fields: NIP, Nama, Gender, Tanggal Lahir, Alamat, Telepon, Email, Departemen, Posisi, Status
- Validasi NIP & Email unik
- Relasi dengan Departemen dan Posisi

### 4. Pencatatan Absensi
- Input jam masuk/keluar
- Status: Hadir, Tidak Hadir, Terlambat, Sakit, Cuti
- Catatan absensi
- Prevent duplikasi per karyawan per hari

### 5. Manajemen Cuti
- Jenis: Sakit, Pribadi, Liburan, Melahirkan, Lainnya
- Auto-calculate durasi hari
- Status: Pending, Approved, Rejected
- Tracking persetujuan

### 6. Master Data
- **Departemen**: Nama dan deskripsi
- **Posisi**: Title, level (staff-director), gaji dasar, departemen

### 7. Manajemen Pengguna Sistem
- CRUD user dengan role assignment
- Admin-only access
- Password management

## 📁 Struktur Proyek

```
backend_frontend_paw_2/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/              # Mongoose schemas
│   │   ├── services/            # Business logic
│   │   ├── routes/              # API endpoints
│   │   ├── middlewares/         # Auth, CORS, validation
│   │   └── utils/
│   │       └── seed.js          # Sample data
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── server.js                # Express app entry
│   ├── package.json
│   ├── .env                     # Environment variables
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/           # Page components
│   │   │   ├── services/        # HTTP services
│   │   │   ├── interceptors/    # HTTP interceptors
│   │   │   ├── guards/          # Route guards
│   │   │   ├── app.ts           # Root component
│   │   │   ├── app.routes.ts    # Routes
│   │   │   └── app.config.ts    # Angular config
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css           # Global styles
│   ├── package.json
│   ├── angular.json
│   └── README.md
│
├── postman_collection.json      # API documentation
├── postman_environment.json     # Postman variables
└── README.md                    # This file
```

## 🧪 Testing API

### Menggunakan Postman

1. **Import Collection**
   - Buka Postman
   - Click `Import` → Select `postman_collection.json`
   - Semua endpoint akan ter-import otomatis

2. **Setup Environment**
   - Click `Import` → Select `postman_environment.json`
   - Atau setup manual: `baseUrl = http://localhost:5000`

3. **Test Login**
   - Pilih request `Auth → Login`
   - Body:
     ```json
     {
       "username": "admin",
       "password": "admin123"
     }
     ```
   - Click `Send`
   - Token dari response akan di-copy otomatis ke environment variable

4. **Test Endpoints Lainnya**
   - Token akan auto-attach ke header `Authorization: Bearer <token>`
   - Semua endpoints dapat diakses sesuai role

### Menggunakan cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Response (copy token)
{
  "data": {
    "token": "eyJhbGc..."
  }
}

# Get Employees dengan token
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer eyJhbGc..."
```

## 🔧 Troubleshooting

### Backend Issues

#### ❌ "Cannot connect to MongoDB"
```
MongooseError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solusi:**
- Pastikan MongoDB running: `mongod`
- Cek `MONGO_URI` di `.env`
- Jika MongoDB bukan di localhost:27017, update MONGO_URI

#### ❌ "Port 5000 already in use"
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solusi:**
- Ubah `PORT` di `.env` ke port lain (e.g., 5001)
- Atau kill process yang occupy port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -i :5000
  kill -9 <PID>
  ```

#### ❌ "JWT_SECRET not found"
```
Error: JWT_SECRET is not defined
```
**Solusi:**
- Pastikan `.env` file ada di backend directory
- Pastikan `JWT_SECRET=...` ada di `.env`
- Restart server setelah menambah .env

#### ❌ "Seed script error"
**Solusi:**
- Pastikan MongoDB connected
- Check MONGO_URI di `.env`
- Clear database dan run seed lagi

### Frontend Issues

#### ❌ Blank page / "Cannot GET /"
**Solusi:**
- Pastikan `ng serve` running di localhost:4200
- Check browser console (F12) untuk error
- Clear cache: Ctrl+Shift+R atau Cmd+Shift+R

#### ❌ "Cannot find module '@angular/common/http'"
**Solusi:**
- Run `npm install` di frontend directory
- Restart dev server

#### ❌ "401 Unauthorized" setiap request
**Solusi:**
- Token mungkin expired, logout dan login ulang
- Cek localStorage apakah token ada (F12 → Application → Local Storage)
- Pastikan backend URL correct di services

#### ❌ "CORS error" di API calls
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:4200' blocked by CORS policy
```
**Solusi:**
- Pastikan backend enable CORS (di `server.js` ada `app.use(cors())`)
- Restart backend server
- Verifikasi frontend services use correct backend URL

#### ❌ "HTTP 404 for /api/..." endpoint
**Solusi:**
- Cek backend routes ada di `src/routes/`
- Verify route path match dengan frontend service URL
- Cek controller/service logic

### General Issues

#### Database muncul di compass tapi tidak di shell
**Solusi:**
- MongoDB shell (`mongosh`) dan GUI (Compass) berbeda tool
- Cek koneksi di `MONGO_URI`
- Verify dengan: `mongosh` → `show dbs` → `use kepegawaian` → `show collections`

#### Data tidak muncul di frontend table
**Solusi:**
1. Open DevTools (F12)
2. Tab `Network`: Cek API response
3. Tab `Console`: Cek error messages
4. Tab `Application → Local Storage`: Cek token tersimpan
5. Backend: Cek data ada di MongoDB dengan MongoDB Compass

#### Semua fitur di-akses user yang bukan admin
**Solusi:**
- Cek role di User model MongoDB
- Update role di database:
  ```bash
  db.users.updateOne({username: "user1"}, {$set: {role: "viewer"}})
  ```
- Restart frontend/clear cache

## 📚 Dokumentasi Lengkap

Untuk detail lebih lanjut, baca:
- [Backend README](./backend/README.md) - API documentation, setup details
- [Frontend README](./frontend/README.md) - Component structure, routing, services

## 🎓 Project Requirements

Aplikasi ini memenuhi kriteria proyek **Pemrograman Aplikasi Web II** dengan:

✅ Database design minimal 6 entity  
✅ CRUD operations untuk minimal 5 entity  
✅ Authentication & authorization system  
✅ Input validation  
✅ Error handling  
✅ Responsive UI (Bootstrap)  
✅ API integration frontend-backend  
✅ Deployment-ready code  

## 📝 Catatan Pengembang

### Default Login Credentials

| Username | Password | Role   | Akses |
|----------|----------|--------|-------|
| admin    | admin123 | Admin  | Full  |

Ganti password di production!

### Environment Checklist

Sebelum menjalankan:

- [ ] Node.js v18+ installed
- [ ] MongoDB running (`mongod` atau MongoDB Atlas)
- [ ] Backend `.env` configured dengan MONGO_URI dan JWT_SECRET
- [ ] Frontend backend URL correct di services
- [ ] Postman collection & environment (optional)

### Adding New Features

1. **Backend**: Create model → service → controller → route
2. **Frontend**: Create service → component → template → add to routing
3. **Testing**: Test API dengan Postman, test UI di browser
4. **Commit**: Push dengan clear commit message

## 🚀 Deployment

### Backend (Production)

```bash
NODE_ENV=production
npm start

# atau dengan process manager:
pm2 start server.js --name "kepegawaian-api"
```

### Frontend (Production)

```bash
ng build --configuration production
# Deploy dist/ folder ke web server (Nginx, Apache, etc)
```

## 📞 Support & Contact

Untuk pertanyaan atau issue:
1. Cek troubleshooting section
2. Review code comments
3. Check backend/frontend README
4. Test dengan Postman

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Status**: Production Ready ✅

     (Assuming your backend code is in a folder named `frontend`. Adjust if your folder structure is different.)

2.   **Install dependencies:**

     ```bash
     npm install

     ```

     This command reads the `package.json` file and installs all the necessary Node.js modules.

3.   **Run the frontend server:**

     ```bash
     ng serve
     ```

     The frontend server should now be running, usually on `http://localhost:4200` or a port specified in your configuration.
