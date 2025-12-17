import { test, expect } from '@playwright/test';

/**
 * Lecture Demo Tests
 * Based on Playwright Installation & Setup lecture
 * Demonstrates: navigation, assertions, element selection, locators
 */

test.describe('Playwright.dev Website Tests', () => {
  
  test('has correct title', async ({ page }) => {
    // Navigate to Playwright homepage
    await page.goto('https://playwright.dev/');
    
    // Assert title contains "Playwright"
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('has visible Get Started button', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Find "Get started" link using text locator
    const getStartedButton = page.getByRole('link', { name: 'Get started' });
    
    // Assert button is visible
    await expect(getStartedButton).toBeVisible();
  });

  test('navigation to docs page works', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Click on "Docs" navigation link
    await page.getByRole('link', { name: 'Docs' }).first().click();
    
    // Wait for navigation
    await page.waitForURL('**/docs/intro');
    
    // Assert we're on docs page
    await expect(page).toHaveURL(/docs\/intro/);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

});

test.describe('Element Selection Practice', () => {
  
  test('find elements by CSS selectors', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Using CSS selector for header
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Using CSS class selector
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
  });

  test('find elements by XPath', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Using XPath to find header
    const header = page.locator('xpath=//header');
    await expect(header).toBeVisible();
    
    // XPath for any element with specific text
    const getStarted = page.locator('xpath=//a[contains(text(), "Get started")]');
    await expect(getStarted).toBeVisible();
  });

  test('find elements by role (recommended)', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Role-based selectors are most reliable
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    
    // Find navigation links
    const docsLink = page.getByRole('link', { name: 'Docs' });
    await expect(docsLink).toBeVisible();
  });

});

test.describe('Page Interactions Demo', () => {
  
  test('search functionality', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Click search button
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search docs');
    await searchInput.fill('installation');
    
    // Wait a bit to see suggestions
    await page.waitForTimeout(1000);
    
    // Assert search input has value
    await expect(searchInput).toHaveValue('installation');
  });

  test('check footer copyright', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Find footer element
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check copyright text exists
    const copyrightText = footer.locator('text=/Copyright/');
    await expect(copyrightText).toBeVisible();
  });

});

test.describe('Multiple Page Loads (Caching Demo)', () => {
  
  test('load page multiple times - observe caching', async ({ page }) => {
    // First load - should be slower (~700ms)
    const startTime1 = Date.now();
    await page.goto('https://playwright.dev/');
    const loadTime1 = Date.now() - startTime1;
    console.log(`First load: ${loadTime1}ms`);
    
    // Second load - should be faster due to caching (~100ms)
    const startTime2 = Date.now();
    await page.goto('https://playwright.dev/');
    const loadTime2 = Date.now() - startTime2;
    console.log(`Second load: ${loadTime2}ms`);
    
    // Third load - also faster
    const startTime3 = Date.now();
    await page.goto('https://playwright.dev/');
    const loadTime3 = Date.now() - startTime3;
    console.log(`Third load: ${loadTime3}ms`);
    
    // Assert page title is correct after all loads
    await expect(page).toHaveTitle(/Playwright/);
  });

});

test.describe('Assertions Examples', () => {
  
  test('various assertion types', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Title assertion
    await expect(page).toHaveTitle(/Playwright/);
    
    // URL assertion
    await expect(page).toHaveURL('https://playwright.dev/');
    
    // Element visibility
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Text content assertion
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Playwright');
    
    // Element count
    const navLinks = page.getByRole('link');
    await expect(navLinks).toHaveCount(await navLinks.count());
  });

});
