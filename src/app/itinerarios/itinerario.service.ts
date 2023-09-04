import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Itinerario } from './itinerario';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {

  private urlEndPoint: string = 'http://localhost:8080/v1/itinerarios';

  constructor(private http: HttpClient, private router: Router) { }

  getItinerarios(): Observable<Itinerario[]> {
    return this.http.get<Itinerario[]>(this.urlEndPoint);
  }

  getItinerariosPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Itinerario[])
        return response;
      }) 
    )
  }

  create(itinerario: Itinerario): Observable<Itinerario> {
    return this.http.post(this.urlEndPoint, itinerario).pipe(
      map((response: any) => response.itinerario as Itinerario),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }

  getItinerario(id: number): Observable<Itinerario> {
    return this.http.get<Itinerario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate(['/itinerarios']);
        }
        return throwError(() => e);
      })
    );
  }

  update(itinerario: Itinerario): Observable<Itinerario> {
    return this.http.put(`${this.urlEndPoint}/${itinerario.id}`, itinerario).pipe(
      map((response: any) => response.itinerario as Itinerario),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        this.router.navigate(['/itinerarios'])
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Itinerario> {
    return this.http.delete<Itinerario>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
        this.router.navigate(['/itinerarios'])
        return throwError(() => e);
      })
    );
  }
}