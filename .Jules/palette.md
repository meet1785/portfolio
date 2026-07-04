## 2024-05-24 - Navigation Icon Accessibility
**Learning:** Icon-only navigation links (like social icons and brand logos) require explicit `aria-label`s for screen readers and `focus-visible` styles with appropriate ring-offsets for keyboard navigation visibility.
**Action:** Always verify icon-only links have both `aria-label` and `focus-visible` classes (e.g., `focus-visible:ring-cyan-400 focus-visible:ring-offset-[#030712] rounded-full`).
