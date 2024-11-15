import { Component, Inject } from '@angular/core';
import { ReviewsTableComponent } from '../reviews-table/reviews-table.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
    MatDialogClose, MatButtonModule,],
  templateUrl: './reviews-modal.component.html',
  styleUrl: './reviews-modal.component.scss'
})
export class ReviewsModalComponent {
  formularioUsuario: FormGroup;
  modoEdicion: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReviewsModalComponent>,
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
