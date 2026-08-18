---
doc_id: QAT-AUTH2-02
module: AUTH2
type: playwright-test-case
---

# Playwright Test Cases

รหัสในเอกสารนี้ตรงกับชื่อ `test()` ใน `src/client/e2e/authentication.spec.ts` ผลและภาพล่าสุดอยู่ใน `playwright-test-result.md` และ `screenshots/`

## Functional

### TC-AUTH2-E2E-001 — เปิดหน้าสมัครสมาชิกตาม IT 02-2

- เงื่อนไขก่อนทดสอบ: เปิด `/login`
- Test Step: 1) ตรวจ Google Sans 2) กด Create account 3) ตรวจ route และฟิลด์ Username, Password, Confirm password
- ผลที่คาดหวัง: เปิด `/register` และแสดงองค์ประกอบ IT 02-2 ครบ

### TC-AUTH2-E2E-002 — สมัครสมาชิกและกลับหน้าเข้าสู่ระบบ

- เงื่อนไขก่อนทดสอบ: มี username ใหม่
- Test Step: 1) เปิด `/register` 2) กรอกข้อมูลถูกต้อง 3) กด Create account 4) ตรวจ response และ route
- ผลที่คาดหวัง: API ตอบ `201`, กลับ `/login`, แสดง `Account created successfully.`

### TC-AUTH2-E2E-003 — เข้าสู่ระบบและแสดงชื่อหลังตรวจ JWT

- เงื่อนไขก่อนทดสอบ: สร้างผู้ใช้ผ่าน API แล้ว
- Test Step: 1) กรอก username/password 2) กด Sign in 3) ตรวจ `/welcome` 4) ตรวจชื่อและ token
- ผลที่คาดหวัง: JWT มีสามส่วน, `/me` ผ่าน, แสดง `Welcome User: xxx` และไม่แสดงข้อความ implementation ของ JWT บน UI

### TC-AUTH2-E2E-004 — ออกจากระบบและลบ token

- เงื่อนไขก่อนทดสอบ: เข้าสู่ระบบและอยู่ `/welcome`
- Test Step: 1) กด Sign out 2) ตรวจ route 3) อ่าน `sessionStorage`
- ผลที่คาดหวัง: กลับ `/login` และไม่เหลือ access token

## Content

### TC-AUTH2-CONTENT-001 — ไม่แสดงรหัสข้อสอบ ศัพท์ภายใน หรือคำอธิบายที่ไม่จำเป็นค้างไว้

- เงื่อนไขก่อนทดสอบ: เปิด Login และมีบัญชีสำหรับเข้า Welcome
- Test Step: 1) ตรวจข้อความทั้งหมดบน Login รวมถึงคำอธิบาย Create account ซ้ำ 2) เปิด Register และตรวจข้อความทั้งหมด รวมถึงรายการกฎ Password และ Username แบบค้างไว้ 3) เข้าสู่ระบบ เปิด Welcome และตรวจข้อความทั้งหมด 4) ตรวจผลลัพธ์ชื่อผู้ใช้ตามโจทย์
- ผลที่คาดหวัง: ทั้งสามหน้าไม่แสดง `IT 02-x`, `Interview Question 002`, `Account access` หรือ `JWT`; Login ไม่แสดงคำอธิบาย Create account ซ้ำ; Register ไม่แสดงกฎ Password หรือ Username แบบค้างไว้; Welcome ยังแสดง `Welcome User: xxx`

## Validation

### TC-AUTH2-VAL-001 — ปฏิเสธฟอร์มเข้าสู่ระบบว่าง

- Test Step: 1) เปิด `/login` 2) กด Sign in โดยไม่กรอก 3) นับ error และคำขอ API
- ผลที่คาดหวัง: แสดง required สองรายการและไม่เรียก `/api/auth/login`

### TC-AUTH2-VAL-002 — ปฏิเสธรหัสผ่านยืนยันไม่ตรงกัน

- Test Step: 1) เปิด `/register` 2) กรอกรหัสผ่านต่างกัน 3) กด Create account 4) ตรวจข้อความและคำขอ API
- ผลที่คาดหวัง: แสดง `Passwords must match.` และไม่เรียก `/api/auth/register`

### TC-AUTH2-VAL-003 — ปฏิเสธ Username ซ้ำแบบไม่แยกตัวพิมพ์

- เงื่อนไขก่อนทดสอบ: มี Username ในฐานข้อมูลแล้ว
- Test Step: 1) เปิด `/register` 2) กรอก Username เดิมด้วยตัวพิมพ์ต่างกัน 3) กด Create account 4) ตรวจ response, route, ข้อความผิดพลาด และสถานะปุ่ม
- ผลที่คาดหวัง: API ตอบ `409`, ยังอยู่ `/register`, แสดง `Username is already registered.` และปุ่มกลับมาใช้ได้

### TC-AUTH2-VAL-004 — ปฏิเสธรหัสผ่านที่สั้นกว่าแปดตัวอักษร

- Test Step: 1) เปิด `/register` 2) กรอกรหัสผ่าน `short` 3) กด Create account 4) ตรวจข้อผิดพลาดและจำนวนคำขอ API
- ผลที่คาดหวัง: แสดง `Use at least 8 characters.` และไม่เรียก `/api/auth/register`

### TC-AUTH2-VAL-005 — API สมัครสมาชิกตอบ Problem Details เมื่อ payload ไม่ถูกต้อง

- Test Step: ส่ง `POST /api/auth/register` ด้วย Username สั้นเกิน รหัสผ่านไม่ผ่านกฎ และ Confirm password ไม่ตรงกัน
- ผลที่คาดหวัง: API ตอบ `400` แบบ Problem Details โดยมี `title`, `status = 400` และ `errors`

### TC-AUTH2-VAL-006 — แสดงกฎ Username เฉพาะเมื่อกรอกผิดรูปแบบ

- Test Step: 1) เปิด `/register` 2) กรอก Username ที่มีช่องว่าง 3) กรอก Password และ Confirm password ถูกต้อง 4) กด Create account 5) ตรวจข้อความและจำนวนคำขอ API
- ผลที่คาดหวัง: แสดง `Use 3–50 letters, numbers, dots, dashes or underscores.` ใกล้ช่อง Username และไม่เรียก `/api/auth/register`

## Security

### SEC-AUTH2-001 — ปิดบังฟิลด์รหัสผ่านทุกช่อง

- Test Step: ตรวจ attribute `type` ของ Password ใน Login และ Password/Confirm password ใน Register
- ผลที่คาดหวัง: ทุกช่องเป็น `password`

### SEC-AUTH2-002 — ปฏิเสธ API me เมื่อไม่มี JWT

- Test Step: เรียก `GET /api/auth/me` โดยไม่มี Authorization header
- ผลที่คาดหวัง: API ตอบ `401 Unauthorized`

### SEC-AUTH2-006 — ปฏิเสธ JWT ไม่ถูกต้องและแจ้งให้เข้าสู่ระบบใหม่

- Test Step: 1) เก็บ `invalid.token.value` ใน sessionStorage 2) เปิด `/welcome` 3) ตรวจ response ของ `/api/auth/me` 4) ตรวจ route, ข้อความแจ้ง และ sessionStorage
- ผลที่คาดหวัง: API ตอบ `401`, ลบ token, กลับ `/login`, แสดง `Your session has expired. Please sign in again.` และไม่แสดงคำว่า JWT ในหน้า

### SEC-AUTH2-003 — ใช้ข้อความกลางเมื่อข้อมูลรับรองผิด

- Test Step: 1) Login ด้วย username ไม่มีจริง 2) Login ด้วย username มีจริงแต่ password ผิด 3) เปรียบเทียบ response
- ผลที่คาดหวัง: ทั้งสองตอบ `401` และ `Invalid username or password.` เหมือนกัน

### SEC-AUTH2-004 — ส่ง security headers ผ่าน Nginx

- Test Step: เปิด `/login` แล้วอ่าน response headers
- ผลที่คาดหวัง: มี CSP, nosniff, frame deny, no-referrer และ permissions policy

### SEC-AUTH2-013 — ไม่เปิดเผยรุ่นของ web server

- Test Step: เปิด `/login` แล้วอ่าน `Server` response header
- ผลที่คาดหวัง: แสดงชนิด `nginx` โดยไม่มีหมายเลขรุ่น

### SEC-AUTH2-007 — ป้องกัน SQL injection ที่ช่อง Username ของ Login

- Test Step: ส่ง Login ด้วย Username `' OR 1=1 --` และรหัสผ่านผิด
- ผลที่คาดหวัง: API ตอบ `401` ด้วยข้อความกลาง ไม่เข้าสู่ระบบและไม่เกิด `500`

### SEC-AUTH2-008 — ไม่อนุญาต CORS จาก origin ที่ไม่เชื่อถือ

- Test Step: ส่ง preflight `OPTIONS /api/auth/login` จาก `https://attacker.example`
- ผลที่คาดหวัง: response ไม่มี `Access-Control-Allow-Origin`

### SEC-AUTH2-009 — ปฏิเสธ payload ที่เกินขนาดกำหนด

- Test Step: ส่ง Register payload ขนาดเกิน 70 KiB ผ่าน Nginx
- ผลที่คาดหวัง: ตอบ `413 Payload Too Large`

### SEC-AUTH2-010 — ไม่ cache ผลตอบกลับที่เกี่ยวกับการยืนยันตัวตน

- Test Step: Login ด้วยข้อมูลผิดแล้วอ่าน response headers
- ผลที่คาดหวัง: มี `Cache-Control: no-store` และ `Pragma: no-cache`

### SEC-AUTH2-011 — ปฏิเสธ JWT ที่ถูกดัดแปลง

- Test Step: 1) Login เพื่อรับ token 2) เปลี่ยนอักขระลายเซ็น 3) เรียก `/api/auth/me`
- ผลที่คาดหวัง: API ตอบ `401 Unauthorized`

### SEC-AUTH2-012 — จำกัดอัตราคำขอสมัครสมาชิก

- Test Step: ส่ง Register ไม่ถูกต้อง 15 ครั้งต่อเนื่องจากผู้เรียกเดียวกัน
- ผลที่คาดหวัง: พบ `429 Too Many Requests` อย่างน้อยหนึ่งครั้ง

### SEC-AUTH2-005 — จำกัดอัตราคำขอเข้าสู่ระบบ

- Test Step: ส่ง Login ผิดต่อเนื่อง 15 ครั้งจากผู้เรียกเดียวกัน
- ผลที่คาดหวัง: พบ `429 Too Many Requests` อย่างน้อยหนึ่งครั้ง

## Responsive

### TC-AUTH2-RESP-001 — ทุกหน้ารองรับ viewport มือถือ

- เงื่อนไขก่อนทดสอบ: viewport 390×844 และมีบัญชีทดสอบ
- Test Step: เปิด Login, Register และ Welcome แล้วเทียบ `scrollWidth` กับความกว้าง viewport
- ผลที่คาดหวัง: ทั้งสามหน้าไม่ล้นแนวนอนและแสดง `Welcome User: xxx` หลัง Login

### TC-AUTH2-RESP-002 — การ์ด Login อยู่กึ่งกลางพื้นที่ใต้ส่วนหัว

- เงื่อนไขก่อนทดสอบ: viewport 1440×1100 และเปิด `/login`
- Test Step: 1) อ่านขอบเขตส่วนหัวและการ์ด 2) คำนวณจุดกึ่งกลางของพื้นที่จากขอบล่างส่วนหัวถึงขอบล่าง viewport 3) เปรียบเทียบกับจุดกึ่งกลางการ์ด
- ผลที่คาดหวัง: จุดกึ่งกลางแนวตั้งต่างกันไม่เกิน 1 CSS pixel โดยไม่ใช้ระยะด้านบนแบบตายตัว
