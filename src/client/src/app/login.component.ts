import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

export const sharedStyles = `
  :host { width: 100%; display: grid; place-items: center; }
  .auth-shell { box-shadow: 0 28px 80px rgb(30 41 59 / 14%), 0 2px 8px rgb(15 23 42 / 5%); }
  .auth-aside { background: radial-gradient(circle at 10% 10%, rgb(129 140 248 / 35%), transparent 36%), linear-gradient(145deg, #1e1b4b, #3730a3); }
  .required-marker { color: #dc2626; font-weight: 700; }
  .primary-action { min-height: 48px; background: #3730a3 !important; color: white !important; }
  .notice.success { background: #ecfdf5; color: #166534; }
  .notice.error { background: #fef2f2; color: #991b1b; }
  mat-spinner { display: inline-block; --mat-progress-spinner-active-indicator-color: white; }
`;

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  template: ` <article
    class="auth-shell grid w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl md:grid-cols-[1.05fr_1fr]"
    data-testid="login-page"
  >
    <aside class="auth-aside hidden p-10 text-white md:flex md:flex-col">
      <div>
        <h1 class="m-0 text-4xl font-semibold tracking-tight">Welcome back</h1>
        <p class="mt-4 max-w-sm text-sm leading-6 text-indigo-100">
          Sign in to continue to your Example.com account.
        </p>
      </div>
    </aside>
    <section class="p-6 sm:p-10">
      <h1 class="m-0 text-3xl font-semibold tracking-tight text-slate-950 md:hidden">
        Welcome back
      </h1>
      <h2 class="mt-2 text-2xl font-semibold text-slate-950 md:mt-0">Sign in</h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        Fields marked <span class="required-marker">*</span> are required.
      </p>
      @if (message(); as value) {
        <div
          class="notice success mt-5 rounded-xl p-3 text-sm font-medium"
          role="status"
          data-testid="login-message"
        >
          {{ value }}
        </div>
      }
      @if (error(); as value) {
        <div
          class="notice error mt-5 rounded-xl p-3 text-sm font-medium"
          role="alert"
          data-testid="login-error"
        >
          {{ value }}
        </div>
      }
      <form
        class="mt-6 grid gap-1"
        [formGroup]="form"
        (ngSubmit)="submit()"
        novalidate
        data-testid="login-form"
      >
        <mat-form-field appearance="outline"
          ><mat-label>Username</mat-label
          ><input
            matInput
            required
            autocomplete="username"
            formControlName="username"
            data-testid="login-username"
          />
          @if (showError('username')) {
            <mat-error>Username is required.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline"
          ><mat-label>Password</mat-label
          ><input
            matInput
            required
            [type]="showPassword() ? 'text' : 'password'"
            autocomplete="current-password"
            formControlName="password"
            data-testid="login-password"
          /><button
            mat-button
            matSuffix
            type="button"
            (click)="showPassword.set(!showPassword())"
            [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
          >
            {{ showPassword() ? 'Hide' : 'Show' }}
          </button>
          @if (showError('password')) {
            <mat-error>Password is required.</mat-error>
          }
        </mat-form-field>
        <button
          mat-flat-button
          type="submit"
          class="primary-action mt-2"
          [disabled]="busy()"
          data-testid="sign-in-button"
        >
          @if (busy()) {
            <mat-spinner diameter="20" />
          } @else {
            Sign in
          }
        </button>
      </form>
      <div class="mt-7 border-t border-slate-200 pt-5 text-center">
        <p class="m-0 text-sm text-slate-600">New to Example.com?</p>
        <a mat-button routerLink="/register" class="mt-1" data-testid="create-account-link"
          >Create account</a
        >
      </div>
    </section>
  </article>`,
  styles: [
    `
      ${sharedStyles}
    `,
  ],
})
export class LoginComponent {
  readonly showPassword = signal(false);
  readonly busy = signal(false);
  readonly error = signal((history.state?.['error'] as string | undefined) ?? null);
  readonly message = signal((history.state?.['message'] as string | undefined) ?? null);
  readonly form;

  constructor(
    formBuilder: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {
    this.form = formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showError(name: 'username' | 'password'): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }
  submit(): void {
    this.error.set(null);
    if (this.form.invalid || this.busy()) {
      this.form.markAllAsTouched();
      return;
    }
    this.busy.set(true);
    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/welcome'),
      error: (response: HttpErrorResponse) => {
        this.error.set(response.error?.title ?? 'Unable to sign in.');
        this.busy.set(false);
      },
    });
  }
}
