import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Registro } from '../Models/registro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  curp: string = '';
  mensaje: string = ''; // Agrega una propiedad para mostrar mensajes
  registroGuardado: Registro | null = null;
  curpValue: string = '';
  

 

  constructor(private registroService: RegistroService, private router: Router) {}

  transformToUppercase() {
    this.curpValue = this.curpValue.toUpperCase();
  }

  ngOnInit(): void {}

  guardarRegistro(): void {
    if (this.curp.trim() !== '') {
      const nuevoRegistro = new Registro(
        123456,
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
          alert('La curp no es valida');
          this.router.navigate(['/']);
        }
      );
    } else {
      this.mensaje = 'Por favor, ingresa una CURP válida';
    }
  }
}
