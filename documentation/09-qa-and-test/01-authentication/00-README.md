---
doc_id: QAT-AUTH2-00
module: AUTH2
type: qa-index
---

# QA and Test Index

## เอกสารก่อนรัน

- `test-strategy-auth2.md` — ประเภทและระดับการทดสอบ
- `unit-test-cases.md` — Unit Test ตามประเภท
- `playwright-test-cases.md` — Browser Test พร้อม Test Step และผลคาดหวัง
- `security-test-plan.md` — การจับคู่ OWASP กับการตรวจ
- `owasp-test-result.md` — ผล OWASP แยกมาตรการที่ผ่าน ช่องว่าง และสิ่งที่อยู่นอก local test

## ผลล่าสุด

- `unit-test-result.md` — xUnit 16/16 และ Angular 6/6
- `playwright-test-result.md` — Playwright 25/25 พร้อมภาพ 25 ไฟล์
- `verification-report-2026-08-18.md` — build, dependency scan, runtime, database และ visual QA
- `traceability-auth2.md` — การจับคู่โจทย์กับ API/UI และการทดสอบ

ไฟล์ `playwright-test-result.md` และภาพใน `screenshots/` สร้างจาก `npm run test:e2e` รอบล่าสุด ห้ามแก้ผลด้วยมือ
