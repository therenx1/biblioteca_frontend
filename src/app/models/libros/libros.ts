import { Autores } from "../autores/autores";
import { Categoria } from "../categoria/categoria";
import { EstadoLibro } from "../estadoLibro/estado-libro";

export interface Libros {
    id_libros?: number;
    titulo: string;
    anio: number;
    isbn: string;
    editorial: string;
    autores?: Autores;
    categoria?: Categoria;
    estadoLibro?: EstadoLibro;
}
