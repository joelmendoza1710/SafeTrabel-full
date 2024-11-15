import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatDialogTitle,
    MatDialogContent, MatDialogActions,
    MatDialogClose, MatButtonModule,],
  templateUrl: './location-modal.component.html',
  styleUrl: './location-modal.component.scss'
})
export class LocationModalComponent {
  formularioLocation: FormGroup;
  modoEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LocationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoEdicion = !!data;
    this.formularioLocation = this.fb.group({
      nombreUsuario: [data?.nombreUsuario || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      contrasena: ['', this.modoEdicion ? [] : [Validators.required, Validators.minLength(6)]],
      rol: [data?.rol || 'Usuario', Validators.required]
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



}
