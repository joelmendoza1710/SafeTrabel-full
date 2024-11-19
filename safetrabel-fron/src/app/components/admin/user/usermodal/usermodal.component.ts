import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { Iuser } from '../userType';
import { ToastService } from '../../../../shared/toast/toast.service';

@Component({
  selector: 'app-usermodal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    HttpClientModule
  ],
  providers:[UserService] ,
  templateUrl: './usermodal.component.html',
  styleUrl: './usermodal.component.scss',
})
export class UsermodalComponent {
  formularioUsuario: FormGroup;
  modoEdicion: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,

    private fb: FormBuilder,
    private _userService:UserService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<UsermodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modoEdicion = !!data;
    this.formularioUsuario = this.fb.group({
      name: [data?.name || '', Validators.required],
      username: [data?.username || '', [Validators.required, Validators.email]],
      password: [
        '',
        this.modoEdicion ? [] : [Validators.required, Validators.minLength(6)],
      ],
      role: [data?.role || 'USER', Validators.required],
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

  registeruser() {
    if(this.formularioUsuario.valid){
      this._userService.saveUser(this.formularioUsuario.value as Iuser).subscribe({
        next: (registerdata)=>{
          this._changeDetectorRef.markForCheck();
  
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al crear el usuario.', 'error');
          console.log(errordata)
  
  
        },
        complete: ()=>{
          this.toastService.showToast('Usuario Creado', 'success');
          this.formularioUsuario.reset();
          this._changeDetectorRef.markForCheck();

          
        }
      })

    }
    else{
      alert("Error al ingresar los datos.");
    }

    
  }
  updateuser(){
      if(this.formularioUsuario.valid){
        this._userService.update(this.formularioUsuario.value as Iuser,this.data.id).subscribe({
          next: (registerdata)=>{
            this._changeDetectorRef.markForCheck();    
    
          },
          error:(errordata)=>{
            this.toastService.showToast('Error al actualizar el usuario.', 'error');
            console.log(errordata)
    
    
          },
          complete: ()=>{
            this.toastService.showToast('Usuario actualizado', 'success');
            this.formularioUsuario.reset();
            this._changeDetectorRef.markForCheck();

          }
        })
  
      }
      else{
        alert("Error al ingresar los datos.");
      }
  
      
    }
  
}
