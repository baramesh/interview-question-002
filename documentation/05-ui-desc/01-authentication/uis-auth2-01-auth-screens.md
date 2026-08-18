---
doc_id: UIS-AUTH2-01
module: AUTH2
type: ui-specification
---

# ข้อกำหนด UI

- Layout เป็นการ์ดเข้าสู่ระบบกึ่งกลางพื้นที่ใต้ส่วนหัว มีตรา Example.com และชื่อ Question 002
- จัดกึ่งกลางด้วย Tailwind CSS `grid place-items-center` บนพื้นที่ `min-h-[calc(100vh-73px)]`; ซ่อน `router-outlet` ด้วย `hidden` เพื่อไม่ให้ถูกนับเป็นแถวว่าง และห้ามกำหนดระยะจากด้านบนแบบตายตัว
- IT 02-1 มี Username, Password, ปุ่ม Sign in และลิงก์ Create account
- IT 02-2 มี Username, Password, Confirm password, ปุ่ม Create account และกลับ Sign in
- IT 02-3 มีหัวข้อ Welcome, ข้อความ `Welcome User: {username}` จาก API และปุ่ม Sign out
- UI ไม่แสดงศัพท์ implementation เช่น JWT, hash, signature, issuer, audience หรือ lifetime แก่ผู้ใช้
- เมื่อ session ใช้งานไม่ได้ ให้ลบ token กลับหน้า Login และแสดง `Your session has expired. Please sign in again.` โดยไม่ระบุศัพท์ทางเทคนิค
- ฟิลด์บังคับใช้ดอกจันและคำชี้แจงเดียวกัน
- Password ใช้ Material input และปุ่มแสดง/ซ่อนที่ใช้ด้วย keyboard ได้
- ทุกหน้ารองรับ 390px โดยไม่มีการล้นแนวนอน
