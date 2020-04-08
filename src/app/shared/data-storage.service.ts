import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from '../recipes/recipes.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class DataStorageService {

    private serverUrlRecipes = 'https://complete-angular-course-deb4a.firebaseio.com/recipes.json';

    constructor(private http : HttpClient,
                private recipeService : RecipeService,
                private authService : AuthService){}

    storeRecipes(){

        const recipes = this.recipeService.getRecipes();
        this.http
         .put(this.serverUrlRecipes, recipes)
         .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes(){
        //NOTE: WE ARE USING INTERCEPTOR HERE! 
        return this.http.get <Recipe[]>(
            'https://complete-angular-course-deb4a.firebaseio.com/recipes.json',
        ).pipe(
            map(recipes => {    //this is rxjs map operator
                return recipes.map(recipe => { //this is javascript map function, which can be applied to an array
                                               //it accesses each element and map it back as per our conditions
                  return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
                  //this basically makes sure if the ingredient field is not initialized, it initializes it to an empty array
                })  
            }), 
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })            
        )

        

        // return this.authService.userSubject.pipe(
        //     take(1), 
        //     exhaustMap(user => {
        //         // console.log(user);
        //         return this.http
        //                .get <Recipe[]>(
        //                 'https://complete-angular-course-deb4a.firebaseio.com/recipes.json',
        //                    {
        //                     params : new HttpParams().set('auth', user.token)
        //                    }
        //                 );
        //     }),
        //     map(recipes => {    //this is rxjs map operator
        //         return recipes.map(recipe => { //this is javascript map function, which can be applied to an array
        //                                        //it accesses each element and map it back as per our conditions
        //           return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
        //           //this basically makes sure if the ingredient field is not initialized, it initializes it to an empty array
        //         })  
        //     }), 
        //     tap(recipes => {
        //         this.recipeService.setRecipes(recipes);
        //     })
        // )

            

        // return this.http
        //   .get <Recipe[]> (this.serverUrlRecipes)
        //   .pipe(map(recipes => {    //this is rxjs map operator
        //       return recipes.map(recipe => { //this is javascript map function, which can be applied to an array
        //                                      //it accesses each element and map it back as per our conditions
        //         return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
        //         //this basically makes sure if the ingredient field is not initialized, it initializes it to an empty array
        //       })  
        //   }), tap(recipes => {
        //       this.recipeService.setRecipes(recipes);
        //   }));
        //   .subscribe((recipes: Recipe[]) => {
        //       this.recipeService.setRecipes(recipes);
        //   });
    }
}