import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  headerService = inject(HeaderService);

  ngOnInit(): void {
      this.headerService.titulo.set("Perfil")
  }
  }

