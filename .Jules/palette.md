## 2024-05-24 - Screen readers and icon-only links
**Learning:** Screen readers will fall back to reading the raw URL (`href`) for icon-only anchor tags if a descriptive label is missing, creating a terrible user experience. Furthermore, inline SVGs should be explicitly hidden from screen readers.
**Action:** Always add an `aria-label` to anchor tags that only contain icons, and pass `aria-hidden="true"` to the decorative SVG elements to ensure they are ignored properly.
