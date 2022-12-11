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
 * TODO
 * To add to the point mentioned in the app router module, another good reason for separating modules into their own, is
 * that it cleans up the imports.
 *
 * For example, look at the declarations below. With angular, imports and declarations are carried down the chain. It
 * raises the risk of error with double imports and infinite loop imports. So caution is applied when working in this
 * module. What i would advice is that you should move out the components into separate folders, and import the module
 * itself within here.
 *
 * So if you were to place the recipe module within the shared module, you can do the following. Add the recipe module
 * import into the shared module, and then add the shared module import within here.
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
