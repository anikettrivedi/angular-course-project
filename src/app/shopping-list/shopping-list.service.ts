import { Injectable,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model'


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // cross component event editor removed after subject was added
  // ingredientsChanged = new EventEmitter<Ingredient[]>();

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(){
    return this.ingredients.slice(); //does not return a reference to ingredients array, but returns a copy of the array.
  }

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice())
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  // addIngredients(ingredients : Ingredient[]){
  //   for( let ingredient of ingredients){
  //     this.addIngredient(ingredient);
  //   }
  // }

  addIngredients(ingredients : Ingredient[]){
    this.ingredients.push(...ingredients); //... is ES6 spread operator, it spreads the array into list of elements, and is thus compatible with push
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index : number, newIngredient : Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index : number){
    return this.ingredients[index];
  }

  deleteIngredient(index){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

}
