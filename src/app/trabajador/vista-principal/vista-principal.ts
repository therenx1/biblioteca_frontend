import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vista-principal',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './vista-principal.html',
  styleUrl: './vista-principal.css',
})
export class VistaPrincipal implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router); 

  nombreUsuario: string | null = '';

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre');
  }

  cerrarSession() {
    if(confirm('¿Estás seguro que desea cerrar sesión?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}