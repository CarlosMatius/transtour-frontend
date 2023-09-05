import { Component} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Itinerario } from '../itinerario';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent{
  
  public itinerarios!: Itinerario[];

  constructor(private route: ActivatedRoute) {
    const navigationState = window.history.state;
    if (navigationState && navigationState.data) {
      this.itinerarios = navigationState.data;
    }
  }
}
