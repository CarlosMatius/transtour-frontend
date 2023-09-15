import { Component, OnInit, ViewChild } from '@angular/core';
import { Reserva } from './reserva';
import { ItinerarioService } from '../itinerarios/itinerario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoIdentificacion } from '../tipos-identificaciones/tipo-identificacion';
import { TipoIdentificacionService } from '../tipos-identificaciones/tipo-identificacion.service';
import { Pasajero } from '../pasajeros/pasajero';
import { PasajeroService } from '../pasajeros/pasajero.service';
import { NgForm } from '@angular/forms';
import { ReservaService } from './reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-reserva',
  templateUrl: './form-reserva.component.html'
})
export class FormReservaComponent implements OnInit{

  public titulo: string = 'Nueva Reserva';
  public reserva: Reserva = new Reserva();
  public pasajero: Pasajero = new Pasajero();
  public tiposIdentificaciones!: TipoIdentificacion[];
  public errores!: string[];

  constructor(
    private itinerarioService: ItinerarioService,
    private activatedRoute: ActivatedRoute,
    private tipoIdentificacionService: TipoIdentificacionService,
    private reservaService: ReservaService,
    private router: Router) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let parametroId = params.get('itinerarioId');
      if (parametroId !== null) {
        let itinerarioId = +parametroId;
        this.itinerarioService.getItinerario(itinerarioId).subscribe(itinerio => this.reserva.itinerario = itinerio);
      }
    });
    this.reserva.codigoReserva = this.generarCodigo(6);
    this.tipoIdentificacionService.getTiposIdentificaciones().subscribe(tipos => this.tiposIdentificaciones = tipos);
  }

  generarCodigo(n: number): string {
    let result = '';
    const chars = 'ab0cd1ef2gh3ij4kl5mn6op7qr8st9uvwxyz'
    for (let i = 0; i < n; i++){
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  agregarPasajero(): void {
    this.reserva.pasajeros.push(this.pasajero);
    console.log(this.reserva.pasajeros);
    console.log(this.reserva);
    
    /*this.pasajeroService.create(this.pasajero).subscribe({
      next: (pasajero) => {
        if (!this.reserva.pasajeros) {
          this.reserva.pasajeros = [];
        }
        this.reserva.pasajeros.push(pasajero);
        console.log(this.reserva.pasajeros);
      },
      error: (err) => {this.errores = err.error.error as string[];}
    });*/
  }

  create(): void {
    console.log(this.reserva);
    this.reserva.total = 8;
    this.reservaService.create(this.reserva).subscribe({
      next: (reserva) => {
        Swal.fire(this.titulo, `Reserva creada con exito`, 'success');
        this.router.navigate(['/perfil']);
      },
    })
  }
}
