# Documentation — Interview Question 002

เอกสารชุดนี้เป็นแหล่งตรวจสอบระบบสมัครสมาชิก เข้าสู่ระบบ ตรวจ JWT และแสดงชื่อผู้ใช้ของ Question 002 โดยมีข้อมูลครบตั้งแต่โจทย์ต้นทางจนถึงผลทดสอบล่าสุด

## ขอบเขตระบบ

- IT 02-1: Sign in
- IT 02-2: Register
- IT 02-3: Welcome หลังตรวจ JWT
- API: Register, Login และ Current User
- Data: บัญชีผู้ใช้และ password hash ใน schema `auth_q002`
- Security: password policy, PBKDF2, JWT, rate limit และ security headers

## ลำดับการอ่าน

| ลำดับ | พื้นที่            | จุดประสงค์                        | เอกสารเริ่มต้น                       |
| ----: | ------------------ | --------------------------------- | ------------------------------------ |
|     1 | `00-intake`        | ตรวจโจทย์และคำตัดสินขอบเขต        | `source-register.md`                 |
|     2 | `01-requirements`  | ตรวจความต้องการ กฎ และเกณฑ์ยอมรับ | `fr-auth2-01-register-login.md`      |
|     3 | `02-bu-process`    | ตรวจลำดับ Register และ Sign in    | `flw-auth2-01-register-login.md`     |
|     4 | `03-domain-data`   | ตรวจ schema, table และ field      | `ddc-auth2-01-user.md`               |
|     5 | `04-arch-desc`     | ตรวจส่วนประกอบ runtime และ deploy | `ad-auth2-01-module-architecture.md` |
|     6 | `08-security-arch` | ตรวจ OWASP และข้อจำกัด production | `sv-auth2-01-owasp-baseline.md`      |
|     7 | `06-api-contract`  | ตรวจ endpoint, payload และ error  | `00-README.md`                       |
|     8 | `05-ui-desc`       | ตรวจที่มาหน้าจอและพฤติกรรม UI     | `screen-derivation.md`               |
|     9 | `09-qa-and-test`   | ตรวจ Test Step, ผล และภาพหลักฐาน  | `00-README.md`                       |

## จุดตรวจสำคัญ

- ข้อกำหนดหลัก: `01-requirements/01-authentication/functional/fr-auth2-01-register-login.md`
- กฎข้อมูลรับรอง: `01-requirements/01-authentication/business-rules/br-auth2-01-credentials.md`
- สัญญา API: `06-api-contract/01-authentication/api-auth2-01-authentication.md`
- OWASP baseline: `08-security-arch/01-authentication/sv-auth2-01-owasp-baseline.md`
- Test Case และ Test Step: `09-qa-and-test/01-authentication/playwright-test-cases.md`
- Playwright result: `09-qa-and-test/01-authentication/playwright-test-result.md`
- Unit Test result: `09-qa-and-test/01-authentication/unit-test-result.md`
- รายงานตรวจรวม: `09-qa-and-test/01-authentication/verification-report-2026-08-18.md`

## กฎการใช้หลักฐาน

- ใช้ `No2.docx` และ source register เป็นหลักฐานของโจทย์
- ใช้ requirements และ API contract เป็นหลักฐานของพฤติกรรมที่ต้องมี
- ใช้ไฟล์ใน `09-qa-and-test` เป็นหลักฐานการทดสอบ
- ภาพหน้าจอประกอบผล browser แต่ไม่ใช้แทนข้อกำหนดหรือผล API
