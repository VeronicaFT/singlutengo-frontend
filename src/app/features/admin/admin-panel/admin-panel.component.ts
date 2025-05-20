import { Component, OnInit } from '@angular/core';
import { Establecimiento, EstablecimientoService } from '../../../core/services/establecimiento.service';
import { Valoracion, ValoracionService } from '../../../core/services/valoracion.service'; // 👈 Import del servicio de valoraciones

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  // Lista de establecimientos y valoraciones
  establecimientos: Establecimiento[] = [];
  valoraciones: Valoracion[] = [];

  // Objeto temporal para el formulario
  nuevo: Establecimiento = {
    nombre: '',
    ubicacion: '',
    descripcion: ''
  };

  // Control de estado y mensajes
  mensaje: string = '';
  modoEdicion: boolean = false;

  constructor(
    private estService: EstablecimientoService,
    private valoracionService: ValoracionService
  ) {}

  /**
   * Método que se ejecuta al cargar el componente
   * Carga los establecimientos y valoraciones
   */
  ngOnInit(): void {
    this.cargarEstablecimientos();
    this.cargarValoraciones();
  }

  /**
   * Carga todos los establecimientos desde el backend
   */
  cargarEstablecimientos(): void {
    this.estService.getEstablecimientos().subscribe(data => {
      this.establecimientos = data;
    });
  }

  /**
   * Carga todas las valoraciones desde el backend
   */
  cargarValoraciones(): void {
    this.valoracionService.getAll().subscribe(data => {
      this.valoraciones = data;
    });
  }

  /**
   * Guarda un nuevo establecimiento o actualiza uno existente
   */
  guardar(): void {
    this.estService.crearEstablecimiento(this.nuevo).subscribe(() => {
      this.cargarEstablecimientos();

      if (this.modoEdicion) {
        this.mostrarMensaje('Establecimiento actualizado correctamente');
      } else {
        this.mostrarMensaje('Establecimiento guardado correctamente');
      }

      // Reiniciar formulario
      this.nuevo = { nombre: '', ubicacion: '', descripcion: '' };
      this.modoEdicion = false;
    });
  }

  /**
   * Carga los datos del establecimiento en el formulario para editar
   * @param est Establecimiento a editar
   */
  editar(est: Establecimiento): void {
    this.nuevo = { ...est };
    this.modoEdicion = true;
  }

  /**
   * Elimina un establecimiento por su ID, tras confirmación
   * @param id ID del establecimiento a eliminar
   */
  eliminar(id: number): void {
    if (confirm('¿Estás segura de que quieres eliminar este establecimiento?')) {
      this.estService.eliminarEstablecimiento(id).subscribe(() => {
        this.cargarEstablecimientos();
        this.mostrarMensaje('Establecimiento eliminado correctamente');
      });
    }
  }

  /**
   * Elimina una valoración por su ID, tras confirmación
   * @param id ID de la valoración a eliminar
   */
  eliminarValoracion(id: number): void {
    if (confirm('¿Seguro que quieres borrar este comentario?')) {
      this.valoracionService.delete(id).subscribe(() => {
        this.cargarValoraciones();
        this.mostrarMensaje('Comentario eliminado');
      });
    }
  }

  /**
   * Muestra un mensaje temporal en la parte inferior de la pantalla
   * @param texto Texto del mensaje
   */
  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}
