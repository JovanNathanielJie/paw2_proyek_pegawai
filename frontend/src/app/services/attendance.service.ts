import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendance {
  _id?: string;
  employee: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://127.0.0.1:5000/api/attendance';

  constructor(private http: HttpClient) {}

  getAttendances(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAttendance(id: string): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiUrl}/${id}`);
  }

  addAttendance(data: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, data);
  }

  updateAttendance(id: string, data: Attendance): Observable<Attendance> {
    return this.http.put<Attendance>(`${this.apiUrl}/${id}`, data);
  }

  deleteAttendance(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
