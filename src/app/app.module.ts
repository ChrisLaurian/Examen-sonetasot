import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooderComponent } from './fooder/fooder.component';
import { BackgroundComponent } from './background/background.component';
import { PanelComponent } from './panel/panel.component';
import { HomeComponent } from './home/home.component';
import { GestionarCitaComponent } from './gestionar-cita/gestionar-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooderComponent,
    BackgroundComponent,
    PanelComponent,
    HomeComponent,
    GestionarCitaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
