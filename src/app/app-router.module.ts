import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeResolver } from './shared/services/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-list/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

/**
 * TODO If you have multiple routes that belong to subject, for example, recipes, it
 * would be best to create a recipe folder within your shared folder. Within the
 * recipe folder, you can include your own recipe routing module. That way its
 * easier to maintain the routes and provides you with cleaner and focused code.
 * It also helps whomever reads your code, because they can use the file structure
 * to see where they going, which is very important for us, since we look at each
 * others work a lot.
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
