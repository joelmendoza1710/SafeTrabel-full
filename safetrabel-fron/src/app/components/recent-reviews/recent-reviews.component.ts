import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';



interface Review {
  id: number;
  user: string;
  destination: string;
  comment: string;
  rating: number;
}



@Component({
  selector: 'app-recent-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-reviews.component.html',
  styleUrl: './recent-reviews.component.scss'
})
export class RecentReviewsComponent  {


  reviews = signal<Review[]>([
    { id: 1, user: 'John D.', destination: 'Eiffel Tower, Paris', comment: 'Amazing view of the city!', rating: 5 },
    { id: 2, user: 'Sarah M.', destination: 'Colosseum, Rome', comment: 'Incredible piece of history.', rating: 4.5 },
    { id: 3, user: 'Mike L.', destination: 'Tokyo Disneyland', comment: 'Fun for the whole family!', rating: 4.7 },
    { id: 4, user: 'Emily R.', destination: 'Central Park, NYC', comment: 'A peaceful oasis in the city.', rating: 4.2 },
  ]);

}
