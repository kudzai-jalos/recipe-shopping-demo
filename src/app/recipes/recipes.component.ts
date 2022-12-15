import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent {
  selectedRecipe: Recipe;
  

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
