import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../user/user.service';
import { ReviewsModalComponent } from '../reviews/reviews-modal/reviews-modal.component';
import { ReviewsService } from '../reviews/reviews.service';
import { LocationService } from '../location/location.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers:[UserService,ReviewsService,LocationService]
})
export class DashboardComponent {
  lenguser:any
  lenglocation:any
  lengreviews:any
  constructor(
    private _UserService: UserService,
    private _ReviewsService: ReviewsService,
    private _LocationService: LocationService
  ) { 

    this.getallReviews();
    this.getallUser();
    this.getallLocation();

  }

getallReviews(){
  this._ReviewsService.getlistReviews().subscribe({
    next(value) {
      this.lengreviews= value.length
        
    },
    error(err) {
        
    },
  })

}
getallUser(){
  this._UserService.getlistUser().subscribe({
    next(value) {
     this.lenguser=value.length
        
    },
    error(err) {
        
    },
  })
  
}
getallLocation(){
  this._LocationService.getlislocation().subscribe({
    next(value) {
      this.lenglocation=value.length
      console.log(this.lenglocation)
        
    },
    error(err) {
        
    },
  })
  
}

}
