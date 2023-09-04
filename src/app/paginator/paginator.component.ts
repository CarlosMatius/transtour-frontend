import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges{
  
  @Input() paginador: any;
  @Input() enlacePaginador!: string;
  @Input() sizePagina!: number;
  paginas!: number[];

  desde!: number;
  hasta!: number;

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let paginadorAcualizado = changes['paginador'];

    if(paginadorAcualizado.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number-this.sizePagina), this.paginador.totalPages-(this.sizePagina+1));
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number+this.sizePagina), this.sizePagina+1);

    if(this.paginador.totalPages > this.sizePagina) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde)
    }
    else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1)
    }
  }
}