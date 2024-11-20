import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../services/inicio/loginRequest';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  providers:[LoginService] ,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit  {
  RegisterError:string="";
  formRegister:UntypedFormGroup;

  constructor(private formBuilder:UntypedFormBuilder, private router:Router, private loginService: LoginService,private toastService: ToastService){
    
    this.formRegister=this.formBuilder.group({
      username:['',[Validators.required,Validators.email]],
      name:['',Validators.required],
      password: ['',Validators.required],
    })
  }
  ngOnInit(): void {
   
  }


  
  onSubmit() {
    this.register()
  }

  register(){
    if(this.formRegister.valid){
      this.loginService.register(this.formRegister.value as RegisterRequest).subscribe({
        next: (registerdata)=>{
          console.log(registerdata)
  
  
        },
        error:(errordata)=>{
          this.toastService.showToast('Error al registrar. Por favor, inténtalo de nuevo.', 'error');
          this.RegisterError= errordata
  
  
        },
        complete: ()=>{
          this.toastService.showToast('"registro completado inicie sesion', 'success');

          console.log("registro completado")
          this.router.navigateByUrl('/login');
          this.formRegister.reset();
  
        }
      })

    }
    else{
      this.formRegister.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }

  }

}
