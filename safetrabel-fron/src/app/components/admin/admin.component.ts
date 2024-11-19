import { Component, ElementRef, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuVerticalService } from './menu-vertical/menu-vertical.service';
import { ToastService } from '../../shared/toast/toast.service';
import { Iuser } from './user/userType';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent,NavbarComponent,HttpClientModule],
  providers:[LoginService] ,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
 menuname : any
 user: Iuser | any;

 constructor(private menuservice:MenuVerticalService,private loginService: LoginService, private router:Router,   private toastService: ToastService,
 ){
 }
  
 get datosmenu(){
   return  this.menuservice.datosmenu;
 }
 getdatosuser(){
  const session = sessionStorage.getItem('user');
  if(session){
    this.user = JSON.parse(session)
  }
  if(sessionStorage.getItem("token")){
    if(this.user.role == "USER"){
     this.toastService.showToast('Debe iniciar sesion como administrador.', 'error');
     this.router.navigate(['/home'])



    }

 }else{
   this.toastService.showToast('Debe iniciar sesion.', 'error');
   this.router.navigate(['/login'])



 }
 }

 ngOnInit(): void {
 
  this.getdatosuser();
   this.menuname= this.datosmenu
   console.log(this.user)
    
 }
 @ViewChild('userMenu') userMenu!: ElementRef;

  isUserMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.userMenu.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }



}
