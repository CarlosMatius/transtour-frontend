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
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit{

  public destinos!: Destino[];
  public nombreDestino!: string;
  public fechaEmbarque!: string;
  public itinerarios!: Itinerario[];
  loading = false;

  constructor(
    private router:Router,
    private destinoService: DestinoService,
    private itinerarioService: ItinerarioService) {}

  ngOnInit(): void {
    this.destinoService.getDestinos().subscribe(destinos => this.destinos = destinos);
    this.loading=false;
  }

  consultar(): void {
    const fechaFormateada = formatDate(this.fechaEmbarque, 'yyyy-MM-dd', 'es-CO');
    this.itinerarioService.consultarItinerarios(fechaFormateada, this.nombreDestino).subscribe({

      next: (itinerarios) => {
        this.loading = true;
        setTimeout(() => {
          this.itinerarios = itinerarios;
          this.router.navigate(['/resultado'], { state: { data: this.itinerarios } });
        }, 1500);

      },
      error: (err) => {
        this.loading = true;
        setTimeout(() => {
          Swal.fire({
            title: '',
            text: err.error.message,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
          this.loading = false;
        }, 1500);
      }
    });
  }
}