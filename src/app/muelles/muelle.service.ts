import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Muelle } from './muelle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuelleService {

  private urlEndPoint: string = 'http://localhost:8080/v1/muelles';

  constructor(private http: HttpClient, private router: Router) { }

  getMuelles(): Observable<Muelle[]> {
    return this.http.get<Muelle[]>(this.urlEndPoint);
  }
}