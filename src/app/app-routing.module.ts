import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';
import { ResultadosComponent } from './features/resultados/resultados/resultados.component';
import { EstablecimientoDetalleComponent } from './features/establecimiento/establecimiento-detalle/establecimiento-detalle.component';
import { ConsejosComponent } from './features/consejos/consejos.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'establecimiento/:id', component: EstablecimientoDetalleComponent },
  {path: 'consejos', component: ConsejosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
