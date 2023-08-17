import { Destino } from "../destinos/destino";
import { Embarcacion } from "../embarcaciones/embarcacion";
import { Muelle } from "../muelles/muelle";

export class Itinerario {
    id?: number;
    fechaEmbarque?: string;
    horaSalida?: string;
    horaRegreso?: string;
    cupos?: number;
    precio?: number;
    embarcacion?: Embarcacion
    destino?: Destino;
    muelle?: Muelle;
}