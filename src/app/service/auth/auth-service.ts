import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  rol: string;
  email: string;
  id_trabajador?: number;
  nombre?: string;
  apellido?: string;
  edad?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://bibliotecabackend-production.up.railway.app/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('email', response.email);
        localStorage.setItem('nombre', response.nombre || '');
        localStorage.setItem('apellido', response.apellido || '');
        localStorage.setItem('edad', response.edad?.toString() || '0');
        localStorage.setItem('id_trabajador', response.id_trabajador?.toString() || '');
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
