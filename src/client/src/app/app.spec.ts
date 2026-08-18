import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { WelcomeComponent } from './welcome.component';

describe('Authentication UI', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('requires login fields and masks the password', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    (
      fixture.nativeElement.querySelector('[data-testid="sign-in-button"]') as HTMLButtonElement
    ).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="login-password"]').type).toBe(
      'password',
    );
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('rejects mismatched registration passwords without an API call', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.componentInstance.form.setValue({
      username: 'tester',
      password: 'StrongPass1',
      confirmPassword: 'StrongPass2',
    });
    fixture.componentInstance.submit();
    expect(fixture.componentInstance.form.hasError('passwordMismatch')).toBe(true);
  });

  it('stores the JWT returned by login', () => {
    const service = TestBed.inject(AuthService);
    service.login({ username: 'tester', password: 'StrongPass1' }).subscribe();
    const request = http.expectOne('/api/auth/login');
    request.flush({ accessToken: 'signed.jwt.value', tokenType: 'Bearer', expiresIn: 900 });
    expect(sessionStorage.getItem(AuthService.tokenKey)).toBe('signed.jwt.value');
  });

  it('clears an unauthorized welcome session and returns an actionable message', () => {
    sessionStorage.setItem(AuthService.tokenKey, 'invalid');
    const router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(WelcomeComponent);
    fixture.detectChanges();
    const request = http.expectOne('/api/auth/me');
    request.flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(sessionStorage.getItem(AuthService.tokenKey)).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], {
      state: { error: 'Your session has expired. Please sign in again.' },
    });
  });
});
