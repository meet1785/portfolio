## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2025-03-08 - Accessible Form Validation
**Learning:** Forms using validation (like React Hook Form) need explicit ARIA ties between inputs and error messages to be accessible. Screen readers won't announce the error message text automatically unless linked.
**Action:** Dynamically set \`aria-invalid={!!errors.field}\` and link the error message element using \`aria-describedby="field-error"\`, while ensuring the error message has \`role="alert"\` and \`id="field-error"\`.
