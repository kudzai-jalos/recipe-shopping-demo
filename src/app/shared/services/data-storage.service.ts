import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  // user:User;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-recipe-shop-94e43-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-shop-94e43-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
