from playwright.sync_api import Page, expect

def test_portfolio_verification(page: Page):
    # 1. Navigate to the homepage
    page.goto("http://localhost:5173/portfolio/")

    # 2. Take a screenshot of the homepage in light mode
    page.screenshot(path="jules-scratch/verification/homepage-light.png")

    # 3. Click the theme toggle button
    theme_toggle_button = page.locator('button[aria-label="Toggle theme"]').first
    theme_toggle_button.click()
    page.wait_for_timeout(500) # Wait for theme change

    # 4. Take a screenshot of the homepage in dark mode
    page.screenshot(path="jules-scratch/verification/homepage-dark.png")

    # 5. Navigate to the "Works" page
    works_link = page.get_by_role("link", name="Works")
    works_link.click()
    page.wait_for_timeout(1000) # Wait for page to load

    # 6. Take a screenshot of the "Works" page in dark mode
    page.screenshot(path="jules-scratch/verification/works-page-dark.png")

    # 7. Click the theme toggle button
    theme_toggle_button.click()
    page.wait_for_timeout(500) # Wait for theme change

    # 8. Take a screenshot of the "Works" page in light mode
    page.screenshot(path="jules-scratch/verification/works-page-light.png")

    # 9. Verify that the new projects are displayed
    expect(page.get_by_role("heading", name="AI Resume Screener")).to_be_visible()
    expect(page.get_by_role("heading", name="AuthenticityNet")).to_be_visible()
    expect(page.get_by_role("heading", name="Job-Matched CV Generator")).to_be_visible()
    expect(page.get_by_role("heading", name="Email Reply Generator")).to_be_visible()
    expect(page.get_by_role("heading", name="YouTube Clone")).to_be_visible()

    # 10. Verify that the old projects are not displayed
    expect(page.get_by_text("Smart Wardrobe")).not_to_be_visible()
    expect(page.get_by_text("Netflix Clone")).not_to_be_visible()
    expect(page.get_by_text("Cultural Fest Website")).not_to_be_visible()
    expect(page.get_by_text("MERN Stack Template")).not_to_be_visible()
    expect(page.get_by_text("PromptDunia")).not_to_be_visible()
    expect(page.get_by_text("QuizApp")).not_to_be_visible()
    expect(page.get_by_text("Food App")).not_to_be_visible()
    expect(page.get_by_text("Fitness Tracker")).not_to_be_visible()
    expect(page.get_by_text("Meet Grocery")).not_to_be_visible()
    expect(page.get_by_text("Calculator App")).not_to_be_visible()