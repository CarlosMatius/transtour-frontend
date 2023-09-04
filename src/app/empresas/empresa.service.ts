import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Empresa } from './empresa';
import { Observable, map, catchError, throwError} from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlEndPoint: string = 'http://localhost:8080/v1/empresas';

  constructor(private http: HttpClient, private router: Router) { }

  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.urlEndPoint);
  }

  getEmpresasPage(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Empresa[])
        return response;
      }) 
    )
  }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post(this.urlEndPoint, empresa).pipe(
      map((response: any) => response.empresa as Empresa),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        return throwError(() => e);
      })
    );
  }

  getEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401) {
          this.router.navigate(['/empresas']);
        }
        return throwError(() => e);
      })
    );
  }

  update(empresa: Empresa): Observable<Empresa> {
    return this.http.put(`${this.urlEndPoint}/${empresa.id}`, empresa).pipe(
      map((response: any) => response.empresa as Empresa),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        this.router.navigate(['/empresas'])
        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${this.urlEndPoint}/${id}`).pipe(
     catchError(e => {
        this.router.navigate(['/empresas'])
        return throwError(() => e);
      })
    );
  } 

  subirFoto(archivo: File, id: number): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id.toString());

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req)
  }
}