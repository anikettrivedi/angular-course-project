import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService : AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        
        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
                // in case we don't have any user, i.e during login and signup.
                // then we don't add token into the params.
                if(!user){
                    return next.handle(req);
                }

                // we only add token to the params when user is already logged in.
                const modifideReq = req.clone(
                    {
                        params: new HttpParams().set('auth', user.token)
                    }
                )
                return next.handle(modifideReq);
            })
        )
    
    }

}