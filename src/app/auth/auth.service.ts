import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.localId,
            resData.email,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.localId,
            resData.email,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }

  autoLogout(expDuration: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private handleAuth(
    id: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(id, email, token, expDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+expiresIn * 1000);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';

    if (!errorRes.error || !errorRes.error.error) {
      throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid email/password';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
    }

    return throwError(errorMessage);
  }
}
