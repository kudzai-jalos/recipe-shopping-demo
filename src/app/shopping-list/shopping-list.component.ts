import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  subscription: Subscription;
  

  constructor(private shoppingListService: ShoppingListService,private loggingService:LoggingService) {}

  onSelectIngredient(id:number) {
    this.shoppingListService.ingredientSelected.next(id);
  }


  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscription =
      this.shoppingListService.shoppingListChangedSub.subscribe(
        (ingredients) => {
          this.ingredients = ingredients;
        }
      );
    this.loggingService.printLog("Hello from Shopping List component ngOnInit")
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
