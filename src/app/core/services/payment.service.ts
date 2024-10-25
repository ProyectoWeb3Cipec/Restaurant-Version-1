import { Injectable } from '@angular/core';

type MetodoPago = 'QR' | 'Efectivo';

interface Transaccion {
  metodo: MetodoPago;
  monto: number;
  pagoRealizado: number;
  estado: 'Pendiente' | 'Pagado';
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  verificarPago(transaccion: Transaccion): Transaccion {
    if (transaccion.metodo === 'QR') {
      return this.verificarPagoQR(transaccion);
    } else if (transaccion.metodo === 'Efectivo') {
      return this.verificarPagoEfectivo(transaccion);
    } else {
      throw new Error('Método de pago no soportado');
    }
  }

  private verificarPagoQR(transaccion: Transaccion): Transaccion {
    const pagoExitoso = Math.random() > 0.2; // Simula éxito de 80%
    transaccion.estado = pagoExitoso ? 'Pagado' : 'Pendiente';
    return transaccion;
  }

  private verificarPagoEfectivo(transaccion: Transaccion): Transaccion {
    if (transaccion.pagoRealizado >= transaccion.monto) {
      const cambio = transaccion.pagoRealizado - transaccion.monto;
      transaccion.estado = 'Pagado';
      console.log(`Cambio: ${cambio}`);
    } else {
      console.log('El monto pagado no es suficiente.');
      transaccion.estado = 'Pendiente';
    }
    return transaccion;
  }
}