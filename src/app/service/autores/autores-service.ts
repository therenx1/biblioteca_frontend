import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autores } from '../../models/autores/autores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class autoresService {
  
  private apiUrl = 'https://bibliotecabackend-production.up.railway.app/api/autores';
  
  constructor(private http: HttpClient) {}


  listarAutores(): Observable<Autores[]> {
    return this.http.get<Autores[]>(this.apiUrl);
  }

  obtenerAutores(id: number) {
    return this.http.get<Autores>(`${this.apiUrl}/${id}`);
  }

  editarAutores(id: number, autores: Autores) {
    return this.http.put<Autores>(`${this.apiUrl}/${id}`, autores);
  }

  eliminarAutores(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  agregarAutores(autores: Autores): Observable<Autores> {
    return this.http.post<Autores>(`${this.apiUrl}/grabar`, autores);
  }
}