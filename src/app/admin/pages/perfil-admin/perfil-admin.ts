import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../../models/login/login';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-admin.html',
  styleUrls: ['./perfil-admin.css'] 
})
export class PerfilAdminComponent implements OnInit {
  private http = inject(HttpClient);

  adminPerfil: Pick<Login, 'nombre' | 'apellido' | 'email' | 'edad'> = {
    nombre: '',
    apellido: '',
    email: '',
    edad: 0
  };

  ngOnInit() {
    this.cargarPerfilLocal();
    this.cargarPerfilReal();
  }

  private cargarPerfilLocal() {
    this.adminPerfil = {
      nombre: localStorage.getItem('nombre') || '',
      apellido: localStorage.getItem('apellido') || '',
      email: localStorage.getItem('email') || '',
      edad: Number(localStorage.getItem('edad')) || 0
    };
  }

  private cargarPerfilReal() {
    this.http.get<Login>('http://localhost:8080/api/admin/me').subscribe({
      next: (usuario) => {
        this.adminPerfil = {
          nombre: usuario.nombre || '',
          apellido: usuario.apellido || '',
          email: usuario.email || '',
          edad: usuario.edad || 0
        };

        localStorage.setItem('nombre', usuario.nombre || '');
        localStorage.setItem('apellido', usuario.apellido || '');
        localStorage.setItem('edad', usuario.edad?.toString() || '0');
      },
      error: (err) => {
        console.error('Error al cargar perfil', err);
        this.cargarPerfilLocal();
      }
    });
  }
}