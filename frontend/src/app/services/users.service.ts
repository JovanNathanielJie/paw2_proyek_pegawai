import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://127.0.0.1:5000/api/users';

  constructor(private http: HttpClient) {}

  login(data: UserLogin): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/api/auth/login', data);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
