import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserDetails } from '../contracts/user-details';
import { User } from '../contracts/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  userDetails?: UserDetails;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }


  getUserDetails() {
    this.authService.getUserDetails().subscribe({
      next: (res: UserDetails) => {
        this.userDetails = res;
        console.log(this.userDetails);
      },
      error: (e: any) => console.log(e),
      complete: () => console.info('get user details completed')
    });
  }

}
