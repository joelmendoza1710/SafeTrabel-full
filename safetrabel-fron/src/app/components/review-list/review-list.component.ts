import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


interface Review {
  id: number;
  username: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpfulVotes: number;
}
@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  reviews: Review[] = [
    {
      id: 1,
      username: 'TravelLover123',
      location: 'New York, USA',
      rating: 5,
      date: 'March 2024',
      title: 'Amazing experience!',
      content: 'This place exceeded all my expectations. The service was impeccable, and the views were breathtaking. I would highly recommend it to anyone visiting the area.',
      helpfulVotes: 42
    },
    {
      id: 2,
      username: 'AdventureSeeker',
      location: 'London, UK',
      rating: 4,
      date: 'February 2024',
      title: 'Great place, minor issues',
      content: 'Overall, we had a wonderful time. The location is perfect, and the amenities are top-notch. However, there were some minor cleanliness issues in the bathroom that prevented me from giving it a perfect score.',
      helpfulVotes: 28
    },
    {
      id: 3,
      username: 'FoodieExplorer',
      location: 'Paris, France',
      rating: 5,
      date: 'January 2024',
      title: 'Culinary paradise!',
      content: 'If youre a food lover, this place is a must-visit! The variety and quality of dishes were outstanding. The chefs tasting menu was a journey through local flavors that Ill never forget.',
      helpfulVotes: 56
    }
  ];

}
