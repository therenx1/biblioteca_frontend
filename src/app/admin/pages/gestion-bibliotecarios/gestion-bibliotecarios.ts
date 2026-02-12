import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrabajadorService } from '../../../service/trabajador/trabajador-service';
import { Trabajador } from '../../../models/trabajador/trabajador';

@Component({
  selector: 'app-gestion-bibliotecarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-bibliotecarios.html',
  styleUrls: ['./gestion-bibliotecarios.css']
})
export class GestionBibliotecariosComponent implements OnInit {

  private trabajadorService = inject(TrabajadorService);

  bibliotecarios: Trabajador[] = [];
  loading = false;
  mensaje: string = '';
  errorMensaje: string = '';

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.cargarBibliotecarios();
  }

  cargarBibliotecarios(): void {
    this.loading = true;
    this.errorMensaje = '';

    this.trabajadorService.listarTodos().subscribe({
      next: (todos) => {
        console.log('Trabajadores recibidos:', todos);
        this.bibliotecarios = todos.filter(t => t.rol?.roles === 'Bibliotecario');
        this.loading = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar la lista de bibliotecarios';
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMensaje = '';
    this.mensaje = '';

    const formValues = this.registroForm.value;

    const nuevoBibliotecario: Trabajador = {
      nombre: formValues.nombre!,
      apellido: formValues.apellido!,
      email: formValues.email!,
      edad: Number(formValues.edad!),
      password: formValues.password!,
      rol: { id_rol: 0, roles: 'Bibliotecario' } 
    };

    this.trabajadorService.crearBibliotecario(nuevoBibliotecario).subscribe({
      next: (res) => {
        this.mensaje = 'Bibliotecario registrado exitosamente';

        this.bibliotecarios = [nuevoBibliotecario, ...this.bibliotecarios];

        this.registroForm.reset();

        setTimeout(() => {
          this.cargarBibliotecarios();
        }, 800);

        this.loading = false;

        setTimeout(() => this.mensaje = '', 5000);
      },
      error: (err) => {
        this.errorMensaje = err.error || 'Error al registrar (posiblemente email duplicado)';
        this.loading = false;
      }
    });
  }
}