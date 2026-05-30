## 2026-05-30 - Missing ARIA Labels on Navigation Social Links
**Learning:** Icon-only navigation links (like GitHub/LinkedIn icons) often miss `aria-label` attributes in component libraries because developers rely entirely on visual context. In a complex, immersive UI like this portfolio, ensuring core navigation actions remain screen-reader accessible is critical.
**Action:** Applied `aria-label` attributes to all icon-only social links in `src/App.tsx` to ensure proper accessibility for screen readers without altering the visual design.
