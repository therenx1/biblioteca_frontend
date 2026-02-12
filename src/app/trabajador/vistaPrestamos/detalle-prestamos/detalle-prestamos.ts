import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Prestamos } from '../../../models/prestamos/prestamos';
import { PrestamosService } from '../../../service/prestamos/prestamos-service';
@Component({
  selector: 'app-detalle-prestamos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-prestamos.html',
  styleUrls: ['./detalle-prestamos.css']
})
export class DetallePrestamos implements OnInit {

  prestamo!: Prestamos;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private prestamosService: PrestamosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Id recibido:', id);

    if (isNaN(id)) {
      console.error('Id inválido');
      this.cargando = false;
      return;
    }

    this.prestamosService.obtenerPorId(id).subscribe({
      next: (data) => {
        console.log('Prestamo recibido:', data);
        this.prestamo = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
      }
    });
  }

  imprimir(): void {
    window.print();
  }
}
