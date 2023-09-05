import { Component, OnInit } from '@angular/core';
import { Destino } from '../destinos/destino';
import { DestinoService } from '../destinos/destino.service';
import { Router } from '@angular/router';
import { ItinerarioService } from '../itinerarios/itinerario.service';
import { Itinerario } from '../itinerarios/itinerario';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  public destinos!: Destino[];
  public nombreDestino!: string;
  public fechaEmbarque!: string;
  public itinerarios!: Itinerario[];

  constructor(
    private router:Router,
    private destinoService: DestinoService,
    private itinerarioService: ItinerarioService) {}

  ngOnInit(): void {
    this.destinoService.getDestinos().subscribe(destinos => this.destinos = destinos);
  }

  consultar(): void {
    const fechaFormateada = formatDate(this.fechaEmbarque, 'yyyy-MM-dd', 'es-CO');
    this.itinerarioService.consultarItinerarios(fechaFormateada, this.nombreDestino).subscribe({
      next: (itinerarios) => {
        this.itinerarios = itinerarios;
        this.router.navigate(['/resultado'], { state: { data: this.itinerarios } });
      },
      error: (err) => {
        Swal.fire('', err.error.message, 'error');
      }
    });
  }
}