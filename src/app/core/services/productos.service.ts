import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categorias';
import { Producto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }
  
    async getByCategoria(id:number) : Promise<Producto[]>{
      const res= await fetch("./../../../assets/data/database.json"); 
      const resJson:Categoria[] = await res.json();
      const productos = resJson.find(categoria => categoria.id === id)?.productos;
      if (productos) return productos;
      return [];
    }

    async getAll():Promise<Producto[]>{
      const res= await fetch("./../../../assets/data/database.json"); 
      const resJson:Categoria[] = await res.json()
      let productos:Producto[] = [];
      resJson.forEach(categoria => {
        productos = [...productos, ...categoria.productos]
      })
        return productos;
    }
    async getById(id:number):Promise<Producto | undefined>{
      const productos = await this.getAll();
      const productoElegido = productos.find(producto => producto.id === id);
      return productoElegido ? productoElegido : undefined; 
    }
}
