
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MenuService, MenuItem } from './menu.service';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginService } from '../../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../../shared/toast/toast.service';

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

  constructor(private menuService: MenuService,private router:Router, private loginService:LoginService,    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
  }

  logout()
  {
    if(sessionStorage.getItem("token")){
      this.loginService.logout();
      this.toastService.showToast('Sesion Cerrada', 'success');
      this.router.navigate(['/login'])

    }
   
  }

}
