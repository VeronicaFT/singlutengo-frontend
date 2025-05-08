import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
