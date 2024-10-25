import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/inicio/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../services/inicio/loginRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  providers:[LoginService] ,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit  {
  RegisterError:string="";
  formRegister:UntypedFormGroup;

  constructor(private formBuilder:UntypedFormBuilder, private router:Router, private loginService: LoginService){
    
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
          console.log(errordata)
          this.RegisterError= errordata
  
  
        },
        complete: ()=>{
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
