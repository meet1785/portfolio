## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.
## 2025-03-08 - Adding Focus Outlines to Interactive Elements
**Learning:** Some custom `<button>`, `<input>`, and `<Link>` components in the application lack explicit focus outlines for keyboard navigation, specifically custom-styled form inputs and interactive journey buttons. Standard Tailwind `focus:outline-none` was used without providing a `focus-visible` alternative, hurting accessibility.
**Action:** Always ensure that custom interactive elements replace `focus:outline-none` with `focus-visible:ring-2` (and `focus-visible:outline-none`) to provide clear visual feedback to keyboard users without disturbing mouse users.
