import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuVerticalService {

  private menudatos:any;

  constructor() { }


  get datosmenu(){
    return this.menudatos;
  }

  Adddatos(dato:any){
    this.menudatos= dato;
  }
  deteltedatos(dato:any){
    this.menudatos=dato
  }


}
