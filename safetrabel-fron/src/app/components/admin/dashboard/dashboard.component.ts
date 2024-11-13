import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuVerticalComponent } from '../menu-vertical/menu-vertical.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MenuVerticalComponent,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
