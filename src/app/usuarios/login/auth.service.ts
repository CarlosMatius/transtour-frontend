import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';
import { Rol } from 'src/app/roles/rol';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!: Usuario;
  private _token!: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if(this._usuario != null) {
      return this._usuario;
    }
    else if(this._usuario == null && sessionStorage.getItem('usuario') != null) {
      const usuarioString = sessionStorage.getItem('usuario');
      if (usuarioString) {
        this._usuario = JSON.parse(usuarioString) as Usuario;
        return this._usuario;
      }
    }
    return new Usuario();
  }
  
  public get token(): string | null {
    if(this._token != null) {
      return this._token;
    }
    else if(this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return null;
  }
  
  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + 'transtour.2023*');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.empresa = payload.empresa;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatosToken(accessToken: string): any {
    if(accessToken !=null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const getToken = this.token;
    if (getToken) {
      let payload = this.obtenerDatosToken(getToken);
      if(payload !=null && payload.user_name && payload.user_name.length > 0) {
        return true;
      }
    }
    return false;
  }
  
  hasRole(nombreRol: any): boolean {
    if (this.usuario != null && this.usuario.roles != null && this.usuario.roles.includes(nombreRol)) {
      return true;
    }
    return false;
  }
  
  logout(): void {
    this._token = null as unknown as string;
    this._usuario = null as unknown as Usuario;
    sessionStorage.clear();
  }

  isTokenExpirado(): boolean {
    let token = this.token;
    if(token) {
      let payload = this.obtenerDatosToken(token);
      let now = new Date().getDate() / 1000;
      if(payload.exp < now) {
        return true;
      }
    }
    return false;
  }
}