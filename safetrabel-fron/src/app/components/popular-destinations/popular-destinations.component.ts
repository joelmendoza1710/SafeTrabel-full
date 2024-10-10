import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';


interface Destination {
  id: number;
  name: string;
  image: string;
  rating: number;
}


@Component({
  selector: 'app-popular-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-destinations.component.html',
  styleUrl: './popular-destinations.component.scss'
})
export class PopularDestinationsComponent {




  destinations = signal<Destination[]>([
    { id: 1, name: 'Paris, France', image: '/placeholder.svg?height=200&width=300', rating: 4.5 },
    { id: 2, name: 'Rome, Italy', image: '/placeholder.svg?height=200&width=300', rating: 4.7 },
    { id: 3, name: 'Tokyo, Japan', image: '/placeholder.svg?height=200&width=300', rating: 4.6 },
    { id: 4, name: 'New York City, USA', image: '/placeholder.svg?height=200&width=300', rating: 4.4 },
    { id: 5, name: 'Barcelona, Spain', image: '/placeholder.svg?height=200&width=300', rating: 4.3 },
    { id: 6, name: 'London, UK', image: '/placeholder.svg?height=200&width=300', rating: 4.2 },
  ]);

}
