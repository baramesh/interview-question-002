# Design QA — Login centering and invalid-session feedback

## Evidence

- Source visual truth: `documentation/09-qa-and-test/01-authentication/screenshots/design-reference-login-offset.png`
- Implementation: `documentation/09-qa-and-test/01-authentication/screenshots/tc-auth2-resp-002.png`
- Combined comparison: `documentation/09-qa-and-test/01-authentication/screenshots/design-qa-login-centering-comparison.png`
- Invalid-session state: `documentation/09-qa-and-test/01-authentication/screenshots/sec-auth2-006.png`
- Viewport and CSS size: 1440×1100 px at device scale factor 1
- Source pixels: 1440×1100; implementation pixels: 1440×1100; no density normalization required
- Compared state: desktop `/login`; invalid-session feedback inspected separately because the source visual contains the default Login state

## Findings

No actionable P0, P1, or P2 findings remain.

- Fonts and typography: Google Sans, weights, hierarchy, wrapping, and control text remain consistent with the source.
- Spacing and layout rhythm: the source card was about 98 px below the center of the content area. After hiding the inactive `router-outlet` grid item, the card measures top 317 px, height 539 px, center 586.5 px; the area below the 73 px header also centers at 586.5 px. Delta is 0 CSS px.
- Colors and visual tokens: indigo surfaces, pale background, borders, shadows, and semantic red error treatment remain consistent.
- Image quality and asset fidelity: no photographic or generated image assets occur in this screen; the existing brand mark and all existing visual treatments are preserved.
- Copy and content: the default Login copy is unchanged. Invalid sessions now show `Your session has expired. Please sign in again.` without exposing JWT or other implementation terminology.

Focused comparison was required only for the invalid-session state. Its screenshot confirms the error message is visible above the form, remains readable, and does not disturb the two-column card layout.

## Comparison History

1. P2 — Login card appeared below the vertical center because the visible routed component and the inactive `router-outlet` were both grid items.
2. Fix — applied Tailwind `hidden` to `router-outlet` while retaining `grid place-items-center` on the area below the header; no fixed top offset was introduced.
3. Post-fix evidence — `TC-AUTH2-RESP-002` passed with a measured center delta of 0 CSS px; the combined comparison shows the intentional upward correction with all other design surfaces preserved.
4. Session feedback — `SEC-AUTH2-006` passed, including API `401`, token removal, Login redirect, neutral user-facing error text, and absence of JWT wording. Browser console errors: 0.

## Implementation Checklist

- [x] Center Login card within the area below the header using layout utilities.
- [x] Avoid fixed top margin or padding as the centering mechanism.
- [x] Show an actionable, non-technical message after an invalid session.
- [x] Verify default, invalid-session, responsive, and security flows through Playwright.

## Follow-up Polish

No remaining P3 item is required for this change.

final result: passed
