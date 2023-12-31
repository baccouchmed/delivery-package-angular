import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from '../../shared/services/user.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  endpointAuth = `${environment.api}/authentication`;
  private _authenticated = false;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, private _userService: UserService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post(`${this.endpointAuth}/forgot-password`, {
      email,
      projectCode: environment.code,
      resetUrl: `${environment.api}/confirmation-required?email=${encodeURIComponent(
        email.toLowerCase(),
      )}&type=forgot`,
    });
  }
  //sign up service
  signUp(company): Observable<any> {
    return this._httpClient.post(`${this.endpointAuth}/sign-up`, {
      company,
    });
  }
  //activate account signup
  activateSignUpAccount(email: string, code: string) {
    return this._httpClient
      .patch<null>(`${this.endpointAuth}/activate-with-code`, {
        email,
        code,
        projectCode: environment.code,
      })
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response;
          // Set the authenticated flag to true
          this._authenticated = true;
          // Return a new observable with the response
          return of(response);
        }),
      );
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post(`${this.endpointAuth}/reset-password`, password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient
      .post(`${this.endpointAuth}/login`, { ...credentials, projectCode: environment.code })
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.token;
          // @ts-ignore
          this._authenticated = true;
          // Return a new observable with the response
          return of(response.token);
        }),
      );
  }

  refreshToken(body): Observable<any> {
    body.projectCode = environment.code;
    return this._httpClient.post(`${this.endpointAuth}/refresh-token`, body).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.token;
        return of(response.token);
      }),
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient
      .post(`${this.endpointAuth}/refresh-access-token`, {
        accessToken: this.accessToken,
      })
      .pipe(
        catchError(() =>
          // Return false
          of(false),
        ),
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.token;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;

          // Return true
          return of(true);
        }),
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('connectedSite');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken || this.accessToken === 'undefined') {
      localStorage.removeItem('accessToken');
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }
    return of(true);
  }

  resetPasswordByEmail(email: string, newPassword: string, code: string): Observable<null> {
    return this._httpClient
      .post<null>(`${this.endpointAuth}/change-password`, {
        email,
        newPassword,
        code,
        projectCode: environment.code,
      })
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response;
          // Set the authenticated flag to true
          this._authenticated = true;
          // Return a new observable with the response
          return of(response);
        }),
      );
  }
  signInWithNewPass(email: string, password: string, code: string) {
    return this._httpClient
      .patch<null>(`${this.endpointAuth}/login-with-code`, {
        email,
        password,
        code,
        projectCode: environment.code,
      })
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response;
          // Set the authenticated flag to true
          this._authenticated = true;
          // Return a new observable with the response
          return of(response);
        }),
      );
  }
}
