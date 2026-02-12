import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth/auth-service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {

  private authService = inject(AuthService);

  perfil!: {
    id: string | null;
    nombre: string | null;
    apellido: string | null;
    email: string | null;
    edad: string | null;
    rol: string | null;
  };

  datos: any[] = [];

  ngOnInit(): void {

    this.perfil = {
      id: localStorage.getItem('id_trabajador'),
      nombre: localStorage.getItem('nombre'),
      apellido: localStorage.getItem('apellido'),
      email: localStorage.getItem('email'),
      edad: localStorage.getItem('edad'),
      rol: localStorage.getItem('rol'),
    };

    this.datos = [
      { label: 'ID', value: this.perfil.id, icon: 'bi bi-person-badge-fill' },
      { label: 'Nombre', value: this.perfil.nombre, icon: 'bi bi-person-fill' },
      { label: 'Apellido', value: this.perfil.apellido, icon: 'bi bi-person-vcard' },
      { label: 'Email', value: this.perfil.email, icon: 'bi bi-envelope-fill' },
      { label: 'Edad', value: `${this.perfil.edad} años`, icon: 'bi bi-hourglass-bottom' },
      { label: 'Rol', value: this.perfil.rol, icon: 'bi bi-award-fill' },
    ];
  }
}
