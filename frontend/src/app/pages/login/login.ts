import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    // reset error
    this.error = '';

    // validasi sederhana
    if (!this.username || !this.password) {
      this.error = 'Username dan password wajib diisi';
      return;
    }

    this.loading = true;

    this.authService.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // AuthService sudah menyimpan token & user
        this.loading = false;

        // redirect ke dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;

        // tampilkan pesan error dari backend jika ada
        this.error = err?.error?.message || 'Login gagal. Periksa username dan password.';
      }
    });
  }
}
