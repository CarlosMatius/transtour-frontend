import { Component, OnInit } from '@angular/core';
import { Empresa } from '../empresas/empresa';
import { EmbarcacionService } from './embarcacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../empresas/empresa.service';
import { Embarcacion } from './embarcacion';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/login/auth.service';

@Component({
  selector: 'app-form-embarcacion',
  templateUrl: './form-embarcacion.component.html'
})
export class FormEmbarcacionComponent implements OnInit{
  
  public embarcacion: Embarcacion = new Embarcacion();
  public empresas!: Empresa[];
  public errores!: string[];

  constructor(
    private embarcacionService: EmbarcacionService,
    private empresaService: EmpresaService, 
    private router: Router,
    private activateRoute: ActivatedRoute,
    public authService: AuthService) 
  {}

  ngOnInit(): void {
    this.cargarEmbarcacion();
    this.empresaService.getEmpresas().subscribe(empresas => this.empresas = empresas);
    if (!this.authService.hasRole('ROLE_SUPERADMINISTRADOR')) {
      this.embarcacion.empresa = this.authService.usuario.empresa;
    }
  }

  cargarEmbarcacion(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.embarcacionService.getEmbarcacion(id).subscribe( (embarcacion) => this.embarcacion = embarcacion);
      }
    });
  }

  create(): void {
    this.embarcacionService.create(this.embarcacion).subscribe({
      next: (embarcacion) => {
        this.router.navigate(['/embarcaciones'])
        Swal.fire('Nueva embarcacion', `La embarcacion ${embarcacion.nombre} ha sido registrada con exito!`, 'success')
      },
      error: (err) => {
        this.errores = err.error.error as string[];
      }
    });
  }

  update(): void {
    this.embarcacionService.update(this.embarcacion).subscribe({
      next: (embarcacion) => {
        this.router.navigate(['/embarcaciones'])
        Swal.fire('Embarcacion actualizada', `Embarcacion ${embarcacion.nombre} actualizada con exito!`, 'success')
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    });
  }

  compararEmpresa(o1: Empresa, o2: Empresa): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
