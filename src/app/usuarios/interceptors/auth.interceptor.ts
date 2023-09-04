import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../login/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
    return next.handle(req).pipe(
      catchError(e => {
        if(e.status == 401){
          if(this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/index']);
        }
        
        if(e.status == 403){
          Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning');
          this.router.navigate(['/perfil']);
        }
        return throwError(() =>e)
      })
    );
  }
}
