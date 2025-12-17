import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Position {
  _id?: string;
  title: string;
  description?: string;
  baseSalary?: number;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private apiUrl = 'http://localhost:5000/api/positions';

  constructor(private http: HttpClient) {}

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiUrl);
  }

  addPosition(data: Position): Observable<Position> {
    return this.http.post<Position>(this.apiUrl, data);
  }

  updatePosition(id: string, data: Position): Observable<Position> {
    return this.http.put<Position>(`${this.apiUrl}/${id}`, data);
  }

  deletePosition(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
