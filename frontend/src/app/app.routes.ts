import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { EmployeesComponent } from './pages/employees/employees';
import { AttendanceComponent } from './pages/attendance/attendance';
import { DepartmentsComponent } from './pages/departments/departments';
import { PositionsComponent } from './pages/positions/positions';
import { LeavesComponent } from './pages/leaves/leaves';
import { UsersComponent } from './pages/users/users';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: EmployeesComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'positions', component: PositionsComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'users', component: UsersComponent }
    ]
  },

  { path: '**', redirectTo: '/login' }
];
