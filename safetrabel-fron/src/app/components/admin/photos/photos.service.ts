import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Iphotos } from './photosTyoe';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  myapiUrl: string;


  constructor(private _httpClient: HttpClient) { 
    this.myapiUrl = environment.urlHost + 'api/v1/photo';

  }



  getlisPhotos(): Observable<any> {
    return this._httpClient.get(this.myapiUrl);
  }

  savePhotos(form: Iphotos): Observable<any> {
    return this._httpClient.post<any>(this.myapiUrl, form);
  }

  update(form: Iphotos,id:any): Observable<any> {
    return this._httpClient.put<any>(this.myapiUrl + '/' + id, form);
  }
  delete(id: number) {
    return this._httpClient.delete(this.myapiUrl + '/' + id);
  }
  uploadFile(userId: number, locationId: number, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('locationId', locationId.toString());
    formData.append('file', file);

    return this._httpClient.post<any>(this.myapiUrl+"/upload", formData)
      
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la subida:', error);
    return throwError(() => new Error('Error en la subida. Inténtelo de nuevo más tarde.'));
  }

}
