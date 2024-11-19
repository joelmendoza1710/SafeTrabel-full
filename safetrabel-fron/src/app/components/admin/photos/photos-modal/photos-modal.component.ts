import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/toast/toast.service';
import { PhotosService } from '../photos.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Iphotos } from '../photosTyoe';
import { Ilocation } from '../../location/locationType';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-photos-modal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatDialogTitle,
    MatDialogContent, MatDialogActions,
    MatDialogClose, MatButtonModule,    HttpClientModule,],
    providers: [PhotosService],

  templateUrl: './photos-modal.component.html',
  styleUrl: './photos-modal.component.scss'
})
export class PhotosModalComponent {
  formularioLocation: FormGroup;
  modoEdicion: boolean;
  selectedFile: File | undefined ;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService,
    private _PhotosService:PhotosService,
    private dialogRef: MatDialogRef<PhotosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoEdicion = !!data;
    this.formularioLocation = this.fb.group({
      file: [data?.photoUrl || '', Validators.required],
      location: [data?.location.id || '', [Validators.required]],
      user: [ data?.user.id, [Validators.required]],
      
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
  addPhoto() {
    const datos = this.formularioLocation.value
    console.log(datos)
    if(this.formularioLocation.valid){
      this._PhotosService.uploadFile(datos.user,datos.location,this.selectedFile).subscribe({
        next: (registerdata)=>{
          this._changeDetectorRef.markForCheck();
  
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al crear la Foto.', 'error');
          console.log(errordata)
  
  
        },
        complete: ()=>{
          this.toastService.showToast('Foto Creada', 'success');
          this.formularioLocation.reset();
          this._changeDetectorRef.markForCheck();

          
        }
      })

    }
    else{
      alert("Error al ingresar los datos.");
    }

    
  }

  upodatephoto(){
    if(this.formularioLocation.valid){
      this._PhotosService.update(this.formularioLocation.value as Ilocation,this.data.id).subscribe({
        next: (registerdata)=>{
          this._changeDetectorRef.markForCheck();    
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al actualizarla Foto.', 'error');
          console.log(errordata)
  
  
        },
        complete: ()=>{
          this.toastService.showToast('Foto actualizada', 'success');
          this.formularioLocation.reset();
          this._changeDetectorRef.markForCheck();

        }
      })

    }
    else{
      alert("Error al ingresar los datos.");
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
