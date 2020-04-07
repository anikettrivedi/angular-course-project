import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[];
  private ingredientsChangeSub: Subscription;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients : Ingredient[]) => {
            this.ingredients = ingredients;
        }
      )
  }

  // addIngredient(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy() {
    this.ingredientsChangeSub.unsubscribe();
  }

  onEditItem(index : number){
    this.shoppingListService.startedEditing.next(index); 
    //emitting index from our subject, that is startedEditing inside
    //ShoppingListService so that we can listen to it in shoppingListEdit component.
  }

}
