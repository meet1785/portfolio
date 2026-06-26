## 2026-06-26 - Missing ARIA labels on social links
**Learning:** Icon-only navigation links (like GitHub and LinkedIn in header and mobile menu) often lack `aria-label`s, causing screen readers to read out the raw URL or nothing at all, breaking accessibility.
**Action:** Always ensure `aria-label` attributes are present on anchor tags (`<a>`) and `<button>`s that only contain SVG icons for visual representation.
