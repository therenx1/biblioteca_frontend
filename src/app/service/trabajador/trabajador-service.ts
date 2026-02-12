import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajador } from '../../models/trabajador/trabajador';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/admin';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  listarTodos(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]> (`${this.apiUrl}/trabajadores`, { headers: this.getHeaders() });
  }

  crearBibliotecario(trabajadores: Trabajador): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-bibliotecario`, trabajadores, { headers: this.getHeaders() });
  }

  crearAuxiliar(trabajadores: Trabajador): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-auxiliar`, trabajadores, { headers: this.getHeaders() });
  }



}
