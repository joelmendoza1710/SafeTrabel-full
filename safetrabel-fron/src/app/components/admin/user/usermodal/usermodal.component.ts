import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-usermodal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatDialogTitle,
    MatDialogContent, MatDialogActions,
    MatDialogClose, MatButtonModule,],
  templateUrl: './usermodal.component.html',
  styleUrl: './usermodal.component.scss'
})
export class UsermodalComponent {
  formularioUsuario: FormGroup;
  modoEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsermodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoEdicion = !!data;
    this.formularioUsuario = this.fb.group({
      nombreUsuario: [data?.nombreUsuario || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      contrasena: ['', this.modoEdicion ? [] : [Validators.required, Validators.minLength(6)]],
      rol: [data?.rol || 'Usuario', Validators.required]
    });
  }

  onSubmit() {
    if (this.formularioUsuario.valid) {
      this.dialogRef.close(this.formularioUsuario.value);
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }

}
