import { ActivatedRoute, Data } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  optionsDropdownShowing = false;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((selectedRecipe) => {
    //   this.recipe = selectedRecipe;
    // });
    this.route.data.subscribe((data: Data) => {
      this.recipe = data.recipe;
    });
  }

  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.recipe);
    // alert(
    //   'Ingredients for ' +
    //     this.recipe.name +
    //     ' has been sent to your shopping list.'
    // );
  }
}
