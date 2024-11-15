import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { RateExperienceComponent } from './components/rate-experience/rate-experience.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { UserTableComponent } from './components/admin/user/user-table/user-table.component';
import { ReviewsTableComponent } from './components/admin/reviews/reviews-table/reviews-table.component';
import { LocationTableComponent } from './components/admin/location/location-table/location-table.component';

export const routes: Route[] = [
    {
        path:'', pathMatch:'full', redirectTo: 'home'
    },
    {
        path:'administrador',
        component: AdminComponent,
        children:[
            //{ path: '', component: DashboardComponent },
            { path: 'users', component: UserTableComponent },
            { path: 'home', component: DashboardComponent },
            { path: 'reviews', component: ReviewsTableComponent },
            { path: 'location', component: LocationTableComponent },



        ]
    },
    {
        path:'home',component: HomeComponent
    },
    {
        path:'login',component: LoginComponent
    } ,
    {
        path:'register',component: RegisterComponent
    },
    {
        path:'review',component:ReviewListComponent
    }
    ,
    {
        path:'rate-experience',component:RateExperienceComponent
    }

    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
