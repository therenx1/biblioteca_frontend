import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../../../models/usuario/usuario';
import { UsuarioService } from '../../../service/usuario/usuario-service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './listado-usuario.html',
  styleUrl: './listado-usuario.css',
})
export class ListadoUsuarios implements OnInit {
  usuarios: Usuario[] = [];

  paginaActual: number = 1;
  usuariosPorPagina: number = 10;

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) { }

  get usuariosPaginados() {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    const fin = inicio + this.usuariosPorPagina;
    return this.usuarios.slice(inicio, fin);
  }

  get totalPaginas() {
    return Math.ceil(this.usuarios.length / this.usuariosPorPagina);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  ngOnInit(): void {
    this.usuarioService.obtenerTodo().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      }
    });
  }

  eliminarUsuario(id: number | undefined) {
    if (!id) return;

    const confirmar = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmar) return;

    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id_usuario !== id);
        if (this.usuariosPaginados.length === 0 && this.paginaActual > 1) {
          this.paginaActual--;
        }

        this.cdr.detectChanges();
        alert('Usuario eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el usuario porque tiene datos relacionados.');
      }
    });
  }
}