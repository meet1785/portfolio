## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2025-03-09 - Accessible Form Validation in React Hook Form
**Learning:** Using React Hook Form for validation requires manual linking of error states to inputs for screen readers. Simply displaying error text below an input is insufficient.
**Action:** Always map `errors.field` to dynamically set `aria-invalid="true"` and `aria-describedby="[field]-error"` on the input, and ensure the error message element has a matching `id` and `role="alert"`.
