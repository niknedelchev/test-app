import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginRequestPayload } from '../contracts/login-request-payload';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestPayload;


  constructor(private authService: AuthService, private router: Router) {
    this.loginRequestPayload = { username: '', password: '' };
    console.log(this.loginRequestPayload);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.loginRequestPayload = {
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value
      };

      this.authService.login(this.loginRequestPayload).subscribe(
        (isSucess : boolean) => {
          if (isSucess) {
            this.router.navigateByUrl('user');
          } else {
            alert('Unsuccessful login. Try again.');
          }
        }
      )

    }
  }



}
