import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Libros } from '../../../models/libros/libros';
import { LibrosService } from '../../../service/libros/libros';
import { autoresService } from '../../../service/autores/autores-service';
import { CategoriaService } from '../../../service/categoria/categoria-service';
import { Autores } from '../../../models/autores/autores';
import { Categoria } from '../../../models/categoria/categoria';

@Component({
  selector: 'app-registrar-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-libros.html',
  styleUrls: ['./registrar-libros.css']
})
export class RegistrarLibros implements OnInit {

  nuevoLibro: Libros = {
    titulo: '',
    isbn: '',
    editorial: '',
    anio: 2025,
    autores: undefined,
    categoria: undefined
  };

  listadoAutores: Autores[] = [];
  listadoCategorias: Categoria[] = [];
  esEdicion: boolean = false;

  constructor(
    private librosService: LibrosService,
    private autoresService: autoresService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarAutores();
    this.cargarCategorias();

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.esEdicion = true;
      this.librosService.obtenerLibroPorId(id).subscribe({
        next: (data) => {
          this.nuevoLibro = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar el libro', err)
      });
    }
  }

  cargarAutores() {
    this.autoresService.listarAutores().subscribe(data => this.listadoAutores = data);
  }

  cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe(data => this.listadoCategorias = data);
  }

  guardar() {
    if (this.esEdicion) {
      this.librosService.editarLibros(this.nuevoLibro.id_libros!, this.nuevoLibro).subscribe({
        next: () => {
          alert('Libro actualizado correctamente');
          this.router.navigate(['/vistaLibros']);
        },
        error: (err) => alert('Error al actualizar')
      });
    } else {
      this.librosService.agregarLibros(this.nuevoLibro).subscribe({
        next: () => {
          alert('Libro registrado con éxito');
          this.router.navigate(['/vistaLibros']);
        },
        error: (err) => alert('Error al registrar')
      });
    }
  }

  cancelar() {
    this.router.navigate(['/vistaLibros']);
  }

  compararObjetos(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id_autores === o2.id_autores || o1.id_categoria === o2.id_categoria : o1 === o2;
  }
}