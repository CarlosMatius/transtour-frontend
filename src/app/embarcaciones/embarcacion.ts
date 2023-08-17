import { Empresa } from "../empresas/empresa";

export class Embarcacion {
    id?: number;
    nombre?: string;
    capacidad?: number;
    enabled?: boolean;
    empresa?: Empresa;
}