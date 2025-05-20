import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstablecimientoService, Establecimiento } from '../../../core/services/establecimiento.service';
import { Valoracion, ValoracionService } from '../../../core/services/valoracion.service';

/**
 * Componente que muestra los detalles de un establecimiento.
 * Permite visualizar sus datos, ver valoraciones y enviar nuevas.
 */
@Component({
  selector: 'app-establecimiento-detalle',
  standalone: false,
  templateUrl: './establecimiento-detalle.component.html',
  styleUrls: ['./establecimiento-detalle.component.scss']
})
export class EstablecimientoDetalleComponent implements OnInit {

  /** Datos del establecimiento cargado desde el backend */
  establecimiento: Establecimiento | null = null;

  /** Lista de valoraciones asociadas al establecimiento */
  valoraciones: Valoracion[] = [];

  /** Modelo para el formulario de nueva valoración */
  nuevaValoracion = {
    comentario: '',
    puntuacion: 0
  };

  /**
   * Constructor que inyecta los servicios necesarios.
   * @param route para acceder al parámetro `id` de la URL
   * @param estService servicio para obtener datos de establecimiento
   * @param valoracionService servicio para gestionar valoraciones
   */
  constructor(
    private route: ActivatedRoute,
    private estService: EstablecimientoService,
    private valoracionService: ValoracionService
  ) {}

  /**
   * Al iniciar el componente:
   * - Obtiene el ID desde la URL.
   * - Carga los datos del establecimiento.
   * - Carga sus valoraciones.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // 1. Obtener datos del establecimiento
      this.estService.getEstablecimientoById(+id).subscribe(data => {
        this.establecimiento = data;

        // 2. Obtener valoraciones asociadas
        this.valoracionService.getByEstablecimiento(+id).subscribe(data => {
          this.valoraciones = data;
        });
      });
    }
  }

  /**
   * Envía una nueva valoración del usuario actual.
   * Se asegura de que el usuario esté autenticado y luego guarda la valoración.
   * Después recarga el componente para actualizar la lista.
   */
  enviarValoracion(): void {
    if (!this.establecimiento) return;

    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      alert('⚠️ Debes iniciar sesión para dejar una valoración.');
      return;
    }

    const nueva = {
      comentario: this.nuevaValoracion.comentario,
      puntuacion: this.nuevaValoracion.puntuacion,
      fechaComentario: new Date().toISOString().split('T')[0],
      usuario: { id: +idUsuario },
      establecimiento: { id: this.establecimiento.id }
    };

    this.valoracionService.post(nueva).subscribe(() => {
      alert('✅ Valoración enviada correctamente');
      this.nuevaValoracion = { comentario: '', puntuacion: 0 };
      this.ngOnInit(); // Volver a cargar los datos actualizados
    });
  }
}
