import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home.component';
import { LoginPageComponent } from './features/auth/login/login.component';
import { AboutPageComponent } from './features/about/about.component';
import { NotFoundPageComponent } from './features/not-found/not-found.component';
import { MainLayoutComponent } from './shared/layouts/main/main-layout.component';
import { BlankLayoutComponent } from './shared/layouts/blank/blank-layout.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'about',
        component: AboutPageComponent,
        //   canActivate: [AuthGuard]
      },
      {
        path: '404',
        component: NotFoundPageComponent,
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login', component: LoginPageComponent }, 
    ],
  },
  { path: '**', redirectTo: '/404' }, // Not Found
];
