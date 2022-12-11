import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './shared/services/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-list/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

/**
 * TODO
 * It may be a good idea to move recipe related components and services into its own folder within the shared folder.
 * It helps separating related classes into its own modules, has this moves the responsibility to the appropriate place.
 * It also helps those that need to read your code. By looking at your file structure, we can see where certain things
 * are, instead of going through each module trying to find the import.
 *
 * Also when adding a recipe module, you can add your own recipe router module, and place these routes defined within
 * this module, to the recipe router module.
 *
 * One advantage of adding it also to the Shared folder, is that the shared module contains common modules and services.
 * So all you would need to do is import the shared module into other modules, and then you will have access to all the
 * recipe services and components
 */

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipe: RecipeResolver },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipe: RecipeResolver },
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
