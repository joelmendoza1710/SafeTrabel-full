import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReviewsService } from '../admin/reviews/reviews.service';
import { Router } from 'express';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-recent-reviews',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,HttpClientModule
    
    ],
  templateUrl: './recent-reviews.component.html',
  styleUrl: './recent-reviews.component.scss',
  providers:[ReviewsService]
})
export class RecentReviewsComponent {
  destinationId!: number;
  selectedDestination!: any | undefined;
  userRating: number = 0;
  destinations: any[] = [];
  reviews: any[] = [];
  currentPage = 1;
  itemsPerPage = 2;
  totalPages: number[] = [];
  paginatedReviews: any[] = [];
  fullSizeImage: string | null = null;

  constructor(private _RewviewsService: ReviewsService,private route: ActivatedRoute,

  ) {}
  
  ngOnInit() {
    this.getallReviewsBylocation();
    
  }

  calculateTotalPages() {
    const pageCount = Math.ceil(this.reviews.length / this.itemsPerPage);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  updatePaginatedReviews() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedReviews();
  }

  openFullSizeImage(imageSrc: string) {
    this.fullSizeImage = imageSrc;
  }

  closeFullSizeImage() {
    this.fullSizeImage = null;
  }

  getallReviewsBylocation() {
    this.route.params.subscribe((params) => {
      this.destinationId = +params['id'];
      this.selectedDestination = this.destinations.find(
        (d) => d.id === this.destinationId
      );
    });
    if(this.destinationId){
      this._RewviewsService
      .getlistReviesbyLocation(this.destinationId)
      .subscribe({
       next:(value)=> {
        this.reviews=value
        this.calculateTotalPages();
        this.updatePaginatedReviews();
           
       },
        error(err) {},
      });

    }else{
      this._RewviewsService
      .getlistReviewsRecent()
      .subscribe({
       next:(value)=> {
        this.reviews=value
        this.calculateTotalPages();
        this.updatePaginatedReviews();
           
       },
        error(err) {},
      });

    }
    
  }
}
