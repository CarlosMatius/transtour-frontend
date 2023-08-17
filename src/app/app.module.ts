import { NgModule } from '@angular/core';
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
    TiposIdentificacionesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
