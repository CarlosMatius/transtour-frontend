import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit{
  
  usuarios!: Usuario[];
  titulo: string = "Usuario";
  paginador: any;
  enlacePaginador: string = "usuarios/page";
  sizePagina: number = 5;

  constructor(
    private usuarioService: UsuarioService, 
    private activatedRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let pageParam = params.get('page');
        let page: number = pageParam ? +pageParam : 0;

        this.usuarioService.getUsuarios(page).subscribe(
          response => {
            this.usuarios = response.content as Usuario[];
            this.paginador = response;
          }
        );
      }
    );
  }

  delete(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro deseas eliminar este usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(usu => usu !== usuario)
            this.router.navigate(['/usuarios'])
            swalWithBootstrapButtons.fire(
              'Usuario Eliminado!',
              `Usuario ${usuario.nombre} eliminado con éxito!.`,
              'success'
            )
          }
        )
      } 
    })
  }
}