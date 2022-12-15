import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (this.recipeService.getRecipes().length === 0)
      return this.dataStorageService.fetchRecipes();
    else {
      return this.recipeService.getRecipes();
    }
  }
}
