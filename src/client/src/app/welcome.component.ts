import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-welcome',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  template: ` <article
    class="welcome-shell w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white"
    data-testid="welcome-page"
  >
    <div class="hero px-6 py-10 text-center text-white sm:px-10">
      <div
        class="mx-auto grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-bold"
        aria-hidden="true"
      >
        E
      </div>
      <p class="mb-0 mt-6 text-xs font-bold uppercase tracking-[.18em] text-indigo-200">IT 02-3</p>
      <h1 class="mt-2 text-4xl font-semibold tracking-tight">Welcome</h1>
    </div>
    <section class="px-6 py-8 text-center sm:px-10 sm:py-10">
      @if (loading()) {
        <mat-spinner class="mx-auto" diameter="42" data-testid="welcome-loading" />
        <p class="mt-4 text-sm text-slate-600">Loading your account…</p>
      }
      @if (username(); as value) {
        <div
          class="mx-auto grid size-20 place-items-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-800"
          aria-hidden="true"
        >
          {{ value.slice(0, 2).toUpperCase() }}
        </div>
        <h2
          class="mt-5 break-all text-3xl font-semibold leading-tight text-slate-950"
          data-testid="welcome-username"
        >
          Welcome User: <span>{{ value }}</span>
        </h2>
        <button
          mat-stroked-button
          type="button"
          class="mt-7"
          (click)="signOut()"
          data-testid="sign-out-button"
        >
          Sign out
        </button>
      }
    </section>
  </article>`,
  styles: [
    `
      :host {
        width: 100%;
        display: grid;
        place-items: center;
      }
      .welcome-shell {
        box-shadow: 0 28px 80px rgb(30 41 59 / 14%);
      }
      .hero {
        background:
          radial-gradient(circle at 20% 0%, rgb(129 140 248 / 35%), transparent 40%),
          linear-gradient(145deg, #1e1b4b, #3730a3);
      }
    `,
  ],
})
export class WelcomeComponent implements OnInit {
  readonly loading = signal(true);
  readonly username = signal<string | null>(null);
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    if (!this.auth.hasToken()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.auth.me().subscribe({
      next: ({ username }) => {
        this.username.set(username);
        this.loading.set(false);
      },
      error: () => this.signOut(),
    });
  }
  signOut(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
