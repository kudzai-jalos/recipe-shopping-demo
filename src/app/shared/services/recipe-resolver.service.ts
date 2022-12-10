import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService) {}

  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getRecipe(+route.params['id']);
  }
}
