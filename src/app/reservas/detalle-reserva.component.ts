import { Component, OnInit } from '@angular/core';
import { ReservaService } from './reserva.service';
import { Reserva } from './reserva';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html'
})
export class DetalleReservaComponent implements OnInit{

  reserva!: Reserva;
  titulo: string = 'Reserva';
  
  constructor(private reservaService: ReservaService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.reservaService.getReserva(id).subscribe( (reserva) => this.reserva = reserva);
      }
    });
  }
}