import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { RouterModule } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone:true,
  imports: [CommonModule, ContadorCantidadComponent, RouterModule, FormsModule]
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);
  metodoPago: 'QR' | 'Efectivo' = 'QR'; 
  monto: number = 100;  
  pagoRealizado: number = 0;  
  estadoTransaccion: string = 'Pendiente'; 

  productosCarrito:Producto[]=[];

  subtotal = 0;
  delivery = 20;
  total = 0;

  ngOnInit(): void {
      this.headerService.titulo.set("Carrito")
      this.cartService.carrito.forEach(async itemCarrito =>{
        const res = await this.productosService.getById(itemCarrito.idProducto) 
        if(res) this.productosCarrito.push(res);
        this.calcularInformacion();
      })
  }
  eliminarProducto(idProducto:number){
  this.cartService.eliminarProducto(idProducto);
  }
  calcularInformacion (){
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal += this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.delivery;
    this.calcularInformacion();
  }

cambiarCantidadProducto(id:number, cantidad:number){
    this.cartService.cambiarCantidadProducto(id, cantidad)
    this.calcularInformacion();
  }

  
  
  constructor(private paymentService: PaymentService) {}
  verificarPago(): void {
    const transaccion = {
      metodo: this.metodoPago,
      monto: this.monto,
      pagoRealizado: this.pagoRealizado,
      estado: 'Pendiente' as 'Pendiente' | 'Pagado',
    };

    const resultado = this.paymentService.verificarPago(transaccion);
    this.estadoTransaccion = resultado.estado;

    if (this.metodoPago === 'Efectivo' && resultado.estado === 'Pagado') {
      const cambio = this.pagoRealizado - this.monto;
      console.log(`El cambio es: ${cambio}`);
    }
  }
}
