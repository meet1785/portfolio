## 2025-03-08 - Added keyboard focus styles and ARIA labels
**Learning:** Many interactive elements lacked clear focus states for keyboard users, and icon-only buttons lacked ARIA labels. Using Tailwind's \`focus-visible\` ensures these styles only appear during keyboard navigation, maintaining aesthetics for mouse users while improving accessibility.
**Action:** Always add \`focus-visible:ring-2\` (and associated classes) and \`aria-label\` to custom interactive elements.
## 2025-02-21 - Custom components missing focus indicators
**Learning:** Framer Motion components (`<motion.button>`) and custom styled components often lose their default browser focus indicators, especially when complex Tailwind classes (like gradients or background clips) are applied. Users relying on keyboard navigation (Tab) get lost as there is no visual cue of which element is focused.
**Action:** Explicitly add Tailwind's `focus-visible` utility classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2`) to all interactive elements, matching the ring color and offset to the surrounding UI.
