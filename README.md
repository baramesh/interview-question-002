# Interview Question 002

Full-stack implementation of Test 2, Question 2 for `example.com`.

## Technology

- Frontend: Angular 22, Angular Material 22, Tailwind CSS 4
- Typography: Google Sans bundled locally through Fontsource
- Backend: ASP.NET Core 10 Web API (C#)
- Database: PostgreSQL 18 with Entity Framework Core and Npgsql
- Authentication: ASP.NET Core PasswordHasher and signed JWT bearer tokens
- Local deployment: OrbStack with Docker Compose and Nginx
- Tests: Playwright, Vitest and xUnit

## Requirements implemented

- IT 02-1 sign-in screen with username and masked password fields
- IT 02-2 registration screen with username, password and confirm-password validation
- Case-insensitive unique username enforcement
- Password policy enforced in Angular and the API
- Salted PBKDF2 password hashing; plaintext passwords are never stored
- Successful registration returns to the sign-in screen
- Successful sign-in issues a signed JWT with a 15-minute lifetime
- IT 02-3 loads the displayed username from the protected `GET /api/auth/me` endpoint
- Sign-out removes the browser session token and returns to sign in
- Fixed-window rate limiting for registration and sign-in attempts
- Problem Details responses, generic credential errors and security headers
- Responsive enterprise UI using Angular Material and Tailwind CSS
- Server-side validation in addition to browser validation

## Application flow

1. **Register:** IT 02-1 → IT 02-2 → validate → hash password → save account → IT 02-1
2. **Sign in:** IT 02-1 → verify password hash → issue JWT → validate JWT → IT 02-3
3. **Sign out:** IT 02-3 → remove session token → IT 02-1

## API endpoints

| Method | endpoint             | Authentication | Success                |
| ------ | -------------------- | -------------- | ---------------------- |
| `POST` | `/api/auth/register` | Anonymous      | `201 Created`          |
| `POST` | `/api/auth/login`    | Anonymous      | `200 OK` with JWT      |
| `GET`  | `/api/auth/me`       | Bearer JWT     | `200 OK` with username |
| `GET`  | `/health`            | Anonymous      | `200 OK`               |

## Database ownership

Authentication data is stored in schema `auth_q002`. The application owns:

- `auth_q002.users`
- `auth_q002.__EFMigrationsHistory`

The schema and migration history remain isolated when the connection string points to an existing PostgreSQL server or database.

## Run the complete stack on OrbStack

OrbStack must be running with Docker context `orbstack`.

```bash
cp .env.example .env
docker compose up -d --build
docker compose ps
```

Open [http://localhost:4202](http://localhost:4202). The API health endpoint is available at [http://localhost:5002/health](http://localhost:5002/health), and PostgreSQL is exposed locally on port `5432` for inspection.

Stop the services without removing PostgreSQL data:

```bash
docker compose down
```

Remove the local PostgreSQL volume only when a clean database is required:

```bash
docker compose down --volumes
```

## Environment variables

Copy `.env.example` to `.env` and change the local-only credentials before using a shared environment.

| Variable            | Purpose                            | Local value              |
| ------------------- | ---------------------------------- | ------------------------ |
| `POSTGRES_DB`       | Database name                      | `interview_question_002` |
| `POSTGRES_USER`     | Database user                      | `interview_user`         |
| `POSTGRES_PASSWORD` | Database password                  | local-only placeholder   |
| `JWT_SIGNING_KEY`   | HMAC signing key, minimum 32 bytes | local-only placeholder   |
| `WEB_PORT`          | Nginx/Angular port                 | `4202`                   |
| `API_PORT`          | ASP.NET Core port                  | `5002`                   |
| `POSTGRES_PORT`     | PostgreSQL inspection port         | `5432`                   |

## Run in development mode

Start PostgreSQL only:

```bash
docker compose up -d postgres
```

Start the API:

```bash
dotnet run --project src/api --urls http://127.0.0.1:5000
```

Start Angular in a second terminal. Its proxy sends `/api` to port `5000`:

```bash
cd src/client
npm ci
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Verify

```bash
dotnet test
dotnet list package --vulnerable --include-transitive
cd src/client
npm ci
npm test -- --watch=false
npm run build
npm run test:e2e
npm audit
```

Latest verified result:

- xUnit: 15/15 passed
- Angular Unit Test: 4/4 passed
- Playwright Chromium: 18/18 passed with 18 screenshots
- Angular production build: passed
- NuGet vulnerability scan and npm audit: no known vulnerabilities from the configured sources

## วิธีอ่าน documentation

เริ่มที่ [`documentation/README.md`](documentation/README.md) แล้วอ่านตามลำดับเจ้าของข้อมูล ห้ามเริ่มจาก UI หรือรหัสโปรแกรมเมื่อต้องการตรวจว่าระบบทำตรงโจทย์หรือไม่

| ลำดับ | พื้นที่เอกสาร      | ใช้ตอบคำถาม                                                 |
| ----: | ------------------ | ----------------------------------------------------------- |
|     1 | `00-intake`        | โจทย์ต้นทางและคำตัดสินขอบเขตคืออะไร                         |
|     2 | `01-requirements`  | ระบบต้องทำอะไรและมีกฎข้อมูลใด                               |
|     3 | `02-bu-process`    | Register, Sign in และ JWT validation ทำงานตามลำดับอย่างไร   |
|     4 | `03-domain-data`   | เก็บข้อมูลผู้ใช้อย่างไรและตารางใดเป็นเจ้าของโดยระบบ         |
|     5 | `04-arch-desc`     | Angular, Nginx, API, JWT และ PostgreSQL ทำงานร่วมกันอย่างไร |
|     6 | `08-security-arch` | OWASP, password hash, token และ rate limit ถูกออกแบบอย่างไร |
|     7 | `06-api-contract`  | request, response, validation และ error มีสัญญาอย่างไร      |
|     8 | `05-ui-desc`       | IT 02-1, IT 02-2 และ IT 02-3 แสดงผลและโต้ตอบอย่างไร         |
|     9 | `09-qa-and-test`   | Test Case, Test Step, ผลทดสอบ และ screenshot อยู่ที่ใด      |

ทางลัดตามบทบาท:

- ผู้ตรวจโจทย์: `00-intake → 01-requirements → 09-qa-and-test`
- ผู้ตรวจ API/ฐานข้อมูล: `03-domain-data → 04-arch-desc → 06-api-contract → 09-qa-and-test`
- ผู้ตรวจ UI: `05-ui-desc → 06-api-contract → 09-qa-and-test`
- ผู้ตรวจความมั่นคงปลอดภัย: `01-requirements/quality-attributes → 08-security-arch → 09-qa-and-test/security-test-plan.md`

ผลเปรียบเทียบตำแหน่งการ์ด Login กับภาพก่อนแก้อยู่ใน [`design-qa.md`](design-qa.md)

Test Step อยู่ที่ [`playwright-test-cases.md`](documentation/09-qa-and-test/01-authentication/playwright-test-cases.md), ผลและภาพล่าสุดอยู่ที่ [`playwright-test-result.md`](documentation/09-qa-and-test/01-authentication/playwright-test-result.md), และผล Unit Test อยู่ที่ [`unit-test-result.md`](documentation/09-qa-and-test/01-authentication/unit-test-result.md)
