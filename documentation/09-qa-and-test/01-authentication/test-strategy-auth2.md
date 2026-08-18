---
doc_id: QAT-AUTH2-01
module: AUTH2
type: test-strategy
---

# กลยุทธ์ทดสอบ

- Unit/API: validation, normalization, hash verification, ชื่อซ้ำ, login และ JWT claim
- Angular Unit: form validation, payload, token handling และ unauthorized redirect
- Playwright Functional: สมัคร, เข้าสู่ระบบ, welcome และออกจากระบบ
- Playwright Validation: required, password mismatch, weak password, Username ซ้ำ และ Problem Details
- Playwright Security: password masking, generic login error, `/me` ที่ไม่มี/มี JWT ผิด, rate limit และ security headers
- Responsive/Accessibility: keyboard, label, focus, viewport 390px และการจัดกึ่งกลางการ์ดบน desktop

ผลทดสอบต้องสร้างหลังโค้ดสุดท้าย พร้อมภาพหน้าจอสำหรับทุก Playwright Test Case
