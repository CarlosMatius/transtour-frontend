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
      Swal.fire('Error seleccionar imagen', 'el archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = new File([], '');
    }
  }

  subirFoto():void {
    if(!this.fotoSeleccionada) {
      Swal.fire('Error Upload', 'debe seleccionar una imagen', 'error')
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
            Swal.fire('La imagen se ha subido completamente', response.message, 'success');
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