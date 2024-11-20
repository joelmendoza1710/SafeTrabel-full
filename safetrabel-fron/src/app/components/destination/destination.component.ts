import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PhotosService } from '../admin/photos/photos.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ReviewsService } from '../admin/reviews/reviews.service';

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
  imports: [CommonModule, FormsModule, RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './destination.component.html',
  providers: [PhotosService,ReviewsService],
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  destinationId!: number;
  selectedDestination!: any | undefined;
  userRating: number = 0;

  destinations: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private _PhotosService: PhotosService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.getallphotosByuser();
    
  }

  submitRating(): void {
    if (this.selectedDestination && this.userRating > 0) {
      console.log(
        `Calificación de ${this.userRating} enviada para ${this.selectedDestination.name}`
      );
      this.selectedDestination.rating =
        (this.selectedDestination.rating + this.userRating) / 2;
      this.userRating = 0;
    }
  }

  getallphotosByuser() {
      this._PhotosService.getlisPhotosByuser(10).subscribe({
        next: (datos) => {
          this.destinations = datos;
          // Mueve la lógica de selección aquí después de cargar los datos.
          this.route.params.subscribe((params) => {
            this.destinationId = +params['id'];
            this.selectedDestination = this.destinations.find(
              (d) => d.id === this.destinationId
            );
          });
        },
        error(err) {
          console.log(err);
        },
      });
  }

  navegarlocation(id:any){
    this.router.navigateByUrl('/destination/'+id);
  }

  obtenerid(){
    this.route.params.subscribe((params) => {
      this.destinationId = +params['id'];
      this.selectedDestination = this.destinations.find(
        (d) => d.id === this.destinationId
      );
    });

  }

  
}
