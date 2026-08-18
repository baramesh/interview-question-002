---
doc_id: QAT-AUTH2-08
module: AUTH2
type: verification-report
verified_at: 2026-08-18T14:01:34Z
---

# รายงานผลตรวจวันที่ 18 สิงหาคม 2026

| รายการ                   | ผล                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| xUnit                    | ผ่าน 16/16                                                                                                                  |
| Angular Vitest           | ผ่าน 5/5                                                                                                                    |
| Playwright Chromium      | ผ่าน 25/25; รายงานสร้าง 21:01:34 น. และมีภาพ 25 ไฟล์                                                                        |
| Angular production build | ผ่าน; initial bundle 482.38 kB                                                                                              |
| NuGet vulnerability scan | ไม่พบแพ็กเกจที่มีช่องโหว่จากแหล่งปัจจุบัน                                                                                   |
| npm audit                | ไม่พบช่องโหว่                                                                                                               |
| OrbStack                 | client, API และ PostgreSQL ทำงานครบ; PostgreSQL healthy                                                                     |
| API health               | `GET http://127.0.0.1:5002/health` ตอบ `healthy`                                                                            |
| Authentication flow      | Register `201`, Login ได้ signed JWT และ `/me` ตอบชื่อผู้ใช้                                                                |
| PostgreSQL               | มี `auth_q002.users` และ migration history ใน schema เดียวกัน                                                               |
| Password storage         | ตรวจ 76 บัญชีทดสอบ ไม่พบ plaintext; hash ใหม่ใช้ PBKDF2 220,000 iterations และ hash เดิมยกระดับเมื่อ Login                  |
| JWT                      | token ไม่มี/ผิด/ถูกดัดแปลงได้ `401`; token ฝั่ง browser ถูกลบและกลับ Login                                                  |
| OWASP                    | Security cases ผ่าน 13/13: access control, injection, CORS, payload limit, no-store, server fingerprint, JWT และ rate limit |
| Runtime independence     | client, API และ PostgreSQL เริ่มต้นได้จาก compose ของ repository นี้โดยไม่พึ่ง API ภายนอก                                   |
| Production copy          | Login, Register และ Welcome ไม่แสดงรหัสข้อสอบ รหัสหน้าจอ `Account access` หรือ JWT บน UI                                    |
| Visual QA                | การ์ด Login กึ่งกลางพื้นที่ใต้ส่วนหัวคลาดเคลื่อนไม่เกิน 1 CSS pixel; ลำดับสายตาหลังตัดข้อความยังสมบูรณ์                     |

## ตำแหน่งหลักฐาน

- Test Step: `playwright-test-cases.md`
- Playwright result และภาพ: `playwright-test-result.md`, `screenshots/`
- Unit Test: `unit-test-cases.md`, `unit-test-result.md`
- Security: `security-test-plan.md`
- OWASP result และข้อจำกัด: `owasp-test-result.md`
