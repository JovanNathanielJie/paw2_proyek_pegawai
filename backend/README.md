# Backend - Aplikasi Administrasi Kepegawaian

Instruksi singkat untuk menjalankan backend lokal.

Prereqs:
- Node.js (v16+ recommended)
- MongoDB lokal atau URI MongoDB

Setup:
1. Install dependencies

```bash
npm install
```

2. Salin `.env` jika diperlukan dan sesuaikan `MONGO_URI`.

3. Jalankan server:

```bash
npm run dev   # development (nodemon)
npm start     # production
```

4. (Opsional) Seed data awal:

```bash
npm run seed
```

API endpoints dasar:
- `POST /api/auth/login` - login
- `POST /api/auth/register` - create user (admin only)
- `GET /api/users` - list users (admin)
- `POST /api/employees` - create employee
- `GET /api/employees` - list employees

Postman collection:
- File: `postman_collection.json` — import ke Postman untuk mencoba endpoint cepat.
- Environment file: `postman_environment.json` — atur `baseUrl` (default `http://localhost:5000`) dan simpan `token` setelah login.

Contoh cepat (cURL) untuk login dan gunakan token:

```bash
curl -X POST http://localhost:5000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"username":"admin","password":"admin123"}'
```

Ambil nilai `token` dari response lalu sertakan header di request lain:

```bash
curl http://localhost:5000/api/users \
	-H "Authorization: Bearer <token>"
```

Catatan:
- Pastikan `JWT_SECRET` di `.env` sudah diisi.
- Client (Angular) diharapkan mengirim `password` saat register/login; server akan menyimpan `passwordHash`.
