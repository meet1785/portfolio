## 2024-03-24 - Focus Visible Styles for Navigation Icons
**Learning:** Icon-only links (like social links in navigation) and interactive elements need explicit focus-visible styles for keyboard accessibility, especially on dark themes where default browser rings might be invisible or inconsistent with the design.
**Action:** Always add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] rounded-full` to interactive icons and links.
