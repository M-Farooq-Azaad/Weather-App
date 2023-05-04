import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  toast:boolean=false;
  public userForm:FormGroup;
  email: string = "";
  password: string = "";
  constructor( private fb: FormBuilder , private Login:WeatherService, private Router:Router) {
    // Form element defined below
    if(Boolean(localStorage.getItem('isLoggedIn'))){
      Router.navigate(['/weather'])
    }
    this.userForm = this.fb.group({
      email: '',
      password: ''
    });
  }
  setValue() {
    this.email=this.userForm.get('email')?.value; // input value retrieved
    this.password=this.userForm.get('password')?.value; // input value retrieved
    this.Login.get_credentials(this.email,this.password)
    this.toast = this.Login.wrong_credentials
  }
}
