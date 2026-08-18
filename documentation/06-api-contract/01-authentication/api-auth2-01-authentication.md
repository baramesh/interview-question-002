---
doc_id: API-AUTH2-01
module: AUTH2
type: api-contract
---

# Authentication API

## POST `/api/auth/register`

Request: `{ "username": "baramesh", "password": "a long passphrase", "confirmPassword": "a long passphrase" }`

Validation: `username` ยาว 3–50 ตัวและใช้ `[A-Za-z0-9._-]`; `password` ยาว 8–128 ตัวโดยไม่บังคับองค์ประกอบ; `confirmPassword` ต้องตรงกัน

Response `201`: `{ "username": "baramesh", "message": "Account created successfully." }`

## POST `/api/auth/login`

Request: `{ "username": "baramesh", "password": "StrongPass1" }`

Validation: `username` ยาว 3–50 ตัว; `password` ยาว 1–128 ตัว; ข้อมูลรับรองผิดทุกกรณีตอบ `401` และข้อความกลางเดียวกัน

Response `200`: `{ "accessToken": "<JWT>", "tokenType": "Bearer", "expiresIn": 900 }`

## GET `/api/auth/me`

Header: `Authorization: Bearer <JWT>`

Response `200`: `{ "username": "baramesh" }`

ทุก endpoint ใต้ `/api/auth` ส่ง `Cache-Control: no-store` และ `Pragma: no-cache`; Register/Login จำกัดอัตราแยกกันที่ 10 คำขอต่อ IP ต่อนาที; request body สูงสุด 64 KiB

API ไม่คืน password hash, ไม่เปิดเผยว่า username หรือ password ส่วนใดผิด, ใช้ ORM parameterization และไม่รับ token ผ่าน query string
