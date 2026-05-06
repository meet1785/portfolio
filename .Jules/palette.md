## 2026-05-06 - Dynamic ARIA attributes on mobile menu toggle
**Learning:** When using icon-only toggle buttons that open and close menus, a static `aria-label` like "Toggle mobile menu" isn't as helpful as a dynamic one indicating the resulting action. Moreover, adding `aria-expanded={isOpen}` significantly improves screen reader comprehension of the menu's state.
**Action:** Use dynamic `aria-label` (e.g., "Open menu" / "Close menu") and `aria-expanded={boolean}` for all custom toggle button components going forward.
