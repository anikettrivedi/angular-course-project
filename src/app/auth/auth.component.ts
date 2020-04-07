import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

import { AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error:string = null;

  constructor(
    private authService : AuthService,
    private router : Router) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObservable = new Observable<AuthResponseData>();

    if(this.isLoginMode === false){
      authObservable = this.authService.signUp(email, password);
    }
    else{
      authObservable = this.authService.signIn(email, password);
    }

    authObservable.subscribe(
      responseData => {
        this.isLoading = false;
        // console.log(responseData);
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
      }
    )

    form.reset();
  }
}
