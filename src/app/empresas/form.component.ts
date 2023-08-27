import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';
import { EmpresaService } from './empresa.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{

  public empresa: Empresa = new Empresa();
  public titulo: string = "Registrar Empresa";
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
        Swal.fire('Nueva empresa', `La empresa ${empresa.nombre} ha sido registrada con exito!`, 'success')
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
        Swal.fire('Empresa actualizada', `Empresa ${empresa.nombre} actualizada con exito!`, 'success')
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    });
  }
}
