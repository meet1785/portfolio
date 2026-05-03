## 2024-05-03 - [Missing Theme Toggle Context Update]
**Learning:** The navigation menu previously lacked the theme toggler despite ThemeContext being fully configured and provided around the App, making the portfolio stuck in "light" theme with dark-coded classes or unable to be switched manually by users.
**Action:** Added a `ThemeToggle` component to both desktop and mobile navigation bars to allow users to switch themes, improving UX. Added focus rings and ARIA labels for accessibility.
