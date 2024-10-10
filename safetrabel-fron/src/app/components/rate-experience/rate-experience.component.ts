import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rate-experience',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rate-experience.component.html',
  styleUrl: './rate-experience.component.scss'
})
export class RateExperienceComponent {
  rating: number = 0;
  visitDate: string = '';
  title: string = '';
  review: string = '';
  selectedFile: File | null = null;

  setRating(value: number) {
    this.rating = value;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    console.log('Submitting review:', {
      rating: this.rating,
      visitDate: this.visitDate,
      title: this.title,
      review: this.review,
      photo: this.selectedFile ? this.selectedFile.name : 'No photo uploaded'
    });
    // Here you would typically send this data to your backend
    // After successful submission, you might want to reset the form or navigate to a different page
    this.rating = 0;
    this.visitDate = '';
    this.title = '';
    this.review = '';
    this.selectedFile = null;
  }

}
