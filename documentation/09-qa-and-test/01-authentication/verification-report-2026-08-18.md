---
doc_id: QAT-AUTH2-08
module: AUTH2
type: verification-report
verified_at: 2026-08-18T13:42:09Z
---

# รายงานผลตรวจวันที่ 18 สิงหาคม 2026

| รายการ                   | ผล                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| xUnit                    | ผ่าน 15/15                                                                                              |
| Angular Vitest           | ผ่าน 4/4                                                                                                |
| Playwright Chromium      | ผ่าน 18/18; รายงานสร้าง 20:42:09 น. และมีภาพ 18 ไฟล์                                                    |
| Angular production build | ผ่าน; initial bundle 482.48 kB                                                                          |
| NuGet vulnerability scan | ไม่พบแพ็กเกจที่มีช่องโหว่จากแหล่งปัจจุบัน                                                               |
| npm audit                | ไม่พบช่องโหว่                                                                                           |
| OrbStack                 | client, API และ PostgreSQL ทำงานครบ; PostgreSQL healthy                                                 |
| API health               | `GET http://127.0.0.1:5002/health` ตอบ `healthy`                                                        |
| Authentication flow      | Register `201`, Login ได้ signed JWT และ `/me` ตอบชื่อผู้ใช้                                            |
| PostgreSQL               | มี `auth_q002.users` และ migration history ใน schema เดียวกัน                                           |
| Password storage         | ตรวจ 30 บัญชีทดสอบ ไม่พบ plaintext หรือค่าที่ไม่ใช่รูปแบบ PasswordHasher                                |
| JWT                      | token ผิดได้ `401`, ถูกลบจาก sessionStorage, กลับ Login และแสดงข้อความให้เข้าใหม่                       |
| OWASP                    | password hash, generic error, authorization, rate limit และ security headers ผ่าน                       |
| Runtime independence     | client, API และ PostgreSQL เริ่มต้นได้จาก compose ของ repository นี้โดยไม่พึ่ง API ภายนอก               |
| Production copy          | Login, Register และ Welcome ไม่แสดงรหัสข้อสอบ รหัสหน้าจอ `Account access` หรือ JWT บน UI                |
| Visual QA                | การ์ด Login กึ่งกลางพื้นที่ใต้ส่วนหัวคลาดเคลื่อนไม่เกิน 1 CSS pixel; ลำดับสายตาหลังตัดข้อความยังสมบูรณ์ |

## ตำแหน่งหลักฐาน

- Test Step: `playwright-test-cases.md`
- Playwright result และภาพ: `playwright-test-result.md`, `screenshots/`
- Unit Test: `unit-test-cases.md`, `unit-test-result.md`
- Security: `security-test-plan.md`
