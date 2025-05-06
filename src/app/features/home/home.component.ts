import { Component, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../shared/services/user.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'home-page',
  imports: [MatAutocompleteModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, AsyncPipe, CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomePageComponent {
  countryControl = new FormControl('');
  countries: string[] = ['Việt Nam', 'Nhật Bản', 'Hàn Quốc', 'Hoa Kỳ', 'Anh', 'Pháp', 'Đức'];
  filteredCountries: Observable<string[]>;

  userProfile: any = signal(null); // Sử dụng signal để lưu trữ thông tin người dùng
  
  constructor(private userService: UserService) {
    console.log('HomePageComponent initialized');
    this.filteredCountries = this.countryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
}
