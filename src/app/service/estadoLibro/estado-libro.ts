import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoLibro } from '../../models/estadoLibro/estado-libro';

@Injectable({
  providedIn: 'root',
})
export class EstadoLibroService {
  private apiUrl = 'http://localhost:8080/api/estadoLibro';

  constructor(private http: HttpClient){}

  obtenerTodoEstado() : Observable<EstadoLibro[]> {
    return this.http.get<EstadoLibro[]>(this.apiUrl);
  }

}
