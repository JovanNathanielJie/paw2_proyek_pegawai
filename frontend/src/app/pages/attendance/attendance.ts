import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css']
})
export class AttendanceComponent implements OnInit {
  attendances: any[] = [];
  employees: any[] = [];
  loading = false;
  error = '';
  formVisible = false;
  editingId: string | null = null;

  attendance = {
    employee: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    status: 'Hadir',
    notes: ''
  };

  constructor(private attendanceService: AttendanceService, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.loadAttendances();
    this.loadEmployees();
  }

  loadAttendances() {
    this.loading = true;
    this.attendanceService.getAttendances().subscribe({
      next: (res: any) => {
        this.attendances = res.data || res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Gagal mengambil data absensi';
        this.loading = false;
      }
    });
  }

  loadEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.data || res;
      },
      error: (err: any) => {}
    });
  }

  showForm() {
    this.formVisible = true;
    this.editingId = null;
    this.attendance = { employee: '', date: new Date().toISOString().split('T')[0], checkIn: '', checkOut: '', status: 'Hadir', notes: '' };
  }

  onSubmit() {
    if (!this.attendance.employee || !this.attendance.date) {
      this.error = 'Employee dan date wajib diisi';
      return;
    }

    if (this.editingId) {
      this.attendanceService.updateAttendance(this.editingId, this.attendance).subscribe({
        next: () => {
          this.loadAttendances();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.attendanceService.addAttendance(this.attendance).subscribe({
        next: () => {
          this.loadAttendances();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menambah absensi';
        }
      });
    }
  }

  deleteAttendance(id: string) {
    if (confirm('Yakin hapus?')) {
      this.attendanceService.deleteAttendance(id).subscribe({
        next: () => {
          this.loadAttendances();
        },
        error: (err) => {
          this.error = 'Gagal menghapus absensi';
        }
      });
    }
  }

  editAttendance(att: any) {
    this.editingId = att._id;
    this.attendance = { ...att };
    this.formVisible = true;
  }

  resetForm() {
    this.editingId = null;
    this.attendance = { employee: '', date: new Date().toISOString().split('T')[0], checkIn: '', checkOut: '', status: 'Hadir', notes: '' };
    this.formVisible = false;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
