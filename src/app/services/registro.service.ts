import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from '../Models/registro';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private _backendUrl = 'http://localhost:3900/api';

  registroGuardado$ = new EventEmitter<Registro>();

  constructor(private http: HttpClient) { } 

  getData(): Observable<any> {
    return this.http.get(`${this._backendUrl}/registros`); 
  }

  saveData(registro: Registro): Observable<any> {
    return this.http.post(`${this._backendUrl}/save`, registro).pipe(
      tap((response: any) => {
        const registroGuardado: Registro = response.registro;
        this.registroGuardado$.emit(registroGuardado);
      })
    ); 
  } 
}
