import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🔍 Navigating to localhost:5175/portfolio/...');
  await page.goto('http://localhost:5175/portfolio/', { waitUntil: 'networkidle' });
  
  // Wait for canvas to render
  await page.waitForTimeout(3000);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/render.png', fullPage: true });
  console.log('✓ Screenshot saved to /tmp/render.png');
  
  // Check visibility of key elements
  const heroTitle = await page.locator('text="Ignition Hub"').isVisible().catch(() => false);
  console.log('✓ Hero title visible:', heroTitle);
  
  const canvas = await page.locator('canvas').first().isVisible().catch(() => false);
  console.log('✓ Canvas visible:', canvas);
  
  const navBar = await page.locator('role=navigation').first().isVisible().catch(() => false);
  console.log('✓ Navigation visible:', navBar);
  
  const missionBrief = await page.locator('text="Mission Brief"').first().isVisible().catch(() => false);
  console.log('✓ Mission Brief visible:', missionBrief);
  
  // Get page title and headings
  const title = await page.title();
  console.log('\n📄 Page title:', title);
  
  const h1 = await page.locator('h1').first().textContent().catch(() => 'none');
  console.log('H1 content:', h1);
  
  // Check scroll position
  const scrollTop = await page.evaluate(() => window.scrollY);
  console.log('\n📍 Scroll position:', scrollTop);
  
  // Check viewport
  const viewport = page.viewportSize();
  console.log('Viewport:', viewport);
  
  // Scroll and check
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.screenshot({ path: '/tmp/render-scroll.png', fullPage: true });
  console.log('✓ Scroll screenshot saved');
  
  await browser.close();
  console.log('\n✅ Test complete');
})();
