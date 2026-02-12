import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestamos } from '../../models/prestamos/prestamos';

@Injectable({
  providedIn: 'root',
})
export class PrestamosService {

  private apiUrl = 'https://bibliotecabackend-production.up.railway.app/api/prestamos';

  constructor(private http: HttpClient) { }

  obtenerTodo(): Observable<Prestamos[]> {
    return this.http.get<Prestamos[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Prestamos> {
    return this.http.get<Prestamos>(`${this.apiUrl}/${id}`);
  }

  crear(prestamo: Prestamos): Observable<Prestamos> {
    return this.http.post<Prestamos>(`${this.apiUrl}/grabar`, prestamo);
  }

  actualizar(id: number, prestamo: Prestamos): Observable<Prestamos> {
    return this.http.put<Prestamos>(`${this.apiUrl}/${id}`, prestamo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
