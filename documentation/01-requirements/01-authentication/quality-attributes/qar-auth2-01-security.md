---
doc_id: QAR-AUTH2-01
module: AUTH2
type: quality-attribute
---

# คุณลักษณะความมั่นคงปลอดภัย

- ใช้ PasswordHasher ของ ASP.NET Core Identity ซึ่งสร้าง salted PBKDF2 hash
- ลงนาม JWT ด้วย HMAC-SHA256 และตรวจลายเซ็น issuer, audience และเวลาหมดอายุ
- จำกัดอัตราสมัครและเข้าสู่ระบบตาม IP
- ไม่เขียนรหัสผ่านหรือ JWT ลง log
- ใช้ Problem Details โดยไม่เปิดเผย stack trace
- เพิ่ม CSP, nosniff, frame deny, referrer และ permissions headers
- ค่าลับ JWT มาจาก environment และค่าตั้งต้นใน repository ใช้เพื่อ local test เท่านั้น
