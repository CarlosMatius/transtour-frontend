import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  titulo: string = 'Iniciar Session';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estas autenticado`, 'info');
      this.router.navigate(['/perfil']);
    }
  }

  login(): void {
    this.authService.login(this.usuario). subscribe({
      next: (response) => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.router.navigate(['/perfil']);
        Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesion con exito`, 'success');
      },
      error: (err) => {
        if(err.status == 400) {
          Swal.fire('Error Inicio de Sesion', 'Credenciales de acceso incorrectas', 'error')
        }
      }
    });
  }
}
