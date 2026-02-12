import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth-service';

export const roleGuard= (...allowedRoles: string[]): CanActivateFn => {

  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const rol = authService.getRol();

    if(!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    if(allowedRoles.includes(rol || '')) {
      return true;
    }

    if(rol === 'Administrador') {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/vistaPrincipal']);
    }
    return false;
  };
};
