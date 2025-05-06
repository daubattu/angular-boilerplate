import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isBrowser = isPlatformBrowser(this.platformId);

    if (!isBrowser) {
      // Nếu đang chạy trong SSR (Server Side Rendering), không xử lý localStorage.
      return next.handle(req);
    }

    const token = this.authService.getToken();
    
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Thêm Authorization header với token
        },
      });
      return next.handle(cloned); // Đảm bảo trả về Observable từ next.handle()
    }

    return next.handle(req); // Trả về Observable từ next.handle() khi không có token
  }
}