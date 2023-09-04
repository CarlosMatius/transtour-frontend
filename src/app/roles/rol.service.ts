import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private urlEndPoint: string = 'http://localhost:8080/v1/roles';
  
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlEndPoint);
  }
}