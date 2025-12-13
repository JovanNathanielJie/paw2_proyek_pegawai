import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentsService } from '../../services/departements.service';

@Component({
  standalone: true,
  selector: 'app-departments',
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.html',
  styleUrls: ['./departments.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  loading = false;
  error = '';
  formVisible = false;
  editingId: string | null = null;

  department = {
    name: '',
    description: ''
  };

  constructor(private departmentsService: DepartmentsService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.loading = true;
    this.departmentsService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal mengambil data departemen';
        this.loading = false;
      }
    });
  }

  showForm() {
    this.formVisible = true;
    this.editingId = null;
    this.department = { name: '', description: '' };
  }

  onSubmit() {
    if (!this.department.name) {
      this.error = 'Nama departemen wajib diisi';
      return;
    }

    if (this.editingId) {
      this.departmentsService.updateDepartment(this.editingId, this.department).subscribe({
        next: () => {
          this.loadDepartments();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.departmentsService.addDepartment(this.department).subscribe({
        next: () => {
          this.loadDepartments();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menambah departemen';
        }
      });
    }
  }

  deleteDepartment(id: string) {
    if (confirm('Yakin hapus?')) {
      this.departmentsService.deleteDepartment(id).subscribe({
        next: () => {
          this.loadDepartments();
        },
        error: (err) => {
          this.error = 'Gagal menghapus departemen';
        }
      });
    }
  }

  editDepartment(dept: any) {
    this.editingId = dept._id;
    this.department = { ...dept };
    this.formVisible = true;
  }

  resetForm() {
    this.editingId = null;
    this.department = { name: '', description: '' };
    this.formVisible = false;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
