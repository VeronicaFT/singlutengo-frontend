import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) {}

  /**
   * Busca coordenadas a partir del nombre de una ciudad usando Nominatim (OpenStreetMap)
   * @param city El nombre de la ciudad a buscar (ej: 'Madrid')
   * @returns Un observable con las coordenadas devueltas por el servidor
   */
  getCoordinates(city: string): Observable<any> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=es&q=${encodeURIComponent(city)}`;
  return this.http.get(url); //countrycodes=es, para limitar los resultados a España.
}

}
