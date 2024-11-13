import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuVerticalComponent } from './menu-vertical/menu-vertical.component';
import { CommonModule } from '@angular/common';
import { MenuVerticalService } from './menu-vertical/menu-vertical.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,MenuVerticalComponent,NavbarComponent,DashboardComponent,UserComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
 menuname : any

 constructor(private menuservice:MenuVerticalService){

 }
  
 get datosmenu(){
   return  this.menuservice.datosmenu;
 }
 ngOnInit(): void {
   this.menuname= this.datosmenu
    
 }



}
