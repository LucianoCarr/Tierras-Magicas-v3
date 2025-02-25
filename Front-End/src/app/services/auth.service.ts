import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private apiUrl = Constants.SERVER + '/user';

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(userData: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Método para hacer login
  login(userData: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  // Método para verificar si el usuario está logueado (si tienes un token en el localStorage, por ejemplo)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
