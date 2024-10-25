import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: any[] = [];
  categories: string[] = ['Entrantes', 'Platos principales', 'Postres', 'Bebidas'];
  selectedCategory: string = '';
  filteredResults: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSearch() {
    this.http.get<any[]>(`/api/restaurant/search?query=${this.query}`).subscribe((data) => {
      this.results = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredResults = this.results.filter(item => {
      const matchesCategory = this.selectedCategory ? item.category === this.selectedCategory : true;
      const matchesPrice = item.price <= 20; // Por ejemplo, filtrar por un precio máximo
      return matchesCategory && matchesPrice;
    });
  }

  onCategoryChange() {
    this.applyFilters();
  }
}