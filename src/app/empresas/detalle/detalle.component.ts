import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-empresa',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
  @Input() empresa!: Empresa;
  titulo: string = "Detalle de la empresa";
  fotoSeleccionada!: File;
  progreso: number = 0;

  constructor(private empresaService: EmpresaService, public modalService:ModalService) {}
  
  ngOnInit():void {}

  seleccionarFoto(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    if(this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Error seleccionar imagen',
        text: 'el archivo debe ser del tipo imagen',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
      this.fotoSeleccionada = new File([], '');
    }
  }

  subirFoto():void {
    if(!this.fotoSeleccionada) {
      Swal.fire({
        title: 'Error Upload',
        text: 'debe seleccionar una imagen',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    }
    else {
      this.empresaService.subirFoto(this.fotoSeleccionada, this.empresa.id).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress && event.total) {
            this,this.progreso = Math.round((event.loaded/event.total)*100);
          }
          else if(event.type === HttpEventType.Response){
            let response: any = event.body;
            this.empresa = response.empresa as Empresa;
            this.modalService.notificarUpload.emit(this.empresa);
            Swal.fire({
              title: 'La imagen se ha subido completamente',
              text:  response.message,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          }
        }
      );
    }
  }

  cerrarModal():void {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = new File([], '');
    this.progreso = 0;
  }
}