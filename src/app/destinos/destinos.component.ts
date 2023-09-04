import { Component, OnInit } from '@angular/core';
import { Destino } from './destino';
import { DestinoService } from './destino.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html'
})
export class DestinosComponent implements OnInit{

  destinos!: Destino[];
  titulo: string = "Destino";
  paginador: any;
  enlacePaginador: string = "destinos/page";
  sizePagina: number = 5;

  constructor(
    private destinoService: DestinoService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.destinoService.getDestinosPage(page).subscribe(
          response => {
            this.destinos = response.content as Destino[];
            this.paginador = response;
          } 
        );
      }
    );
  }

  delete(destino: Destino): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro deseas eliminar este destino ${destino.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.destinoService.delete(destino.id).subscribe(
          response => {
            this.destinos = this.destinos.filter(des => des !== destino)
            this.router.navigate(['/destinos'])
            swalWithBootstrapButtons.fire(
              'Destino Eliminado!',
              `Destino ${destino.nombre} eliminado con éxito!.`,
              'success'
            )
          }
        )
      } 
    })
  }

}
