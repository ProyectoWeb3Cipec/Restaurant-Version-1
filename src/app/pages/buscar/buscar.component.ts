import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  headerService = inject(HeaderService);

  ngOnInit(): void {
      this.headerService.titulo.set("Buscar")
  }
}
