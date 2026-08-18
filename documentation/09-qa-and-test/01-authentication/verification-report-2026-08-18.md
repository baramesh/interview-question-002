---
doc_id: QAT-AUTH2-08
module: AUTH2
type: verification-report
verified_at: 2026-08-18T13:10:08Z
---

# รายงานผลตรวจวันที่ 18 สิงหาคม 2026

| รายการ                   | ผล                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| xUnit                    | ผ่าน 15/15                                                                                |
| Angular Vitest           | ผ่าน 4/4                                                                                  |
| Playwright Chromium      | ผ่าน 16/16; รายงานสร้าง 20:10:08 น. และมีภาพ 16 ไฟล์                                      |
| Angular production build | ผ่าน; initial bundle 479.63 kB                                                            |
| NuGet vulnerability scan | ไม่พบแพ็กเกจที่มีช่องโหว่จากแหล่งปัจจุบัน                                                 |
| npm audit                | ไม่พบช่องโหว่                                                                             |
| OrbStack                 | client, API และ PostgreSQL ทำงานครบ; PostgreSQL healthy                                   |
| API health               | `GET http://127.0.0.1:5002/health` ตอบ `healthy`                                          |
| Authentication flow      | Register `201`, Login ได้ signed JWT และ `/me` ตอบชื่อผู้ใช้                              |
| PostgreSQL               | มี `auth_q002.users` และ migration history ใน schema เดียวกัน                             |
| Password storage         | ตรวจ 30 บัญชีทดสอบ ไม่พบ plaintext หรือค่าที่ไม่ใช่รูปแบบ PasswordHasher                  |
| JWT                      | ตรวจ signature, issuer, audience, lifetime, raw `unique_name` claim และการปฏิเสธ token ผิดสำเร็จ |
| OWASP                    | password hash, generic error, authorization, rate limit และ security headers ผ่าน         |
| Runtime independence     | client, API และ PostgreSQL เริ่มต้นได้จาก compose ของ repository นี้โดยไม่พึ่ง API ภายนอก |
| Visual QA                | Desktop/Mobile แสดง `Welcome User: xxx` โดยไม่มีศัพท์ implementation บน UI                |

## ตำแหน่งหลักฐาน

- Test Step: `playwright-test-cases.md`
- Playwright result และภาพ: `playwright-test-result.md`, `screenshots/`
- Unit Test: `unit-test-cases.md`, `unit-test-result.md`
- Security: `security-test-plan.md`
