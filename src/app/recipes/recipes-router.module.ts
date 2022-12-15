import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeResolver } from '../shared/services/recipe-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        resolve: { recipes: RecipeResolver },
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipes: RecipeResolver },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipes: RecipeResolver },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes,),
  ],
  exports: [RouterModule],
})
export class RecipesRouterModule {}
