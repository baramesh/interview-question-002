---
doc_id: QAT-AUTH2-05
module: AUTH2
type: unit-test-result
verified_at: 2026-08-18T14:51:10Z
---

# ผล Unit Test

| ชุดทดสอบ                      | เครื่องมือ                            | ทั้งหมด | ผ่าน | ไม่ผ่าน | สถานะ |
| ----------------------------- | ------------------------------------- | ------: | ---: | ------: | ----- |
| API, validation, hash และ JWT | xUnit + EF Core InMemory              |      16 |   16 |       0 | PASS  |
| Angular component/service     | Vitest + Angular HTTP testing backend |       6 |    6 |       0 | PASS  |
| รวม                           | —                                     |      22 |   22 |       0 | PASS  |

## หลักฐานคำสั่ง

- `dotnet test`: Passed 16, Failed 0, Skipped 0
- `npm test -- --watch=false`: Test Files 1 passed, Tests 6 passed
- รายละเอียดตามประเภทและผลคาดหวังอยู่ใน `unit-test-cases.md`
