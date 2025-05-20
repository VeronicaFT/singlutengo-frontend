import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Modelo de datos para una valoración de establecimiento.
 */
export interface Valoracion {
  /** ID único de la valoración (opcional al crear) */
  id?: number;

  /** Comentario escrito por el usuario */
  comentario: string;

  /** Puntuación entre 1 y 5 */
  puntuacion: number;

  /** Fecha de la valoración en formato ISO (ej. "2024-05-20") */
  fechaComentario: string;

  /** Información del usuario que realiza la valoración */
  usuario: {
    id: number;
    nombre: string;
    email: string;
  };

  /** Información básica del establecimiento valorado */
  establecimiento: {
    id: number;
    nombre: string;
  };
}

/**
 * Servicio que gestiona las operaciones relacionadas con valoraciones.
 * Permite obtener, crear y eliminar valoraciones desde el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  /** URL base del backend para los endpoints de valoraciones */
  private apiUrl = 'http://localhost:8080/api/valoraciones';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las valoraciones registradas en el sistema.
   * @returns Observable con un array de valoraciones
   */
  getAll(): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(this.apiUrl);
  }

  /**
   * Elimina una valoración por su ID.
   * @param id identificador de la valoración a eliminar
   * @returns Observable vacío (void)
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Envía una nueva valoración al backend.
   * @param valoracion objeto con los datos de la valoración
   * @returns Observable con la respuesta del backend
   */
  post(valoracion: any): Observable<any> {
    return this.http.post(this.apiUrl, valoracion);
  }

  /**
   * Obtiene todas las valoraciones asociadas a un establecimiento concreto.
   * @param id ID del establecimiento
   * @returns Observable con un array de valoraciones
   */
  getByEstablecimiento(id: number): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(`${this.apiUrl}/establecimiento/${id}`);
  }
}
