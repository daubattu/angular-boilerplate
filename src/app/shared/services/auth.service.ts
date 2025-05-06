import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    console.log('getToken', token);
    return token;
  }

  login(token: string) {
    if (!this.isBrowser) return;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    this.router.navigate(['/']);
  }

  logout() {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }
}