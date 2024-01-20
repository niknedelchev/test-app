import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../contracts/login-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loginUrl: string = 'https://dummyjson.com/auth/login';
  jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  login(loginData: LoginData) : Observable<any> {
    return this.httpClient.post(this.loginUrl, loginData, {headers: this.jsonHeader})
  }

}
