## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2025-03-08 - Accessible Form Validation
**Learning:** React Hook Form fields lacked accessibility attributes for their validation errors. Screen readers wouldn't announce errors when an input became invalid or link the error text to the input.
**Action:** Always add \`aria-invalid={errors.fieldName ? "true" : "false"}\` and \`aria-describedby={errors.fieldName ? "fieldName-error" : undefined}\` to inputs, and \`id="fieldName-error"\` and \`role="alert"\` to the corresponding error message elements.
