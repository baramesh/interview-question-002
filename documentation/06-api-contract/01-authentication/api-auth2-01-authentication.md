---
doc_id: API-AUTH2-01
module: AUTH2
type: api-contract
---

# Authentication API

## POST `/api/auth/register`

Request: `{ "username": "baramesh", "password": "StrongPass1", "confirmPassword": "StrongPass1" }`

Response `201`: `{ "username": "baramesh", "message": "Account created successfully." }`

## POST `/api/auth/login`

Request: `{ "username": "baramesh", "password": "StrongPass1" }`

Response `200`: `{ "accessToken": "<JWT>", "tokenType": "Bearer", "expiresIn": 900 }`

## GET `/api/auth/me`

Header: `Authorization: Bearer <JWT>`

Response `200`: `{ "username": "baramesh" }`

API ไม่คืน password hash, ไม่เปิดเผยว่า username หรือ password ส่วนใดผิด และไม่รับ token ผ่าน query string
