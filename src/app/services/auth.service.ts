import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestPayload } from '../contracts/login-request-payload';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { User } from '../contracts/user';
import { UserDetails } from '../contracts/user-details';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthTokenValid());

  loginUrl: string = 'https://dummyjson.com/auth/login';
  userDetailsUrl: string = 'https://dummyjson.com/auth/me';

  jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {

    return this.httpClient
      .post<User>(this.loginUrl, loginRequestPayload, { headers: this.jsonHeader })
      .pipe(
        map(
          (user) => {
            this.storeUserAuthData(user);
            this.updateAuthStatus();
            return true;
          }
        ),
        catchError(err => {
          console.log(err);
          return of(false);
        })
      )
  };

  storeUserAuthData(userAuthData: User): void {
    localStorage.setItem('user', JSON.stringify(userAuthData));
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  get authToken(): string {
    return this.user.token;
  }

  updateAuthStatus(): void {
    this.isAuthenticated.next(this.isAuthTokenValid());
  }

  isAuthTokenValid(): boolean {
    return this.authToken !== null && this.parseJwt(this.authToken)?.exp * 1000 >= Date.now();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.updateAuthStatus();
  }

  getUserDetails(): Observable<UserDetails> {
    return this.httpClient.get<any>(this.userDetailsUrl).pipe(
      map(res => {
        const userDetails: UserDetails = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          maidenName: res.maidenName,
          age: res.age,
          gender: res.gender,
          email: res.email,
          phone: res.phone,
          username: res.username,
          birthDate: new Date(res.birthDate),
          image: res.image
        };
        return userDetails;
      }
      )
    );
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

}
