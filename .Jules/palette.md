## 2024-06-08 - Icon-Only Button ARIA Labels & Filter State
**Learning:** Icon-only navigation links (like GitHub and LinkedIn links in headers/footers) must always have `aria-label` to provide context for screen readers. Filter buttons should explicitly indicate their selected state using `aria-pressed`.
**Action:** Always verify `a` and `button` tags with only SVG icons have `aria-label` attributes. Ensure interactive filter or toggle elements correctly map their state to `aria-pressed` or `aria-expanded` attributes.
