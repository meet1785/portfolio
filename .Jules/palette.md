## 2024-05-24 - Navigation Link Accessibility
**Learning:** Icon-only navigation links frequently lack proper aria-labels and keyboard focus indicators. Adding them provides immediate and significant accessibility benefits without disrupting visual layout.
**Action:** When inspecting navigation components, specifically look for anchor tags wrapping icons without explicit aria-labels, and verify their `focus-visible` states using Tailwind `ring` classes.
