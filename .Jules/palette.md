## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2026-03-05 - Consistent Focus Indicators
**Learning:** Using a unified focus ring configuration (e.g., cyan-400 with a dark background offset) across the entire application significantly improves keyboard navigation visibility and maintains a cohesive visual language compared to relying on browser defaults.
**Action:** Added standardized `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]` classes to all interactive elements (links, buttons, form fields) with appropriate `rounded-*` classes.
