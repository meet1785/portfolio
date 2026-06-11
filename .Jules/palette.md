## 2024-05-24 - Missing ARIA labels on social icon links
**Learning:** Icon-only external links in the navigation header (Github, LinkedIn) lacked `aria-label`s, making them invisible to screen readers since they contained only SVG children.
**Action:** Always add descriptive `aria-label` attributes to anchor tags or buttons that do not contain visible text or an `aria-labelledby` reference.
