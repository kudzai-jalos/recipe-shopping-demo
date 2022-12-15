import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoggingService } from '../logging.service';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListRouterModule } from './shopping-list-router.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [SharedModule, FormsModule, ShoppingListRouterModule],
  // providers: [LoggingService],
})
export class ShoppingListModule {}
