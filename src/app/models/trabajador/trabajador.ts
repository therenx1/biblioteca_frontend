import { Roles } from "../roles/roles";

export interface Trabajador {
  id_trabajador?: number;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  password?: string; 
  rol?: Roles;

}
