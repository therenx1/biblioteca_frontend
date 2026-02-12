import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth-service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  gestionDropdownOpen = false;
  mensaje = '';

  cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  notificar(msj: string) {
    this.mensaje = msj;
    setTimeout(() => this.mensaje = '', 4000);
  }
}