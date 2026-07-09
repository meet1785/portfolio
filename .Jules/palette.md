## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2024-05-18 - Improved Form Validation Accessibility
**Learning:** React Hook Form provides error states, but the input fields weren't semantically linked to their error messages. Screen reader users would hear they were in an input, but not necessarily that it was invalid or what the error was.
**Action:** Always link form errors to their inputs using `aria-invalid={!!errors.field}` and `aria-describedby={errors.field ? 'field-error-id' : undefined}`, and add an `id` to the corresponding error message element.
