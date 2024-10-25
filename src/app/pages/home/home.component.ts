import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/interfaces/categorias';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports:[TarjetaCategoriaComponent, CommonModule, RouterModule]
})
export class HomeComponent implements OnInit, OnDestroy{
  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  categorias:Categoria[]=[];

  ngOnInit(): void {
      this.headerService.titulo.set("Home");  
      this.headerService.extendido.set(true);
      this.categoriasService.getAll().then(res => this.categorias = res)
  }
  ngOnDestroy(): void {
    this.headerService.extendido.set(false);
  }
  }
