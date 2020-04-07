import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number;
  editmode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    //this subscription is triggered whenever route params are changed.
    this.route.params
        .subscribe (
          (params: Params) => {
            this.id = +params['id'];
            this.editmode = (params['id'] != null); //true for recipes/:id/edit
                                                    //false for recipes/new
            //console.log(this.editmode);
            this.initForm();
          }
        )
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) //regex for positive numbers.
              ])
      })
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editmode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/) //regex for positive numbers.
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  get controls(){
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    // console.log(this.recipeForm);
    
    // const newRecipe = new Recipe(
      //   this.recipeForm.value['recipeName'],
      //   this.recipeForm.value['recipeDescription'],
      //   this.recipeForm.value['imagePath'],
      //   this.recipeForm.value['ingredients']
      // );
      if(this.editmode){
        // this.recipeService.updateRecipe(this.id, newRecipe);
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      } else{
        this.recipeService.addRecipe(this.recipeForm.value);
      }
      
      this.router.navigate(["../"], {relativeTo: this.route});
    }

    onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
    }

    onDeleteIngredient(index : number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
}
