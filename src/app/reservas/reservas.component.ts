import { Component, OnInit } from '@angular/core';
import { Reserva } from './reserva';
import { ReservaService } from './reserva.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../usuarios/login/auth.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
})
export class ReservasComponent implements OnInit{
  reservas!: Reserva[];
  titulo: string = "Reserva";
  paginador: any;
  enlacePaginador: string = "reservas/page";
  sizePagina: number = 5;

  constructor(
    private reservaService: ReservaService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.reservaService.getReservasPage(page).subscribe(
          response => {
            this.reservas = response.content as Reserva[];
            this.paginador = response;
          } 
        );
      }
    );
  }

  delete(reserva: Reserva): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro deseas eliminar esta reserva ${reserva.codigoReserva}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.delete(reserva.id).subscribe(
          () => {
            this.reservas = this.reservas.filter(res => res !== reserva)
            this.router.navigate(['/reservas'])
            swalWithBootstrapButtons.fire(
              'Reserva Eliminada!',
              `Reserva ${reserva.codigoReserva} eliminada con éxito!.`,
              'success'
            )
          }
        )
      } 
    })
  }
}
