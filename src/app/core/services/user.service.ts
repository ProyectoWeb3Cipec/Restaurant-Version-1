import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';
  private authUrl = 'http://localhost:3000/api/login';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  // Login del usuario (retorna token)
  login(email: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, { email, password });
  }

  // Guardar token en localStorage
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Obtener token de localStorage
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  // Obtener un usuario por su ID (autenticado)
  getUser(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Actualizar un usuario (autenticado)
  updateUser(id: number, userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.put(`${this.apiUrl}/${id}`, userData, { headers });
  }

  // Eliminar un usuario (autenticado)
  deleteUser(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
