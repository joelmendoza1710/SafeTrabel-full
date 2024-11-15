
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MenuService, MenuItem } from './menu.service';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginService } from '../../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  providers:[LoginService],
  imports: [CommonModule, RouterModule, LayoutModule, OverlayModule,RouterLink, RouterLinkActive,HttpClientModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [];

  constructor(private menuService: MenuService,private router:Router, private loginService:LoginService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
  }

  logout()
  {
    if(sessionStorage.getItem("token")){
      this.loginService.logout();
      this.router.navigate(['/login'])

    }
   
  }

}
