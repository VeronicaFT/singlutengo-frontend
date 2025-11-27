# SinGluten&GO – Frontend 🍽️🌍

Frontend de la aplicación SinGluten&GO, una plataforma pensada para ayudar a personas con enfermedad celíaca o sensibilidad al gluten a encontrar establecimientos que ofrezcan opciones sin gluten de forma segura.

Esta aplicación está desarrollada con Angular y consume la API REST del backend de SinGluten&GO.

Proyecto desarrollado como parte de mi Proyecto Final de Ciclo (DAW).

---

## 🎯 Objetivo de la aplicación

El frontend permite a los usuarios:

- Buscar establecimientos sin gluten a partir de una ciudad.
- Ver un mapa interactivo con los establecimientos encontrados.
- Consultar un listado de resultados y acceder al detalle de cada establecimiento.
- Leer y dejar valoraciones sobre los establecimientos.
- Iniciar sesión para asociar las valoraciones a un usuario.
- Gestionar información desde un panel de administración (ruta /admin).

---

## 🧩 Funcionalidades principales

La aplicación se organiza en varias pantallas principales, gestionadas por el enrutador de Angular:

- Ruta "/" (HomeComponent)
  - Pantalla de inicio con buscador por ciudad.
  - Mapa inicial y acceso rápido al resto de secciones.

- Ruta "/login" (LoginComponent)
  - Pantalla de autenticación.
  - Formulario de inicio de sesión.
  - En la misma vista se puede incluir el formulario de registro (si se implementa en el futuro).

- Ruta "/resultados" (ResultadosComponent)
  - Muestra los resultados de la búsqueda de establecimientos.
  - Estructura dividida:
    - Columna izquierda: lista de establecimientos.
    - Columna derecha: mapa interactivo con los marcadores de esos establecimientos.

- Ruta "/establecimiento/:id" (EstablecimientoDetalleComponent)
  - Ficha de detalle de un establecimiento concreto.
  - Información del lugar (nombre, ubicación, tipo, etc.).
  - Listado de valoraciones asociadas.
  - Formulario para que el usuario pueda dejar una nueva valoración.

- Ruta "/consejos" (ConsejosComponent)
  - Sección de consejos o artículos relacionados con la vida sin gluten.

- Ruta "/admin" (AdminPanelComponent)
  - Panel de administración donde se pueden gestionar datos como establecimientos o valoraciones.

Todos estos componentes se declaran en AppModule, junto con el NavbarComponent, que muestra la barra de navegación común a la aplicación.

---

## 🛠️ Tecnologías utilizadas

- Angular
- TypeScript
- HTML5
- SCSS / CSS
- Consumo de API REST (HttpClientModule)
- Interceptor de autenticación (AuthInterceptor) para añadir el token a las peticiones HTTP
- Mapas interactivos con Leaflet, para la parte visual de los establecimientos

---

## 📦 Requisitos previos

Antes de ejecutar el proyecto, necesitas:

- Node.js instalado (versión LTS recomendada)
- Angular CLI instalada globalmente

Instalación de Angular CLI:

npm install -g @angular/cli

---

## 🚀 Puesta en marcha del proyecto

1. Clonar el repositorio:

   git clone https://github.com/VeronicaFT/singlutengo-frontend.git  
   cd singlutengo-frontend

2. Instalar dependencias:

   npm install

3. Levantar el servidor de desarrollo:

   ng serve

4. Abrir la aplicación en el navegador:

   http://localhost:4200/

Cada vez que guardes cambios, Angular recargará la página automáticamente.

---

## 🔗 Conexión con el backend

El frontend consume la API REST del backend de SinGluten&GO.

Puntos importantes:

- La URL base del backend suele configurarse en los ficheros de entorno de Angular (por ejemplo, environment.ts).
- El AuthInterceptor se encarga de añadir el token de autenticación (JWT) a las peticiones HTTP cuando el usuario ha iniciado sesión.
- Módulos clave:
  - HttpClientModule, importado en AppModule, permite realizar peticiones HTTP al backend.
  - FormsModule permite manejar formularios (por ejemplo, login, búsqueda, valoraciones).

Para que todo funcione correctamente:

1. Tener el backend de SinGluten&GO arrancado (normalmente en http://localhost:8080).
2. Configurar en el frontend la URL correcta del backend.
3. Asegurarse de que el backend permite CORS desde el origen del frontend.

---

## 🧱 Estructura básica del proyecto

Algunos archivos y directorios importantes del frontend:

- src/app/app.module.ts  
  Módulo raíz de la aplicación. Declara los componentes principales:
  AppComponent, LoginComponent, NavbarComponent, HomeComponent, AdminPanelComponent, ResultadosComponent, EstablecimientoDetalleComponent, ConsejosComponent.  
  También importa BrowserModule, AppRoutingModule, FormsModule y HttpClientModule, y registra el AuthInterceptor.

- src/app/app-routing.module.ts  
  Define las rutas de la aplicación:
  - "" → HomeComponent
  - "login" → LoginComponent
  - "admin" → AdminPanelComponent
  - "resultados" → ResultadosComponent
  - "establecimiento/:id" → EstablecimientoDetalleComponent
  - "consejos" → ConsejosComponent

- src/app/features/home/home.component.ts  
  Pantalla principal con el buscador de ciudad y contenido inicial.

- src/app/features/auth/login/login.component.ts  
  Lógica del formulario de login (y en el futuro registro).

- src/app/features/resultados/resultados/resultados.component.ts  
  Muestra los resultados de búsqueda y el mapa de establecimientos.

- src/app/features/establecimiento/establecimiento-detalle/establecimiento-detalle.component.ts  
  Lógica de la vista de detalle de un establecimiento y su interacción con valoraciones.

- src/app/features/admin/admin-panel/admin-panel.component.ts  
  Pantalla de administración para gestionar información relevante de la aplicación.

- src/app/features/consejos/consejos.component.ts  
  Sección donde se muestran consejos o información útil para usuarios celíacos.

- src/app/core/navbar/navbar.component.ts  
  Barra de navegación principal de la aplicación.

- src/app/core/interceptors/auth.interceptor.ts  
  Interceptor HTTP que añade el token de autenticación a las peticiones cuando el usuario ha iniciado sesión.

Además:

- angular.json  
  Configuración del proyecto Angular (build, assets, estilos, etc.).

- package.json  
  Dependencias del proyecto y scripts de ejecución.

---

## 🔍 Flujo de uso típico

1. El usuario accede a la ruta principal "/" y ve la pantalla de inicio (HomeComponent).
2. Introduce una ciudad en el buscador.
3. Se navega a "/resultados", donde se muestra:
   - Un listado de establecimientos.
   - Un mapa con los mismos establecimientos.
4. El usuario hace clic en un establecimiento y navega a "/establecimiento/:id", donde ve:
   - Detalle del lugar.
   - Valoraciones existentes.
   - Formulario para añadir una valoración.
5. Si el usuario no ha iniciado sesión, puede ir a "/login" para autenticarse.
6. Un usuario con permisos puede acceder a "/admin" para realizar tareas de administración.
7. Desde el menú, también puede acceder a "/consejos" para consultar información y recomendaciones.

---

## 👩‍💻 Autora

Verónica Flores Torralva  
Desarrolladora Web Junior

LinkedIn: https://www.linkedin.com/in/veronicaflorestorralva/  
GitHub: https://github.com/VeronicaFT

## Licencia
Este proyecto está bajo la licencia **MIT**.  
Puedes consultar los detalles en el archivo [LICENSE](./LICENSE).


