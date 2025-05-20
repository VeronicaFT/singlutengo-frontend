import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio que centraliza las llamadas HTTP al backend de SinGluten&Go.
 * Por ahora, incluye el login de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /** URL base del backend (puerto 8080 en local) */
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  /**
   * Realiza una petición POST para iniciar sesión en el backend.
   * Envía el email y contraseña, y recibe un objeto con token y datos del usuario.
   *
   * @param data objeto con email y password
   * @returns Observable con la respuesta del backend (token, nombre, tipoUsuario, etc.)
   */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }
}
