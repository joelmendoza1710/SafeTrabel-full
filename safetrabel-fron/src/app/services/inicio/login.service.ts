import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { Observable, throwError, catchError, BehaviorSubject , tap, map, ReplaySubject} from 'rxjs';
import { LoginRequest, RegisterRequest } from './loginRequest';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private datoslogin: BehaviorSubject<any> = new BehaviorSubject({});
  private _user: ReplaySubject<any> = new ReplaySubject<any>(1);

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

  constructor(private http: HttpClient) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.result),
      catchError(this.handleError)
    );
  }
  register(dataRegister:RegisterRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/register",dataRegister)

  }

  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    localStorage.removeItem("accessToken");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

   adduser(dato:any){
    this.datoslogin.next(dato);
  }

  get user$(): Observable<any> {
    return this._user.asObservable();
}

  datoslogins(){  
    return this.datoslogin.asObservable();
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

}
