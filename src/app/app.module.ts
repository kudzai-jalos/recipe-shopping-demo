import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { AppRouterModule } from './app-router.module';
import { RecipeResolver } from './shared/services/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-list/recipe-start/recipe-start.component';

/**
 * TODO Coming back to the point I mentioned in the app router module. Another purpose
 * of separating the recipes is to clean the declarations and imports within the
 * app module. The app module is essential to the angular project, so ensuring
 * that stays clean is great.
 *
 * One of the main advantages of the shared module is that it contains components
 * or services that are used in multiple places. So by moving it into shared module,
 * only a single import will need to be done in order to use whatever component or
 * service you wish.
 */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirective,
    RecipeEditComponent,
    RecipeStartComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRouterModule, ReactiveFormsModule],
  providers: [RecipeResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
