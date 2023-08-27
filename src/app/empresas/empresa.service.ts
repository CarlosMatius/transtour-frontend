import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from './empresa';
import { Observable, map, catchError, throwError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlEndPoint: string = 'http://localhost:8080/v1/empresas';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  /*getEmpresas(): Observable<Empresa[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Empresa[])
    );
  }
  */

  getEmpresas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Empresa[])
        return response;
      }) 
    )
  }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post(this.urlEndPoint, empresa, {headers: this.httpHeader}).pipe(
      map((response: any) => response.empresa as Empresa),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/empresas'])
        Swal.fire('Error al actualizar la empresa', e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  update(empresa: Empresa): Observable<Empresa> {
    return this.http.put(`${this.urlEndPoint}/${empresa.id}`, empresa, {headers: this.httpHeader}).pipe(
      map((response: any) => response.empresa as Empresa),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        this.router.navigate(['/empresas'])
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeader}).pipe(
      catchError(e => {
        this.router.navigate(['/empresas'])
        Swal.fire(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }
}