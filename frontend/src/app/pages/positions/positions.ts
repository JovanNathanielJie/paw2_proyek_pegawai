import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PositionsService } from '../../services/positions.service';
import { DepartmentsService } from '../../services/departements.service';

@Component({
  standalone: true,
  selector: 'app-positions',
  imports: [CommonModule, FormsModule],
  templateUrl: './positions.html',
  styleUrls: ['./positions.css']
})
export class PositionsComponent implements OnInit {
  positions: any[] = [];
  departments: any[] = [];
  loading = false;
  error = '';
  formVisible = false;
  editingId: string | null = null;

  position = {
    title: '',
    description: '',
    baseSalary: 0,
    department: '',
    level: 'staff'
  };

  levels = ['staff', 'senior', 'supervisor', 'manager', 'head', 'director'];

  constructor(private positionsService: PositionsService, private departmentsService: DepartmentsService) {}

  ngOnInit() {
    this.loadPositions();
    this.loadDepartments();
  }

  loadPositions() {
    this.loading = true;
    this.positionsService.getPositions().subscribe({
      next: (res: any) => {
        this.positions = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal mengambil data posisi';
        this.loading = false;
      }
    });
  }

  loadDepartments() {
    this.departmentsService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res.data || res;
      },
      error: (err) => {}
    });
  }

  showForm() {
    this.formVisible = true;
    this.editingId = null;
    this.position = { title: '', description: '', baseSalary: 0, department: '', level: 'staff' };
  }

  onSubmit() {
    if (!this.position.title || !this.position.department) {
      this.error = 'Title dan department wajib diisi';
      return;
    }

    if (this.editingId) {
      this.positionsService.updatePosition(this.editingId, this.position).subscribe({
        next: () => {
          this.loadPositions();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menyimpan data';
        }
      });
    } else {
      this.positionsService.addPosition(this.position).subscribe({
        next: () => {
          this.loadPositions();
          this.formVisible = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Gagal menambah posisi';
        }
      });
    }
  }

  deletePosition(id: string) {
    if (confirm('Yakin hapus?')) {
      this.positionsService.deletePosition(id).subscribe({
        next: () => {
          this.loadPositions();
        },
        error: (err) => {
          this.error = 'Gagal menghapus posisi';
        }
      });
    }
  }

  editPosition(pos: any) {
    this.editingId = pos._id;
    this.position = { ...pos };
    this.formVisible = true;
  }

  resetForm() {
    this.editingId = null;
    this.position = { title: '', description: '', baseSalary: 0, department: '', level: 'staff' };
    this.formVisible = false;
  }

  cancel() {
    this.formVisible = false;
    this.editingId = null;
  }
}
