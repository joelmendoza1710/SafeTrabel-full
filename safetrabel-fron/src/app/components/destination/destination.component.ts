import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Destination {
  id: number;
  name: string;
  image: string;
  rating: number;
  description: string;
}

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  destinationId!: number;
  selectedDestination!: Destination | undefined;
  userRating: number = 0;

  destinations: Destination[] = [
    { id: 1, name: 'Paris, France', image: '/placeholder.svg?height=200&width=300', rating: 4.5, description: 'La ciudad del amor' },
    { id: 2, name: 'Rome, Italy', image: '/placeholder.svg?height=200&width=300', rating: 4.7, description: 'La ciudad eterna' },
    { id: 3, name: 'Tokyo, Japan', image: '/placeholder.svg?height=200&width=300', rating: 4.6, description: 'La metropolis' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.destinationId = +params['id'];
      this.selectedDestination = this.destinations.find(d => d.id === this.destinationId);
    });
  }

  submitRating(): void {
    if (this.selectedDestination && this.userRating > 0) {
      console.log(`Calificación de ${this.userRating} enviada para ${this.selectedDestination.name}`);
      this.selectedDestination.rating = (this.selectedDestination.rating + this.userRating) / 2;
      this.userRating = 0;
    }
  }
}
