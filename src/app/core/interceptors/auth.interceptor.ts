import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor HTTP que añade automáticamente el token JWT
 * al encabezado Authorization de cada petición saliente si está disponible.
 *
 * Este interceptor permite que el backend reciba el token sin que el desarrollador
 * tenga que preocuparse por añadirlo manualmente en cada llamada HTTP.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Intercepta todas las peticiones HTTP salientes.
   * Si hay un token en localStorage, lo añade como header Authorization.
   *
   * @param req La petición HTTP original
   * @param next El siguiente manejador en la cadena de interceptores
   * @returns Un observable del evento HTTP (modificado o sin modificar)
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Buscar el token guardado en localStorage
    const token = localStorage.getItem('token');

    // Si hay token, clonamos la petición y añadimos el header Authorization
    if (token) {
      const reqConToken = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(reqConToken); // Enviamos la nueva petición con el token
    }

    // Si no hay token, enviamos la petición original
    return next.handle(req);
  }
}
