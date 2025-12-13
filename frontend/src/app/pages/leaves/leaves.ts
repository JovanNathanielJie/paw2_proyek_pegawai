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
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending',
    approvedBy: ''
  };

  leaveTypes = ['sick', 'personal', 'vacation', 'maternity', 'other'];
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
    this.leave = { employee: '', leaveType: 'sick', startDate: '', endDate: '', reason: '', status: 'pending', approvedBy: '' };
  }

  onSubmit() {
    if (!this.leave.employee || !this.leave.startDate || !this.leave.endDate) {
      this.error = 'Employee, startDate, dan endDate wajib diisi';
      return;
    }

    if (this.editingId) {
      this.leavesService.updateLeave(this.editingId, this.leave).subscribe({
        next: () => {
          this.loadLeaves();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.leavesService.addLeave(this.leave).subscribe({
        next: () => {
          this.loadLeaves();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
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
    this.leave = { ...lv };
    this.formVisible = true;
  }

  resetForm() {
    this.editingId = null;
    this.leave = { employee: '', leaveType: 'sick', startDate: '', endDate: '', reason: '', status: 'pending', approvedBy: '' };
    this.formVisible = false;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
