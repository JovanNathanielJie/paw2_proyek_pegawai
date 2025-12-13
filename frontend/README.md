# Frontend - Aplikasi Administrasi Kepegawaian

Frontend Angular untuk Sistem Administrasi Kepegawaian yang terintegrasi dengan backend Node.js/Express.

## 📋 Daftar Isi

- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [Fitur Utama](#fitur-utama)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)

## 🚀 Instalasi

### Prasyarat
- Node.js v18+
- npm atau yarn
- Angular CLI v17+

### Langkah-Langkah Instalasi

1. **Masuk ke direktori frontend**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Verifikasi instalasi**
```bash
ng version
```

## ⚙️ Konfigurasi

### Backend URL
Sesuaikan URL backend di `src/app/services/auth.service.ts` dan semua service files:

```typescript
private apiUrl = 'http://localhost:5000/api/auth';
```

**Default:** `http://localhost:5000`

Ubah jika backend berjalan di port/host yang berbeda.

### Environment Variables
Tidak ada `.env` file untuk frontend (Angular), konfigurasi langsung di service files.

## 🏃 Menjalankan Aplikasi

### Development Mode
```bash
npm start
```

atau gunakan Angular CLI langsung:
```bash
ng serve
```
Jika port 4200 sudah terpakai, Anda dapat menjalankan server dev di port lain:

```bash
npm run start:dev # menjalankan ng serve --port 4300
```

atau

```bash
ng serve --port 4300
```

**Output:**
```
✔ Compiled successfully.
✔ Application bundle generated successfully (1234.56 kB)

Now open your browser and navigate to http://localhost:4200/
```

Jika port 4200 sudah terpakai, Anda dapat menjalankan server dev di port lain:

```bash
npm run start:dev # menjalankan ng serve --port 4300
```

atau

```bash
ng serve --port 4300
```
**Akses aplikasi:**
- URL: `http://localhost:4200`
- Login otomatis diarahkan jika belum autentikasi
- Credentials default (dari backend seed): `admin` / `admin123`

### Production Build
```bash
npm run build
```

Output akan tersimpan di `dist/` folder.

### Run Tests
```bash
npm test
```

## 📁 Struktur Proyek

```
frontend/
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── app.ts                   # Root component
│   │   ├── app.html                 # App template (navbar + router outlet)
│   │   ├── app.css                  # App styles
│   │   ├── app.config.ts            # Angular configuration
│   │   ├── app.routes.ts            # Route definitions
│   │   ├── pages/                   # Page components
│   │   │   ├── login/               # Login page
│   │   │   ├── dashboard/           # Dashboard/home page
│   │   │   ├── employees/           # Employee management
│   │   │   ├── attendance/          # Attendance tracking
│   │   │   ├── departments/         # Department management
│   │   │   ├── positions/           # Position management
│   │   │   ├── leaves/              # Leave management
│   │   │   └── users/               # User management
│   │   ├── services/                # HTTP services
│   │   │   ├── auth.service.ts      # Authentication
│   │   │   ├── employees.service.ts # Employee CRUD
│   │   │   ├── attendance.service.ts
│   │   │   ├── departments.service.ts
│   │   │   ├── positions.service.ts
│   │   │   ├── leaves.service.ts
│   │   │   └── users.service.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts  # Auto-attach JWT token
│   │   └── guards/
│   │       └── auth.guard.ts        # Route protection
│   ├── index.html                   # Main HTML
│   ├── main.ts                      # Bootstrap
│   └── styles.css                   # Global styles
├── angular.json                     # Angular configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
└── README.md                        # This file
```

## ✨ Fitur Utama

### 1. Autentikasi & Otorisasi
- **Login Page** (`/login`): Form login dengan validasi
- **JWT Token**: Disimpan di localStorage
- **Auth Guard**: Proteksi rute yang memerlukan login
- **Http Interceptor**: Otomatis attach token ke setiap request

**Flow Login:**
```
User Input Username/Password
        ↓
POST /api/auth/login
        ↓
Backend return JWT Token
        ↓
Token disimpan di localStorage
        ↓
Redirect ke Dashboard
```

### 2. Dashboard
- Statistik keseluruhan sistem
- Total karyawan, departemen, posisi
- Status kehadiran hari ini
- Cuti yang belum disetujui
- Quick links ke modul utama

**Endpoint:** `/api/dashboard`

### 3. Manajemen Karyawan
- **URL**: `http://localhost:4200/dashboard/employees`
- **CRUD Operations**: Create, Read, Update, Delete
- **Fields**: NIP, Nama, Gender, Tanggal Lahir, Alamat, Telepon, Email, Departemen, Posisi, Status
- **Validasi**: NIP dan Email unik
- **Data Population**: Menampilkan nama departemen dan posisi (bukan ID)

### 4. Pencatatan Absensi
- **URL**: `http://localhost:4200/dashboard/attendance`
- **Features**: 
  - Input jam masuk/keluar
  - Status: Hadir, Tidak Hadir, Terlambat, Sakit, Cuti
  - Catatan absensi
  - Dropdown karyawan dari database
- **Validasi**: Mencegah duplikasi (satu karyawan per hari)

### 5. Manajemen Departemen
- **URL**: `http://localhost:4200/dashboard/departments`
- **CRUD**: Nama departemen dan deskripsi
- **Validasi**: Nama departemen harus unik

### 6. Manajemen Posisi
- **URL**: `http://localhost:4200/dashboard/positions`
- **Fields**: Nama, Deskripsi, Gaji Dasar, Departemen, Level (staff/senior/supervisor/manager/head/director)
- **Relasi**: Terhubung ke departemen

### 7. Manajemen Cuti
- **URL**: `http://localhost:4200/dashboard/leaves`
- **Features**:
  - Jenis cuti: Sakit, Pribadi, Liburan, Melahirkan, Lainnya
  - Tanggal mulai dan selesai dengan auto-calculation durasi
  - Status persetujuan: Pending, Approved, Rejected
  - Alasan/deskripsi cuti
- **Workflow**: Request → Pending → Approved/Rejected

### 8. Manajemen Pengguna Sistem
- **URL**: `http://localhost:4200/dashboard/users`
- **Fields**: Username, Email, Password, Role (Admin/HR/Viewer), Status
- **Role-Based**: Sistem mendukung berbagai role untuk akses berbeda
- **Admin Only**: Hanya admin yang bisa mengelola user

## 🔗 API Integration

Semua komunikasi dengan backend melalui HTTP Services di `src/app/services/`.

### Service Pattern

Setiap service mengikuti pattern yang sama:

```typescript
@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
```

### Token Management

Token di-handle otomatis melalui interceptor:

```typescript
// src/app/interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

## 🎯 Component Structure

Setiap page component mengikuti pattern:

```typescript
export class [Module]Component implements OnInit {
  items: any[] = [];
  loading = false;
  error = '';
  editingId: string | null = null;
  
  item = { /* form fields */ };
  
  constructor(private service: [Module]Service) {}
  
  ngOnInit() {
    this.loadItems();
  }
  
  loadItems() {
    this.service.get[Items]().subscribe({
      next: (res: any) => this.items = res.data || res,
      error: (err) => this.error = err.error?.message
    });
  }
  
  onSubmit() {
    if (this.editingId) {
      this.service.update[Item](this.editingId, this.item).subscribe({
        next: () => this.loadItems()
      });
    } else {
      this.service.add[Item](this.item).subscribe({
        next: () => this.loadItems()
      });
    }
  }
  
  delete[Item](id: string) {
    if (confirm('Yakin hapus?')) {
      this.service.delete[Item](id).subscribe({
        next: () => this.loadItems()
      });
    }
  }
}
```

## 🛡️ Authentication & Guards

### Login Flow

1. User navigasi ke `/login`
2. Input username dan password
3. POST ke `/api/auth/login`
4. Backend return JWT token
5. Token disimpan di `localStorage` dan service signal
6. Redirect ke `/dashboard`

### Route Protection

Routes yang require autentikasi protected dengan `authGuard`:

```typescript
{
  path: 'dashboard',

## 🎨 Styling and UX

- The app uses Bootstrap and a light, modern color `Inter` font for a clean, aesthetic UI.
- Global theme variables are in `src/styles.css` (accent color, muted, surface), and `src/app/app.css` adds the root layout and navbar styles.
- Dashboard now displays quick stats and a 5 item preview list of recent employees.
- Employee forms use select boxes populated with position and department lists from the backend (to avoid manual ID entry) and list views show human-readable `department.name` and `position.name`.

## 🧭 Running the app
- Dev server port defaults to 4200 (ng serve). If 4200 is in use, use `npm run start:dev` to start on port 4300.


## 🖌️ Styling & Root Employee List

- `src/app/app.css` contains the app-level component styles for a clean, modern UI (card layout, table styling, responsive behavior).
- The root `App` component (`src/app/app.ts`) now fetches a small preview list of employees from the backend and renders them in the header/dashboard table for quick overview.
  component: DashboardComponent,
  canActivate: [authGuard],  // Require login
  children: [...]
}
```

Jika akses tanpa token → redirect ke `/login`

### Logout

Click tombol "Logout" di navbar:
- Clear token dari localStorage
- Clear user signal
- Redirect ke `/login`

## 🎨 Styling

Aplikasi menggunakan **Bootstrap 5** untuk responsive design:

- Global styles: `src/styles.css`
- Component styles: `src/app/pages/[module]/[module].css`
- Utilities: Bootstrap classes dan custom CSS

### Key Style Classes

- `.form-card`: Wrapper untuk form
- `.table`: Styling tabel data
- `.btn-*`: Button styles (primary, danger, success, etc)
- `.alert-*`: Alert styling
- `.loading`: Loading spinner

## 🔧 Troubleshooting

### 1. "Cannot find module HttpClient"
**Solusi**: Pastikan `provideHttpClient()` ada di `app.config.ts`:
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

### 2. Blank page setelah login
**Solusi**: 
- Buka DevTools Console (F12)
- Pastikan tidak ada error
- Verifikasi backend running di port 5000
- Cek network tab untuk HTTP requests

### 3. "401 Unauthorized"
**Solusi**:
- Token mungkin expired
- Logout dan login lagi
- Pastikan backend JWT_SECRET sama dengan signing key

### 4. "CORS error" / "No 'Access-Control-Allow-Origin'"
**Solusi**:
- Backend harus enable CORS
- Pastikan backend di `server.js` ada:
```javascript
app.use(cors());
```
- Frontend default ke `http://localhost:5000`

### 5. Data tidak muncul di table
**Solusi**:
- Buka DevTools Network tab
- Cek API response
- Pastikan data ada di database (jalankan `npm run seed` di backend)
- Verifikasi service mengirim request ke endpoint yang benar

### 6. Form tidak bisa submit
**Solusi**:
- Cek validasi form (required fields terisi?)
- Lihat console error details
- Pastikan service method exist dan benar
- Cek network request success/error

## 📦 Dependencies

Main packages:
- `@angular/core` - Angular framework
- `@angular/common` - Common utilities
- `@angular/forms` - Form handling
- `@angular/router` - Routing
- `rxjs` - Reactive programming
- `bootstrap` - UI framework

## 📝 Development Notes

### Adding New Module

Jika ingin tambah modul baru (e.g., Training):

1. **Create component directory**
```bash
mkdir -p src/app/pages/training
```

2. **Create component files**
```bash
touch src/app/pages/training/training.ts
touch src/app/pages/training/training.html
touch src/app/pages/training/training.css
```

3. **Create service**
```bash
touch src/app/services/training.service.ts
```

4. **Add route** di `app.routes.ts`:
```typescript
{ path: 'training', component: TrainingComponent }
```

5. **Add navigation** di `app.ts`

6. **Implement CRUD** following existing patterns

## 🚀 Deployment

### Build untuk Production
```bash
npm run build
```

Output di folder `dist/` siap untuk deploy ke:
- Nginx
- Apache
- Vercel
- Netlify
- Cloud Platform (AWS, Azure, GCP)

### Important Considerations
1. Update `apiUrl` di services ke production backend URL
2. Pastikan backend CORS allow production domain
3. Enable HTTPS di production
4. Optimasi bundle size

## 📞 Support

Untuk bantuan atau issue:
1. Cek Troubleshooting section
2. Lihat browser console (F12) untuk error details
3. Verifikasi backend running dan accessible
4. Check network tab untuk API calls

---

**Last Updated**: 2025
**Version**: 1.0.0
