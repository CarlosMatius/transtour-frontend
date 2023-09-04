import { Component, OnInit } from '@angular/core';
import { Embarcacion } from './embarcacion';
import { EmbarcacionService } from './embarcacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-embarcaciones',
  templateUrl: './embarcaciones.component.html'
})
export class EmbarcacionesComponent implements OnInit{

  embarcaciones!: Embarcacion[];
  titulo: string = "Embarcacion";
  paginador: any;
  enlacePaginador: string = "embarcaciones/page";
  sizePagina: number = 5;

  constructor(
    private embarcacionService: EmbarcacionService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.embarcacionService.getEmbarcacionesPage(page).subscribe(
          response => {
            this.embarcaciones = response.content as Embarcacion[];
            this.paginador = response;
          } 
        );
      }
    );
  }

  delete(embarcacion: Embarcacion): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro deseas eliminar esta embarcacion ${embarcacion.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.embarcacionService.delete(embarcacion.id).subscribe(
          response => {
            this.embarcaciones = this.embarcaciones.filter(emb => emb !== embarcacion)
            this.router.navigate(['/embarcaciones'])
            swalWithBootstrapButtons.fire(
              'Embarcacion Eliminada!',
              `Embarcacion ${embarcacion.nombre} eliminada con éxito!.`,
              'success'
            )
          }
        )
      } 
    })
  }

}
