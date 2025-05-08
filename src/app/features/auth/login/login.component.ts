import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  /**
   * Método que se ejecuta al hacer clic en el botón de iniciar sesión
   * Envía email y contraseña al backend, guarda los datos del usuario y redirige
   */
  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.apiService.login(loginData).subscribe({
      next: (usuario) => {
        console.log('Login correcto:', usuario);

        // Guarda los datos útiles del usuario en el navegador
        localStorage.setItem('tipoUsuario', usuario.tipoUsuario); // "admin" o "user"
        localStorage.setItem('nombreUsuario', usuario.nombre);   // Ej: "Verónica"

        // Muestra mensaje de bienvenida
        alert(`Bienvenido/a, ${usuario.nombre}`);

        // Redirige al panel de gestión si es admin, al home si es usuario normal
        if (usuario.tipoUsuario.toLowerCase() === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },

      error: (error) => {
        // Si el backend devuelve error 401 (login incorrecto), mostramos el mensaje
        if (error.status === 401 && error.error?.error) {
          alert('⚠️ ' + error.error.error);
        } else {
          // Otros errores
          alert('❌ Error inesperado en el login');
        }
        console.error('❌ Error en login:', error);
      }
    });
  }
}
