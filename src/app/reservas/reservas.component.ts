import { Component } from '@angular/core';
import { Reserva } from './reserva';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  reservas!: Reserva[];
  titulo: string = "Reserva";
}
