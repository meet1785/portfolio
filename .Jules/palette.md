## 2024-06-13 - Add ARIA Labels to Social Links
**Learning:** Found social links (GitHub, LinkedIn) in the navigation header that use icon-only content without accessible names, causing screen readers to announce generic link elements rather than the specific destination.
**Action:** Adding explicit `aria-label` attributes to these icon-only anchor tags (`<a href="..." aria-label="GitHub Profile">`) ensures screen reader users understand the link's purpose.
