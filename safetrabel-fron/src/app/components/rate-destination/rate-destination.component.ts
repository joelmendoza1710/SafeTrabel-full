import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

interface Destination{
  id: number;
  name: string;
  description: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-rate-destination',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './rate-destination.component.html',
  styleUrl: './rate-destination.component.scss'
})

export class RateDestinationComponent implements OnInit {
  destinationId!: number;
  selectedDestination!: Destination | undefined;
  userRating: number = 0;
  visitDate: string = '';
  reviewTitle: string = '';
  reviewContent: string = '';
  uploadedImage: File | null = null;

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

  onFileSelected(event: any): void {
    this.uploadedImage = event.target.files[0];
  }

  submitRating(): void {
    if (this.selectedDestination && this.userRating > 0) {
      console.log(`Calificación de ${this.userRating} enviada para ${this.selectedDestination.name}`);
      console.log(`Fecha de visita: ${this.visitDate}`);
      console.log(`Título de la opinión: ${this.reviewTitle}`);
      console.log(`Contenido de la opinión: ${this.reviewContent}`);
      if (this.uploadedImage) {
        console.log(`Imagen subida: ${this.uploadedImage.name}`);
      }
      // Aquí puedes agregar la lógica para enviar la calificación y la opinión a tu backend
      this.selectedDestination.rating = (this.selectedDestination.rating + this.userRating) / 2;
      this.userRating = 0;
      this.visitDate = '';
      this.reviewTitle = '';
      this.reviewContent = '';
      this.uploadedImage = null;
    }}
}
