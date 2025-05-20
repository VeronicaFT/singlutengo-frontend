import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  // Se define una función interceptor usando la función original
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => interceptor(req, next));

  // Configuración del entorno de pruebas antes de cada test
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // Verifica que el interceptor se haya creado correctamente
  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
