import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { PopularDestinationsComponent } from './components/popular-destinations/popular-destinations.component';
import { RecentReviewsComponent } from './components/recent-reviews/recent-reviews.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/inicio/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/inicio/error-interceptor.service';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
})
export class AppComponent {
  title = 'Safe Travel';
}
