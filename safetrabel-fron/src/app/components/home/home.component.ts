import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DestinationComponent } from '../destination/destination.component';
import { ReviewsService } from '../admin/reviews/reviews.service';
import { PhotosService } from '../admin/photos/photos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,
    HeaderComponent,
    SearchComponent,
    FooterComponent,DestinationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

}
