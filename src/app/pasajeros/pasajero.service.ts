import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pasajero } from './pasajero';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {
  private urlEndPoint: string = 'http://localhost:8080/v1/pasajeros';

  constructor(private http: HttpClient, private router: Router) { }

  create(pasajero: Pasajero): Observable<Pasajero> {
    return this.http.post(this.urlEndPoint, pasajero).pipe(
      map((response: any) => response.pasajero as Pasajero),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }
}
