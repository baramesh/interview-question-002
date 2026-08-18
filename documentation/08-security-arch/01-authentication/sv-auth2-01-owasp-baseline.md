---
doc_id: SEC-AUTH2-01
module: AUTH2
type: security-view
---

# OWASP Baseline

ฐานนี้อ้างอิง [OWASP Top 10:2025](https://owasp.org/Top10/2025/), [OWASP ASVS 5.0.0 V6 Authentication](https://github.com/OWASP/ASVS/blob/v5.0.0/5.0/en/0x15-V6-Authentication.md) และ [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) โดยเป็นการตรวจระบบตามขอบเขต Register, Login, JWT และ `/me` ไม่ใช่ใบรับรองการทดสอบเจาะระบบ

## OWASP Top 10:2025

| กลุ่ม                                      | การควบคุม                                                                                                                        | หลักฐาน                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| A01 Broken Access Control                  | `/me` บังคับ bearer token, ตรวจ token ทุกคำขอ, CORS เฉพาะ origin ที่กำหนด                                                        | `SEC-AUTH2-002/006/008/011`                           |
| A02 Security Misconfiguration              | Production environment, ซ่อนรุ่น server, CSP และ security headers, body limit 64 KiB, CORS รายการอนุญาต, auth response ไม่ cache | `SEC-AUTH2-004/008/009/010/013`                       |
| A03 Software Supply Chain Failures         | ตรวจช่องโหว่ NuGet และ npm จาก lock file                                                                                         | verification report                                   |
| A04 Cryptographic Failures                 | ASP.NET PasswordHasher ใช้ salted PBKDF2 220,000 iterations; JWT ลงนาม HMAC และอายุ 15 นาที                                      | xUnit, database verification                          |
| A05 Injection                              | validation จำกัดขนาด/รูปแบบและ EF Core ใช้ parameterization                                                                      | `SEC-AUTH2-007`, `TC-AUTH2-VAL-005`                   |
| A06 Insecure Design                        | ข้อความ Login กลาง, dummy hash ลด timing difference, rate limit แยก Register/Login                                               | `SEC-AUTH2-003/005/012`                               |
| A07 Authentication Failures                | password masking, validation ฝั่ง server, throttling, ตรวจ issuer/audience/signature/lifetime                                    | `SEC-AUTH2-001/005/006/011/012`, xUnit                |
| A08 Software or Data Integrity Failures    | ไม่เชื่อ token ฝั่ง client และปฏิเสธ JWT ที่ลายเซ็นถูกดัดแปลง                                                                    | `SEC-AUTH2-011`                                       |
| A09 Security Logging and Alerting Failures | log เฉพาะชนิดความล้มเหลวของ JWT ไม่ log password หรือ token                                                                      | code review; production audit sink อยู่นอก local test |
| A10 Mishandling of Exceptional Conditions  | Problem Details กลาง, ไม่คืน stack trace, unique constraint รองรับ race และจำกัด payload                                         | `TC-AUTH2-VAL-003/005`, `SEC-AUTH2-009`               |

## OWASP ASVS 5.0.0 ที่เกี่ยวข้อง

| Requirement                                          | สถานะ                                    | หลักฐาน/ข้อจำกัด                                                               |
| ---------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| v5.0.0-6.1.1 การป้องกัน brute force ต้องมีเอกสาร     | ผ่าน                                     | กำหนด 10 คำขอ/client IP/นาที แยก Register/Login; Nginx เขียน forwarded IP ใหม่ |
| v5.0.0-6.2.1 รหัสผ่านอย่างน้อย 8 ตัว                 | ผ่าน                                     | Angular, API validation และ Unit Test                                          |
| v5.0.0-6.2.2/6.2.3 เปลี่ยนรหัสผ่านอย่างปลอดภัย       | นอกขอบเขตโจทย์                           | ระบบนี้มีเฉพาะ Register, Login, Welcome และ Sign out                           |
| v5.0.0-6.2.4 ตรวจรหัสผ่านยอดนิยมอย่างน้อย 3,000 ค่า  | ยังไม่ผ่าน                               | ต้องเพิ่ม breached/common-password provider ใน production                      |
| v5.0.0-6.2.5 ไม่บังคับองค์ประกอบรหัสผ่าน             | ผ่าน                                     | รองรับทุกองค์ประกอบ ความยาว 8–128 ตัว                                          |
| v5.0.0-6.2.6 ช่องรหัสผ่านใช้ `type=password`         | ผ่าน                                     | `SEC-AUTH2-001`                                                                |
| v5.0.0-6.2.7 อนุญาต paste และ password manager       | ผ่าน                                     | ไม่มี handler ปิด paste; ใช้ autocomplete มาตรฐาน                              |
| v5.0.0-6.2.8 ตรวจรหัสผ่านตามค่าที่รับจริง            | ผ่าน                                     | ไม่ trim, truncate หรือเปลี่ยนตัวพิมพ์ password                                |
| v5.0.0-6.3.1 ป้องกัน credential stuffing/brute force | ผ่านตาม local baseline                   | `SEC-AUTH2-005/012`; production ควรเพิ่ม distributed limiter                   |
| v5.0.0-6.3.8 ป้องกันการระบุตัวผู้ใช้จากผลล้มเหลว     | ผ่านสำหรับ Login; ไม่ผ่านสำหรับ Register | Login ใช้ข้อความ/สถานะเดียว; Register ยังตอบ `409` ตามความต้องการตรวจชื่อซ้ำ   |

จึงไม่อ้างว่าได้ ASVS Level 1 ครบทุกข้อ ช่องว่างหลักคือ password change, รายการรหัสผ่านที่ถูกเปิดเผย/ยอดนิยม, TLS ที่ ingress, secret manager, key rotation, distributed rate limit, audit sink, token revocation และ DAST ใน CI/CD
