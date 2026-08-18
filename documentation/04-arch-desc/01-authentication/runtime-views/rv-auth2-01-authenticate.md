---
doc_id: RV-AUTH2-01
module: AUTH2
type: runtime-view
---

# Runtime View

Register: `Browser → POST /api/auth/register → validate → normalize → hash → INSERT auth_q002.users → 201`

Login: `Browser → POST /api/auth/login → verify hash → issue JWT → sessionStorage → GET /api/auth/me + Bearer JWT → validate JWT → username`

คำขอทั้งหมดจบภายใน Angular, Nginx, Authentication API และ schema `auth_q002`
