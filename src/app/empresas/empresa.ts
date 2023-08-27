import { Embarcacion } from "../embarcaciones/embarcacion";
import { Usuario } from "../usuarios/usuario";

export class Empresa {
    id!: number;
    nombre!: string;
    nit!: string;
    email!: string;
    telefono!: string;
    imagen!: string;
    enabled : boolean = true;
    usuarios: Array<Usuario> = [];
    embarcaciones: Array<Embarcacion> = [];
}