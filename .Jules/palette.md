## 2024-05-18 - Added keyboard accessibility to navigation icons
**Learning:** Icon-only navigation links (GitHub, LinkedIn) in the top nav and mobile menu were missing ARIA labels and focus states, making them difficult for keyboard and screen reader users to access.
**Action:** Always add explicit `aria-label`s to icon-only links, and include `focus-visible` states to improve keyboard navigation visibility.
