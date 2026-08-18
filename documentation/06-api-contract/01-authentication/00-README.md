---
doc_id: API-AUTH2-00
module: AUTH2
type: api-index
---

# API Index

| endpoint                  | ผู้ใช้     | ผลสำเร็จ                 |
| ------------------------- | ---------- | ------------------------ |
| `POST /api/auth/register` | Anonymous  | `201 Created`            |
| `POST /api/auth/login`    | Anonymous  | `200 OK` พร้อม JWT       |
| `GET /api/auth/me`        | Bearer JWT | `200 OK` พร้อมชื่อผู้ใช้ |

error ใช้ Problem Details; validation เป็น `400`, ชื่อซ้ำ `409`, และข้อมูลรับรองหรือ token ไม่ผ่านเป็น `401`
