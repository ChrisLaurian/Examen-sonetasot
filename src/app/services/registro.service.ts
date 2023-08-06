import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from "rxjs";
import { Registro } from "../Models/registro";
import { Global } from "./global";


@Injectable()
export class RegistroService{

    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    create(registro):Observable<any>{
        let params = JSON.stringify(registro);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save', params, {headers: headers});
    }

}