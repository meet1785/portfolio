## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.
## 2025-03-08 - Added accessible form validation feedback
**Learning:** Form validation error messages visually indicated an issue, but lacked programmatic association with the input field for screen readers. Connecting the error message to the input field using `aria-describedby` and indicating the invalid state with `aria-invalid` provides immediate, clear context to assistive technologies.
**Action:** When implementing custom form validation with React Hook Form or similar libraries, always set `aria-invalid={!!errors.field}` and `aria-describedby="field-error"` on the input, and ensure the corresponding error message has `id="field-error"`.
