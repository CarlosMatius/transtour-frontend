import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from './destino';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {

  private urlEndPoint: string = 'http://localhost:8080/v1/destinos';

  constructor(private http: HttpClient, private router: Router) { }

  getDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(this.urlEndPoint);
  }

  getDestinosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Destino[])
        return response;
      }) 
    )
  }

  create(destino: Destino): Observable<Destino> {
    return this.http.post(this.urlEndPoint, destino).pipe(
      map((response: any) => response.destino as Destino),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }

  getDestino(id: number): Observable<Destino> {
    return this.http.get<Destino>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate(['/destinos']);
        }
        return throwError(() => e);
      })
    );
  }

  update(destino: Destino): Observable<Destino> {
    return this.http.put(`${this.urlEndPoint}/${destino.id}`, destino).pipe(
      map((response: any) => response.destino as Destino),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        this.router.navigate(['/destinos'])
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Destino> {
    return this.http.delete<Destino>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
        this.router.navigate(['/destinos'])
        return throwError(() => e);
      })
    );
  }
}
