---
doc_id: DDC-AUTH2-01
module: AUTH2
type: domain-data
---

# แบบจำลองผู้ใช้

ตาราง `auth_q002.users`

| คอลัมน์               | ชนิด        | กฎ                                  |
| --------------------- | ----------- | ----------------------------------- |
| `id`                  | uuid        | Primary key สร้างโดยระบบ            |
| `username`            | varchar(50) | ค่าที่ใช้แสดง                       |
| `normalized_username` | varchar(50) | ตัวพิมพ์ใหญ่และ unique              |
| `password_hash`       | text        | PBKDF2 hash พร้อม salt และ metadata |
| `created_at_utc`      | timestamptz | เวลาสร้างแบบ UTC                    |

schema `auth_q002` และ migration history เป็นของระบบนี้โดยเฉพาะ แม้กำหนด connection string ให้ใช้ PostgreSQL server/database ที่มี schema อื่นอยู่แล้ว
