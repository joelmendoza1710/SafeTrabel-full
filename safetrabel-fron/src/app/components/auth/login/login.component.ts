import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/inicio/login.service';
import { LoginRequest } from '../../../services/inicio/loginRequest';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[LoginService] ,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginError:string="";
  loginForm: UntypedFormGroup;
 
  constructor(private formBuilder:UntypedFormBuilder,private toastService: ToastService, private router:Router, private loginService: LoginService) {
    this.loginForm=this.formBuilder.group({
      username:['',[Validators.required,Validators.email]],
      password: ['',Validators.required],
    })
   }

  ngOnInit(): void {
   
  }
  
  get email(){
    return this.loginForm.value.username;
  }

  get password()
  {
    return this.loginForm.value.password;
  }



  onSubmit() {
    this.login();
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          this.agregaruser(userData)
          console.log(userData)
          
        },
        error: (errorData) => {
          this.toastService.showToast('Error al iniciar sesión. Por favor, inténtalo de nuevo.', 'error');
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.toastService.showToast('Has iniciado sesión correctamente', 'success');
          this.router.navigateByUrl('/home');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }


  agregaruser(dato:any){
    this.loginService.adduser(dato);
  }

}
