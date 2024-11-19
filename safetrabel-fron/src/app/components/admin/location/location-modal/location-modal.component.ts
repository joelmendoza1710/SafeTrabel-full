import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastService } from '../../../../shared/toast/toast.service';
import { Ilocation } from '../locationType';
import { LocationService } from '../location.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatDialogTitle,
    MatDialogContent, MatDialogActions,
    MatDialogClose, MatButtonModule,    HttpClientModule,
  ],
  templateUrl: './location-modal.component.html',
  providers: [LocationService],

  styleUrl: './location-modal.component.scss'
})
export class LocationModalComponent {
  formularioLocation: FormGroup;
  modoEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService,
    private _LocationService:LocationService,
    private dialogRef: MatDialogRef<LocationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoEdicion = !!data;
    this.formularioLocation = this.fb.group({
      name: [data?.name || '', Validators.required],
      city: [data?.city || '', [Validators.required]],
      country: [ data?.country, [Validators.required]],
      description: [ data?.description, [Validators.required]],
      address: [ data?.address, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.formularioLocation.valid) {
      this.dialogRef.close(this.formularioLocation.value);
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }
  addLocation() {
    if(this.formularioLocation.valid){
      this._LocationService.saveLocation(this.formularioLocation.value as Ilocation).subscribe({
        next: (registerdata)=>{
          this._changeDetectorRef.markForCheck();
  
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al crear la localizacion.', 'error');
          console.log(errordata)
  
  
        },
        complete: ()=>{
          this.toastService.showToast('Localizacion Creada', 'success');
          this.formularioLocation.reset();
          this._changeDetectorRef.markForCheck();

          
        }
      })

    }
    else{
      alert("Error al ingresar los datos.");
    }

    
  }

  upodateLocation(){
    if(this.formularioLocation.valid){
      this._LocationService.update(this.formularioLocation.value as Ilocation,this.data.id).subscribe({
        next: (registerdata)=>{
          this._changeDetectorRef.markForCheck();    
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al actualizarla localizacion.', 'error');
          console.log(errordata)
  
  
        },
        complete: ()=>{
          this.toastService.showToast('Localizacion actualizada', 'success');
          this.formularioLocation.reset();
          this._changeDetectorRef.markForCheck();

        }
      })

    }
    else{
      alert("Error al ingresar los datos.");
    }

    
  }



}
