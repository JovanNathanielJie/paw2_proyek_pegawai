import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeavesService } from '../../services/leaves.service';
import { EmployeesService } from '../../services/employees.service';

@Component({
  standalone: true,
  selector: 'app-leaves',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaves.html',
  styleUrls: ['./leaves.css']
})
export class LeavesComponent implements OnInit {
  leaves: any[] = [];
  employees: any[] = [];
  loading = false;
  error = '';
  formVisible = false;
  editingId: string | null = null;

  leave = {
    employee: '',
    leaveType: 'Sakit',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending',
    approvedBy: ''
  };

  // Helper untuk format tanggal YYYY-MM-DD (kompatibel dengan input type="date")
  private formatDateForInput(dateValue: any): string {
    if (!dateValue) return '';
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  leaveTypes = ['Sakit', 'Pribadi', 'Liburan', 'Melahirkan', 'Lainnya'];
  statuses = ['pending', 'approved', 'rejected'];

  constructor(private leavesService: LeavesService, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.loadLeaves();
    this.loadEmployees();
  }

  loadLeaves() {
    this.loading = true;
    this.leavesService.getLeaves().subscribe({
      next: (res: any) => {
        this.leaves = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal mengambil data cuti';
        this.loading = false;
      }
    });
  }

  loadEmployees() {
    this.employeesService.getEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.data || res;
      },
      error: (err) => {}
    });
  }

  showForm() {
    this.formVisible = true;
    this.editingId = null;
    this.leave = { employee: '', leaveType: 'Sakit', startDate: '', endDate: '', reason: '', status: 'pending', approvedBy: '' };
  }

  onSubmit() {
    if (!this.leave.employee || !this.leave.startDate || !this.leave.endDate) {
      this.error = 'Employee, startDate, dan endDate wajib diisi';
      return;
    }

    console.log('=== SUBMITTING LEAVE ===');
    console.log('Data:', this.leave);

    if (this.editingId) {
      this.leavesService.updateLeave(this.editingId, this.leave).subscribe({
        next: () => {
          console.log('Leave updated successfully');
          this.loadLeaves();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          console.error('Error updating leave:', err);
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.leavesService.addLeave(this.leave).subscribe({
        next: (response) => {
          console.log('Leave created successfully:', response);
          this.loadLeaves();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          console.error('Error creating leave:', err);
          this.error = err.error?.message || 'Gagal menambah cuti';
        }
      });
    }
  }

  deleteLeave(id: string) {
    if (confirm('Yakin hapus?')) {
      this.leavesService.deleteLeave(id).subscribe({
        next: () => {
          this.loadLeaves();
        },
        error: (err) => {
          this.error = 'Gagal menghapus cuti';
        }
      });
    }
  }

  editLeave(lv: any) {
    this.editingId = lv._id;
    // Konversi tanggal ke format YYYY-MM-DD untuk input type="date"
    this.leave = { 
      ...lv,
      startDate: this.formatDateForInput(lv.startDate),
      endDate: this.formatDateForInput(lv.endDate)
    };
    this.formVisible = true;
  }

  resetForm() {
    this.editingId = null;
    this.leave = { employee: '', leaveType: 'Sakit', startDate: '', endDate: '', reason: '', status: 'pending', approvedBy: '' };
    this.formVisible = false;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
