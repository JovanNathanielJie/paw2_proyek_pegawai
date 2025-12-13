import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeesService } from '../../services/employees.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalDepartments: 0,
    totalPositions: 0,
    totalUsers: 0,
    todayAttendance: 0,
    pendingLeaves: 0
  };

  loading = false;
  error = '';
  recentEmployees: any[] = [];
  loadingRecent = false;

  private apiUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient, private employeesService: EmployeesService) {}

  ngOnInit() {
    this.loadDashboardStats();
    this.loadRecentEmployees();
  }

  loadDashboardStats() {
    this.loading = true;
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response: any) => {
        // Back-end returns these names: attendanceToday, leavePending, totalPerDepartment, totalPerPosition
        const payload = response.data || response;
        // Map backend properties to frontend expected property names
        this.stats = {
          totalEmployees: payload.totalEmployees || payload.totalEmployees || 0,
          activeEmployees: payload.totalActive || payload.activeEmployees || 0,
          inactiveEmployees: payload.totalNonActive || payload.inactiveEmployees || 0,
          totalDepartments: Array.isArray(payload.totalPerDepartment) ? payload.totalPerDepartment.length : (payload.totalDepartments || 0),
          totalPositions: Array.isArray(payload.totalPerPosition) ? payload.totalPerPosition.length : (payload.totalPositions || 0),
          totalUsers: payload.totalUsers || 0,
          todayAttendance: payload.attendanceToday || payload.todayAttendance || 0,
          pendingLeaves: payload.leavePending || payload.pendingLeaves || 0
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat statistik dashboard';
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadRecentEmployees() {
    this.loadingRecent = true;
    this.employeesService.getEmployees().subscribe({
      next: (res: any) => {
        const list = res?.data || res || [];
        this.recentEmployees = list.slice(0, 5);
        this.loadingRecent = false;
      },
      error: (err) => {
        console.error('Gagal memuat pegawai', err);
        this.recentEmployees = [];
        this.loadingRecent = false;
      }
    });
  }
}
