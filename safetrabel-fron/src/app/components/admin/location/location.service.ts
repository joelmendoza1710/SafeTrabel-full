import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Ilocation } from './locationType';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  myapiUrl: string;


  constructor(private _httpClient: HttpClient) { 
    this.myapiUrl = environment.urlHost + 'api/v1/location';

  }



  getlislocation(): Observable<any> {
    return this._httpClient.get(this.myapiUrl);
  }

  saveLocation(form: Ilocation): Observable<any> {
    return this._httpClient.post<any>(this.myapiUrl, form);
  }

  update(form: Ilocation,id:any): Observable<any> {
    return this._httpClient.put<any>(this.myapiUrl + '/' + id, form);
  }
  delete(id: number) {
    return this._httpClient.delete(this.myapiUrl + '/' + id);
  }
}
