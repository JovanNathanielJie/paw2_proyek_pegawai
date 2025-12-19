# Panduan Troubleshooting - Absensi & Cuti

## Perubahan yang Dilakukan

### 1. Backend Models
- **Attendance.js**: Status enum diubah ke bahasa Indonesia
  - `["Hadir", "Terlambat", "Tidak Hadir", "Sakit", "Cuti"]`
  - `checkIn` dan `checkOut` diubah ke String (format HH:mm)
  
- **Leave.js**: LeaveType enum diubah ke bahasa Indonesia
  - `["Sakit", "Pribadi", "Liburan", "Melahirkan", "Lainnya"]`

### 2. Controllers
- Menambahkan validasi input yang lebih baik
- Menambahkan console.log untuk debugging
- Pesan error dalam bahasa Indonesia

### 3. Frontend
- Semua form values disesuaikan dengan enum backend
- Menambahkan console.log untuk debugging

## Cara Testing

### Langkah 1: Restart Backend
```powershell
cd "C:\Users\asus\OneDrive\Documents\GitHub\paw2_proyek_pegawai\backend"
npm start
```

### Langkah 2: Restart Frontend (jika perlu)
```powershell
cd "C:\Users\asus\OneDrive\Documents\GitHub\paw2_proyek_pegawai\frontend"
npm start
```

### Langkah 3: Buka Browser Console
- Tekan F12 untuk membuka Developer Tools
- Pilih tab "Console"

### Langkah 4: Test Create Attendance
1. Login dengan user role **admin** atau **hr**
2. Buka halaman Absensi
3. Isi form:
   - Pilih Karyawan
   - Pilih Tanggal
   - Isi Jam Masuk (contoh: 07:50)
   - Isi Jam Keluar (contoh: 17:00)
   - Pilih Status (Hadir/Terlambat/dll)
4. Klik "Tambah Absensi"
5. Lihat console untuk melihat log:
   - Frontend akan log: `=== SUBMITTING ATTENDANCE ===`
   - Backend akan log: `=== CREATE ATTENDANCE REQUEST ===`

### Langkah 5: Test Create Leave
1. Buka halaman Cuti
2. Isi form:
   - Pilih Karyawan
   - Pilih Jenis Cuti (Sakit/Pribadi/dll)
   - Pilih Tanggal Mulai
   - Pilih Tanggal Selesai
   - Isi Alasan
3. Klik "Ajukan Cuti"
4. Lihat console untuk melihat log

## Kemungkinan Masalah & Solusi

### Error: "Access denied" / 403
**Penyebab**: User tidak memiliki role yang tepat
**Solusi**: 
- Login dengan user yang memiliki role `admin` atau `hr`
- Cek di localStorage: `auth_user` harus memiliki field `role: "admin"` atau `role: "hr"`

### Error: "Token missing" / 401
**Penyebab**: Token tidak terkirim atau expired
**Solusi**: 
- Logout dan login kembali
- Cek di localStorage: `auth_token` harus ada

### Error: "Absensi untuk tanggal ini sudah ada"
**Penyebab**: Sudah ada record absensi untuk employee dan tanggal yang sama
**Solusi**: 
- Pilih tanggal yang berbeda, atau
- Hapus record yang lama terlebih dahulu

### Error: "Tanggal selesai harus setelah atau sama dengan tanggal mulai"
**Penyebab**: Tanggal selesai cuti lebih awal dari tanggal mulai
**Solusi**: 
- Pastikan tanggal selesai >= tanggal mulai

### Error dengan enum value
**Penyebab**: Database masih menyimpan nilai lama (present, sick, dll)
**Solusi**: 
1. Hapus semua data lama dari database
2. Atau buat migration script untuk update nilai lama

### Data tidak muncul setelah create
**Penyebab**: Frontend tidak refresh list
**Solusi**: 
- Sudah ditangani dengan `loadAttendances()` / `loadLeaves()`
- Jika masih tidak muncul, refresh halaman manual

## Cek di Console Browser

### Yang harus terlihat saat CREATE sukses:

**Frontend Console:**
```
=== SUBMITTING ATTENDANCE ===
Data: {employee: "...", date: "2025-12-19", checkIn: "07:50", ...}
Attendance created successfully: {success: true, data: {...}}
```

**Backend Console (Terminal):**
```
=== CREATE ATTENDANCE REQUEST ===
Body: { employee: '...', date: '2025-12-19', ... }
User: { id: '...', role: 'admin' }
Attendance created: { _id: '...', employee: '...', ... }
```

## Database Check (Optional)

Jika masih bermasalah, cek database langsung:

```bash
# Masuk ke MongoDB shell
mongosh

# Pilih database
use kepegawaian

# Lihat data attendance
db.attendances.find().pretty()

# Lihat data leaves
db.leaves.find().pretty()

# Hapus semua data (untuk testing fresh)
db.attendances.deleteMany({})
db.leaves.deleteMany({})
```

## Kontak untuk Bantuan Lebih Lanjut

Jika masih error, screenshot:
1. Console browser (tab Console di Developer Tools)
2. Console backend (terminal tempat npm start dijalankan)
3. Pesan error yang muncul di UI

Dan bagikan untuk diagnosa lebih lanjut.
