import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Autores } from '../../../models/autores/autores';
import { autoresService } from '../../../service/autores/autores-service';

@Component({
  selector: 'app-registrar-autores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registrar-autores.html',
  styleUrls: ['./registrar-autores.css']
})
export class RegistrarAutores implements OnInit {

  nuevoAutor: Autores = {
    nombreAutores: '',
    nacionalidad: ''
  };

  esEdicion: boolean = false;

  constructor(
    private autoresService: autoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.esEdicion = true;
      this.autoresService.obtenerAutores(id).subscribe({
        next: (data) => {
          this.nuevoAutor = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar autor', err)
      });
    }
  }

  guardar() {
    if (this.esEdicion) {
      this.autoresService.editarAutores(this.nuevoAutor.id_autores!, this.nuevoAutor).subscribe({
        next: () => {
          alert('Autor actualizado correctamente');
          this.router.navigate(['/vistaAutores']);
        },
        error: (err) => alert('Error al actualizar')
      });
    } else {
      this.autoresService.agregarAutores(this.nuevoAutor).subscribe({
        next: () => {
          alert('Autor registrado correctamente');
          this.router.navigate(['/vistaAutores']);
        },
        error: (err) => alert('Error al registrar')
      });
    }
  }
}