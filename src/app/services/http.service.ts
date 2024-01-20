import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestPayload } from '../contracts/login-request-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  loginUrl: string = 'https://dummyjson.com/auth/login';
  jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  login(loginRequestPayload: LoginRequestPayload): Observable<any> {
    return this.httpClient.post(this.loginUrl, loginRequestPayload, { headers: this.jsonHeader })
  }

 storeAuthToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  get authToken() {
    return localStorage.getItem('jwt');
  }
}
