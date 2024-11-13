import { Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { LoginService } from '../../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  providers:[LoginService] ,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule,HttpClientModule],

  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  userLoginOn:boolean=false;
  @Input() userName: string = '';
  @Input() userEmail: string = '';

  constructor(private router:Router, private loginService:LoginService){
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )

  }

 
  logout()
  {
    this.loginService.logout();
    this.router.navigate(['/inicio'])
  }

  

}
