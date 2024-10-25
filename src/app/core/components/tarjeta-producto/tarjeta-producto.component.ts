import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/productos';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class TarjetaProductoComponent {
  @Input({required:true}) producto!:Producto;
}
