import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        //CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent }
        ]), 

        //user defined module
        SharedModule
    ],
    exports: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ]
})

export class ShoppingListModule {}