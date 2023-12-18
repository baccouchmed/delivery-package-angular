import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  endpoint = `${environment.api}/authentication`;

  private _authenticated = false;

  /**
   *
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
}
