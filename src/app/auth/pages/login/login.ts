import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AuthService } from '../../../service/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  errorLogin: boolean = false;
  loading: boolean = false;
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorLogin = false;

    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
        
        switch (response.rol) {
          case 'Administrador':
            this.router.navigate(['/admin']);
            break;
          case 'Bibliotecario':
            this.router.navigate(['/vistaPrincipal']);
            break;
          default:
            this.router.navigate(['/vistaPrincipal']);
        }
      },
      error: (err) => {
        console.error('Error en login', err);
        this.errorLogin = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      const rol = this.authService.getRol();
      if(rol === 'Administrador') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/vistaPrincipal']);
      }
    }
  }
}