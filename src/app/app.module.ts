import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { SharedModule } from './shared/shared.module';

// import { AuthModule } from './auth/auth.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { AuthComponent } from './auth/auth.component';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AlertComponent } from './shared/alert/alert.component';
// import { RecipesModule } from './recipes/recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // ShoppingListComponent,
    // ShoppingListEditComponent,
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // AuthComponent,
  ],
  imports: [
    
    BrowserModule,
    HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,

    // user defined modules
    // RecipesModule, now we are loading it using lazy loading in app-routing.module.ts
    // ShoppingListModule, // now we are loading it using lazy loading in app-routing.module.ts
    // AuthModule, // now we are loading it using lazy loading in app-routing.module.ts
   
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    AuthGuardService,
    ShoppingListService,
    RecipeService,
    DataStorageService,
    RecipeResolverService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
