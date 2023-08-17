import { Empresa } from "../empresas/empresa";
import { Rol } from "../roles/rol";
import { TipoIdentificacion } from "../tipos-identificaciones/tipo-identificacion";

export class Usuario {
    id?: number;
    nombre?: string;
    apellido?: string;
    tipoIdentificacion?: TipoIdentificacion;
    identificacion?: string;
    username?: string;
    password?: string;
    enabled?: boolean;
    empresa?: Empresa;
    roles: Array<Rol> = [];
}