import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {

    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId: string,
    registered? : boolean

}
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    userSubject = new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;

    constructor(
        private http: HttpClient,
        private router: Router
        ){}

    signUp(email: string, password: string){
        return this.http
        .post <AuthResponseData> (
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDikilhKMrNfVjP3zUZmxoSwjlTaQbcIcM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email, 
                    responseData.localId, 
                    responseData.idToken, 
                    +responseData.expiresIn);
            }) 
        )
    } 

    signIn(email: string, password: string){
        return this.http
        .post <AuthResponseData> (
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDikilhKMrNfVjP3zUZmxoSwjlTaQbcIcM',
            {
                email : email,
                password : password,
                returnSecureToken : true
            }
        ).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email, 
                    responseData.localId, 
                    responseData.idToken, 
                    +responseData.expiresIn);
            })
        )        
    }

    autoLogin() { // this is called from app.component.ts
        const userData : {
            email : string,
            id : string,
            _token : string,
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }
        
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.userSubject.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //everything is in milliseconds
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration){
        console.log("expirationDuration: " + expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
                this.logout()
            }, 
            expirationDuration
        )
    }

    private handleAuthentication(email : string, localId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            localId,
            token,
            expirationDate);
        this.userSubject.next(user);
        this.autoLogout(expiresIn * 1000); //expiresIn is in seconds, * 1000 makes it in milliseconds
        localStorage.setItem('userData', JSON.stringify(user)); //storing the user data, i.e email, token etc in browser's memory.
    }

    private handleError(errorResponse: HttpErrorResponse){
        // console.log(errorResponse);
        let errorMessage = "An unknown error occured!";
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case "EMAIL_EXISTS":{errorMessage = "This email already exists."; break; } 
            case "EMAIL_NOT_FOUND":{errorMessage = "There is no user registered with this email."; break; }
            case "INVALID_PASSWORD":{errorMessage = "The password is invalid."; break;}
        }
        return throwError(errorMessage);
  }  
}
