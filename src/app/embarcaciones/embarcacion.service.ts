import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Embarcacion } from './embarcacion';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmbarcacionService {

  private urlEndPoint: string = 'http://localhost:8080/v1/embarcaciones';

  constructor(private http: HttpClient, private router: Router) { }

  getEmbarcaciones(): Observable<Embarcacion[]> {
    return this.http.get<Embarcacion[]>(this.urlEndPoint);
  }

  getEmbarcacionesPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Embarcacion[])
        return response;
      }) 
    )
  }

  create(embarcacion: Embarcacion): Observable<Embarcacion> {
    return this.http.post(this.urlEndPoint, embarcacion).pipe(
      map((response: any) => response.embarcacion as Embarcacion),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }

  getEmbarcacion(id: number): Observable<Embarcacion> {
    return this.http.get<Embarcacion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate(['/embarcaciones']);
        }
        return throwError(() => e);
      })
    );
  }

  update(embarcacion: Embarcacion): Observable<Embarcacion> {
    return this.http.put(`${this.urlEndPoint}/${embarcacion.id}`, embarcacion).pipe(
      map((response: any) => response.embarcacion as Embarcacion),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        this.router.navigate(['/embarcaciones'])
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Embarcacion> {
    return this.http.delete<Embarcacion>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
        this.router.navigate(['/embarcaciones'])
        return throwError(() => e);
      })
    );
  }
}