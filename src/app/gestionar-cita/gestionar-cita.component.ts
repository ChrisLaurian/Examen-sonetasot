import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Registro } from '../Models/registro'; 

@Component({
  selector: 'app-gestionar-cita',
  templateUrl: './gestionar-cita.component.html',
  styleUrls: ['./gestionar-cita.component.css']
})
export class GestionarCitaComponent implements OnInit {
  registroGuardado: Registro | null = null;

  constructor(private registroService: RegistroService) { }

  ngOnInit(): void {
    this.registroService.registroGuardado$.subscribe((registro: Registro) => {
      this.registroGuardado = registro;
    });
  }
}