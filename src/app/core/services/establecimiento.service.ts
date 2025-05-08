import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Establecimiento {
  id?: number;
  nombre: string;
  ubicacion: string;
  descripcion: string;
  valoracionMedia?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  private apiUrl = 'http://localhost:8080/api/establecimientos';

  constructor(private http: HttpClient) {}

  getEstablecimientos(): Observable<Establecimiento[]> {
    return this.http.get<Establecimiento[]>(this.apiUrl);
  }

  crearEstablecimiento(est: Establecimiento): Observable<Establecimiento> {
    return this.http.post<Establecimiento>(this.apiUrl, est);
  }

  eliminarEstablecimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
