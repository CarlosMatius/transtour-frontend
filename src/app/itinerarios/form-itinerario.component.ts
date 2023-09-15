import { Component, OnInit } from '@angular/core';
import { Itinerario } from './itinerario';
import { Embarcacion } from '../embarcaciones/embarcacion';
import { Destino } from '../destinos/destino';
import { Muelle } from '../muelles/muelle';
import { ItinerarioService } from './itinerario.service';
import { EmbarcacionService } from '../embarcaciones/embarcacion.service';
import { DestinoService } from '../destinos/destino.service';
import { MuelleService } from '../muelles/muelle.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/login/auth.service';

@Component({
  selector: 'app-form-itinerario',
  templateUrl: './form-itinerario.component.html'
})
export class FormItinerarioComponent implements OnInit{

  public itinerario: Itinerario = new Itinerario();
  public embarcaciones!: Embarcacion[];
  public destinos!: Destino[];
  public muelles!: Muelle[];
  public errores!: string[];

  constructor(
    private itinerarioService: ItinerarioService,
    private embarcacionService: EmbarcacionService,
    private destinoService: DestinoService,
    private muelleService: MuelleService, 
    private router: Router,
    private activateRoute: ActivatedRoute)
  {}

  ngOnInit(): void {
    this.cargarItinerario();
    this.embarcacionService.getEmbarcaciones().subscribe(embarcaciones => this.embarcaciones = embarcaciones);
    this.destinoService.getDestinos().subscribe(destinos => this.destinos = destinos);
    this.muelleService.getMuelles().subscribe(muelles => this.muelles = muelles);
  }

  cargarItinerario(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.itinerarioService.getItinerario(id).subscribe( (itinerario) => this.itinerario = itinerario);
      }
    });
  }

  create(): void {
    console.log('datos ' + this.itinerario.fechaEmbarque);
    this.itinerarioService.create(this.itinerario).subscribe({
      next: () => {
        this.router.navigate(['/itinerarios'])
        Swal.fire({
          title: 'Nuevo itinerario',
          text: 'El itinerario ha sido registrado con exito!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.errores = err.error.error as string[];
      }
  });
  }

  update(): void {
    this.itinerarioService.update(this.itinerario).subscribe({
      next: () => {
        this.router.navigate(['/itinerarios'])
        Swal.fire({
          title: 'itinerario actualizado',
          text: 'Itinerario actualizado con exito!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    });
  }

  compararEmbarcacion(o1: Embarcacion, o2: Embarcacion): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compararDestino(o1: Destino, o2: Destino): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compararMuelle(o1: Muelle, o2: Muelle): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
