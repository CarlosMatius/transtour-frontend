import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html'
})
export class EmpresasComponent implements OnInit{

  empresas!: Empresa[];
  paginador: any;

  constructor(private empresaService: EmpresaService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.empresaService.getEmpresas(page).subscribe(
          response => {
            this.empresas = response.content as Empresa[];
            this.paginador = response;
          } 
        );
      }
    );
  }

  delete(empresa: Empresa): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro deseas eliminar esta empresa ${empresa.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaService.delete(empresa.id).subscribe(
          response => {
            this.empresas = this.empresas.filter(emp => emp !== empresa)
            swalWithBootstrapButtons.fire(
              'Empresa Eliminada!',
              `Empresa ${empresa.nombre} eliminada con éxito!.`,
              'success'
            )
          }
        )
      } 
    })
  }
}
