import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Iuser } from './userType';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  myapiUrl: string;

  constructor(private _httpClient: HttpClient) {
    this.myapiUrl = environment.urlHost + 'auth';
  }

  getlistUser(): Observable<any> {
    return this._httpClient.get(this.myapiUrl);
  }

  saveUser(form: Iuser): Observable<any> {
    return this._httpClient.post<any>(this.myapiUrl + '/registeradmin', form);
  }

  update(form: Iuser,id:any): Observable<any> {
    return this._httpClient.put<any>(this.myapiUrl + '/' + id, form);
  }
  delete(id: number) {
    return this._httpClient.delete(this.myapiUrl + '/' + id);
  }
}
