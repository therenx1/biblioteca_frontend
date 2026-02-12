import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Libros } from '../../../models/libros/libros';
import { LibrosService } from '../../../service/libros/libros';

@Component({
  selector: 'app-listado-libros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-libros.html',
  styleUrl: './listado-libros.css',
})
export class ListadoLibros implements OnInit {

  listadoLibros: Libros[] = [];
  paginaActual: number = 1;
  itemsPorPagina: number = 10;

  constructor(
    private librosService: LibrosService,
    private crd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.librosService.obtenerTodoLibro().subscribe({
      next: (data) => {
        this.listadoLibros = data;
        this.crd.detectChanges();
      },
      error: (err) => console.error('Error al cargar libros', err)
    });
  }

  get librosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.listadoLibros.slice(inicio, fin);
  }

  get totalPaginas() {
    return Math.ceil(this.listadoLibros.length / this.itemsPorPagina);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  eliminar(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.librosService.eliminarLibro(id).subscribe({
        next: () => {
          this.listadoLibros = this.listadoLibros.filter(l => l.id_libros !== id);
          this.crd.detectChanges();
          if (this.librosPaginados.length === 0 && this.paginaActual > 1) {
            this.paginaActual--;
          }
          alert('Libro eliminado correctamente');
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar: El libro tiene préstamos activos.');
        }
      });
    }
  }
}