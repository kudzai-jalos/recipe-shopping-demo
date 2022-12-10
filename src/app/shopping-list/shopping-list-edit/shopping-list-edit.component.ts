import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  selectedIngredientName: string = '';
  selectedIngredientAmount: number = 1;
  ingredientSelectedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.shoppingListService.addIngredient(
        new Ingredient(form.value['name'], form.value['amount'])
      );
    }

    // console.log(form);
  }

  onDeleteIngredient(form: NgForm) {
    this.shoppingListService.deleteIngredient(
      new Ingredient(form.value['name'], form.value['amount'])
    );
  }

  onClearIngredient(form: NgForm) {
    form.reset({
      name: '',
      amount: 1,
    });
  }

  hasIngredient(form: NgForm): boolean {
    return !!this.shoppingListService
      .getShoppingList()
      .find(
        (ingredient) =>
          form.value['name'] &&
          ingredient.name.toLowerCase() === form.value['name'].toLowerCase()
      );
  }

  ngOnInit(): void {
    this.ingredientSelectedSub =
      this.shoppingListService.ingredientSelected.subscribe((id) => {
        const selectedIngredient = this.shoppingListService.getIngredient(id);
        this.selectedIngredientName = selectedIngredient.name;
        this.selectedIngredientAmount = selectedIngredient.amount;
      });
  }

  ngOnDestroy(): void {
    this.ingredientSelectedSub.unsubscribe();
  }
}
