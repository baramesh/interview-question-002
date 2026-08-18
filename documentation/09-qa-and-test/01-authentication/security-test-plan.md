---
doc_id: QAT-AUTH2-06
module: AUTH2
type: security-test-plan
---

# แผนทดสอบความมั่นคงปลอดภัย

| การควบคุม                | วิธีตรวจ                                               | หลักฐาน                                     |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------- |
| Password confidentiality | ตรวจ `type=password`, hash และฐานข้อมูลไม่มี plaintext | `SEC-AUTH2-001`, xUnit, verification report |
| JWT authorization        | เรียก `/me` ทั้งไม่มี token และ token ที่ออกจริง       | `SEC-AUTH2-002`, `TC-AUTH2-E2E-003`         |
| Account enumeration      | เปรียบเทียบ error ของชื่อไม่มีจริงและ password ผิด     | `SEC-AUTH2-003`                             |
| Security headers         | อ่าน response ผ่าน Nginx                               | `SEC-AUTH2-004`                             |
| Brute-force resistance   | ส่ง Login เกิน fixed-window limit                      | `SEC-AUTH2-005`                             |
| Invalid token rejection  | เรียก `/me` ด้วย JWT ที่ไม่ถูกต้อง                 | `SEC-AUTH2-006`                             |
| Dependency exposure      | `dotnet list package --vulnerable` และ `npm audit`     | verification report                         |

การตรวจ production ที่ยังไม่รวม: TLS, secret manager, key rotation, token revocation, DAST และส่วนจัดเก็บ log กลาง
