import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    const cart = localStorage.getItem("cart");
    if (cart) {
      this.carrito = JSON.parse(cart);
    }
  }

  carrito: Cart[] = []

  agregarProducto(idProducto: number, cantidad: number, notas: string) {
    const i = this.carrito.findIndex(producto => producto.idProducto === idProducto);
    if (i === -1) {
      const nuevoProducto: Cart = { idProducto: idProducto, cantidad: cantidad, notas: notas };
      this.carrito.push(nuevoProducto);
    } else {
      this.carrito[i].cantidad += cantidad;
    }
    this.actualizarAlmacenamiento();
  }

  eliminarProducto(idProducto: number) {
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto);
    if (this.carrito.length === 0) return localStorage.clear();
    this.actualizarAlmacenamiento();
  }

  cambiarCantidadProducto(idProducto: number, cantidad: number) {
    this.carrito = this.carrito.map(producto => {
      const productoActual = producto;
      if (productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    })
    this.actualizarAlmacenamiento();
  }
  vaciarCarrito() {
    this.carrito = [];
    localStorage.removeItem("cart");
    this.actualizarAlmacenamiento();
  }

  actualizarAlmacenamiento() {
    localStorage.setItem("cart", JSON.stringify(this.carrito));
  }

}
