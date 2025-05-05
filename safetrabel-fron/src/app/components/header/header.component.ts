import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { UserMenuComponent } from '../admin/user-menu/user-menu.component';
import { LoginService } from '../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserMenuComponent],
  providers:[LoginService] ,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  user: any;


  datosuser:any

  constructor(private loginservice: LoginService,private _changeDetectorRef: ChangeDetectorRef,
  ){
    this.loginservice.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: any) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
   
      console.log(this.user)

  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }


  

}
