import { Component, OnDestroy, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/login/auth.service';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas!: Empresa[];
  titulo: string = "Empresa";
  paginador: any;
  enlacePaginador: string = "empresas/page";
  sizePagina: number = 5;
  empresaSeleccionada!: Empresa;

  constructor(
    private empresaService: EmpresaService, 
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
    public authService: AuthService
  ){}
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.empresaService.getEmpresasPage(page).subscribe(
          response => {
            this.empresas = response.content as Empresa[];
            this.paginador = response;
          } 
        );
      }
    );

    this.modalService.notificarUpload.subscribe(
      empresa => {
        this.empresas = this.empresas.map(
          empresaOriginal => {
            if(empresa.id == empresaOriginal.id) {
              empresaOriginal.imagen = empresa.imagen;
            }
            return empresaOriginal;
          }
        )
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
          () => {
            this.empresas = this.empresas.filter(emp => emp !== empresa)
            this.router.navigate(['/empresas'])
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

  abrilModal(empresa: Empresa): void {
    this.empresaSeleccionada = empresa;
    this.modalService.abrilModal();
  }
}