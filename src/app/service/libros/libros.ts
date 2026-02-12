import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libros } from '../../models/libros/libros';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  private apiUrl = 'https://bibliotecabackend-production.up.railway.app/api/libros';

  constructor(private http: HttpClient) { }

  obtenerTodoLibro(): Observable<Libros[]> {
    return this.http.get<Libros[]>(this.apiUrl);
  }

  obtenerLibroPorId(id: number): Observable<Libros> {
    return this.http.get<Libros>(`${this.apiUrl}/${id}`);
  }

  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  agregarLibros(libro: Libros): Observable<Libros> {
    return this.http.post<Libros>(`${this.apiUrl}/grabar`, libro);
  }

  editarLibros(id: number, libro: Libros): Observable<Libros> {
    return this.http.put<Libros>(`${this.apiUrl}/${id}`, libro);
  }
}