import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { TrabajadorService } from '../../../service/trabajador/trabajador-service';
import { Trabajador } from '../../../models/trabajador/trabajador';

@Component({
  selector: 'app-gestion-auxiliares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-auxiliares.html',
  styleUrls: ['./gestion-auxiliares.css']
})
export class GestionAuxiliaresComponent implements OnInit {

  private trabajadorService = inject(TrabajadorService);

  auxiliares: Trabajador[] = [];
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
    this.cargarAuxiliares();
  }

  cargarAuxiliares(): void {
    this.loading = true;
    this.errorMensaje = '';

    this.trabajadorService.listarTodos().subscribe({
      next: (todos) => {
        console.log('Trabajadores recibidos:', todos);
        this.auxiliares = todos.filter(t => t.rol?.roles === 'Auxiliar de Biblioteca');
        this.loading = false;
      },
      error: (err) => {
        this.errorMensaje = 'Error al cargar la lista de auxiliares';
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

    const nuevoAuxiliar: Trabajador = {
      nombre: formValues.nombre!,
      apellido: formValues.apellido!,
      email: formValues.email!,
      edad: Number(formValues.edad!),
      password: formValues.password!,
      rol: { id_rol: 0, roles: 'Auxiliar de Biblioteca' }
    };

    this.trabajadorService.crearAuxiliar(nuevoAuxiliar).subscribe({
      next: (res) => {
        this.mensaje = 'Auxiliar registrado exitosamente';

        this.auxiliares = [nuevoAuxiliar, ...this.auxiliares];

        this.registroForm.reset();

        setTimeout(() => {
          this.cargarAuxiliares();
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