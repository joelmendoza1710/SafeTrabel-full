import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  constructor() { }
  private userKey: string = 'token';
  private _cookie: CookieService = inject(CookieService);

  setUser(user: any): void {
    this._cookie.set(this.userKey, JSON.stringify(user));
  }

  getUser(): any | null {
    let userLogin!: any | null;
    try {
      userLogin = JSON.parse(this._cookie.get(this.userKey));
    } catch (e) {
      userLogin = null;
    }
    return userLogin;
  }

  isExistSession(): boolean {
    return this._cookie.check(this.userKey);
  }

  deleteSession(): void {
    this._cookie.delete(this.userKey);
  }

//   isAdmin(): boolean {
//     const user: any | null = this.getUser();
//     const adminRoleId: number = ROLE_CONTANTS.ADMIN_ROLE;
//     if (user) return user.role.id === adminRoleId;
//     return false;
// }

  
}
