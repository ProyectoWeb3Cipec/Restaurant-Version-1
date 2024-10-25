
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  items = [
    { id: 1, nombre: 'Producto 1', descripcion: 'Este es el producto 1' },
    { id: 2, nombre: 'Producto 2', descripcion: 'Este es el producto 2' },
    { id: 3, nombre: 'Producto 3', descripcion: 'Este es el producto 3' },
    // Agrega más items aquí
  ];

  resultados = [];
  terminoDeBusqueda = '';

  ngOnInit(): void {
  }

  buscar(): void {
    this.resultados = this.items.filter(item => {
      return (
        item.nombre.toLowerCase().includes(this.terminoDeBusqueda.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(this.terminoDeBusqueda.toLowerCase())
      );
    });
  }

  limpiarBusqueda(): void {
    this.terminoDeBusqueda = '';
    this.resultados = [];
  }
}