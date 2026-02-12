import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Prestamos } from '../../../models/prestamos/prestamos';
import { PrestamosService } from '../../../service/prestamos/prestamos-service';

@Component({
  selector: 'app-detalle-completo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-completo.html',
  styleUrl: './detalle-completo.css',
})
export class DetalleCompleto implements OnInit {

  prestamo?: Prestamos;
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido (detalle completo):', id);

    if (!id) {
      console.error('ID inválido');
      this.cargando = false;
      return;
    }

    this.cargarDetalle(id);
  }

  cargarDetalle(id: number): void {
    this.prestamosService.obtenerPorId(id).subscribe({
      next: (data) => {
        this.prestamo = data;
        this.cargando = false;
        this.cdr.detectChanges();
        console.log('Detalle completo cargado:', data);
      },
      error: (err) => {
        console.error('Error al cargar detalle completo:', err);
        this.cargando = false;
      }
    });
  }

  imprimir(): void {
    window.print();
  }

  generarPDF(): void {
    console.log('Generar PDF préstamo:', this.prestamo?.id_prestamos);
  }
}
