import {
  AfterViewInit,
  Component,
  createComponent,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;

  error: string = null;

  authObs: Observable<AuthResponseData>;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSub) this.closeSub.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.error = null;
    const enteredEmail = form.value['email'];
    const enteredPassword = form.value['password'];

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObs = this.authService.login(enteredEmail, enteredPassword);
    } else {
      this.authObs = this.authService.signup(enteredEmail, enteredPassword);
    }

    this.authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
      }
    );
    form.reset();
  }

  onHandleError(message: string) {
    this.error = null;
  }

  private showErrorAlert(error: string) {
    const alertHostRef = this.alertHost.viewContainerRef;
    console.log(alertHostRef);
    alertHostRef.clear();

    const alertCompRef =
      alertHostRef.createComponent<AlertComponent>(AlertComponent);

    alertCompRef.instance.message = error;
    this.closeSub = alertCompRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      alertHostRef.clear();
    });
  }
}
