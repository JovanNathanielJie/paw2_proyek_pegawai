import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  standalone: true,
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = false;
  error = '';
  formVisible = false;
  editingId: string | null = null;

  user = {
    username: '',
    email: '',
    password: '',
    role: 'viewer',
    isActive: true
  };

  roles = ['admin', 'hr', 'viewer'];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.data || res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Gagal mengambil data user';
        this.loading = false;
      }
    });
  }

  showForm() {
    this.formVisible = true;
    this.editingId = null;
    this.user = { username: '', email: '', password: '', role: 'viewer', isActive: true };
  }

  onSubmit() {
    if (!this.user.username || (!this.editingId && !this.user.password)) {
      this.error = 'Username dan password wajib diisi';
      return;
    }

    if (this.editingId) {
      const updateData: any = { ...this.user };
      delete updateData.password;
      this.usersService.updateUser(this.editingId, updateData).subscribe({
        next: () => {
          this.loadUsers();
          this.formVisible = false;
          this.error = '';
        },
        error: (err: any) => {
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.usersService.addUser(this.user).subscribe({
        next: () => {
          this.loadUsers();
          this.formVisible = false;
          this.error = '';
        },
        error: (err: any) => {
          this.error = err.error?.message || 'Gagal menambah user';
        }
      });
    }
  }

  deleteUser(id: string) {
    if (confirm('Yakin hapus?')) {
      this.usersService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err: any) => {
          this.error = 'Gagal menghapus user';
        }
      });
    }
  }

  editUser(u: any) {
    this.editingId = u._id;
    this.user = { username: u.username, email: u.email, password: '', role: u.role, isActive: u.isActive };
    this.formVisible = true;
  }

  resetForm() {
    this.editingId = null;
    this.user = { username: '', email: '', password: '', role: 'viewer', isActive: true };
    this.formVisible = false;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
