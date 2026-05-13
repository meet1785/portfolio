## 2024-05-18 - Missing ARIA labels
**Learning:** Found interactive elements like social links missing an ARIA label, reducing accessibility for screen reader users.
**Action:** Always ensure links without text have `aria-label` attributes to make them accessible to everyone.

## 2024-05-18 - Form validation UX
**Learning:** Form fields with errors only show a message below, but don't visually indicate the error on the input itself (like a red border) or associate the error message with the input using ARIA.
**Action:** Use `aria-invalid`, `aria-describedby`, and error-specific border colors to improve both visual and screen-reader accessibility for form errors.
