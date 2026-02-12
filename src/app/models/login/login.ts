export interface Login {
    id_trabajador?: number;
    nombre: string;
    apellido: string;
    email: string;
    edad: number;
    password?: string;
    id_rol?: number;
    activo?: boolean;
}
