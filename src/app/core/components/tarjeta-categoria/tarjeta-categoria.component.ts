import { Component, Input } from '@angular/core';
import { Categoria } from '../../interfaces/categorias';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-categoria',
  templateUrl: './tarjeta-categoria.component.html',
  styleUrls: ['./tarjeta-categoria.component.css'],
  standalone:true,
  imports: [CommonModule]
})
export class TarjetaCategoriaComponent {
@Input({required:true}) categoria!:Categoria;
}
