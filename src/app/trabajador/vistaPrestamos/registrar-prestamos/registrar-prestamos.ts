import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { PrestamosService } from '../../../service/prestamos/prestamos-service';
import { UsuarioService } from '../../../service/usuario/usuario-service';
import { LibrosService } from '../../../service/libros/libros';
import { EstadoLibroService } from '../../../service/estadoLibro/estado-libro';

import { Prestamos } from '../../../models/prestamos/prestamos';
import { Usuario } from '../../../models/usuario/usuario';
import { Libros } from '../../../models/libros/libros';
import { EstadoLibro } from '../../../models/estadoLibro/estado-libro';

@Component({
  selector: 'app-registrar-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registrar-prestamos.html',
  styleUrl: './registrar-prestamos.css',
})
export class RegistrarPrestamos implements OnInit {

  usuarios: Usuario[] = [];
  libros: Libros[] = [];
  estados: EstadoLibro[] = [];

  cargando = false;
  esEdicion = false;
  idPrestamo?: number;

  prestamo: Prestamos = {
    usuario: null,
    libros: null,
    estadoLibro: null,
    fecha_prestamo: '',
    fecha_devolucion: '',
    fecha_real: null,
    multa: 0,
    comentarios: ''
  };

  constructor(
    private prestamosService: PrestamosService,
    private usuarioService: UsuarioService,
    private librosService: LibrosService,
    private estadoService: EstadoLibroService,
    private route: ActivatedRoute,
    private router: Router,
    private crd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCombos();

    this.idPrestamo = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idPrestamo) {
      this.esEdicion = true;
      this.cargarPrestamo(this.idPrestamo);
    }
  }

  cargarCombos(): void {
    this.usuarioService.obtenerTodo().subscribe(d => this.usuarios = d);
    this.librosService.obtenerTodoLibro().subscribe(d => this.libros = d);
    this.estadoService.obtenerTodoEstado().subscribe(d => this.estados = d);
    this.crd.detectChanges();
  }

  cargarPrestamo(id: number): void {
    this.prestamosService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.prestamo = data;
      },
      error: () => {
        alert('Error al cargar préstamo');
        this.router.navigate(['/listadoPrestamos']);
      }
    });
  }

  guardarPrestamo(): void {

    if (!this.prestamo.usuario ||
        !this.prestamo.libros ||
        !this.prestamo.estadoLibro ||
        !this.prestamo.fecha_prestamo ||
        !this.prestamo.fecha_devolucion) {
      alert('Complete los campos obligatorios');
      return;
    }

    this.cargando = true;

    if (this.esEdicion) {
      this.prestamosService.actualizar(this.idPrestamo!, this.prestamo).subscribe({
        next: () => {
          alert('Préstamo actualizado');
          this.router.navigate(['/listadoPrestamos']);
          this.crd.detectChanges();
        },
        error: () => alert('Error al actualizar'),
        complete: () => this.cargando = false
      });
    } else {
      this.prestamosService.crear(this.prestamo).subscribe({
        next: () => {
          alert('Préstamo registrado');
          this.limpiarFormulario();
        },
        error: () => alert('Error al registrar'),
        complete: () => this.cargando = false
      });
    }
  }

  limpiarFormulario(): void {
    this.prestamo = {
      usuario: null,
      libros: null,
      estadoLibro: null,
      fecha_prestamo: '',
      fecha_devolucion: '',
      fecha_real: null,
      multa: 0,
      comentarios: ''
    };
  }
}
