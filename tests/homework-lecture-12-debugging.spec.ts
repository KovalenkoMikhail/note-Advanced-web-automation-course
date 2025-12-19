import { test, expect } from '@playwright/test';

/**
 * Lecture 12 Homework: Debugging JavaScript & Playwright
 * 
 * Demonstrates:
 * - console.log() debugging
 * - JavaScript debugger statement
 * - page.pause() for Playwright Inspector
 * - Trace Viewer usage
 * - Common debugging techniques
 */

test.describe('Lecture 12: Debugging Techniques', () => {
  
  /**
   * Task 1: Debug with console.log()
   * Simple variable inspection
   */
  test('debug variables with console.log', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Debug page URL
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    // Debug page title
    const title = await page.title();
    console.log('📄 Page title:', title);
    
    // Debug element text
    const heading = await page.getByRole('heading', { level: 1 }).textContent();
    console.log('📝 Main heading:', heading);
    
    // Debug element count
    const linkCount = await page.getByRole('link').count();
    console.log('🔗 Total links:', linkCount);
    
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  /**
   * Task 2: Debug with console.table()
   * Better visualization for objects/arrays
   */
  test('debug objects with console.table', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Collect navigation links
    const navLinks = await page.getByRole('navigation').first().getByRole('link').allTextContents();
    
    // Create debug object
    const debugInfo = {
      url: page.url(),
      linkCount: navLinks.length,
      firstLink: navLinks[0],
      lastLink: navLinks[navLinks.length - 1]
    };
    
    console.table(debugInfo);
    
    expect(navLinks.length).toBeGreaterThan(0);
  });
  
  /**
   * Task 3: Measure performance with console.time()
   */
  test('measure performance with console.time', async ({ page }) => {
    console.time('⏱️ Page load time');
    await page.goto('https://playwright.dev');
    console.timeEnd('⏱️ Page load time');
    
    console.time('⏱️ Navigation time');
    await page.getByRole('link', { name: 'Docs' }).click();
    console.timeEnd('⏱️ Navigation time');
    
    console.time('⏱️ Assertion time');
    await expect(page).toHaveURL(/.*docs.*/);
    console.timeEnd('⏱️ Assertion time');
  });
  
  /**
   * Task 4: Use debugger statement (uncomment to use)
   * Run with: npx playwright test --headed --debug
   */
  test('debug with JavaScript debugger statement', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    const title = await page.title();
    console.log('Title:', title);
    
    // Uncomment to pause at this point:
    // debugger; // Execution will pause here when running with --debug
    
    await page.getByRole('link', { name: 'Docs' }).click();
    
    // Uncomment to pause before assertion:
    // debugger;
    
    await expect(page).toHaveURL(/.*docs.*/);
  });
  
  /**
   * Task 5: Use page.pause() for Playwright Inspector
   * Uncomment page.pause() to open Inspector
   */
  test('debug with Playwright Inspector using page.pause', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Uncomment to open Playwright Inspector:
    // await page.pause();
    // This opens Inspector where you can:
    // - Step through actions
    // - Pick locators visually
    // - Inspect page state
    // - Execute commands in console
    
    await page.getByRole('link', { name: 'Docs' }).click();
    
    // Uncomment to pause again:
    // await page.pause();
    
    await expect(page).toHaveURL(/.*docs.*/);
  });
  
  /**
   * Task 6: Debug locator issues
   * Demonstrates finding and fixing broken locators
   */
  test('debug locator issues', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Method 1: Check if element exists
    const docsLink = page.getByRole('link', { name: 'Docs' });
    const isVisible = await docsLink.isVisible();
    console.log('🔍 Docs link visible?', isVisible);
    
    // Method 2: Count matching elements
    const linkCount = await page.getByRole('link', { name: 'Docs' }).count();
    console.log('🔢 Matching elements:', linkCount);
    
    // Method 3: Get all text contents to debug
    const allLinks = await page.getByRole('link').allTextContents();
    console.log('📋 All link texts:', allLinks.slice(0, 10)); // First 10
    
    await docsLink.click();
  });
  
  /**
   * Task 7: Debug network requests
   */
  test('debug network requests', async ({ page }) => {
    // Listen to all requests
    page.on('request', request => {
      console.log('📤 Request:', request.method(), request.url());
    });
    
    // Listen to all responses
    page.on('response', response => {
      console.log('📥 Response:', response.status(), response.url());
    });
    
    await page.goto('https://playwright.dev');
    
    // Wait a bit to see network logs
    await page.waitForLoadState('networkidle');
  });
  
  /**
   * Task 8: Debug with screenshots
   */
  test('debug with screenshots', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'debug-screenshots/01-homepage.png' });
    
    await page.getByRole('link', { name: 'Docs' }).click();
    await page.screenshot({ path: 'debug-screenshots/02-docs-page.png' });
    
    // Full page screenshot
    await page.screenshot({ 
      path: 'debug-screenshots/03-full-page.png',
      fullPage: true 
    });
    
    await expect(page).toHaveURL(/.*docs.*/);
  });
});

/**
 * Practice Exercise: Debugging workflow
 */
test.describe('Lecture 12: Practice - Debugging Workflow', () => {
  
  test('debug failing test step by step', async ({ page }) => {
    console.log('🚀 Test started');
    
    // Step 1: Navigate
    console.log('📍 Step 1: Navigating...');
    await page.goto('https://playwright.dev');
    console.log('✅ Step 1: Navigation complete');
    
    // Step 2: Find element
    console.log('🔍 Step 2: Finding docs link...');
    const docsLink = page.getByRole('link', { name: 'Docs' });
    const exists = await docsLink.count();
    console.log(`✅ Step 2: Found ${exists} matching elements`);
    
    // Step 3: Click
    console.log('👆 Step 3: Clicking...');
    await docsLink.click();
    console.log('✅ Step 3: Click complete');
    
    // Step 4: Verify
    console.log('🎯 Step 4: Verifying URL...');
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    await expect(page).toHaveURL(/.*docs.*/);
    console.log('✅ Step 4: Verification passed');
    
    console.log('🎉 Test completed successfully');
  });
});

/**
 * Advanced: Trace Viewer demonstration
 * Run with: npx playwright test --trace on
 * View with: npx playwright show-trace trace.zip
 */
test.describe('Lecture 12: Trace Viewer', () => {
  
  test('generate trace for debugging', async ({ page }) => {
    // This test generates a trace file automatically when run with --trace on
    await page.goto('https://playwright.dev');
    await page.getByRole('link', { name: 'Docs' }).click();
    await expect(page).toHaveURL(/.*docs.*/);
    await page.getByRole('link', { name: 'API' }).click();
    await expect(page).toHaveURL(/.*api.*/);
    
    // After test, view trace:
    // npx playwright show-trace test-results/*/trace.zip
    
    // Trace Viewer shows:
    // ✅ Timeline of all actions
    // ✅ Screenshots at each step
    // ✅ Network requests
    // ✅ Console logs
    // ✅ DOM snapshots
    // ✅ Source code
  });
});

/**
 * Debugging Commands Reference
 * 
 * Run tests with debugging:
 * - npx playwright test --debug              → Opens Inspector
 * - npx playwright test --headed             → See browser
 * - npx playwright test --trace on           → Generate trace
 * - DEBUG=pw:api npx playwright test         → API logs
 * - DEBUG=pw:browser npx playwright test     → Browser logs
 * 
 * View traces:
 * - npx playwright show-trace trace.zip      → Open Trace Viewer
 * 
 * Debugging in code:
 * - console.log()           → Print variables
 * - console.table()         → Print objects as table
 * - console.time()          → Measure performance
 * - debugger;               → Pause at this line (--debug mode)
 * - await page.pause();     → Open Inspector at this point
 * - await page.screenshot() → Take debug screenshot
 */
