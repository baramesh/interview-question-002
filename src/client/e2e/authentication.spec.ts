import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

function username(label: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const suffix = Array.from(
    { length: 8 },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  ).join('');
  return `${label}.${suffix}`;
}

async function register(request: APIRequestContext, value: string): Promise<void> {
  const response = await request.post('/api/auth/register', {
    data: { username: value, password: 'StrongPass1', confirmPassword: 'StrongPass1' },
  });
  expect(response.status()).toBe(201);
}

async function ensureRegistered(request: APIRequestContext, value: string): Promise<void> {
  const response = await request.post('/api/auth/register', {
    data: { username: value, password: 'StrongPass1', confirmPassword: 'StrongPass1' },
  });
  expect([201, 409]).toContain(response.status());
}

async function login(page: Page, value: string): Promise<void> {
  await page.goto('/login');
  await page.getByTestId('login-username').fill(value);
  await page.getByTestId('login-password').fill('StrongPass1');
  await page.getByTestId('sign-in-button').click();
  await expect(page).toHaveURL(/\/welcome$/);
}

test.beforeEach(async ({ page }) => page.goto('/login'));

test('TC-AUTH2-E2E-001 เปิดหน้าสมัครสมาชิกตาม IT 02-2', async ({ page }) => {
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => getComputedStyle(document.body).fontFamily)).toContain(
    'Google Sans',
  );
  await page.getByTestId('create-account-link').click();
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByTestId('register-form')).toBeVisible();
  await expect(page.getByTestId('register-username')).toBeVisible();
  await expect(page.getByTestId('register-password')).toBeVisible();
  await expect(page.getByTestId('register-confirm-password')).toBeVisible();
});

test('TC-AUTH2-E2E-002 สมัครสมาชิกและกลับหน้าเข้าสู่ระบบ', async ({ page }) => {
  const value = username('register');
  await page.getByTestId('create-account-link').click();
  await page.getByTestId('register-username').fill(value);
  await page.getByTestId('register-password').fill('StrongPass1');
  await page.getByTestId('register-confirm-password').fill('StrongPass1');
  const responsePromise = page.waitForResponse((response) =>
    response.url().endsWith('/api/auth/register'),
  );
  await page.getByTestId('register-button').click();
  expect((await responsePromise).status()).toBe(201);
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByTestId('login-message')).toHaveText('Account created successfully.');
});

test('TC-AUTH2-E2E-003 เข้าสู่ระบบและแสดงชื่อหลังตรวจ JWT', async ({ page, request }) => {
  const value = 'xxx';
  await ensureRegistered(request, value);
  await login(page, value);
  await expect(page.getByTestId('welcome-page')).toBeVisible();
  await expect(page.getByTestId('welcome-username')).toHaveText(`Welcome User: ${value}`);
  await expect(page.getByText('Session verified by JWT')).toHaveCount(0);
  const token = await page.evaluate(() => sessionStorage.getItem('example.q002.accessToken'));
  expect(token?.split('.')).toHaveLength(3);
});

test('TC-AUTH2-E2E-004 ออกจากระบบและลบ token', async ({ page, request }) => {
  const value = 'logout.user';
  await ensureRegistered(request, value);
  await login(page, value);
  await page.getByTestId('sign-out-button').click();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => sessionStorage.getItem('example.q002.accessToken'))).toBeNull();
});

test('TC-AUTH2-VAL-001 ปฏิเสธฟอร์มเข้าสู่ระบบว่างโดยไม่เรียก API', async ({ page }) => {
  let loginRequests = 0;
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().endsWith('/api/auth/login'))
      loginRequests += 1;
  });
  await page.getByTestId('sign-in-button').click();
  await expect(page.locator('mat-error')).toHaveCount(2);
  expect(loginRequests).toBe(0);
});

test('TC-AUTH2-VAL-002 ปฏิเสธรหัสผ่านยืนยันไม่ตรงกัน', async ({ page }) => {
  let registerRequests = 0;
  page.on('request', (request) => {
    if (request.method() === 'POST' && request.url().endsWith('/api/auth/register'))
      registerRequests += 1;
  });
  await page.goto('/register');
  await page.getByTestId('register-username').fill('mismatch.user');
  await page.getByTestId('register-password').fill('StrongPass1');
  await page.getByTestId('register-confirm-password').fill('StrongPass2');
  await page.getByTestId('register-button').click();
  await expect(page.getByTestId('password-mismatch-error')).toHaveText('Passwords must match.');
  expect(registerRequests).toBe(0);
});

test('SEC-AUTH2-001 ปิดบังฟิลด์รหัสผ่านทุกช่อง', async ({ page }) => {
  await expect(page.getByTestId('login-password')).toHaveAttribute('type', 'password');
  await page.goto('/register');
  await expect(page.getByTestId('register-password')).toHaveAttribute('type', 'password');
  await expect(page.getByTestId('register-confirm-password')).toHaveAttribute('type', 'password');
});

test('SEC-AUTH2-002 ปฏิเสธ API me เมื่อไม่มี JWT', async ({ request }) => {
  const response = await request.get('/api/auth/me');
  expect(response.status()).toBe(401);
});

test('SEC-AUTH2-003 ใช้ข้อความกลางเมื่อข้อมูลรับรองผิด', async ({ request }) => {
  const value = username('generic');
  await register(request, value);
  const unknown = await request.post('/api/auth/login', {
    data: { username: username('unknown'), password: 'WrongPass1' },
  });
  const wrong = await request.post('/api/auth/login', {
    data: { username: value, password: 'WrongPass1' },
  });
  expect(unknown.status()).toBe(401);
  expect(wrong.status()).toBe(401);
  expect((await unknown.json()).title).toBe('Invalid username or password.');
  expect((await wrong.json()).title).toBe('Invalid username or password.');
});

test('SEC-AUTH2-004 ส่ง security headers ผ่าน Nginx', async ({ page }) => {
  const response = await page.goto('/login');
  expect(response?.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(response?.headers()['x-content-type-options']).toBe('nosniff');
  expect(response?.headers()['x-frame-options']).toBe('DENY');
  expect(response?.headers()['referrer-policy']).toBe('no-referrer');
  expect(response?.headers()['permissions-policy']).toContain('camera=()');
});

test('TC-AUTH2-RESP-001 ทุกหน้ารองรับ viewport มือถือ', async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const value = 'xxx';
  await ensureRegistered(request, value);
  for (const path of ['/login', '/register']) {
    await page.goto(path);
    const width = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(width.page).toBe(width.viewport);
  }
  await login(page, value);
  const width = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));
  expect(width.page).toBe(width.viewport);
  await expect(page.getByTestId('welcome-page')).toBeVisible();
  await expect(page.getByTestId('welcome-username')).toHaveText('Welcome User: xxx');
});

test('SEC-AUTH2-005 จำกัดอัตราคำขอเข้าสู่ระบบ', async ({ request }) => {
  const statuses: number[] = [];
  for (let index = 0; index < 25; index += 1) {
    statuses.push(
      (
        await request.post('/api/auth/login', {
          data: { username: 'rate.test', password: 'WrongPass1' },
        })
      ).status(),
    );
  }
  expect(statuses).toContain(429);
});
