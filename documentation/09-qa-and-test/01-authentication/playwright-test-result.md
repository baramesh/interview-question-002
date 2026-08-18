---
doc_id: QAT-AUTH2-04
module: AUTH2
type: playwright-test-result
generated_at: 2026-08-18T13:34:53.352Z
---

# QAT-AUTH2-04 — ผลทดสอบ Playwright

> ไฟล์นี้สร้างอัตโนมัติจาก `npm run test:e2e` ห้ามแก้ผลด้วยมือ

## สภาพแวดล้อม

| รายการ       | ค่า                                                         |
| ------------ | ----------------------------------------------------------- |
| Base URL     | `http://127.0.0.1:4202`                                     |
| Browser      | Chromium                                                    |
| ระบบที่ทดสอบ | Angular → Nginx → ASP.NET Core API → PostgreSQL บน OrbStack |

## สรุปผล

| ทั้งหมด | ผ่าน | ไม่ผ่าน | สถานะ |
| ------: | ---: | ------: | ----- |
|      17 |   17 |       0 | PASS  |

## ผลรายกรณี

| Test Case ID      | ชื่อกรณีทดสอบ                                               | ประเภท     | ผล   | เวลา (ms) | Screenshot                                   |
| ----------------- | ----------------------------------------------------------- | ---------- | ---- | --------: | -------------------------------------------- |
| TC-AUTH2-E2E-001  | เปิดหน้าสมัครสมาชิกตาม IT 02-2                              | Functional | PASS |       404 | [เปิดภาพ](screenshots/tc-auth2-e2e-001.png)  |
| TC-AUTH2-E2E-002  | สมัครสมาชิกและกลับหน้าเข้าสู่ระบบ                           | Functional | PASS |       492 | [เปิดภาพ](screenshots/tc-auth2-e2e-002.png)  |
| TC-AUTH2-E2E-003  | เข้าสู่ระบบและแสดงชื่อหลังตรวจ JWT                          | Functional | PASS |       409 | [เปิดภาพ](screenshots/tc-auth2-e2e-003.png)  |
| TC-AUTH2-E2E-004  | ออกจากระบบและลบ token                                       | Functional | PASS |       365 | [เปิดภาพ](screenshots/tc-auth2-e2e-004.png)  |
| TC-AUTH2-VAL-001  | ปฏิเสธฟอร์มเข้าสู่ระบบว่างโดยไม่เรียก API                   | Validation | PASS |       237 | [เปิดภาพ](screenshots/tc-auth2-val-001.png)  |
| TC-AUTH2-VAL-002  | ปฏิเสธรหัสผ่านยืนยันไม่ตรงกัน                               | Validation | PASS |       284 | [เปิดภาพ](screenshots/tc-auth2-val-002.png)  |
| TC-AUTH2-VAL-003  | ปฏิเสธ Username ซ้ำแบบไม่แยกตัวพิมพ์                        | Validation | PASS |       356 | [เปิดภาพ](screenshots/tc-auth2-val-003.png)  |
| TC-AUTH2-VAL-004  | ปฏิเสธรหัสผ่านที่ไม่ผ่านกฎบนหน้าสมัคร                       | Validation | PASS |       287 | [เปิดภาพ](screenshots/tc-auth2-val-004.png)  |
| TC-AUTH2-VAL-005  | API สมัครสมาชิกตอบ Problem Details เมื่อ payload ไม่ถูกต้อง | Validation | PASS |       198 | [เปิดภาพ](screenshots/tc-auth2-val-005.png)  |
| SEC-AUTH2-001     | ปิดบังฟิลด์รหัสผ่านทุกช่อง                                  | Security   | PASS |       240 | [เปิดภาพ](screenshots/sec-auth2-001.png)     |
| SEC-AUTH2-002     | ปฏิเสธ API me เมื่อไม่มี JWT                                | Security   | PASS |       191 | [เปิดภาพ](screenshots/sec-auth2-002.png)     |
| SEC-AUTH2-006     | ปฏิเสธ JWT ไม่ถูกต้องและแจ้งให้เข้าสู่ระบบใหม่              | Security   | PASS |       235 | [เปิดภาพ](screenshots/sec-auth2-006.png)     |
| SEC-AUTH2-003     | ใช้ข้อความกลางเมื่อข้อมูลรับรองผิด                          | Security   | PASS |       325 | [เปิดภาพ](screenshots/sec-auth2-003.png)     |
| SEC-AUTH2-004     | ส่ง security headers ผ่าน Nginx                             | Security   | PASS |       207 | [เปิดภาพ](screenshots/sec-auth2-004.png)     |
| TC-AUTH2-RESP-001 | ทุกหน้ารองรับ viewport มือถือ                               | Responsive | PASS |       355 | [เปิดภาพ](screenshots/tc-auth2-resp-001.png) |
| TC-AUTH2-RESP-002 | การ์ด Login อยู่กึ่งกลางพื้นที่ใต้ส่วนหัว                   | Responsive | PASS |       196 | [เปิดภาพ](screenshots/tc-auth2-resp-002.png) |
| SEC-AUTH2-005     | จำกัดอัตราคำขอเข้าสู่ระบบ                                   | Security   | PASS |       402 | [เปิดภาพ](screenshots/sec-auth2-005.png)     |

## ภาพหลักฐาน

### TC-AUTH2-E2E-001 — เปิดหน้าสมัครสมาชิกตาม IT 02-2

![TC-AUTH2-E2E-001 — เปิดหน้าสมัครสมาชิกตาม IT 02-2](screenshots/tc-auth2-e2e-001.png)

### TC-AUTH2-E2E-002 — สมัครสมาชิกและกลับหน้าเข้าสู่ระบบ

![TC-AUTH2-E2E-002 — สมัครสมาชิกและกลับหน้าเข้าสู่ระบบ](screenshots/tc-auth2-e2e-002.png)

### TC-AUTH2-E2E-003 — เข้าสู่ระบบและแสดงชื่อหลังตรวจ JWT

![TC-AUTH2-E2E-003 — เข้าสู่ระบบและแสดงชื่อหลังตรวจ JWT](screenshots/tc-auth2-e2e-003.png)

### TC-AUTH2-E2E-004 — ออกจากระบบและลบ token

![TC-AUTH2-E2E-004 — ออกจากระบบและลบ token](screenshots/tc-auth2-e2e-004.png)

### TC-AUTH2-VAL-001 — ปฏิเสธฟอร์มเข้าสู่ระบบว่างโดยไม่เรียก API

![TC-AUTH2-VAL-001 — ปฏิเสธฟอร์มเข้าสู่ระบบว่างโดยไม่เรียก API](screenshots/tc-auth2-val-001.png)

### TC-AUTH2-VAL-002 — ปฏิเสธรหัสผ่านยืนยันไม่ตรงกัน

![TC-AUTH2-VAL-002 — ปฏิเสธรหัสผ่านยืนยันไม่ตรงกัน](screenshots/tc-auth2-val-002.png)

### TC-AUTH2-VAL-003 — ปฏิเสธ Username ซ้ำแบบไม่แยกตัวพิมพ์

![TC-AUTH2-VAL-003 — ปฏิเสธ Username ซ้ำแบบไม่แยกตัวพิมพ์](screenshots/tc-auth2-val-003.png)

### TC-AUTH2-VAL-004 — ปฏิเสธรหัสผ่านที่ไม่ผ่านกฎบนหน้าสมัคร

![TC-AUTH2-VAL-004 — ปฏิเสธรหัสผ่านที่ไม่ผ่านกฎบนหน้าสมัคร](screenshots/tc-auth2-val-004.png)

### TC-AUTH2-VAL-005 — API สมัครสมาชิกตอบ Problem Details เมื่อ payload ไม่ถูกต้อง

![TC-AUTH2-VAL-005 — API สมัครสมาชิกตอบ Problem Details เมื่อ payload ไม่ถูกต้อง](screenshots/tc-auth2-val-005.png)

### SEC-AUTH2-001 — ปิดบังฟิลด์รหัสผ่านทุกช่อง

![SEC-AUTH2-001 — ปิดบังฟิลด์รหัสผ่านทุกช่อง](screenshots/sec-auth2-001.png)

### SEC-AUTH2-002 — ปฏิเสธ API me เมื่อไม่มี JWT

![SEC-AUTH2-002 — ปฏิเสธ API me เมื่อไม่มี JWT](screenshots/sec-auth2-002.png)

### SEC-AUTH2-006 — ปฏิเสธ JWT ไม่ถูกต้องและแจ้งให้เข้าสู่ระบบใหม่

![SEC-AUTH2-006 — ปฏิเสธ JWT ไม่ถูกต้องและแจ้งให้เข้าสู่ระบบใหม่](screenshots/sec-auth2-006.png)

### SEC-AUTH2-003 — ใช้ข้อความกลางเมื่อข้อมูลรับรองผิด

![SEC-AUTH2-003 — ใช้ข้อความกลางเมื่อข้อมูลรับรองผิด](screenshots/sec-auth2-003.png)

### SEC-AUTH2-004 — ส่ง security headers ผ่าน Nginx

![SEC-AUTH2-004 — ส่ง security headers ผ่าน Nginx](screenshots/sec-auth2-004.png)

### TC-AUTH2-RESP-001 — ทุกหน้ารองรับ viewport มือถือ

![TC-AUTH2-RESP-001 — ทุกหน้ารองรับ viewport มือถือ](screenshots/tc-auth2-resp-001.png)

### TC-AUTH2-RESP-002 — การ์ด Login อยู่กึ่งกลางพื้นที่ใต้ส่วนหัว

![TC-AUTH2-RESP-002 — การ์ด Login อยู่กึ่งกลางพื้นที่ใต้ส่วนหัว](screenshots/tc-auth2-resp-002.png)

### SEC-AUTH2-005 — จำกัดอัตราคำขอเข้าสู่ระบบ

![SEC-AUTH2-005 — จำกัดอัตราคำขอเข้าสู่ระบบ](screenshots/sec-auth2-005.png)

## การสืบย้อน

- Test Step และผลที่คาดหวัง: `playwright-test-cases.md`
- รหัสในรายงานตรงกับ `src/client/e2e/authentication.spec.ts`
