import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Modelo de datos para un establecimiento.
 */
export interface Establecimiento {
  /** ID único del establecimiento (opcional en creación) */
  id?: number;

  /** Nombre del establecimiento */
  nombre: string;

  /** Dirección o ubicación del establecimiento */
  ubicacion: string;

  /** Descripción general del lugar */
  descripcion: string;

  /** Valoración media basada en comentarios de usuarios */
  valoracionMedia?: number;
}

/**
 * Servicio para gestionar operaciones relacionadas con establecimientos.
 * Permite obtener, crear y eliminar establecimientos desde el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  /** URL base del backend para los endpoints de establecimientos */
  private apiUrl = 'http://localhost:8080/api/establecimientos';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de establecimientos.
   * @returns Observable con un array de establecimientos
   */
  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(this.apiUrl);
  }

  /**
   * Obtiene los detalles de un establecimiento por su ID.
   * @param id identificador del establecimiento
   * @returns Observable con el establecimiento correspondiente
   */
  getEstablecimientoById(id: number): Observable<Establecimiento> {
    return this.http.get<Establecimiento>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo establecimiento en el backend.
   * @param est objeto Establecimiento con los datos a guardar
   * @returns Observable con el establecimiento creado
   */
  crearEstablecimiento(est: Establecimiento): Observable<Establecimiento> {
    return this.http.post<Establecimiento>(this.apiUrl, est);
  }

  /**
   * Elimina un establecimiento por su ID.
   * @param id identificador del establecimiento a eliminar
   * @returns Observable vacío (void)
   */
  eliminarEstablecimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
