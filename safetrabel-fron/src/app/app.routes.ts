import { Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { RateExperienceComponent } from './components/rate-experience/rate-experience.component';

export const routes: Routes = [
    {
        path:'', pathMatch:'full', redirectTo: 'home'
    },
    {
        path:'administrador',component: DashboardComponent
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
