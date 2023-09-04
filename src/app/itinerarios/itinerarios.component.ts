import { Component, OnInit } from '@angular/core';
import { Itinerario } from './itinerario';
import { ItinerarioService } from './itinerario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/login/auth.service';

@Component({
  selector: 'app-itinerarios',
  templateUrl: './itinerarios.component.html'
})
export class ItinerariosComponent implements OnInit{
  
  itinerarios!: Itinerario[];
  titulo: string = "Itinerario";
  paginador: any;
  enlacePaginador: string = "itinerarios/page";
  sizePagina: number = 5;
  
  constructor(
    private itinerarioService: ItinerarioService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.itinerarioService.getItinerariosPage(page).subscribe(
          response => {
            this.itinerarios = response.content as Itinerario[];
            this.paginador = response;
          } 
        );
      }
    );
  }

  delete(itinerario: Itinerario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro deseas eliminar este itinerario?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.itinerarioService.delete(itinerario.id).subscribe(
          response => {
            this.itinerarios = this.itinerarios.filter(iti => iti !== itinerario)
            this.router.navigate(['/itinerarios'])
            swalWithBootstrapButtons.fire(
              'Itinerario Eliminado!',
              `Itinerario eliminado con éxito!.`,
              'success'
            )
          }
        )
      } 
    })
  }
}
