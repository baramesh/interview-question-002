import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { WelcomeComponent } from './welcome.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Sign in · Example.com' },
  { path: 'register', component: RegisterComponent, title: 'Create account · Example.com' },
  { path: 'welcome', component: WelcomeComponent, title: 'Welcome · Example.com' },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
];
