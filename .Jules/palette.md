## 2024-05-23 - ARIA labels for icon-only external links
**Learning:** Icon-only anchor links representing social media links are missing ARIA labels or visually hidden text, which causes accessibility issues as screen readers won't know the destination.
**Action:** Add `aria-label` to anchor tags that only contain an icon, especially those linking to external sites like GitHub and LinkedIn, to ensure they are accessible.
