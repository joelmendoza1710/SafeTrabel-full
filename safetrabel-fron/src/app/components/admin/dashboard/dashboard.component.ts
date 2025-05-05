import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../user/user.service';
import { ReviewsModalComponent } from '../reviews/reviews-modal/reviews-modal.component';
import { ReviewsService } from '../reviews/reviews.service';
import { LocationService } from '../location/location.service';
import { BarChartComponent } from '../../../../../charts/bar-chart.component';
import { LineChartComponent } from '../../../../../charts/line-chart.component';
import { PieChartComponent } from '../../../../../charts/pie-chart.component';
import { RadarChartComponent } from '../../../../../charts/radar-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent,BarChartComponent,LineChartComponent,PieChartComponent,RadarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers:[UserService,ReviewsService,LocationService]
})
export class DashboardComponent {
  lenguser = 0
  lengreviews = 0
  lenglocation = 0

  // Chart data - Modificados para mostrar reseñas de sitios y localizaciones
  userGrowthData = [
    { month: "Ene", reseñas: 45 },
    { month: "Feb", reseñas: 62 },
    { month: "Mar", reseñas: 78 },
    { month: "Abr", reseñas: 95 },
    { month: "May", reseñas: 110 },
    { month: "Jun", reseñas: 132 },
  ]

  reservationsByDestination = [
    { sitio: "Playas de boca garande", reseñas: 87 },
    { sitio: "Centro de cartagena", reseñas: 120 },
    { sitio: "Marbella", reseñas: 95 },
    { sitio: "Muelle de los pegasos", reseñas: 76 },
    { sitio: "Getsemani", reseñas: 68 },
  ]

  userSatisfactionData = [
    { categoria: "Limpieza", valor: 4.2 },
    { categoria: "Ubicación", valor: 4.7 },
    { categoria: "Precio", valor: 3.8 },
    { categoria: "Servicio", valor: 4.5 },
    { categoria: "Instalaciones", valor: 4.0 },
  ]

  revenueDistributionData = [
    { categoria: "Playas", valor: 35 },
    { categoria: "Sitios Históricos", valor: 25 },
    { categoria: "Parques Naturales", valor: 20 },
  ]
  constructor(
    private _UserService: UserService,
    private _ReviewsService: ReviewsService,
    private _LocationService: LocationService
  ) { 
     // Simulando datos que vendrían de un servicio


    this.getallReviews();
    this.getallUser();
    this.getallLocation();

  }

getallReviews(){
  this._ReviewsService.getlistReviews().subscribe({
    next:(value)=> {
      this.lengreviews= value.length
        
    },
    error(err) {
        
    },
  })

}
getallUser(){
  this._UserService.getlistUser().subscribe({
    next:(value)=> {
     this.lenguser=value.length
        
    },
    error(err) {
        
    },
  })
  
}
getallLocation(){
  this._LocationService.getlislocation().subscribe({
    next:(value)=> {
      this.lenglocation=value.length
      console.log(this.lenglocation)
        
    },
    error(err) {
        
    },
  })
  
}

}
