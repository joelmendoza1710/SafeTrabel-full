import { Component } from '@angular/core';
import { MenuVerticalService } from './menu-vertical.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-vertical',
  standalone: true,
  imports: [],
  templateUrl: './menu-vertical.component.html',
  styleUrl: './menu-vertical.component.scss'
})
export class MenuVerticalComponent {

  constructor(private menuservice: MenuVerticalService, private _router:Router){

  }



  obtenerValor(event: Event): void {
    const boton = event.target as HTMLButtonElement;
    const valor = boton.value || boton.innerText || boton.id; // Usa innerText o id como alternativa
    this.menuservice.Adddatos(valor);
    this._router.navigate(['/administrador/'+valor]);


    
   
  }

}
