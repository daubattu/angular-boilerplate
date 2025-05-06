import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'login-page',
  imports: [MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginPageComponent {
  name = 'NHK';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(new Date().toString()); // Giả lập login bằng cách lấy thời gian hiện tại
    this.router.navigate(['/']);  // Sau khi login, chuyển hướng đến Dashboard
  }
}
