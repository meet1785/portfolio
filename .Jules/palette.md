## 2024-06-15 - Missing ARIA Labels for Icon-Only Links
**Learning:** Found multiple icon-only <a> links (Github, Linkedin) in the navigation bar without `aria-label` attributes. Without them, screen readers cannot announce the purpose of these links to visually impaired users, as they only contain an SVG icon with no text content.
**Action:** Always add descriptive `aria-label` attributes to any interactive element (buttons, links) that relies solely on icons for visual communication.
