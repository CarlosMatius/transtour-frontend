import { Component, OnInit } from '@angular/core';
import { Itinerario } from '../itinerario';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html'
})
export class ResultadoComponent {

  public itinerarios!: Itinerario[];

  constructor() {
    const navigationState = window.history.state;
    if (navigationState && navigationState.data) {
      this.itinerarios = navigationState.data;
    }
  }
}
