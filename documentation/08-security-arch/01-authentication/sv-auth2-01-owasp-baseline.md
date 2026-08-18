---
doc_id: SEC-AUTH2-01
module: AUTH2
type: security-view
---

# OWASP Baseline

| กลุ่ม                     | การควบคุม                                                 |
| ------------------------- | --------------------------------------------------------- |
| Broken Access Control     | `/me` บังคับ bearer token และตรวจทุกคำขอ                  |
| Cryptographic Failures    | PBKDF2 password hash, HMAC-SHA256 JWT, ไม่เก็บรหัสผ่านดิบ |
| Injection                 | EF Core parameterization และ validation ความยาว/รูปแบบ    |
| Insecure Design           | ข้อความ login กลาง, rate limit, token อายุสั้น            |
| Security Misconfiguration | security headers, body limit, CORS เฉพาะ loopback         |
| Vulnerable Components     | ตรวจ NuGet vulnerability และ `npm audit`                  |
| Identification Failures   | ตรวจ issuer, audience, signature, lifetime และ subject    |
| Logging Failures          | log การปฏิเสธโดยไม่ log password/JWT                      |

Production gate ที่ยังอยู่นอกโจทย์ local: TLS, secret manager, key rotation, refresh token/revocation, audit sink และ DAST ใน CI/CD
