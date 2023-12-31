import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { Registro } from '../Models/registro'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-cita',
  templateUrl: './gestionar-cita.component.html',
  styleUrls: ['./gestionar-cita.component.css']
})
export class GestionarCitaComponent implements OnInit {
  registroGuardado: Registro | null = null;

  borrarRegistro(id: string): void{
    if(confirm('¿Estas seguro que quieres cancelar tu cita?')){
      this.registroService.deleteData(id).subscribe(
        () => {
          this.registroGuardado = null;
          alert('Cita cancelada!')
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error al cancelar la cita', error);
          alert('Error al cancelar tu cita');
        }
      )
    }
  }

  constructor(private registroService: RegistroService, private router: Router) { }

  ngOnInit(): void {
    this.registroService.registroGuardado$.subscribe((registro: Registro) => {
      this.registroGuardado = registro;
    });
  }
}