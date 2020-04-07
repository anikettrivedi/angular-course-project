import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from '../recipes/recipes.model';

import { map, tap, take } from 'rxjs/operators';
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
        this.authService.userSubject.pipe(take(1)).subscribe(user => {

        });

        return this.http
          .get <Recipe[]> (this.serverUrlRecipes)
          .pipe(map(recipes => {    //this is rxjs map operator
              return recipes.map(recipe => { //this is javascript map function, which can be applied to an array
                                             //it accesses each element and map it back as per our conditions
                return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
                //this basically makes sure if the ingredient field is not initialized, it initializes it to an empty array
              })  
          }), tap(recipes => {
              this.recipeService.setRecipes(recipes);
          }));
        //   .subscribe((recipes: Recipe[]) => {
        //       this.recipeService.setRecipes(recipes);
        //   });
    }
}