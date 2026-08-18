---
doc_id: DEPLOY-AUTH2-01
module: AUTH2
type: deployment
---

# Deploy บน OrbStack

- client: `127.0.0.1:4202`
- API: `127.0.0.1:5002`
- PostgreSQL: `127.0.0.1:5432`
- schema: `auth_q002`

compose ของ repository นี้ทำงานเดี่ยวได้ หากต้องการใช้ PostgreSQL server/database ที่มีอยู่ ให้เปลี่ยน connection string ไปยังปลายทางนั้น โดยคง schema `auth_q002` และ migration history ของ schema แยกไว้
