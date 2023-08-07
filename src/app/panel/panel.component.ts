import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Registro } from '../Models/registro';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  curp: string = '';
  mensaje: string = ''; // Agrega una propiedad para mostrar mensajes
  registroGuardado: Registro | null = null;

  constructor(private registroService: RegistroService) {}

  ngOnInit(): void {}

  guardarRegistro(): void {
    if (this.curp.trim() !== '') {
      const nuevoRegistro = new Registro(
        'Nombre Ejemplo',
        this.curp,
        'Módulo Ejemplo',
        'Dirección Ejemplo',
        'Fecha Ejemplo',
        'Hora Ejemplo'
      );

      this.registroService.saveData(nuevoRegistro).subscribe(
        (response) => {
          console.log('Registro guardado', response);
          this.mensaje = 'Registro guardado exitosamente';
          this.registroGuardado = nuevoRegistro; // Asigna el registro guardado
        },
        (error) => {
          console.error('Error al guardar registro', error);
          this.mensaje = 'Error al guardar el registro';
        }
      );
    } else {
      this.mensaje = 'Por favor, ingresa una CURP válida';
    }
  }
}
