import { Producto } from "./productos";

export interface Categoria {
    id:number,
    nombre:string,
    fotoUrl:string,
    productos:Producto[]
}