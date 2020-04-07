import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  // commented after routing was added.
  // @Input() recipe: Recipe;
  recipe : Recipe;
  id : number;

  constructor(private recipeService : RecipeService,
              private route: ActivatedRoute,
              private router : Router) {

  }

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.recipe = this.recipeService.getRecipe(this.id);
          }
        );
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    // this.router.navigate(["edit"], {relativeTo: this.route}); //this route is recipes/:id/ right now
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); //alternatively
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["recipes"]);
  }
}
