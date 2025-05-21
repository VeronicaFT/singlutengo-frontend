import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Establecimiento, EstablecimientoService } from '../../../core/services/establecimiento.service';
import { GeocodingService } from '../../../core/services/geocoding.service';

/**
 * Componente de la pantalla de resultados.
 * Muestra una lista de establecimientos filtrados por ciudad y un mapa con sus ubicaciones.
 */
@Component({
  selector: 'app-resultados',
  standalone: false,
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  /** Ciudad que se recibe como parámetro en la URL */
  ciudad: string = '';

  /** Lista de establecimientos filtrados por la ciudad */
  establecimientosFiltrados: Establecimiento[] = [];

  /** Mapa de Leaflet para mostrar los marcadores */
  private map!: L.Map;

  /**
   * Inyección de dependencias:
   * - `ActivatedRoute`: para leer la ciudad desde los parámetros de la URL.
   * - `EstablecimientoService`: para obtener los establecimientos.
   * - `GeocodingService`: para convertir ubicaciones en coordenadas geográficas.
   */
  constructor(
    private route: ActivatedRoute,
    private estService: EstablecimientoService,
    private geocodingService: GeocodingService
  ) {}

  /**
   * Se ejecuta al iniciar el componente.
   * Lee el parámetro `ciudad` desde la URL y carga los establecimientos filtrados.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.ciudad = params['ciudad'] || '';
      this.cargarEstablecimientos();
    });
  }

  /**
   * Carga todos los establecimientos desde el backend y filtra los que coincidan con la ciudad.
   * Después inicializa el mapa con los resultados obtenidos.
   */
  cargarEstablecimientos(): void {
    this.estService.getEstablecimientos().subscribe(data => {
      this.establecimientosFiltrados = data.filter(est =>
        est.ubicacion.toLowerCase().includes(this.ciudad.toLowerCase())
      );

      // Inicializa el mapa después de que la vista haya sido renderizada
      setTimeout(() => {
        this.inicializarMapa();
      }, 0);
    });
  }

  /**
   * Crea el mapa Leaflet y coloca un marcador para cada establecimiento filtrado.
   * Cada marcador se obtiene usando el servicio de geocodificación.
   */
  inicializarMapa(): void {
    // Si ya existe un mapa previo, se elimina
    if (this.map) {
      this.map.remove();
    }

// 🔁 Corregir iconos de Leaflet para que los busque en /assets/leaflet/
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
  iconUrl: '/assets/leaflet/marker-icon.png',
  shadowUrl: '/assets/leaflet/marker-shadow.png'
});



    // Crear nuevo mapa centrado en España
    this.map = L.map('map').setView([40.4168, -3.7038], 6);

    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Recorrer todos los establecimientos para obtener coordenadas y añadir marcadores
    this.establecimientosFiltrados.forEach(est => {
      this.geocodingService.getCoordinates(est.ubicacion).subscribe({
        next: (results) => {
          if (results.length > 0) {
            const lat = parseFloat(results[0].lat);
            const lon = parseFloat(results[0].lon);

            const marker = L.marker([lat, lon]).addTo(this.map);
            marker.bindPopup(`<strong>${est.nombre}</strong><br>${est.ubicacion}`);
          }
        },
        error: () => {
          console.warn(`No se pudo obtener coordenadas para: ${est.ubicacion}`);
        }
      });
    });
  }

  /**
   * (Método comentado)
   * Función auxiliar para pruebas locales que devolvía coordenadas simuladas por ciudad.
   * Se puede reactivar si no se usa un servicio real.
   */
  /*
  obtenerCoordenadas(ubicacion: string): [number, number] {
    const ciudad = ubicacion.toLowerCase();

    if (ciudad.includes('madrid')) return [40.4168, -3.7038];
    if (ciudad.includes('sevilla')) return [37.3886, -5.9823];
    if (ciudad.includes('valencia')) return [39.4699, -0.3763];
    if (ciudad.includes('barcelona')) return [41.3851, 2.1734];

    // Coordenadas genéricas por defecto
    return [40.0, -3.5];
  }
  */
}
