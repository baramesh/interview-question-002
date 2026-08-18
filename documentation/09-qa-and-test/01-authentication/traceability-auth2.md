---
doc_id: QAT-AUTH2-07
module: AUTH2
type: traceability
---

# Traceability

| ข้อกำหนด                         | API/UI                                 | การทดสอบ                                         |
| -------------------------------- | -------------------------------------- | ------------------------------------------------ |
| IT 02-1 Login                    | `/login`, `POST /api/auth/login`       | `TC-AUTH2-E2E-003`, `TC-AUTH2-VAL-001`           |
| IT 02-2 Register                 | `/register`, `POST /api/auth/register` | `TC-AUTH2-E2E-001/002`, `TC-AUTH2-VAL-002`–`005` |
| Password เป็น `*`                | Material password inputs               | `SEC-AUTH2-001`                                  |
| Password เข้ารหัส                | PasswordHasher + `password_hash`       | xUnit hash case และ verification report          |
| IT 02-3 แสดง `Welcome User: xxx` | `/welcome`, `GET /api/auth/me`         | `TC-AUTH2-E2E-003/004`                           |
| ตรวจ JWT                         | JwtBearer middleware                   | `TC-AUTH2-E2E-003`, `SEC-AUTH2-002/006`          |
| ไม่แสดงรหัสภายในบน UI            | Login, Register และ Welcome            | `TC-AUTH2-CONTENT-001`                           |
| รองรับมือถือ                     | Responsive Tailwind/Material layout    | `TC-AUTH2-RESP-001`                              |
| การ์ด Login กึ่งกลางแนวตั้ง      | Tailwind grid ใต้ส่วนหัว               | `TC-AUTH2-RESP-002`                              |
