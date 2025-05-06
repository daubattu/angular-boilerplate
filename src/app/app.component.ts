import { NgIf, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLangReady = false;
  isBrowser: boolean;
  isDarkTheme: boolean = false;

  constructor(
    private translate: TranslateService,
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem('lang') || 'vi';
      this.translate.setDefaultLang('vi');
      this.translate.use(saved).subscribe(() => {
        this.isLangReady = true;
      });
    }
  }

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.isDarkTheme = theme === 'dark';
    });
  }
}