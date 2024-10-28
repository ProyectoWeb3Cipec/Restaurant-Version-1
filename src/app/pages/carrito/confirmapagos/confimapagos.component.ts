
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  pagoRealizado = false;
  mensajeConfirmacion = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  realizarPago(): void {
    // Simulación de pago exitoso
    this.http.post('(link unavailable)', {
      // Datos de pago
    }).subscribe(response => {
      if (response['exito']) {
        this.pagoRealizado = true;
        this.mensajeConfirmacion = 'Pago realizado con éxito. ¡Gracias!';
      } else {
        this.mensajeConfirmacion = 'Error al realizar el pago. Inténtalo nuevamente.';
      }
    });
  }
}