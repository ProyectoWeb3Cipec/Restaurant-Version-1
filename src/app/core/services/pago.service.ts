import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private confirmacionPago = new Subject<string>();
  pagoConfirmado$ = this.confirmacionPago.asObservable();

  constructor() { }

  procesarPago(datosPago: any): void {
    const { nombre, numero, cvv, efectivo, opcion, total } = datosPago;

    this.confirmacionPago.next('Procesando datos, espere por favor...');

    setTimeout(() => {
      if (opcion === 'tarjeta') {
        if (this.validarDatosTarjeta(nombre, numero, cvv)) {
          this.confirmacionPago.next('Pago con tarjeta confirmado');
        } else {
          this.confirmacionPago.next('Error en los datos de la tarjeta. Verifique el nombre, número y CVV.'); 
        }
      } else if (opcion === 'efectivo') {
        if (efectivo >= total && efectivo > 0) {
          this.confirmacionPago.next('Pago en efectivo confirmado. Cambio: ' + (efectivo - total));
        } else {
          this.confirmacionPago.next('Cantidad insuficiente para el pago o cantidad no válida.'); 
        }
      } else if (opcion === 'qr') {
        this.confirmacionPago.next('Pago con QR confirmado');
      } else {
        this.confirmacionPago.next('Método de pago no válido');
      }
    }, 2000);
  }

  private validarDatosTarjeta(nombre: string, numero: string, cvv: string): boolean {
    const numeroTarjetaValido = /^\d{16}$/.test(numero.replace(/\s/g, ''));
    const cvvValido = /^\d{3}$/.test(cvv);
    return nombre.length > 0 && numeroTarjetaValido && cvvValido;
  }
}


