import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
}
export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
export interface CurrentUser {
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  static readonly tokenKey = 'example.q002.accessToken';

  constructor(private readonly http: HttpClient) {}

  register(payload: RegisterPayload): Observable<{ username: string; message: string }> {
    return this.http.post<{ username: string; message: string }>('/api/auth/register', payload);
  }

  login(payload: LoginPayload): Observable<LoginToken> {
    return this.http
      .post<LoginToken>('/api/auth/login', payload)
      .pipe(tap(({ accessToken }) => sessionStorage.setItem(AuthService.tokenKey, accessToken)));
  }

  me(): Observable<CurrentUser> {
    const token = sessionStorage.getItem(AuthService.tokenKey) ?? '';
    return this.http.get<CurrentUser>('/api/auth/me', {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  hasToken(): boolean {
    return !!sessionStorage.getItem(AuthService.tokenKey);
  }
  logout(): void {
    sessionStorage.removeItem(AuthService.tokenKey);
  }
}
