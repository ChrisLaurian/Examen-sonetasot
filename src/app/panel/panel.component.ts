import { Component } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { response } from 'express';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent {
  Curp: string | undefined;

  constructor(private registroService: RegistroService) {}

  guardarRegistro(){
    const registro = {
      dato: this.Curp
    };

    this.registroService.create(registro).subscribe(
      response => {
        console.log('Registro guardado:', response);
      },
      error => {
        console.error('Error al guardar el registro:', error);
      }
    );
  }
}
