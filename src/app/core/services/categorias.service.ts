import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor() { }
  
  async getAll():Promise<Categoria[]>{ //metodo para conseguir datos de la BD json
  const res= await fetch("./../../../assets/data/database.json"); //metodo y ruta para llegar a la BD
  const resJson = await res.json();
  return resJson
}
  async getById (id:number):Promise<Categoria | undefined>{
    const res= await fetch("./../../../assets/data/database.json");
    const resJson:Categoria[] = await res.json();
    const categoria = resJson.find(categoria => categoria.id === id);
    if (categoria) return categoria;
    return
  }
}