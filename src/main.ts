import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AlertComponent } from './app/shared/alert/alert.component';


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
