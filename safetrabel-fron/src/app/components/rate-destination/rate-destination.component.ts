import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PhotosService } from '../admin/photos/photos.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ReviewsService } from '../admin/reviews/reviews.service';
import { Irevieews } from '../admin/reviews/reviewsType';
import { ToastService } from '../../shared/toast/toast.service';
import { Iuser } from '../admin/user/userType';

@Component({
  selector: 'app-rate-destination',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './rate-destination.component.html',
  providers: [PhotosService, ReviewsService],
  styleUrl: './rate-destination.component.scss',
})
export class RateDestinationComponent implements OnInit {
  destinationId!: number;
  uploadedImage: File | null = null;
  userRating = signal(0);
  visitDate = '';
  reviewTitle = '';
  reviewContent = '';
  destinations: any[] = [];
  selectedDestination: any;
  reviewForm: FormGroup;
  user: Iuser | any;
  selectedFile: File | undefined;
  imagePreview: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private _PhotosService: PhotosService,
    private fb: FormBuilder,
    private _reviwesService: ReviewsService,
    private toastService: ToastService,
    private _changeDetectorRef: ChangeDetectorRef,
    private router:Router

  ) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewContent: ['', [Validators.required, Validators.minLength(5)]],
      imageUpload: ['',]
    });
  }

  ngOnInit(): void {
    this.getallphotosByuser();
  }

  setRating(rating: number) {
    this.reviewForm.patchValue({ rating });
  }

  submitRating() {
    this.addReviews();
  }
  getallphotosByuser() {
    this._PhotosService.getlisPhotosByuser(10).subscribe({
      next: (datos) => {
        this.destinations = datos;

        this.route.params.subscribe((params) => {
          this.destinationId = +params['id'];
          this.selectedDestination = this.destinations.find(
            (d) => d.location.id === this.destinationId
          );
        });
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addReviews() {
    if (this.reviewForm) {
      const session = sessionStorage.getItem('user');
      if (session) {
        this.user = JSON.parse(session);
      
      this.route.params.subscribe((params) => {
        this.destinationId = +params['id'];
        this.selectedDestination = this.destinations.find(
          (d) => d.id === this.destinationId
        );
      });
      const datosrevies: Irevieews = {
        user: this.user.id,
        location: this.destinationId,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.reviewContent,
      };

      this._reviwesService.saveReviews(datosrevies).subscribe({
        next: (datos) => {
          this._PhotosService
            .uploadFile(
              datosrevies.user,
              datosrevies.location,
              this.selectedFile
            )
            .subscribe({
              complete: () => {
                console.log('foto subida');
              },
            }),
            this._changeDetectorRef.markForCheck();
        },
        error: (error) => {
          this.toastService.showToast('Error al crear la reseña.', 'error');
          console.log(error);
        },
        complete: () => {
          this.toastService.showToast('Reseña Creada', 'success');
          this.reviewForm.reset();
          this.router.navigateByUrl('/home');

          this._changeDetectorRef.markForCheck();
        },
      });
    }else{
      this.toastService.showToast('Debe Inicar Sesion ', 'error');


    }
    } else {
      alert('Error al ingresar los datos.');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Generar la vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
