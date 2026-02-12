import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario/usuario';
import { UsuarioService } from '../../../service/usuario/usuario-service';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registrar-usuario.html',
  styleUrl: './registrar-usuario.css',
})
export class RegistrarUsuario implements OnInit {
  usuario: Usuario = {
    nombre_usuario: '',
    apellido_usuario: '',
    dni: '',
    correo: '',
    telefono: '',
    direccion: '',
    genero: '',
    fecha_nacimiento: ''
  };

  esEdicion: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.esEdicion = true;
        this.usuarioService.obtenerUsuario(id).subscribe({
          next: (data) => {
            this.usuario = data;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error al cargar usuario', err)
        });
      }
    });
  }

  guardar() {
    if (this.esEdicion) {
      this.usuarioService.editarUsuario(this.usuario.id_usuario!, this.usuario).subscribe({
        next: () => {
          alert('Usuario actualizado con éxito');
          this.router.navigate(['/VistaUsuarios']);
        },
        error: (err) => alert('Error al actualizar el usuario')
      });
    } else {
      this.usuarioService.agregarUsuario(this.usuario).subscribe({
        next: () => {
          alert('Usuario registrado con éxito');
          this.router.navigate(['/VistaUsuarios']);
        },
        error: (err) => alert('Error al registrar el usuario')
      });
    }
  }
}