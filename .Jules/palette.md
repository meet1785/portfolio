## 2026-06-16 - Added missing ARIA attributes and focus styles
**Learning:** Found several social link tags (e.g., GitHub, LinkedIn) that contained only icons or visual elements but no descriptive ARIA labels, which degrades screen reader accessibility. Missing explicit aria-labels on icon-only links is a common issue in this React component library pattern.
**Action:** Always add descriptive `aria-label` attributes to icon-only buttons or links, and verify focus styles so keyboard users have visual feedback.
