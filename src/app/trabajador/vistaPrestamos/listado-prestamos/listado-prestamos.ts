import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Prestamos } from '../../../models/prestamos/prestamos';
import { PrestamosService } from '../../../service/prestamos/prestamos-service';

@Component({
  selector: 'app-listado-prestamos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado-prestamos.html',
  styleUrl: './listado-prestamos.css',
})
export class ListadoPrestamos implements OnInit {

  prestamos: Prestamos[] = [];
  cargando = true;

  paginaActual = 1;
  tamanoPagina = 20;

  constructor(
    private prestamosService: PrestamosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.cargando = true;

    this.prestamosService.obtenerTodo().subscribe({
      next: (data) => {
        console.log('Prestamos recibidos:', data);
        this.prestamos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar préstamos:', err);
        this.cargando = false;
      }
    });
  }

  eliminarPrestamo(id?: number): void {
    if (!id || !confirm('¿Eliminar este préstamo?')) return;

    this.prestamosService.eliminar(id).subscribe({
      next: () => {
        this.prestamos = this.prestamos.filter(p => p.id_prestamos !== id);
        this.cdr.detectChanges();
        alert('Préstamo eliminado');
      }
    });
  }

  get prestamosPaginados(): Prestamos[] {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return this.prestamos.slice(inicio, inicio + this.tamanoPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.prestamos.length / this.tamanoPagina);
  }

  get inicioRegistro(): number {
    return this.prestamos.length === 0
      ? 0
      : (this.paginaActual - 1) * this.tamanoPagina + 1;
  }

  get finRegistro(): number {
    return Math.min(this.paginaActual * this.tamanoPagina, this.prestamos.length);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  trackById(index: number, item: Prestamos): number {
    return item.id_prestamos!;
  }
}
