---
doc_id: AD-AUTH2-01
module: AUTH2
type: architecture-description
---

# สถาปัตยกรรมระบบเข้าสู่ระบบ

`Angular → Nginx → ASP.NET Core API → EF Core → PostgreSQL`

- Angular เป็นเจ้าของเส้นทาง `/login`, `/register`, `/welcome`
- Nginx ให้บริการหน้าเว็บและส่ง `/api/*` ไป API
- API เป็นเจ้าของ validation, password hashing, JWT และ authorization ของ `/me`
- PostgreSQL เป็นเจ้าของข้อมูลผู้ใช้ใน schema `auth_q002`
- ไม่มีการเรียก API หรือใช้ model จากระบบธุรกิจภายนอก
