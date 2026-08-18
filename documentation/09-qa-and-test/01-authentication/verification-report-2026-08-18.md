---
doc_id: QAT-AUTH2-08
module: AUTH2
type: verification-report
verified_at: 2026-08-18T14:51:44Z
---

# รายงานผลตรวจวันที่ 18 สิงหาคม 2026

| รายการ                   | ผล                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| xUnit                    | ผ่าน 16/16                                                                                                                  |
| Angular Vitest           | ผ่าน 6/6                                                                                                                    |
| Playwright Chromium      | ผ่าน 26/26; รายงานสร้าง 21:51:44 น. และมีภาพ 26 ไฟล์                                                                        |
| Angular production build | ผ่าน; initial bundle 481.53 kB                                                                                              |
| NuGet vulnerability scan | ไม่พบแพ็กเกจที่มีช่องโหว่จากแหล่งปัจจุบัน                                                                                   |
| npm audit                | ไม่พบช่องโหว่                                                                                                               |
| OrbStack                 | client, API และ PostgreSQL ทำงานครบ; PostgreSQL healthy                                                                     |
| API health               | `GET http://127.0.0.1:5002/health` ตอบ `healthy`                                                                            |
| Authentication flow      | Register `201`, Login ได้ signed JWT และ `/me` ตอบชื่อผู้ใช้                                                                |
| PostgreSQL               | มี `auth_q002.users` และ migration history ใน schema เดียวกัน                                                               |
| Password storage         | ตรวจ 92 บัญชีทดสอบ ไม่พบ plaintext; 48 hash ใช้ PBKDF2 220,000 iterations และ 44 hash เดิมยกระดับเมื่อ Login สำเร็จ         |
| JWT                      | token ไม่มี/ผิด/ถูกดัดแปลงได้ `401`; token ฝั่ง browser ถูกลบและกลับ Login                                                  |
| OWASP                    | Security cases ผ่าน 13/13: access control, injection, CORS, payload limit, no-store, server fingerprint, JWT และ rate limit |
| Runtime independence     | client, API และ PostgreSQL เริ่มต้นได้จาก compose ของ repository นี้โดยไม่พึ่ง API ภายนอก                                   |
| Production copy          | Login, Register และ Welcome ไม่แสดงรหัสข้อสอบ ศัพท์ภายใน คำอธิบาย Create account ซ้ำ หรือนโยบาย Password/Username ค้างไว้   |
| Visual QA                | การ์ด Login กึ่งกลางพื้นที่ใต้ส่วนหัวคลาดเคลื่อนไม่เกิน 1 CSS pixel; ลำดับสายตาหลังตัดข้อความยังสมบูรณ์                     |

## ตำแหน่งหลักฐาน

- Test Step: `playwright-test-cases.md`
- Playwright result และภาพ: `playwright-test-result.md`, `screenshots/`
- Unit Test: `unit-test-cases.md`, `unit-test-result.md`
- Security: `security-test-plan.md`
- OWASP result และข้อจำกัด: `owasp-test-result.md`
