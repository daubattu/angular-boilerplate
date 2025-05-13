import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpInterceptorFn, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { provideTranslate } from './shared/configs/translate.config';
import { TranslateService } from '@ngx-translate/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage?.getItem('access_token');
  console.log('Token from interceptor:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

// Hàm khởi tạo ngôn ngữ (async)
// async function initLanguage(translate: TranslateService) {
//   const saved = localStorage.getItem('lang') || 'vi';
//   await firstValueFrom(translate.use(saved))
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      // withInterceptors([authInterceptor])
    ),
    provideTranslate(),
    // {
    //   provide: 'APP_STARTUP_INITIALIZER',
    //   multi: true,
    //   useFactory: (translate: TranslateService) => () => initLanguage(translate),
    //   deps: [TranslateService]
    // }
  ]
};
