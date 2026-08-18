import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { sharedStyles } from './login.component';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register',
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
    data-testid="register-page"
  >
    <aside class="auth-aside hidden p-10 text-white md:flex md:flex-col md:justify-between">
      <div>
        <p class="m-0 text-xs font-bold uppercase tracking-[.18em] text-indigo-200">IT 02-2</p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight">Create your account</h1>
        <p class="mt-4 text-sm leading-6 text-indigo-100">
          Create a username and password for your Example.com account.
        </p>
      </div>
      <ul class="m-0 grid list-none gap-3 p-0 text-sm text-indigo-100">
        <li>✓ At least 8 characters</li>
        <li>✓ Uppercase and lowercase letters</li>
        <li>✓ At least one number</li>
      </ul>
    </aside>
    <section class="p-6 sm:p-10">
      <p class="m-0 text-xs font-bold uppercase tracking-[.18em] text-indigo-700">New account</p>
      <h1 class="mt-2 text-3xl font-semibold text-slate-950 md:hidden">Create your account</h1>
      <h2 class="mt-2 text-2xl font-semibold text-slate-950 md:mt-6">Registration</h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        Fields marked <span class="required-marker">*</span> are required.
      </p>
      @if (error(); as value) {
        <div
          class="notice error mt-5 rounded-xl p-3 text-sm font-medium"
          role="alert"
          data-testid="register-error"
        >
          {{ value }}
        </div>
      }
      <form
        class="mt-6 grid gap-1"
        [formGroup]="form"
        (ngSubmit)="submit()"
        novalidate
        data-testid="register-form"
      >
        <mat-form-field appearance="outline"
          ><mat-label>Username</mat-label
          ><input
            matInput
            required
            autocomplete="username"
            formControlName="username"
            data-testid="register-username"
          /><mat-hint>3–50 letters, numbers, dots, dashes or underscores</mat-hint>
          @if (showError('username')) {
            <mat-error>Enter a valid username.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline"
          ><mat-label>Password</mat-label
          ><input
            matInput
            required
            type="password"
            autocomplete="new-password"
            formControlName="password"
            data-testid="register-password"
          />
          @if (showError('password')) {
            <mat-error>Use 8+ characters with upper, lower and number.</mat-error>
          }
        </mat-form-field>
        <mat-form-field appearance="outline"
          ><mat-label>Confirm password</mat-label
          ><input
            matInput
            required
            type="password"
            autocomplete="new-password"
            formControlName="confirmPassword"
            data-testid="register-confirm-password"
          />
          @if (showError('confirmPassword')) {
            <mat-error>Confirm your password.</mat-error>
          }
        </mat-form-field>
        @if (form.hasError('passwordMismatch') && form.controls.confirmPassword.touched) {
          <p
            class="-mt-4 mb-3 text-xs font-medium text-red-600"
            data-testid="password-mismatch-error"
          >
            Passwords must match.
          </p>
        }
        <button
          mat-flat-button
          type="submit"
          class="primary-action mt-2"
          [disabled]="busy()"
          data-testid="register-button"
        >
          @if (busy()) {
            <mat-spinner diameter="20" />
          } @else {
            Create account
          }
        </button>
      </form>
      <div class="mt-7 border-t border-slate-200 pt-5 text-center">
        <a mat-button routerLink="/login" data-testid="back-to-login-link">Back to sign in</a>
      </div>
    </section>
  </article>`,
  styles: [
    `
      ${sharedStyles}
    `,
  ],
})
export class RegisterComponent {
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly form;

  constructor(
    formBuilder: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {
    this.form = formBuilder.nonNullable.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^[A-Za-z0-9._-]+$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(128),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatch },
    );
  }

  showError(name: 'username' | 'password' | 'confirmPassword'): boolean {
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
    this.auth.register(this.form.getRawValue()).subscribe({
      next: ({ message }) => this.router.navigate(['/login'], { state: { message } }),
      error: (response: HttpErrorResponse) => {
        this.error.set(response.error?.title ?? 'Unable to create the account.');
        this.busy.set(false);
      },
    });
  }
}
