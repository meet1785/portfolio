## 2026-06-24 - Focus Rings on Icon Links
**Learning:** Icon-only links and buttons frequently lack ARIA labels and keyboard focus indicators. The standard design system pattern for focus rings is `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2` with an appropriate `ring-offset` color (e.g. `focus-visible:ring-offset-[#030712]`) and `border-radius`.
**Action:** Always verify keyboard accessibility by ensuring interactive elements have focus indicators correctly matching the background offset color.
