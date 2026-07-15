## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2025-03-08 - Added accessible form validation feedback
**Learning:** Forms handled via React Hook Form displayed visual validation errors but lacked semantic linking. Screen readers need `aria-invalid` and `aria-describedby` tied to the error message `id`, along with `role="alert"` on the error text itself, to provide a complete and accessible validation experience.
**Action:** Always dynamically bind `aria-invalid` based on form error state, and link inputs to their respective error elements using `aria-describedby` matching the error message's `id`.
