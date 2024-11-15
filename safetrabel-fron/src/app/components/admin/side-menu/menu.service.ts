import { Injectable } from '@angular/core';


export interface MenuItem {
  label: string;
  path: string;
  icon: string;
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  private menuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'home' },
    { label: 'Users', path: '/users', icon: 'users' },
    { label: 'Products', path: '/reviews', icon: 'cart' },
    { label: 'Analytics', path: '/location', icon: 'chart' },
    { label: 'Settings', path: '/settings', icon: 'settings' }
  ];

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
  
}
