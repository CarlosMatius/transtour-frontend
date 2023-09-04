import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoIdentificacion } from './tipo-identificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  private urlEndPoint: string = 'http://localhost:8080/v1/tipos-identificaciones';
  
  constructor(private http: HttpClient) { }

  getTiposIdentificaciones(): Observable<TipoIdentificacion[]> {
    return this.http.get<TipoIdentificacion[]>(this.urlEndPoint);
  }
}
