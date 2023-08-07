import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GestionarCitaComponent } from './gestionar-cita/gestionar-cita.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'gestionar-cita', component: GestionarCitaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
