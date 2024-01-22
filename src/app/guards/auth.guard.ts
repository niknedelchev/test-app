import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  isAuthenticated!: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated.subscribe((isAuth: boolean) => this.isAuthenticated = isAuth);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.updateAuthStatus();
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.updateAuthStatus();
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }


}
