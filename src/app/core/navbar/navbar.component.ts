import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Componente de la barra de navegación principal.
 * Muestra el logo, icono de login, y un menú lateral con navegación.
 * Controla el estado del usuario (logueado, admin) y gestiona el cierre de sesión.
 */
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  /** Indica si el menú lateral está abierto o cerrado */
  menuAbierto = false;

  /** Indica si hay un usuario conectado (login activo) */
  usuarioConectado = false;

  /** Indica si el usuario logueado es de tipo administrador */
  esAdmin = false;

  constructor(private router: Router, private elementRef: ElementRef) {}

  /**
   * Se ejecuta al iniciar el componente.
   * Comprueba si hay sesión activa y actualiza los indicadores de usuario.
   * También escucha los cambios de ruta para volver a comprobar sesión.
   */
  ngOnInit(): void {
    this.comprobarSesion();

    // Cada vez que se navega a una nueva ruta, actualizamos el estado del usuario
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.comprobarSesion();
      }
    });
  }

  /**
   * Comprueba si hay un tipo de usuario en localStorage.
   * Si lo hay, se marca como conectado. Si es "admin", se marca como tal.
   */
  comprobarSesion(): void {
    const tipo = localStorage.getItem('tipoUsuario');
    this.usuarioConectado = !!tipo; // true si hay valor, false si es null
    this.esAdmin = tipo === 'admin';
  }

  /**
   * Abre o cierra el menú lateral cuando se hace clic en el icono de hamburguesa.
   */
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  /**
   * Cierra el menú lateral, normalmente al hacer clic en un enlace.
   */
  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  /**
   * Cierra sesión:
   * - Limpia el localStorage.
   * - Actualiza el estado de sesión.
   * - Cierra el menú lateral.
   * - Redirige al inicio.
   */
  logout(): void {
    localStorage.clear();
    this.comprobarSesion();
    this.cerrarMenu();
    alert('Sesión cerrada correctamente');
    this.router.navigate(['/']);
  }

  /**
   * Listener global que detecta clics fuera del menú lateral.
   * Si se hace clic fuera mientras el menú está abierto, se cierra automáticamente.
   *
   * @param event evento del clic en el documento
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.menuAbierto) {
      this.menuAbierto = false;
    }
  }
}
