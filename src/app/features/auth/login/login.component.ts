import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

/**
 * Componente para el login y registro de usuarios.
 * Contiene dos formularios:
 * - Inicio de sesión (login)
 * - Registro de nuevo usuario
 */
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /** Email del usuario que intenta iniciar sesión */
  email: string = '';

  /** Contraseña del usuario que intenta iniciar sesión */
  password: string = '';

  /** Email del nuevo usuario a registrar */
  nuevoEmail: string = '';

  /** Nombre del nuevo usuario */
  nuevoNombre: string = '';

  /** Contraseña del nuevo usuario */
  nuevaPassword: string = '';

  /**
   * Constructor que inyecta el servicio API, cliente HTTP y el router.
   *
   * @param apiService servicio que gestiona las llamadas al backend
   * @param http cliente HTTP de Angular para hacer peticiones directas
   * @param router servicio para navegación entre rutas
   */
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Envía los datos de login al backend y redirige al usuario
   * según su tipo (usuario o admin). Guarda los datos en localStorage.
   */
  onLogin(): void {
    // Validación básica de campos vacíos
    // Validación específica de campos
  if (!this.email) {
    alert('⚠️ Debes introducir tu correo electrónico.');
    return;
  }

  if (!this.password) {
    alert('⚠️ Debes introducir tu contraseña.');
    return;
  }

    const loginData = { email: this.email, password: this.password };

    this.apiService.login(loginData).subscribe({
      next: (usuario: any) => {
        // Guardar en localStorage para uso posterior
        localStorage.setItem('token', usuario.token); 
        localStorage.setItem('tipoUsuario', usuario.tipoUsuario);
        localStorage.setItem('nombreUsuario', usuario.nombre);
        localStorage.setItem('idUsuario', usuario.id);

        alert(`¡Hola, ${usuario.nombre}!`);

        // Redirigir según el tipo de usuario
        if (usuario.tipoUsuario.toLowerCase() === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Usuario o contraseña incorrectos');
        console.error(err);
      }
    });
  }

  /**
   * Envía los datos del nuevo usuario al backend para registrarlo.
   * Muestra un mensaje de confirmación si se completa correctamente.
   */
  onRegister(): void {
    // Validación básica de campos vacíos
    if (!this.nuevoEmail || !this.nuevoNombre || !this.nuevaPassword) {
      alert('⚠️ Por favor, rellena todos los campos del registro.');
      return;
    }

    const nuevoUsuario = {
      nombre: this.nuevoNombre,
      email: this.nuevoEmail,
      password: this.nuevaPassword,
      tipoUsuario: 'usuario', // por defecto
      fechaRegistro: new Date().toISOString().split('T')[0] // formato yyyy-mm-dd
    };

    this.http.post('http://localhost:8080/api/usuarios', nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.');

        // Limpiar campos del formulario
        this.nuevoEmail = '';
        this.nuevoNombre = '';
        this.nuevaPassword = '';
      },
      error: (err) => {
        alert('Error al registrar usuario');
        console.error(err);
      }
    });
  }
}
