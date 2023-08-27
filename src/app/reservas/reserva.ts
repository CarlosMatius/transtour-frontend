import { Itinerario } from "../itinerarios/itinerario";
import { Pago } from "../pagos/pago";
import { Pasajero } from "../pasajeros/pasajero";
import { ResponsableReserva } from "../responsables-reservas/responsable-reserva";

export class Reserva {
    id!: number;
    codigoReserva!: string;
    createdAt!: string;
    total!: number;
    itinerario!: Itinerario;
    responsableReserva!: ResponsableReserva;
    pago!: Pago;
    pasajeros: Array<Pasajero> = [];
}