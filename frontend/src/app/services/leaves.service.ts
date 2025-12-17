import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Leave {
  _id?: string;
  employee: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason?: string;
  status: string;
  approvedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  private apiUrl = 'http://127.0.0.1:5000/api/leaves';

  constructor(private http: HttpClient) {}

  getLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.apiUrl);
  }

  addLeave(data: Leave): Observable<Leave> {
    return this.http.post<Leave>(this.apiUrl, data);
  }

  updateLeave(id: string, data: Leave): Observable<Leave> {
    return this.http.put<Leave>(`${this.apiUrl}/${id}`, data);
  }

  deleteLeave(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
