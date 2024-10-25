import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  constructor(private router:Router){
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        console.log("EVENTO",event)  
        switch (event.urlAfterRedirects){
          case "/carrito":
            this.seleccionado = [true,false, false, false, false];
            break;
          case "/articulo":
            this.seleccionado =[false, true, false, false, false];
            break;
          case "/rubro":
            this.seleccionado = [false, false, true, false, false];
            break;
            case "/perfil":
              this.seleccionado = [false, false, false, true, false];
              break;  
              case "/buscar":
                this.seleccionado = [false, false, false, false, true];
                break; 
              default:
                this.seleccionado = [false, false, false, false, false];
              break;    
        }
      }
    })
  }
    seleccionado = [false, false, false, false, false];

  navegar(direccion:string){
    this.router.navigate([direccion])
    //cambiar de pagina
  }

}
