import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RecipesModule } from './recipes/recipes.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRouterModule } from './app-router.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule, 
    AppRouterModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
  ],
  // providers:[LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
