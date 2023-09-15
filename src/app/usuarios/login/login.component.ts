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
      Swal.fire({
        title: 'Login',
        text: `Hola ${this.authService.usuario.username}, ya estás autenticado`,
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      });
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
        Swal.fire({
          title: 'Login',
          text: `Hola ${usuario.username}, has iniciado sesion con exito`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        if(err.status == 400) {
          Swal.fire({
            title: 'Error Inicio de Sesion',
            text: 'Credenciales de acceso incorrectas',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
          });
        }
      }
    });
  }
}
