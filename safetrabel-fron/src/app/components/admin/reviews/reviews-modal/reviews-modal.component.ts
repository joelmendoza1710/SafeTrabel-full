import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ReviewsTableComponent } from '../reviews-table/reviews-table.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReviewsService } from '../reviews.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Irevieews, Ireviewsupdate } from '../reviewsType';
import { ToastService } from '../../../../shared/toast/toast.service';
import { JwtInterceptorService } from '../../../../services/inicio/jwt-interceptor.service';
import { ErrorInterceptorService } from '../../../../services/inicio/error-interceptor.service';
import { LocationService } from '../../location/location.service';
import { UserService } from '../../user/user.service';


interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}
@Component({
  selector: 'app-reviews-modal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatDialogTitle,
    MatDialogContent, MatDialogActions,
    MatDialogClose, MatButtonModule,HttpClientModule,
  ],
  providers: [
    ReviewsService,UserService,LocationService,
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

  templateUrl: './reviews-modal.component.html',
  styleUrl: './reviews-modal.component.scss'
})
export class ReviewsModalComponent {
  formularioReviews: FormGroup;
  modoEdicion: boolean;
  users:any;
  locations:any

  constructor(
    private  _reviewsService: ReviewsService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private _UserService:UserService,
    private _LocationService:LocationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ReviewsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoEdicion = !!data;
    this.formularioReviews = this.fb.group({
      user: [data?.user.id || '', Validators.required],
      location: [data?.location.id || '', [Validators.required, ]],
      comment: [data?.comment|| '',[Validators.required,  ]],
      rating: [data?.rating || '1', Validators.required]
    });
  }

  onSubmit() {
    if (this.formularioReviews.valid) {
      this.dialogRef.close(this.formularioReviews.value);
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }

  addReviews(){
    if(this.formularioReviews){
      this._reviewsService.saveReviews(this.formularioReviews.value as Irevieews).subscribe({
        next:(datos)=>{
          this._changeDetectorRef.markForCheck();



        },
        error:(error)=>{
          this.toastService.showToast('Error al crear la reseña.', 'error');
          console.log(error)


        },
        complete:()=>{
          this.toastService.showToast('Reseña Creada', 'success');
          this.formularioReviews.reset();
          this._changeDetectorRef.markForCheck();

        }
      })

    }
    else{
      alert("Error al ingresar los datos.");


    }
  }
  updateRevies(){

    const datosrwviews :Ireviewsupdate = {
      rating:this.formularioReviews.value.rating,
      comment:this.formularioReviews.value.comment,
      createdAt:this.formularioReviews.value.createdAt


    }
    if(this.formularioReviews.valid){
      this._reviewsService.update(datosrwviews,this.data.id).subscribe({
        next: (registerdata)=>{
          this._changeDetectorRef.markForCheck();    
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al actualizar la reseña.', 'error');
          console.log(errordata)
  
  
        },
        complete: ()=>{
          this.toastService.showToast('Rseña actualizado', 'success');
          this.formularioReviews.reset();
          this._changeDetectorRef.markForCheck();

        }
      })

    }
    else{
      alert("Error al ingresar los datos.");
    }

    
  }



}
