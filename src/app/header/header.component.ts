import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: boolean;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((isAuth: boolean) => { console.log(isAuth); this.isAuthenticated = isAuth });
    // this.isAuthenticated = this.authService.isAuthenticated;
  }

  goToLogin(): void {
    console.log("go to login");
    this.router.navigateByUrl('login');
  }

  logOut(): void {
    this.authService.logout();
  }

  // isAuth(){
  //   this.authService.updateAuthStatus();
  //   return this.isAuthenticated;
  // }

}
