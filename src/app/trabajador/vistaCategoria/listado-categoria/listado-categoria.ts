import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../../models/categoria/categoria';
import { CategoriaService } from '../../../service/categoria/categoria-service';

@Component({
  selector: 'app-listado-categoria',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado-categoria.html',
  styleUrl: './listado-categoria.css',
})
export class ListadoCategoria implements OnInit {

  Lcategorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.Lcategorias = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al listar categorías', err);
      }
    });
  }

  eliminarCategoria(id: number) {
    const confirmar = confirm('¿Estás seguro de eliminar esta categoría?');

    if (!confirmar) return;

    this.categoriaService.eliminarCategoria(id).subscribe({
      next: () => {
        this.categoriaService.listarCategorias().subscribe(data => {
          this.Lcategorias = data;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error al eliminar categoría', err);
        alert('No se pudo eliminar la categoría');
      }
    });
  }

}
