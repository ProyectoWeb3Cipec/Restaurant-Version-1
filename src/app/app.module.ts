import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './core/components/tabs/tabs.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PaymentService } from './core/services/payment.service';
import { ContadorCantidadComponent } from './core/components/contador-cantidad/contador-cantidad.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HeaderComponent,
    
    
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ContadorCantidadComponent,
    CarritoComponent,
  ],
  providers: [PaymentService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
