import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { LoginData } from '../contracts/login-data';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
 
      this.httpService.login(this.loginForm.value).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
    // else {
    //   console.log('Form is invalid');
    //   console.log(this.loginForm.value);
    //   console.log(this.loginForm);
    //   // console.log(this.loginForm.controls);
    // }

  }


}
