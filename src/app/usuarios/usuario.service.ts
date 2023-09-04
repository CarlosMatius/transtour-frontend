import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/v1/usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Usuario[])
        return response;
      }) 
    )
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post(this.urlEndPoint, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate(['/usuarios']);
        }
        return throwError(() => e);
      })
    );
  }

  update(usuario: Usuario, id: number): Observable<Usuario> {
    return this.http.put(`${this.urlEndPoint}/${id}`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        this.router.navigate(['/usuarios'])
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuarios'])
        return throwError(() => e);
      })
    );
  }
}