import { Reserva } from "../reservas/reserva";

export class Pago {
    id?: number;
    nombreComercio?: string;
    descripcion?: string;
    numeroRecibo?: string;
    estado?: string;
    createdAt?: string;
    reserva?: Reserva;
}