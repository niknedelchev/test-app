import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { LoginRequestPayload } from '../contracts/login-request-payload';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestPayload;


  constructor(private httpService: HttpService) {
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

      this.httpService.login(this.loginRequestPayload).subscribe({
        next: (res) => this.httpService.storeAuthToken(res.token),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

}
