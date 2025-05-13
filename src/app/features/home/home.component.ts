import { Component, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../shared/services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { MarketIndexComponent } from "./components/market-index/market-index.component";
import { PriceBoardComponent } from "./components/priceboard/priceboard.component";

@Component({
  selector: 'home-page',
  imports: [MatAutocompleteModule, MatSlideToggleModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, TranslateModule, MarketIndexComponent, PriceBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomePageComponent {
  indexes: string[] = ['HOSE', 'HNX', 'UPCOM'];  // Mảng chứa danh sách các index
  
  userProfile: any = signal(null); // Sử dụng signal để lưu trữ thông tin người dùng
  
  constructor(private userService: UserService) {
    console.log('HomePageComponent initialized');
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }
}
