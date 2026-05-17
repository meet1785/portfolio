## 2023-11-09 - Adding Accessibility to Icon-Only Links
**Learning:** Icon-only links often lack sufficient context for screen reader users, and missing focus states make keyboard navigation difficult.
**Action:** Add `aria-label` attributes to provide context, `aria-hidden="true"` to hide decorative icons, and explicitly define focus rings (e.g., `focus-visible:ring-2`) on the parent link/button to ensure keyboard accessibility.
