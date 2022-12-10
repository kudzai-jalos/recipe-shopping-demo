import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Salad',
      'Very simple to make.',
      'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',
      [new Ingredient('Lettuce', 2), new Ingredient('Tomato', 3)]
    ),
    new Recipe(
      2,
      'Scrambled Eggs',
      'Just throw it in a pan!',
      'https://upload.wikimedia.org/wikipedia/commons/2/20/Scrambed_eggs.jpg',
      [new Ingredient('Eggs', 2), new Ingredient('Salt', 1)]
    ),
  ];

  // private selectedRecipeId:number;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find((rec) => rec.getId() === id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  addToShoppingList(recipe: Recipe) {
    // for (const ingredient of ingredients) {
    //   this.shoppingListService.addIngredient(ingredient);
    // }

    this.shoppingListService.addIngredients(recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }
}
