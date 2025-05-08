import { Component, AfterViewInit } from '@angular/core'; // importa AfterViewInit
import * as L from 'leaflet'; // importa Leaflet
import { GeocodingService } from '../../core/services/geocoding.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  private map!: L.Map; // Aquí se guarda la instancia del mapa
  private currentCircle: L.CircleMarker | null = null; // Guarda el círculo actual

  constructor(private geocodingService: GeocodingService) {}

// Este método se llama cuando el usuario pulsa el botón "Buscar"
onSearchCity(city: string): void {
  if (!city) return;

  this.geocodingService.getCoordinates(city).subscribe({
    next: (results) => {
      if (results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);

        this.map.setView([lat, lon], 13);

        // Elimina el círculo anterior si existe
        if (this.currentCircle) {
          this.map.removeLayer(this.currentCircle);
        }

        // Crea y guarda el nuevo círculo
        this.currentCircle = L.circleMarker([lat, lon], {
          radius: 8,
          fillColor: "#006a60",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(this.map).bindPopup(`📍 ${city}`).openPopup();

      } else {
        alert('Ciudad no encontrada');
      }
    },
    error: () => {
      alert('Error al buscar la ciudad');
    }
  });
}

  ngAfterViewInit(): void {

    this.map = L.map('map').setView([40.4168, -3.7038], 6);

    // Añadir capa de mapa (la imagen de fondo del mapa)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
