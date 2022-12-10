import { Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  shoppingListChangedSub = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<number>();

  private shoppingList: Ingredient[] = [
    new Ingredient('Water', 2),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredient(id: number) {
    return this.shoppingList[id];
  }

  getShoppingList(): Ingredient[] {
    return this.shoppingList.slice();
  }

  addIngredient(ingredient: Ingredient) {
    let found = false;
    this.shoppingList.map((ingredientItem) => {
      if (ingredientItem.name.toLowerCase() === ingredient.name.toLowerCase()) {
        ingredientItem.amount += ingredient.amount;
        found = true;
      }
      return ingredientItem;
    });

    if (!found) this.shoppingList.push(ingredient);

    this.shoppingListChangedSub.next(this.getShoppingList());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingList.push(...ingredients);
    this.shoppingListChangedSub.next(this.getShoppingList());
  }

  deleteIngredient(ingredient: Ingredient) {
    const ingredientIndex = this.shoppingList.findIndex(
      (ingredientItem) =>
        ingredientItem.name.toLowerCase() === ingredient.name.toLowerCase()
    );

    if (ingredientIndex > -1) {
      if (this.shoppingList[ingredientIndex].amount <= ingredient.amount) {
        this.shoppingList.splice(ingredientIndex, 1);
      } else {
        this.shoppingList[ingredientIndex].amount -= ingredient.amount;
      }

      this.shoppingListChangedSub.next(this.getShoppingList());
    } else {
      // ingredient not found
      // Show message error message
      // OR disable button if input ingredient is no existant
    }
  }
}
