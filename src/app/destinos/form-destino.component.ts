import { Component, OnInit } from '@angular/core';
import { Destino } from './destino';
import { DestinoService } from './destino.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-destino',
  templateUrl: './form-destino.component.html'
})
export class FormDestinoComponent implements OnInit{
  
  public destino: Destino = new Destino();
  public errores!: string[];
  
  constructor(
    private destinoService: DestinoService, 
    private router: Router,
    private activateRoute: ActivatedRoute) {}
  
  
    ngOnInit(): void {
      this.cargarDestinos();
    }
  
    cargarDestinos(): void {
      this.activateRoute.params.subscribe(params => {
        let id = params['id']
        if(id) {
          this.destinoService.getDestino(id).subscribe( (destino) => this.destino = destino);
        }
      });
    }
  
    create(): void {
      this.destinoService.create(this.destino).subscribe({
        next: (destino) => {
          this.router.navigate(['/destinos'])
          Swal.fire({
            title: 'Nuevo destino',
            text: `El destino ${destino.nombre} ha sido registrado con exito!`,
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
      this.destinoService.update(this.destino).subscribe({
        next: (destino) => {
          this.router.navigate(['/destinos'])
          Swal.fire({
            title: 'Destino actualizado',
            text: `Destino ${destino.nombre} actualizado con exito!`,
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

}
