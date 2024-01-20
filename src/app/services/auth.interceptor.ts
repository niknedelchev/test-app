import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private httpService: HttpService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const authToken = this.httpService.authToken;

    if (authToken && req.url !== this.httpService.loginUrl) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  
  };
};
