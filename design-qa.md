# Design QA — Authentication layout and production copy

## Evidence

- Source visual truth: `documentation/09-qa-and-test/01-authentication/screenshots/design-reference-login-offset.png`
- Implementation: `documentation/09-qa-and-test/01-authentication/screenshots/tc-auth2-resp-002.png`
- Combined comparison: `documentation/09-qa-and-test/01-authentication/screenshots/design-qa-production-copy-comparison.png`
- Register production copy: `documentation/09-qa-and-test/01-authentication/screenshots/tc-auth2-e2e-001.png`
- Register contextual Username validation: `documentation/09-qa-and-test/01-authentication/screenshots/tc-auth2-val-006.png`
- Register policy-copy reference: `documentation/09-qa-and-test/01-authentication/screenshots/design-reference-register-policy-copy.png`
- Register policy-copy comparison: `documentation/09-qa-and-test/01-authentication/screenshots/design-qa-register-policy-copy-comparison.png`
- Welcome production copy: `documentation/09-qa-and-test/01-authentication/screenshots/tc-auth2-content-001.png`
- Invalid-session state: `documentation/09-qa-and-test/01-authentication/screenshots/sec-auth2-006.png`
- Viewport and CSS size: 1440×1100 px at device scale factor 1
- Full-view source and implementation pixels: 1440×1100; no density normalization required
- Register focused comparison: 333×150 px source and 333×150 px implementation crop at device scale factor 1
- Compared state: desktop `/login`; Register, Welcome and invalid-session feedback inspected separately

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: Google Sans, weights, hierarchy, wrapping, and control text remain consistent with the source.
- Spacing and layout rhythm: the source card was about 98 px below the center of the content area. After hiding the inactive `router-outlet` grid item, the card measures top 317 px, height 539 px, center 586.5 px; the area below the 73 px header also centers at 586.5 px. Delta is 0 CSS px.
- Colors and visual tokens: indigo surfaces, pale background, borders, shadows, and semantic red error treatment remain consistent.
- Image quality and asset fidelity: no photographic or generated image assets occur in this screen; the existing brand mark and all existing visual treatments are preserved.
- Copy and content: production UI no longer exposes `IT 02-x`, `Interview Question 002`, `Account access`, JWT, duplicate account-creation guidance or persistent Password/Username-policy copy. Register shows actionable guidance only after invalid input, Welcome retains the required `Welcome User: {username}` result, and invalid sessions show `Your session has expired. Please sign in again.`

Focused review covered Register, Welcome and the invalid-session state because those states are not present in the Login source. Their screenshots confirm that internal labels are absent, user guidance remains complete, and the hierarchy stays balanced after the copy removal.

## Comparison History

1. P2 — Login card appeared below the vertical center because the visible routed component and the inactive `router-outlet` were both grid items.
2. Fix — applied Tailwind `hidden` to `router-outlet` while retaining `grid place-items-center` on the area below the header; no fixed top offset was introduced.
3. Post-fix evidence — `TC-AUTH2-RESP-002` passed with a measured center delta of 0 CSS px; the combined comparison shows the intentional upward correction with all other design surfaces preserved.
4. Session feedback — `SEC-AUTH2-006` passed, including API `401`, token removal, Login redirect, neutral user-facing error text, and absence of JWT wording. Browser console errors: 0.
5. P2 — screen identifiers and assessment labels were visible in the product UI, making the implementation look like a test harness rather than a production screen.
6. Fix — removed `IT 02-x`, `Interview Question 002`, `Account access` and redundant registration labels from Login, Register, Welcome and the global header; retained only user-facing product copy.
7. Post-fix evidence — `TC-AUTH2-CONTENT-001` passed across all three routes. The combined Login comparison and focused Register/Welcome captures show no hierarchy, alignment or spacing regression.
8. P2 — Register displayed the Password-policy list permanently in the decorative panel, making product UI read like test instructions.
9. Fix — removed the persistent list and retained the inline `Use at least 8 characters.` validation only when the Password field is invalid.
10. Post-fix evidence — the 333×150 focused comparison shows the three lines removed without altering the panel surface; `TC-AUTH2-CONTENT-001` verifies all three strings are absent and `TC-AUTH2-VAL-004` verifies actionable validation remains.
11. P2 — Login repeated the Create-account instruction in both the decorative panel and the form, while Register displayed the Username format rule before the user made an error.
12. Fix — kept the single Create-account call to action in the form and moved the Username format rule into contextual validation.
13. Post-fix evidence — `TC-AUTH2-CONTENT-001` verifies redundant and persistent copy is absent; `TC-AUTH2-VAL-006` verifies the rule appears after invalid input only. The Login and Register captures retain balanced hierarchy and spacing.

## Implementation Checklist

- [x] Center Login card within the area below the header using layout utilities.
- [x] Avoid fixed top margin or padding as the centering mechanism.
- [x] Show an actionable, non-technical message after an invalid session.
- [x] Verify default, invalid-session, responsive, and security flows through Playwright.
- [x] Keep assessment identifiers and implementation terminology in documentation and tests only.
- [x] Verify production copy on Login, Register and Welcome through Playwright.
- [x] Keep Password policy internal and show only contextual validation after invalid input.
- [x] Keep one Create-account instruction and show Username format guidance only after invalid input.

## Follow-up Polish

No remaining P3 item is required for this change.

final result: passed
