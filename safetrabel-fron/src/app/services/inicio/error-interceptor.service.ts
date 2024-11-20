import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';


export const ErrorInterceptorService : HttpInterceptorFn = ( req: HttpRequest<any>,
  next: HttpHandlerFn
)=>{

 

    return next(req).pipe(
      catchError(error => {
        console.error(error);
        return throwError(()=>error);
      })
    )
  
}
