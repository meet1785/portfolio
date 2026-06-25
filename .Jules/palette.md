## 2025-03-08 - Icon-only Buttons & Keyboard Navigation
**Learning:** Icon-only navigation links (like social media links) frequently lack both ARIA labels and focus indicators, making them invisible to screen readers and difficult to interact with for keyboard users. Adding focus-visible utility classes with a clear ring and offset ensures accessibility without compromising the default mouse interaction design.
**Action:** Always add aria-label to icon-only anchors/buttons. Include focus-visible:ring-2 with an offset color matching the background to guarantee high-contrast focus outlines.
