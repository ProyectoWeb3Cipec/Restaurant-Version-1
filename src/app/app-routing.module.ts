import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubroComponent } from './pages/rubro/rubro.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { CarritoComponent} from './pages/carrito/carrito.component';
import { BuscarComponent} from './pages/buscar/buscar.component';

const routes: Routes = [

  {
    path:"",
    component:HomeComponent
  },
  {
    path:"carrito",
    component:CarritoComponent
  },
  {
    path:"categoria/:id",
    component:RubroComponent
  },
  {
    path:"articulo/:id",
    component:ArticuloComponent
  },
  {
    path:"perfil",
    component:PerfilComponent
  },
  {
    path:"buscar",
    component:BuscarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
