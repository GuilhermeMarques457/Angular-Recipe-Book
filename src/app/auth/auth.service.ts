import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  private API_URL_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseAPIKey}`;
  private API_URL_LOGIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseAPIKey}`;

  private tokenExpirationTimer: any;
  // We can have access to this object even after its changes
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.API_URL_SIGNUP, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => this.errorHandler(errorRes)),
        tap((response) => this.authenticationHanlder(response))
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.API_URL_LOGIN, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => this.errorHandler(errorRes)),
        tap((response) => this.authenticationHanlder(response))
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/Auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    console.log(new Date(userData._tokenExpirationDate).getDate());

    if (!loadedUser.getToken()) return;

    this.user.next(loadedUser);

    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

    this.autoLogout(expirationDuration);
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    console.log(errorRes);

    if (!errorRes.error || !errorRes.error.error)
      throwError(() => new Error(errorMessage));

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid email or password';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }

  private authenticationHanlder(response: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + response.expiresIn * 1000
    );

    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );

    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);

    this.autoLogout(response.expiresIn * 1000);
  }
}
