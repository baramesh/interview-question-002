---
doc_id: INT-AUTH2-01
module: AUTH2
type: integration-contract
---

# ขอบเขตการเชื่อมต่อ

- Angular ติดต่อ API ผ่าน Nginx เส้นทาง `/api`
- API ติดต่อ PostgreSQL ผ่าน Npgsql
- ไม่มีการเชื่อมต่อ API กับระบบธุรกิจภายนอก
- การใช้ PostgreSQL server/database ร่วมกันเป็นเพียงทรัพยากรร่วม; schema และ migration ownership แยกกัน
