import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn : 'root'
})
    
//what is a resolver?
// Interface that classes can implement to be a data provider. 
// A data provider class can be used with the router to resolve data during navigation. 
// The interface defines a resolve() method that will be invoked when the navigation starts.
// The router will then wait for the data to be resolved before the route is finally activated.

export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(
        private dataStorageService : DataStorageService,
        private recipeService : RecipeService
        ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }
        else {
            return recipes;
        }
    }

}