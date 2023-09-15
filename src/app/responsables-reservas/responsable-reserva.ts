import { Reserva } from "../reservas/reserva";

export class ResponsableReserva {
    id!: number;
    nombre!: string;
    apellido!: string;
    email!: string;
    telefono!: string;
    reserva!: Reserva;
}