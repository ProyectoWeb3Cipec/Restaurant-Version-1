import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../../services/pago.service';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-modal',
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PagoModalComponent {
  @Input() subtotal: number = 0;
  @Input() delivery: number = 0;
  @Input() total: number = 0;
  @Output() cerrar = new EventEmitter<void>();
  @Output() pagoRealizado = new EventEmitter<void>();

  isOpen: boolean = false;
  opcionSeleccionada: string = '';
  datosTarjeta = { nombre: '', numero: '', cvv: '' };
  datosEfectivo: number = 0;
  errorMensaje: string = '';
  botonTexto: string = 'Continuar';

  direccionEnvio: string = '';
  telefono: number = 0;
  deliverySeleccionado: string = 'no';
  deliveryAmount: number = 0;

  constructor(private pagoService: PagoService, private cartService: CartService) { }

  abrirModal() {
    if (this.verificarCarrito()) {
      this.isOpen = true;
      this.resetearDatos();
      this.botonTexto = 'Continuar';
    } else {
      this.mostrarError('El carrito está vacío. No puedes procesar el pago.');
    }
  }

  verificarCarrito(): boolean {
    return this.cartService.carrito.length > 0;
  }

  cerrarModal() {
    this.isOpen = false;
    this.resetearDatos();
  }

  resetearDatos() {
    this.opcionSeleccionada = '';
    this.datosTarjeta = { nombre: '', numero: '', cvv: '' };
    this.datosEfectivo = 0;
    this.errorMensaje = '';
    this.deliverySeleccionado = 'no';
    this.deliveryAmount = 0;
  }

  seleccionarPago(opcion: string) {
    this.opcionSeleccionada = opcion;
  }

  botonClick() {
    if (this.botonTexto === 'Continuar') {
      this.abrirFormulario();
    } else if (this.botonTexto === 'Pagar') {
      this.procesarPago();
    }
  }

  abrirFormulario() {
    Swal.fire({
      title: 'Información de Envío',
      html: `
        <div>
          <label for="direccion">Dirección:</label>
          <input id="direccion" type="text" class="swal2-input" placeholder="Dirección" required>
          <label for="telefono">Teléfono:</label>
          <input id="telefono" type="text" class="swal2-input" placeholder="Teléfono" required>
          <label for="delivery">¿Desea delivery?</label>
          <select id="delivery" class="swal2-select">
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const direccion = (document.getElementById('direccion') as HTMLInputElement).value;
        const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
        const delivery = (document.getElementById('delivery') as HTMLSelectElement).value;

        if (!direccion || !telefono) {
          Swal.showValidationMessage('Por favor, complete todos los campos.');
        }
        return { direccion, telefono, delivery };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalizarPago(result.value);
        this.botonTexto = 'Pagar';
      }
    });
  }

  finalizarPago(data: any) {
    const { direccion, telefono, delivery } = data;
    this.direccionEnvio = direccion;
    this.telefono = telefono;
    this.deliverySeleccionado = delivery;
    this.deliveryAmount = delivery === 'si' ? 20 : 0;
    this.total += this.deliveryAmount;

    const facturaData = {
      direccionEnvio: this.direccionEnvio,
      telefono: this.telefono,
      delivery: this.deliverySeleccionado,
      total: this.total,
    };
    
    this.botonTexto = 'Pagar';
  }

  procesarPago() {
    let paymentData;

    if (this.opcionSeleccionada === 'tarjeta') {
      paymentData = {
        opcion: this.opcionSeleccionada,
        nombre: this.datosTarjeta.nombre,
        numero: this.datosTarjeta.numero.replace(/\s/g, ''),
        cvv: this.datosTarjeta.cvv,
        subtotal: this.subtotal,
        delivery: this.deliveryAmount,
        total: this.total
      };
    } else if (this.opcionSeleccionada === 'efectivo') {
      paymentData = {
        opcion: this.opcionSeleccionada,
        efectivo: this.datosEfectivo,
        subtotal: this.subtotal,
        delivery: this.deliveryAmount,
        total: this.total
      };
    } else if (this.opcionSeleccionada === 'qr') {
      paymentData = {
        opcion: this.opcionSeleccionada,
        subtotal: this.subtotal,
        delivery: this.deliveryAmount,
        total: this.total
      };
    }

    this.pagoService.procesarPago(paymentData);

    this.pagoService.pagoConfirmado$.subscribe(mensaje => {
      if (mensaje.startsWith('Error')) {
        this.errorMensaje = mensaje;
        this.mostrarError(mensaje);
      } else {
        this.mostrarConfirmacion(mensaje);
        this.cartService.vaciarCarrito();
        this.resetearTotales();
        this.cerrarModal();
        this.resetearDatos();
      }
    });
  }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'Aceptar'
    });
  }

  mostrarConfirmacion(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.cartService.vaciarCarrito();
      this.resetearTotales();
      this.cerrarModal();
      this.resetearDatos();
      this.pagoRealizado.emit();
    });
  }

  resetearTotales() {
    this.subtotal = 0;
    this.delivery = 0;
    this.total = 0;
  }

  validarNumero(): boolean {
    const numero = this.datosTarjeta.numero.replace(/\s/g, '');
    return /^\d{16}$/.test(numero);
  }

  validarCVV(): boolean {
    return /^\d{3}$/.test(this.datosTarjeta.cvv);
  }

  formatearNumeroTarjeta(): void {
    let numeroLimpiado = this.datosTarjeta.numero.replace(/\D/g, '');
    let numeroFormateado = '';
    for (let i = 0; i < numeroLimpiado.length; i += 4) {
      if (i > 0) {
        numeroFormateado += ' ';
      }
      numeroFormateado += numeroLimpiado.substring(i, i + 4);
    }
    this.datosTarjeta.numero = numeroFormateado.trim();
  }

  resetForm() {
    this.direccionEnvio = '';
    this.telefono = 0;
    this.deliverySeleccionado = 'no';
    this.deliveryAmount = 0;
  }
}

