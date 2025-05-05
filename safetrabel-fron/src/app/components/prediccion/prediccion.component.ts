import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../admin/side-menu/side-menu.component';
import { NavbarComponent } from '../admin/navbar/navbar.component';
import { LoginService } from '../../services/inicio/login.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-prediccion',
  standalone: true,
 imports: [CommonModule,ReactiveFormsModule, RouterOutlet, SideMenuComponent,NavbarComponent,HttpClientModule],
   providers:[LoginService] ,
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.scss'
})
export class PrediccionComponent {
  form: FormGroup;
  resultado: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      edad: [25, Validators.required],
      lugarVivienda: ['Bogota', Validators.required],
      duracionEstadia: [6, Validators.required],
      location: ['Playa_Blanca', Validators.required],
      rating: [5, Validators.required],
      sentimientoComentario: ['Positivo', Validators.required]
    });
  }

  enviar() {
    if (this.form.valid) {
      this.http.post('http://localhost:8080/api/prediccion', this.form.value)
        .subscribe(res => this.resultado = res);
    }
  }

}
