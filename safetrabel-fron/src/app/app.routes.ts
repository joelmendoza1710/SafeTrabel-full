import { Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

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
    }

    
];
