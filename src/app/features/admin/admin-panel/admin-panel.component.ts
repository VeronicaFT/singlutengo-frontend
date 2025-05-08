import { Component,OnInit } from '@angular/core';
import { Establecimiento, EstablecimientoService } from '../../../core/services/establecimiento.service';

@Component({
  selector: 'app-admin-panel',
  standalone: false,
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  establecimientos: Establecimiento[] = [];
  nuevo: Establecimiento = {
    nombre: '',
    ubicacion: '',
    descripcion: ''
    
  };

  mensaje: string = ''; // Mensaje del snackbar
  modoEdicion: boolean = false;

  constructor(private estService: EstablecimientoService) {}

  ngOnInit(): void {
    this.cargarEstablecimientos();
  }

  cargarEstablecimientos(): void {
    this.estService.getEstablecimientos().subscribe(data => {
      this.establecimientos = data;
    });
  }

  guardar(): void {
    this.estService.crearEstablecimiento(this.nuevo).subscribe(() => {
      this.cargarEstablecimientos();

      // Muestra mensaje según si se estaba editando o creando
      if (this.modoEdicion) {
        this.mostrarMensaje('Establecimiento actualizado correctamente');
      } else {
        this.mostrarMensaje('Establecimiento guardado correctamente');
      }

      // Limpia y sale del modo edición
      this.nuevo = { nombre: '', ubicacion: '', descripcion: '' };
      this.modoEdicion = false;
    });
  }

  editar(est: Establecimiento): void {
    // Clona el objeto para no modificar directamente la lista
    this.nuevo = { ...est };
    this.modoEdicion = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Estás segura de que quieres eliminar este establecimiento?')) {
      this.estService.eliminarEstablecimiento(id).subscribe(() => {
        this.cargarEstablecimientos(); // recargar lista
        this.mostrarMensaje('Establecimiento eliminado correctamente');
        
      });
    }
  }

  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }
}


