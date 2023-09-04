import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoIdentificacionService } from '../tipos-identificaciones/tipo-identificacion.service';
import { TipoIdentificacion } from '../tipos-identificaciones/tipo-identificacion';
import { Empresa } from '../empresas/empresa';
import { EmpresaService } from '../empresas/empresa.service';
import { Rol } from '../roles/rol';
import { RolService } from '../roles/rol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  public usuarioId!:number;
  public tiposIdentificaciones!: TipoIdentificacion[];
  public empresas!: Empresa[];
  public roles!: Rol[];
  public errores!: string[];

  usuarioForm!: FormGroup;
  hide = true;
  
  constructor(
    private usuarioService: UsuarioService,
    private tipoIdentificacionService: TipoIdentificacionService,
    private empresaService: EmpresaService,
    private rolService: RolService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioForm = this.intiForm();
    this.cargarUsuario();
    this.tipoIdentificacionService.getTiposIdentificaciones().subscribe(tipos => this.tiposIdentificaciones = tipos);
    this.empresaService.getEmpresas().subscribe(empresas => this.empresas = empresas);
    this.rolService.getRoles().subscribe(roles => this.roles = roles);
  }

  intiForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: ['', Validators.required],
      empresa: [this.authService.usuario.empresa],
      roles: [''],
    })
  }

  cargarUsuario(): void {
    this.activateRoute.params.subscribe({
      next:(params) => {
        let id = params['id'];
        if (id) {
          this.usuarioId = params['id'];
          this.usuarioService.getUsuario(id).subscribe({
            next:(usuario) => {
              this.usuarioForm.patchValue({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                tipoIdentificacion: usuario.tipoIdentificacion,
                identificacion: usuario.identificacion,
                username: usuario.username,
                password: usuario.password,
                enabled: usuario.enabled,
                empresa: usuario.empresa,
                roles: usuario.roles
              })
            }
          })
        }
      }
    });
  }

  create(): void {
    this.usuarioService.create(this.usuarioForm.value).subscribe({
      next: (usuario) => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Nuevo usuario', `El usuario ${usuario.nombre} ${usuario.apellido} ha sido registrado con exito!`, 'success')
      },
      error: (err) => {
        this.errores = err.error.error as string[];
      }
    });
  }

  update(): void {
    this.usuarioService.update(this.usuarioForm.value, this.usuarioId).subscribe({
      next: (usuario) => {
        this.router.navigate(['/usuarios'])
        Swal.fire('Usuario actualizado', `Usuario ${usuario.nombre} ${usuario.apellido} actualizado con exito!`, 'success')
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
      }
    });
  }

  compararTipoDocumento(o1: TipoIdentificacion, o2: TipoIdentificacion): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compararEmpresa(o1: Empresa, o2: Empresa): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compararRoles(o1: Empresa, o2: Empresa): boolean {
    if(o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
