## 2025-07-06 - Accessible Form Validation
**Learning:** When using form validation libraries like React Hook Form, visually showing an error is not enough for screen readers. The error message must be explicitly connected to the input.
**Action:** Always use `aria-invalid={!!errors.field}` and `aria-describedby="field-error"` on the input, and add `id="field-error"` to the error message paragraph.
## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.
