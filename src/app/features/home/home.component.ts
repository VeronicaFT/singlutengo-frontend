import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet'; // Leaflet para mapas
import { Router } from '@angular/router';
import { GeocodingService } from '../../core/services/geocoding.service';

/**
 * Componente de la pantalla principal de la aplicación.
 * Muestra un mapa interactivo centrado en España y un buscador de ciudades.
 */
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  /** Instancia del mapa Leaflet */
  private map!: L.Map;

  /** Marcador de la ciudad actual */
  private currentCircle: L.CircleMarker | null = null;

  /** Ciudad escrita por el usuario en el buscador */
  ciudad: string = '';

  /**
   * Inyección de servicios:
   * - `GeocodingService` para obtener coordenadas a partir del nombre de ciudad.
   * - `Router` para redirigir a la pantalla de resultados.
   */
  constructor(
    private geocodingService: GeocodingService,
    private router: Router
  ) {}

  /**
   * Se ejecuta automáticamente cuando el mapa ya está cargado en la vista.
   * Inicializa el mapa centrado en España (Madrid) con zoom 6.
   */
  ngAfterViewInit(): void {
    this.map = L.map('map').setView([40.4168, -3.7038], 6);

    // Añade la capa de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  /**
   * Se ejecuta al pulsar el botón "Buscar".
   * Usa el GeocodingService para obtener latitud y longitud de la ciudad.
   * Muestra un marcador en el mapa y redirige a la pantalla de resultados.
   */
  onSearchCity(): void {
    if (!this.ciudad.trim()) return;

    this.geocodingService.getCoordinates(this.ciudad).subscribe({
      next: (results) => {
        if (results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lon = parseFloat(results[0].lon);

          // Centra el mapa en la ciudad
          this.map.setView([lat, lon], 13);

          // Elimina el marcador anterior si existe
          if (this.currentCircle) {
            this.map.removeLayer(this.currentCircle);
          }

          // Añade nuevo marcador circular con estilo personalizado
          this.currentCircle = L.circleMarker([lat, lon], {
            radius: 8,
            fillColor: "#006a60",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          }).addTo(this.map).bindPopup(`📍 ${this.ciudad}`).openPopup();

          // Espera 2 segundos y redirige a /resultados con la ciudad como parámetro
          setTimeout(() => {
            this.router.navigate(['/resultados'], {
              queryParams: { ciudad: this.ciudad }
            });
          }, 2000);

        } else {
          alert('Ciudad no encontrada');
        }
      },
      error: () => {
        alert('Error al buscar la ciudad');
      }
    });
  }
}
