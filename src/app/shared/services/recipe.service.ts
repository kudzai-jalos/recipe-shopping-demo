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
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'Salad',
  //     'Very simple to make.',
  //     'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',
  //     [new Ingredient('Lettuce', 2), new Ingredient('Tomato', 3)]
  //   ),
  //   new Recipe(
  //     2,
  //     'Scrambled Eggs',
  //     'Just throw it in a pan!',
  //     'https://upload.wikimedia.org/wikipedia/commons/2/20/Scrambed_eggs.jpg',
  //     [new Ingredient('Eggs', 2), new Ingredient('Salt', 1)]
  //   ),
  // ];

  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

  // private selectedRecipeId:number;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(newRecipe: Recipe) {
    // this.recipes.map((recipe: Recipe) => {
    //   return newRecipe.id === recipe.id ? newRecipe : recipe;
    // });

    const recipeIndex = this.recipes.findIndex((recipe) => {
      // console.log('recipe id' + recipe.id);
      // console.log('new recipe id' + newRecipe.id);

      return recipe.id === newRecipe.id;
    });
    console.log(recipeIndex);
    this.recipes.splice(recipeIndex, 1, newRecipe);
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(id: number) {
    const recipeIndex = this.recipes.findIndex((recipe) => {
      return recipe.id == id;
    });

    if (recipeIndex !== -1) {
      this.recipes.splice(recipeIndex, 1);
      this.recipesChanged.next(this.getRecipes());
    } else console.log('Could not delete recipe with id ' + id);
  }

  addToShoppingList(recipe: Recipe) {
    // for (const ingredient of ingredients) {
    //   this.shoppingListService.addIngredient(ingredient);
    // }

    this.shoppingListService.addIngredients(recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }
}
