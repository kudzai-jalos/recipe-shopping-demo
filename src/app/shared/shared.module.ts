import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoggingService } from '../logging.service';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  providers:[LoggingService],

  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
