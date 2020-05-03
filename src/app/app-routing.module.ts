import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { AuthComponent } from './auth/auth.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeResolverService } from './recipes/recipe-resolver.service';
// import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
    // { path: 'recipes', 
    //   component: RecipesComponent, 
    //   canActivate: [AuthGuardService],
    //   resolve:[RecipeResolverService], 
    //   children: [
    //     {path: '', component: RecipeStartComponent},
    //     {path: 'new', component: RecipeEditComponent},
    //     {path: ':id', component: RecipeDetailComponent}, 
    //     //note :id comes after new because otherwise angular 
    //     //will consider new as id and will generate error on console.
    //     {path: ':id/edit', component: RecipeEditComponent},
    //     //when ever these routes are loaded, RecipeResolverService makes sure that the data is resolved by calling the 
    //     //funtion resolve, which calls dataStorageService.fetchRecipes() to fetch data from server.
    // ] },
    // { path: 'shopping-list', component: ShoppingListComponent },
    // { path: 'auth', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], 
    exports: [RouterModule]
})

export class AppRoutingModule {

}