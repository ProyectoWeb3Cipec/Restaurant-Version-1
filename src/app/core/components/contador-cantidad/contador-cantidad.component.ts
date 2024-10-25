import { Component, EventEmitter, Input, input, OnInit, Output, signal } from '@angular/core';

@Component({
  selector: 'app-contador-cantidad',
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.css',
  standalone:true,
})
export class ContadorCantidadComponent implements OnInit{
  ngOnInit(): void {
    this.numero.set(this.cantidadInicial)
  }


  numero = signal(1);
  @Output() cantidadCambiada = new EventEmitter<number>;
  @Input() cantidadInicial = 1;

  actualizarnumero(diferencia:number){
    this.numero.set(Math.max(this.numero()+diferencia,1));
    this.cantidadCambiada.emit(this.numero());
  }
}
 