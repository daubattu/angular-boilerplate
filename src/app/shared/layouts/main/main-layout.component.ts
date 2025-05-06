import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

export type ThemeType = 'light' | 'dark';
export type LangType = 'vi' | 'en';

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, MatButtonModule, TranslateModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  currentTheme: ThemeType = 'light';
  currentLang: string = 'vi';

  constructor(private authService: AuthService, private translate: TranslateService, private themeService: ThemeService) {
    const savedLang = localStorage.getItem('lang') || 'vi';
    this.translate.use(savedLang); // Tự động apply ngôn ngữ khi khởi động
    this.currentTheme = this.themeService.getStoredTheme(); // Lấy theme đã lưu trong localStorage
    this.currentLang = savedLang; // Lấy ngôn ngữ đã lưu trong localStorage
  }

  logout() {
    this.authService.logout();
  }

  changeTheme(theme: ThemeType) {
    const value: ThemeType = theme === 'dark' ? 'dark' : 'light'; // Chuyển đổi giá trị theme
    this.themeService.setTheme(value); // Cập nhật theme hiện tại
    this.currentTheme = this.themeService.getStoredTheme();
    console.log('Theme changed:', value);
  }

  changeLang(lang: string) {
    this.translate.use(lang); // Cập nhật ngôn ngữ hiện tại
    this.currentLang = lang; // Cập nhật ngôn ngữ hiện tại
    localStorage.setItem('lang', lang); // Lưu ngôn ngữ vào localStorage
  }
}
