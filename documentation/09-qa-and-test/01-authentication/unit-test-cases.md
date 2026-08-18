---
doc_id: QAT-AUTH2-03
module: AUTH2
type: unit-test-case
---

# Unit Test Cases

| ประเภท     | ID               | กรณี                                        |
| ---------- | ---------------- | ------------------------------------------- |
| Validation | UT-API-AUTH2-001 | username สั้นหรือรูปแบบผิด                  |
| Validation | UT-API-AUTH2-002 | password อ่อนหรือยาวเกิน                    |
| Validation | UT-API-AUTH2-003 | confirm password ไม่ตรง                     |
| Data       | UT-API-AUTH2-004 | normalized username คาดเดาผลได้             |
| Security   | UT-API-AUTH2-005 | hash ไม่เท่ารหัสผ่านดิบและตรวจคืนได้        |
| API        | UT-API-AUTH2-006 | register สำเร็จ                             |
| API        | UT-API-AUTH2-007 | username ซ้ำได้ 409                         |
| API        | UT-API-AUTH2-008 | login สำเร็จได้ JWT                         |
| API        | UT-API-AUTH2-009 | login ผิดได้ 401 ข้อความกลาง                |
| Security   | UT-API-AUTH2-010 | JWT มี issuer, audience, subject และหมดอายุ |
| UI         | UT-UI-AUTH2-001  | ฟอร์ม login บังคับกรอก                      |
| UI         | UT-UI-AUTH2-002  | register ปฏิเสธ mismatch                    |
| UI         | UT-UI-AUTH2-003  | login เก็บ token และนำทาง                   |
| UI         | UT-UI-AUTH2-004  | unauthorized ล้าง token กลับ login และส่งข้อความให้เข้าใหม่ |
