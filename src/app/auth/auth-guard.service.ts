import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service'; 

@Injectable ({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate{

    constructor(
        private authService : AuthService,
        private router : Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ) : Observable<any> | Promise<any> | boolean | UrlTree {
        return this.authService.userSubject.pipe(
            take(1),
            map(user => {
                const isAuthenticated = user? true: false; // or alternavily return !!user
                if(isAuthenticated){
                    return true;
                }
                return this.router.createUrlTree(['auth']);
            })
        )
    }

}
