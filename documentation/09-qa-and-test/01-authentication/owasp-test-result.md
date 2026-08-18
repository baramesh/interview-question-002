---
doc_id: QAT-AUTH2-09
module: AUTH2
type: owasp-test-result
verified_at: 2026-08-18T14:51:44Z
---

# ผลตรวจ OWASP สำหรับ Register และ Login

## ผลอัตโนมัติ

| กลุ่มตรวจ                                 |           จำนวน | ผล                            |
| ----------------------------------------- | --------------: | ----------------------------- |
| Playwright Security `SEC-AUTH2-001`–`013` |              13 | PASS 13/13                    |
| xUnit API/validation/hash/JWT             |              16 | PASS 16/16                    |
| Angular Unit Test                         |               6 | PASS 6/6                      |
| NuGet vulnerability scan                  |      2 projects | ไม่พบช่องโหว่จากแหล่งปัจจุบัน |
| npm audit                                 | dependency tree | ไม่พบช่องโหว่                 |

## มาตรการที่ยืนยันแล้ว

- `/me` ปฏิเสธคำขอที่ไม่มี JWT, JWT ผิดรูปแบบ และ JWT ที่ลายเซ็นถูกดัดแปลง
- Login ใช้ข้อความกลางเหมือนกันสำหรับชื่อที่ไม่มีจริงและรหัสผ่านผิด พร้อม dummy hash ลดความต่างด้านเวลา
- Register/Login จำกัด 10 คำขอต่อ client IP ต่อนาทีด้วยตัวนับแยกกัน และ Nginx เขียน forwarded IP ใหม่จากผู้เชื่อมต่อ
- SQL injection ใน Username ไม่ผ่านการยืนยันตัวตนและไม่ทำให้ API ตอบ `500`
- CORS ไม่อนุญาต origin ภายนอก, payload เกิน 64 KiB ได้ `413`, auth response ใช้ `no-store/no-cache`
- Nginx ส่ง security headers และไม่เปิดเผยหมายเลขรุ่น
- password hash ใหม่ใช้ salted PBKDF2 220,000 iterations; hash เก่าถูก rehash หลัง Login สำเร็จ
- รหัสผ่านรองรับทุกองค์ประกอบที่ความยาว 8–128 ตัวตาม ASVS v5.0.0-6.2.5

## ช่องว่างที่ประกาศตรงไปตรงมา

- ยังไม่ตรวจรหัสผ่านกับรายการยอดนิยม/ถูกเปิดเผยอย่างน้อย 3,000 ค่า จึงไม่ผ่าน ASVS v5.0.0-6.2.4
- Password change/recovery ไม่อยู่ในโจทย์ จึงยังไม่ครอบคลุม ASVS v5.0.0-6.2.2/6.2.3
- Register ตอบ `409 Username is already registered.` ตามความต้องการระบบ จึงยังระบุตัวผู้ใช้ผ่าน Register ได้และไม่ผ่าน ASVS v5.0.0-6.3.8 ระดับ 3
- ฐานข้อมูลทดสอบมี hash 100,000 iterations เดิม 44 รายการและ hash 220,000 iterations 48 รายการ; ระบบยกระดับรายการเดิมเมื่อ Login สำเร็จ
- TLS ingress, secret manager, key rotation, distributed rate limit, token revocation, audit sink และ DAST ใน CI/CD อยู่นอกการทดสอบ OrbStack รอบนี้

คำตัดสิน: มาตรการ OWASP ที่นำมาทดสอบในขอบเขต Register/Login ผ่านทั้งหมด แต่ระบบยังไม่อ้างว่าได้ ASVS Level 1 ครบทุกข้อ
