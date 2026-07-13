## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's `focus-visible` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add `focus-visible:ring-2` (and associated classes) and `aria-label` to custom interactive elements.

## 2025-03-08 - React Hook Form Accessibility
**Learning:** When using React Hook Form for form validation, the standard validation state isn't automatically communicated to screen readers. Relying only on text error messages creates an inaccessible experience.
**Action:** Always dynamically set `aria-invalid` to `"true"` on inputs when validation fails, link them to their error messages using `aria-describedby`, and ensure error messages use `role="alert"` so they are announced by screen readers immediately when they appear.
