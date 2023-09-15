import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form-empresa.component.html'
})
export class FormEmpresaComponent implements OnInit{

  public empresa: Empresa = new Empresa();
  public errores!: string[];

  constructor(
    private empresaService: EmpresaService, 
    private router: Router,
    private activateRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.cargarEmpresa()
  }

  cargarEmpresa(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.empresaService.getEmpresa(id).subscribe( (empresa) => this.empresa = empresa)
      }
    });
  }

  create(): void {
    this.empresaService.create(this.empresa).subscribe({
      next: (empresa) => {
        this.router.navigate(['/empresas'])
        Swal.fire({
          title: 'Nueva empresa',
          text: `La empresa ${empresa.nombre} ha sido registrada con exito!`,
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
    this.empresaService.update(this.empresa).subscribe({
      next: (empresa) => {
        this.router.navigate(['/empresas'])
        Swal.fire({
          title: 'Empresa actualizada',
          text: `Empresa ${empresa.nombre} actualizada con exito!`,
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
