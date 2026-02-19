import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../models/categoria/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'https://bibliotecabackend-production.up.railway.app/api/categoria';

  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  obtenerCategoria(id: number) {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  editarCategoria(id: number, categoria: Categoria) {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  eliminarCategoria(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  agregarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/grabar`, categoria);
  }

}
