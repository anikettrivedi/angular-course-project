import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

const routes: Routes = [
    { 
      path: '', 
      component: RecipesComponent, 
      canActivate: [AuthGuardService], 
      children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {
            path: ':id', 
            component: RecipeDetailComponent,
            resolve:[RecipeResolverService]
        }, 
        //note :id comes after new because otherwise angular 
        //will consider new as id and will generate error on console.
        {path: ':id/edit', component: RecipeEditComponent},
        //when ever these routes are loaded, RecipeResolverService makes sure that the data is resolved by calling the 
        //funtion resolve, which calls dataStorageService.fetchRecipes() to fetch data from server.
      ] 
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule {}