import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { autoresService } from '../../../service/autores/autores-service';
import { Autores } from '../../../models/autores/autores';


@Component({
  selector: 'app-listado-autores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado-autores.html',
  styleUrls: ['./listado-autores.css']
})
export class ListadoAutores implements OnInit {

  listadoAutores: Autores[] = [];

  constructor(
    private autoresService: autoresService,
    private crd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista() {
    this.autoresService.listarAutores().subscribe({
      next: (data) => {
        this.listadoAutores = data;
        this.crd.detectChanges();
        console.log('Autores cargados:', this.listadoAutores);
      },
      error: (err) => {
        console.error('Error al cargar autores:', err);
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas eliminar este autor?')) {
      this.autoresService.eliminarAutores(id).subscribe({
        next: () => {
          this.listadoAutores = this.listadoAutores.filter(a => a.id_autores !== id);
          this.crd.detectChanges();
          alert('Autor eliminado correctamente');
        },
        error: (err) => {
          console.error(err);
          alert('No se puede eliminar: El autor tiene libros vinculados.');
        }
      });
    }
  }
}