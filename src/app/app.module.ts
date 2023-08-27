import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DestinosComponent } from './destinos/destinos.component';
import { HeaderComponent } from './header/header.component';
import { EmbarcacionesComponent } from './embarcaciones/embarcaciones.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { ItinerariosComponent } from './itinerarios/itinerarios.component';
import { MuellesComponent } from './muelles/muelles.component';
import { PagosComponent } from './pagos/pagos.component';
import { PasajerosComponent } from './pasajeros/pasajeros.component';
import { ReservasComponent } from './reservas/reservas.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRolesComponent } from './usuarios-roles/usuarios-roles.component';
import { ResponsablesReservasComponent } from './responsables-reservas/responsables-reservas.component';
import { TiposIdentificacionesComponent } from './tipos-identificaciones/tipos-identificaciones.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './empresas/form.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';


registerLocaleData(localeES, 'es');

const routes: Routes = [
  {path: '', redirectTo: '/empresas', pathMatch: 'full'},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'empresas', component: EmpresasComponent},
  {path: 'empresas/page/:page', component: EmpresasComponent},
  {path: 'embarcaciones', component: EmbarcacionesComponent},
  {path: 'destinos', component: DestinosComponent},
  {path: 'itinerarios', component: ItinerariosComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'pagos', component: PagosComponent},
  {path: 'empresas/form', component: FormComponent},
  {path: 'empresas/form/:id', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    DestinosComponent,
    HeaderComponent,
    EmbarcacionesComponent,
    EmpresasComponent,
    ItinerariosComponent,
    MuellesComponent,
    PagosComponent,
    PasajerosComponent,
    ReservasComponent,
    RolesComponent,
    UsuariosComponent,
    UsuariosRolesComponent,
    ResponsablesReservasComponent,
    TiposIdentificacionesComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
