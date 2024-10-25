import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule]
})
export class CarritoComponent implements OnInit {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);
  http = inject(HttpClient); 

  productosCarrito: Producto[] = [];
  subtotal = 0;
  delivery = 20;
  total = 0;
  emailCliente: string = 'cliente@ejemplo.com';

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.push(res);
      this.calcularInformacion();
    });
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto);
    this.calcularInformacion(); 
  }

  calcularInformacion() {
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal += this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.delivery;
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad);
    this.calcularInformacion();
  }

  
  enviarMensaje() {
    const data = {
      email: this.emailCliente, 
      total: this.total
    };

    this.http.post('http://localhost:3000/enviar-mensaje', data).subscribe(
      response => {
        console.log('Correo enviado exitosamente', response);
      },
      error => {
        console.error('Error enviando el correo', error);
      }
    );
  }
}
