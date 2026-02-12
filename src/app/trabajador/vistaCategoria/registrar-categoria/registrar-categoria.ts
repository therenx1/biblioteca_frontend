import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria/categoria';
import { CategoriaService } from '../../../service/categoria/categoria-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registrar-categoria.html',
  styleUrl: './registrar-categoria.css',
})
export class RegistrarCategoria implements OnInit {

  categoria: Categoria = { nombreCategoria: '' };
  esEdicion: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.esEdicion = true;
        this.obtenerDatos(id);
      }
    });
  }

  obtenerDatos(id: number) {
    this.categoriaService.obtenerCategoria(id).subscribe({
      next: (data) => {
        this.categoria = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar categoría', err)
    });
  }

  guardar() {
    if (!this.categoria.nombreCategoria.trim()) return;

    if (this.esEdicion) {
      this.categoriaService.editarCategoria(this.categoria.id_categoria!, this.categoria).subscribe({
        next: () => {
          alert('Categoría actualizada con éxito');
          this.router.navigate(['/vistaCategoria']);
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.categoriaService.agregarCategoria(this.categoria).subscribe({
        next: () => {
          alert('Categoría registrada con éxito');
          this.router.navigate(['/vistaCategoria']);
        },
        error: (err) => console.error('Error al registrar', err)
      });
    }
  }
}