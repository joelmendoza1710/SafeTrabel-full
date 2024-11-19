import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Irevieews, Ireviewsupdate } from './reviewsType';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  myapiUrl: string;

  constructor(private _httpClient: HttpClient) {
    this.myapiUrl = environment.urlHost + 'api/v1/review';
  }

  getlistReviews(): Observable<any> {
    return this._httpClient.get(this.myapiUrl);
  }

  saveReviews(form: Irevieews): Observable<any> {
    // Preparar los parámetros que se van a enviar en la solicitud
    const params = new HttpParams()
      .set('userId', form.user.toString())
      .set('locationId', form.location.toString())
      .set('rating', form.rating.toString())
      .set('comment', form.comment || '');
  
    // Realizar la petición HTTP POST con los parámetros de consulta
    return this._httpClient.post<any>(this.myapiUrl, null, { params });
  }
  

  update(form: Ireviewsupdate,id:any): Observable<any> {
    return this._httpClient.put<any>(this.myapiUrl + '/' + id, form);
  }
  delete(id: number) {
    return this._httpClient.delete(this.myapiUrl + '/' + id);
  }
  getlistReviesbyuser(iduser:any):Observable<any>{
    return this._httpClient.get(this.myapiUrl+"/user/"+iduser)
  }
  getlistReviesbyLocation(idlocation:any):Observable<any>{
    return this._httpClient.get(this.myapiUrl+"/location/"+idlocation)
  }
}
