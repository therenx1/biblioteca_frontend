import { Routes } from '@angular/router';
import { Login } from './auth/pages/login/login';
import { AdminComponent } from './admin/pages/admin/admin';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin';
import { GestionBibliotecariosComponent } from './admin/pages/gestion-bibliotecarios/gestion-bibliotecarios';
import { GestionAuxiliaresComponent } from './admin/pages/gestion-auxiliares/gestion-auxiliares';
import { PerfilAdminComponent } from './admin/pages/perfil-admin/perfil-admin';
import { VistaPrincipal } from './trabajador/vista-principal/vista-principal';
import { roleGuard } from './security/guards/role-guard';
import { authGuard } from './security/guards/auth-guards-guard';
import { ListadoPrestamos } from './trabajador/vistaPrestamos/listado-prestamos/listado-prestamos';
import { Perfil } from './trabajador/vistaPerfil/perfil/perfil';
import { RegistrarPrestamos } from './trabajador/vistaPrestamos/registrar-prestamos/registrar-prestamos';
import { DetallePrestamos } from './trabajador/vistaPrestamos/detalle-prestamos/detalle-prestamos';
import { DetalleCompleto } from './trabajador/vistaPrestamos/detalle-completo/detalle-completo';
import { ListadoCategoria } from './trabajador/vistaCategoria/listado-categoria/listado-categoria';
import { RegistrarCategoria } from './trabajador/vistaCategoria/registrar-categoria/registrar-categoria';
import { RegistrarUsuario } from './trabajador/vistaUsuario/registrar-usuario/registrar-usuario';
import { ListadoUsuarios } from './trabajador/vistaUsuario/listado-usuario/listado-usuario';
import { ListadoAutores } from './trabajador/vistaAutores/listado-autores/listado-autores';
import { RegistrarAutores } from './trabajador/vistaAutores/registrar-autores/registrar-autores';
import { ListadoLibros } from './trabajador/vistaLibros/listado-libros/listado-libros';
import { RegistrarLibros } from './trabajador/vistaLibros/registrar-libros/registrar-libros';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard('Administrador')],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardAdminComponent },
      { path: 'bibliotecarios', component: GestionBibliotecariosComponent },
      { path: 'auxiliares', component: GestionAuxiliaresComponent },
      { path: 'perfil', component: PerfilAdminComponent }
    ]
  },

  {
    path: 'vistaPrincipal',
    component: VistaPrincipal,
    canActivate: [roleGuard('Bibliotecario', 'Auxiliar de Biblioteca')]
  },
  {
    path: 'vistaCategoria',
    component: ListadoCategoria,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'registrarCategoria',
    component: RegistrarCategoria,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'categoria/editar/:id',
    component: RegistrarCategoria,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'vistaUsuarios',
    component: ListadoUsuarios,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'registrarUsuario',
    component: RegistrarUsuario,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'VistaUsuarios/editar/:id',
    component: RegistrarUsuario,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'vistaAutores',
    component: ListadoAutores,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'registrarAutores',
    component: RegistrarAutores,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'autores/editar/:id',
    component: RegistrarAutores,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'categoria/editar/:id',
    component: RegistrarCategoria,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'listadoPrestamos',
    component: ListadoPrestamos,
    canActivate: [roleGuard('Bibliotecario', 'Auxiliar de Biblioteca')]
  },
  {
    path: 'registrarPrestamos',
    component: RegistrarPrestamos,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'editar-prestamo/:id',
    component: RegistrarPrestamos,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'detalle-prestamo/:id',
    component: DetallePrestamos,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'detalleCompleto/:id',
    component: DetalleCompleto,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'vistaLibros',
    component: ListadoLibros,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'registrarLibros',
    component: RegistrarLibros,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'libros/editar/:id',
    component: RegistrarLibros,
    canActivate: [roleGuard('Bibliotecario')]
  },
  {
    path: 'verPerfil',
    component: Perfil,
    canActivate: [roleGuard('Bibliotecario')]
  }

];