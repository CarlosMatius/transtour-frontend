import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndPoint: string = 'http://localhost:8080/v1/reservas';

  constructor(private http: HttpClient, private router: Router) { }

  getReservasPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Reserva[])
        return response;
      }) 
    )
  }

  getReserva(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate(['/reservas']);
        }
        return throwError(() => e);
      })
    );
  }

  create(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.urlEndPoint, reserva);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
        this.router.navigate(['/reservas'])
        return throwError(() => e);
      })
    );
  }
}