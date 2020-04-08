import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  //to emit an observable whenever their a change in recipes array.
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService : ShoppingListService){

  }

  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'a test recipe', 
  //     'this is a test recipe', 
  //     'https://pixabay.com/static/img/logo_square.png',
  //     [new Ingredient("Potatoes", 10), new Ingredient("Tomatoes", 20)]
  //   ),
  //   new Recipe(
  //     'a test recipe', 
  //     'this is a test recipe', 
  //     'https://pixabay.com/static/img/logo_square.png',
  //     [new Ingredient("Potatoes", 10), new Ingredient("Tomatoes", 20)]
  //   )
    
  // ];

  private recipes: Recipe[] = [];
  

  getRecipes() {
    //return this.recipes; following returns the reference to actual array.
    return this.recipes.slice();  // .slice() returns a new copy of the array. So the original array is not modifiable from outside.
  }

  getRecipe(index : number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number, newRecipe : Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
