import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private isBrowser: boolean;
  private themeSubject: BehaviorSubject<'light' | 'dark'>;

  theme$;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    const initialTheme = this.isBrowser ? this.getStoredTheme() : 'light';

    this.themeSubject = new BehaviorSubject<'light' | 'dark'>(initialTheme);
    this.theme$ = this.themeSubject.asObservable();

    // Lắng nghe sự kiện storage trong trình duyệt
    if (this.isBrowser) {
      window.addEventListener('storage', (event) => {
        if (event.key === this.THEME_KEY && event.newValue) {
          this.themeSubject.next(event.newValue as 'light' | 'dark');
        }
      });
    }
  }

  getStoredTheme(): 'light' | 'dark' {
    if (!this.isBrowser) return 'light';
    return (localStorage.getItem(this.THEME_KEY) as 'light' | 'dark') || 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
    this.themeSubject.next(theme);
  }

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}