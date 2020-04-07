import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  //commented after template driven forms were added
  // @ViewChild("nameInput", {static:false}) ingredientNameRef: ElementRef;
  // @ViewChild("amountInput", {static:false}) ingredientAmountRef: ElementRef;

  //@Output() onIngredientAddEvent = new EventEmitter<Ingredient>();

  @ViewChild('f', {static : false}) shoppingListForm : NgForm; //accessing the form

  subscription : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;
 

  constructor(private shoppingListService : ShoppingListService) { }

  //following subject 'startedEditing' is being emitted from shoppinListComponent
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index : number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //commented after template driven forms were added
  // onAdd(){
  //   const ingName = this.ingredientNameRef.nativeElement.value;
  //   const ingAmount = this.ingredientAmountRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.shoppingListService.addIngredient(newIngredient);
    
  //   //this.onIngredientAddEvent.emit(newIngregient);
  // }

  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else
      this.shoppingListService.addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
