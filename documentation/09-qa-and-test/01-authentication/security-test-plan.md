---
doc_id: QAT-AUTH2-06
module: AUTH2
type: security-test-plan
---

# แผนทดสอบความมั่นคงปลอดภัย

| การควบคุม                | วิธีตรวจ                                                                | หลักฐาน                                     |
| ------------------------ | ----------------------------------------------------------------------- | ------------------------------------------- |
| Password confidentiality | ตรวจ `type=password`, hash, work factor และฐานข้อมูลไม่มี plaintext     | `SEC-AUTH2-001`, xUnit, verification report |
| Password policy          | ปฏิเสธต่ำกว่า 8 ตัวและยอมรับ passphrase โดยไม่บังคับองค์ประกอบ          | `TC-AUTH2-VAL-004`, xUnit                   |
| JWT authorization        | เรียก `/me` ด้วยไม่มี token, token ผิด, token ถูกดัดแปลง และ token จริง | `SEC-AUTH2-002/006/011`, `TC-AUTH2-E2E-003` |
| Account enumeration      | เปรียบเทียบ Login ของชื่อไม่มีจริงกับ password ผิด                      | `SEC-AUTH2-003`                             |
| Injection                | ส่ง SQL injection ใน Username แล้วตรวจสถานะ/ข้อความกลาง                 | `SEC-AUTH2-007`                             |
| CORS                     | ส่ง preflight จาก origin ที่ไม่เชื่อถือ                                 | `SEC-AUTH2-008`                             |
| Request limit            | ส่ง payload เกิน 64 KiB ผ่าน Nginx                                      | `SEC-AUTH2-009`                             |
| Sensitive response cache | ตรวจ `no-store` และ `no-cache` จาก Login response                       | `SEC-AUTH2-010`                             |
| Security headers         | อ่าน response ผ่าน Nginx                                                | `SEC-AUTH2-004`                             |
| Server fingerprint       | ตรวจ `Server` header ว่าไม่มีหมายเลขรุ่น                                | `SEC-AUTH2-013`                             |
| Brute-force/automation   | ส่ง Login และ Register เกิน fixed-window limit แยกกัน                   | `SEC-AUTH2-005/012`                         |
| Dependency exposure      | `dotnet list package --vulnerable` และ `npm audit`                      | verification report                         |

## ข้อจำกัดของผลทดสอบ

- ผลนี้ยืนยันมาตรการที่รันได้ใน OrbStack เท่านั้น ไม่ใช่ใบรับรองการทดสอบเจาะระบบ
- Register ยังตอบ `409 Username is already registered.` ตามความต้องการชื่อซ้ำ จึงระบุตัวผู้ใช้ผ่าน Register ได้และไม่ผ่าน ASVS v5.0.0-6.3.8 ระดับ 3
- ยังไม่มีรายการรหัสผ่านยอดนิยม/ถูกเปิดเผยอย่างน้อย 3,000 ค่า จึงไม่ผ่าน ASVS v5.0.0-6.2.4
- TLS ingress, secret manager, key rotation, distributed rate limit, token revocation, DAST และส่วนจัดเก็บ log กลางอยู่นอก local test
