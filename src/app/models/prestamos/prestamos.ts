import { EstadoLibro } from "../estadoLibro/estado-libro";
import { Libros } from "../libros/libros";
import { Usuario } from "../usuario/usuario";

export interface Prestamos {
  id_prestamos?: number;

  usuario: Usuario | null;
  libros: Libros | null;
  estadoLibro: EstadoLibro | null;

  fecha_prestamo: string;
  fecha_devolucion: string;
  fecha_real?: string | null;
  multa?: number;
  comentarios?: string;
}
