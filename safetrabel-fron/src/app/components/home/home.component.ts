import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { HeaderComponent } from '../header/header.component';
import { PopularDestinationsComponent } from '../popular-destinations/popular-destinations.component';
import { RecentReviewsComponent } from '../recent-reviews/recent-reviews.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,
    HeaderComponent,
    SearchComponent,
    PopularDestinationsComponent,
    RecentReviewsComponent,
    FooterComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
