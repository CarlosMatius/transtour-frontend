import { Reserva } from "../reservas/reserva";
import { TipoIdentificacion } from "../tipos-identificaciones/tipo-identificacion";

export class Pasajero {
    id?: number;
    nombre?: string;
    apellido?: string;
    tipoIdentificacion?: TipoIdentificacion;
    identificacion?: string;
    reserva?: Reserva;
}