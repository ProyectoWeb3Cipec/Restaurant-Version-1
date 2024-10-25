import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { RouterModule } from '@angular/router';
import { PagoModalComponent } from '../../core/components/pago-modal/pago-modal.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule, PagoModalComponent]
})
export class CarritoComponent implements OnInit {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);

  productosCarrito: Producto[] = [];
  subtotal = 0;
  delivery = 0;
  total = 0;
  mostrarModal = false;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.actualizarProductosCarrito();
  }

  async actualizarProductosCarrito() {
    this.productosCarrito = [];
    for (const itemCarrito of this.cartService.carrito) {
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if (res) {
        this.productosCarrito.push(res);
      }
    }
    this.calcularInformacion();
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
    this.actualizarProductosCarrito();
  }

  calcularInformacion() {
    this.subtotal = this.cartService.carrito.reduce((acc, itemCarrito, index) => {
      const producto = this.productosCarrito[index];
      return acc + (producto ? producto.precio * itemCarrito.cantidad : 0);
    }, 0);
    this.total = this.subtotal + this.delivery;
  }

  recalcularInformacion() {
    this.calcularInformacion();
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad);
    this.calcularInformacion();
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
