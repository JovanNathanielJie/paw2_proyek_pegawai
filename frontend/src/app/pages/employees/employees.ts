import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { DepartmentsService } from '../../services/departements.service';
import { PositionsService } from '../../services/positions.service';

@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  departments: any[] = [];
  positions: any[] = [];
  loading = false;
  error = '';
  formVisible = false;
  editingId: string | null = null;

  employee = {
    nip: '',
    name: '',
    gender: 'M',
    birthDate: '',
    address: '',
    phone: '',
    email: '',
    department: '',
    position: '',
    status: 'active'
  };

  constructor(private employeesService: EmployeesService, private departmentsService: DepartmentsService, private positionsService: PositionsService) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
    this.loadPositions();
  }

  loadEmployees() {
    this.loading = true;
    this.employeesService.getEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal mengambil data pegawai';
        this.loading = false;
      }
    });
  }

  loadDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (res: any) => { this.departments = res.data || res; },
      error: () => { this.departments = []; }
    });
  }

  loadPositions() {
    this.positionsService.getPositions().subscribe({
      next: (res: any) => { this.positions = res.data || res; },
      error: () => { this.positions = []; }
    });
  }

  showForm() {
    this.formVisible = true;
    this.editingId = null;
    this.employee = { nip: '', name: '', gender: 'M', birthDate: '', address: '', phone: '', email: '', department: '', position: '', status: 'active' };
  }

  onSubmit() {
    if (!this.employee.nip || !this.employee.name) {
      this.error = 'NIP dan Nama wajib diisi';
      return;
    }

    if (this.editingId) {
      this.employeesService.updateEmployee(this.editingId, this.employee).subscribe({
        next: () => {
          this.loadEmployees();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.employeesService.addEmployee(this.employee).subscribe({
        next: () => {
          this.loadEmployees();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menambah pegawai';
        }
      });
    }
  }

  deleteEmployee(id: string) {
    if (confirm('Yakin hapus?')) {
      this.employeesService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
          this.error = '';
        },
        error: (err) => {
          this.error = 'Gagal menghapus pegawai';
        }
      });
    }
  }

  editEmployee(emp: any) {
    this.editingId = emp._id;
    // backend populates department and position; extract _id for select
    this.employee = {
      nip: emp.nip || '',
      name: emp.name || '',
      gender: emp.gender || 'M',
      birthDate: emp.birthDate || '',
      address: emp.address || '',
      phone: emp.phone || '',
      email: emp.email || '',
      department: emp.department?._id || emp.department || '',
      position: emp.position?._id || emp.position || '',
      status: emp.status || 'active'
    };
    this.formVisible = true;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
