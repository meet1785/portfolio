## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.

## 2025-03-08 - Accessible Form Validation
**Learning:** React Hook Form was being used for form validation, but the error messages were not programmatically associated with the input fields for screen readers. By dynamically setting `aria-invalid` based on validation state and using `aria-describedby` to link the input to the error message (which now has `role="alert"`), we provide immediate and clear feedback to assistive technologies.
**Action:** Always link form inputs to their error messages using `aria-describedby` and provide `aria-invalid` state when using form validation libraries.
