import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DestinosComponent } from './destinos/destinos.component';
import { HeaderComponent } from './header/header.component';
import { EmbarcacionesComponent } from './embarcaciones/embarcaciones.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { ItinerariosComponent } from './itinerarios/itinerarios.component';
import { PagosComponent } from './pagos/pagos.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { ReservasComponent } from './reservas/reservas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ResponsablesReservasComponent } from './responsables-reservas/responsables-reservas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './empresas/detalle/detalle.component';
import { FormUsuarioComponent } from './usuarios/form-usuario.component';
import { FormEmbarcacionComponent } from './embarcaciones/form-embarcacion.component';
import { FormDestinoComponent } from './destinos/form-destino.component';
import { FormEmpresaComponent } from './empresas/form-empresa.component';
import { FormItinerarioComponent } from './itinerarios/form-itinerario.component';
import { IndexComponent } from './index/index.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './usuarios/login/login.component';
import { authGuard } from './usuarios/guards/auth.guard';
import { roleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { ResultadoComponent } from './itinerarios/resultado/resultado.component';
import { DetalleReservaComponent } from './reservas/detalle-reserva.component';
import { FormReservaComponent } from './reservas/form-reserva.component';

import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

registerLocaleData(localeES, 'es');

const routes: Routes = [

  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'resultado', component: ResultadoComponent},
  {path: 'perfil', component: PerfilComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR', 'ROLE_ASESOR']}},
  
  {path: 'usuarios', component: UsuariosComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'usuarios/form', component: FormUsuarioComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'usuarios/form/:id', component: FormUsuarioComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'usuarios/page/:page', component: UsuariosComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
   
  {path: 'empresas', component: EmpresasComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  {path: 'empresas/form', component: FormEmpresaComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  {path: 'empresas/form/:id', component: FormEmpresaComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  {path: 'empresas/page/:page', component: EmpresasComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  
  {path: 'embarcaciones', component: EmbarcacionesComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'embarcaciones/form', component: FormEmbarcacionComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'embarcaciones/form/:id', component: FormEmbarcacionComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'embarcaciones/page/:page', component: EmbarcacionesComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  
  {path: 'destinos', component: DestinosComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  {path: 'destinos/form', component: FormDestinoComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  {path: 'destinos/form/:id', component: FormDestinoComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},
  {path: 'destinos/page/:page', component: DestinosComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR']}},

  {path: 'itinerarios', component: ItinerariosComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR', 'ROLE_ASESOR']}},
  {path: 'itinerarios/form', component: FormItinerarioComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'itinerarios/form/:id', component: FormItinerarioComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR']}},
  {path: 'itinerarios/page/:page', component: ItinerariosComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR', 'ROLE_ASESOR']}},
  
  {path: 'reservas', component: ReservasComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR', 'ROLE_ASESOR']}},
  {path: 'reservas/page/:page', component: ReservasComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR', 'ROLE_ASESOR']}},
  {path: 'reservas/:id', component: DetalleReservaComponent, canActivate:[authGuard, roleGuard], data: { role:['ROLE_SUPERADMINISTRADOR', 'ROLE_ADMINISTRADOR', 'ROLE_ASESOR']}},
  {path: 'reservas/form/:itinerarioId', component: FormReservaComponent},
    
  
  
  {path: 'pagos', component: PagosComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    DestinosComponent,
    HeaderComponent,
    EmbarcacionesComponent,
    EmpresasComponent,
    ItinerariosComponent,
    PagosComponent,
    PasajerosComponent,
    ReservasComponent,
    UsuariosComponent,
    ResponsablesReservasComponent,
    FormEmpresaComponent,
    PaginatorComponent,
    DetalleComponent,
    FormUsuarioComponent,
    FormEmbarcacionComponent,
    FormDestinoComponent,
    FormItinerarioComponent,
    LoginComponent,
    IndexComponent,
    PerfilComponent,
    ResultadoComponent,
    DetalleReservaComponent,
    FormReservaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
