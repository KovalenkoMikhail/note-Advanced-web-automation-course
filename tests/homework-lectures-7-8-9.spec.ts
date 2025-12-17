import { test, expect } from '@playwright/test';

/**
 * Lecture 7 Homework: Locators and Selectors
 * 
 * Practicing accessibility-first locators, filtering, operators,
 * and handling lists with strict mode.
 */

test.describe('Lecture 7: Locators Practice', () => {
  
  // Exercise 1: Use getByRole() for common elements
  test('navigate using accessibility locators', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ACT: Navigate using role-based locators
    await page.getByRole('link', { name: 'Docs' }).click();
    
    // ASSERT
    await expect(page).toHaveURL(/docs/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // Exercise 2: Filter locators with hasText
  test('filter product cards by text', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev/docs/intro');
    
    // ACT: Find specific section using filter
    const installSection = page
      .getByRole('article')
      .filter({ hasText: 'Installation' });
    
    // ASSERT
    await expect(installSection).toBeVisible();
  });

  // Exercise 3: Use nth() for list items
  test('select specific items from list', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ACT: Click on navigation items
    const navLinks = page.getByRole('navigation').first().getByRole('link');
    
    // ASSERT: Verify at least some links exist
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
    
    // ACT: Click second link
    await navLinks.nth(1).click();
    await page.waitForLoadState('networkidle');
  });

  // Exercise 4: Use operators (or) for A/B testing
  test('handle different button text variants', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ACT: Find button by multiple possible names (use first to handle multiple matches)
    const getStartedButton = page
      .getByRole('link', { name: 'Get started' })
      .or(page.getByRole('link', { name: 'Get Started' }))
      .or(page.getByRole('link', { name: 'Start' }))
      .first();
    
    // ASSERT
    await expect(getStartedButton).toBeVisible();
  });

  // Exercise 5: Debug with page.pause()
  test('debug locators with pause', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Uncomment to pause execution for debugging
    // await page.pause();
    
    await expect(page.getByRole('banner')).toBeVisible();
  });
});

/**
 * Lecture 8 Homework: Actions and Interactions
 * 
 * Practicing fill() vs pressSequentially(), mouse interactions,
 * keyboard actions, and page.evaluate().
 */

test.describe('Lecture 8: Actions Practice', () => {
  
  // Exercise 1: Compare fill() vs pressSequentially()
  test('fill() is faster than pressSequentially()', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Use todo input instead
    const input = page.getByPlaceholder('What needs to be done?');
    
    const fillStart = Date.now();
    await input.fill('Test todo item');
    const fillTime = Date.now() - fillStart;
    
    // Clear
    await input.clear();
    
    // Search using pressSequentially() (slow)
    const typeStart = Date.now();
    await input.pressSequentially('Test todo item', { delay: 50 });
    const typeTime = Date.now() - typeStart;
    
    console.log(`fill() took ${fillTime}ms`);
    console.log(`pressSequentially() took ${typeTime}ms`);
    
    // pressSequentially should be slower
    expect(typeTime).toBeGreaterThan(fillTime);
  });

  // Exercise 2: Mouse interactions - hover
  test('hover over menu to reveal submenu', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Hover over Docs link
    await page.getByRole('link', { name: 'Docs' }).hover();
    
    // Wait a bit for any animations
    await page.waitForTimeout(300);
  });

  // Exercise 3: Keyboard navigation
  test('navigate using keyboard shortcuts', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Focus input
    await page.getByPlaceholder('What needs to be done?').click();
    
    // Type and press Enter
    await page.keyboard.type('Learn keyboard shortcuts');
    await page.keyboard.press('Enter');
    
    // Verify todo added
    await expect(page.getByText('Learn keyboard shortcuts')).toBeVisible();
  });

  // Exercise 4: Check/uncheck checkboxes
  test('toggle checkboxes', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add a todo
    await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright');
    await page.keyboard.press('Enter');
    
    // Check the todo (get the specific todo checkbox, not the "Mark all complete")
    const checkbox = page.getByRole('checkbox', { name: 'Toggle Todo' });
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
    // Uncheck
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  // Exercise 5: Use evaluate() for bulk operations
  test('extract data with page.evaluate()', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Extract all link texts
    const linkTexts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map(link => link.textContent?.trim())
        .filter(text => text && text.length > 0);
    });
    
    console.log(`Found ${linkTexts.length} links`);
    expect(linkTexts.length).toBeGreaterThan(0);
  });
});

/**
 * Lecture 9 Homework: AAA Pattern and Assertions
 * 
 * Practicing structured tests with Arrange-Act-Assert,
 * various assertions, and soft assertions.
 */

test.describe('Lecture 9: AAA Pattern Practice', () => {
  
  // Exercise 1: Well-structured test with AAA
  test('search documentation using AAA pattern', async ({ page }) => {
    // ========== ARRANGE ==========
    await page.goto('https://playwright.dev/docs/intro');
    
    // ========== ACT ==========
    await page.getByRole('link', { name: 'API', exact: true }).click();
    
    // ========== ASSERT ==========
    await expect(page).toHaveURL(/api/);
    await expect(page.getByRole('heading', { name: 'Playwright Library' })).toBeVisible();
  });

  // Exercise 2: Multiple assertions - toBeVisible, toHaveText
  test('verify page elements', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ASSERT: Multiple checks
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Playwright');
    await expect(page).toHaveTitle(/Playwright/);
  });

  // Exercise 3: Soft assertions for layout verification
  test('verify page layout with soft assertions', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ASSERT: Check all layout components (continue even if some fail)
    await expect.soft(page.getByRole('banner')).toBeVisible();
    await expect.soft(page.getByRole('navigation')).toBeVisible();
    await expect.soft(page.getByRole('main')).toBeVisible();
    await expect.soft(page.getByRole('contentinfo')).toBeVisible();
    
    // All failures will be reported at end
  });

  // Exercise 4: toHaveURL with regex
  test('verify URL after navigation', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ACT
    await page.getByRole('link', { name: 'Docs' }).click();
    
    // ASSERT: URL matches pattern
    await expect(page).toHaveURL(/\/docs\//);
  });

  // Exercise 5: toBeEnabled/toBeDisabled
  test('verify button states', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Input should be enabled
    await expect(page.getByPlaceholder('What needs to be done?')).toBeEnabled();
    await expect(page.getByPlaceholder('What needs to be done?')).toBeEditable();
  });

  // Exercise 6: toHaveCount for lists
  test('verify list item count', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // Add multiple todos
    const input = page.getByPlaceholder('What needs to be done?');
    
    await input.fill('Task 1');
    await page.keyboard.press('Enter');
    
    await input.fill('Task 2');
    await page.keyboard.press('Enter');
    
    await input.fill('Task 3');
    await page.keyboard.press('Enter');
    
    // Verify count (use specific selector for todo items)
    await expect(page.locator('.todo-list li')).toHaveCount(3);
  });

  // Exercise 7: waitForURL for redirects
  test('handle page redirects', async ({ page }) => {
    // ARRANGE
    await page.goto('https://playwright.dev');
    
    // ACT: Click link that might redirect
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // ASSERT: Wait for final URL
    await page.waitForURL(/docs\/intro/);
    await expect(page).toHaveURL(/intro/);
  });
});

/**
 * Challenge: Complete E-commerce Flow
 * 
 * Combines all concepts from Lectures 7-9:
 * - Accessibility locators
 * - Actions (fill, click, check)
 * - AAA pattern
 * - Multiple assertions
 */

test.describe('Challenge: Complete User Flow', () => {
  
  test('complete todo management flow', async ({ page }) => {
    // ========== ARRANGE ==========
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // ========== ACT: Add todos ==========
    const input = page.getByPlaceholder('What needs to be done?');
    
    await input.fill('Learn Playwright locators');
    await page.keyboard.press('Enter');
    
    await input.fill('Practice actions');
    await page.keyboard.press('Enter');
    
    await input.fill('Master AAA pattern');
    await page.keyboard.press('Enter');
    
    // ========== ASSERT: Verify todos added ==========
    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(3);
    
    await expect(todoItems).toHaveText([
      'Learn Playwright locators',
      'Practice actions',
      'Master AAA pattern'
    ]);
    
    // ========== ACT: Complete first todo ==========
    await todoItems.first().getByRole('checkbox').check();
    
    // ========== ASSERT: Verify completed ==========
    await expect(todoItems.first().getByRole('checkbox')).toBeChecked();
    
    // ========== ACT: Filter to show only active ==========
    await page.getByRole('link', { name: 'Active' }).click();
    
    // ========== ASSERT: Only 2 active todos ==========
    await expect(todoItems).toHaveCount(2);
    
    // ========== ACT: Clear completed ==========
    await page.getByRole('link', { name: 'All' }).click();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    
    // ========== ASSERT: Only 2 todos remain ==========
    await expect(todoItems).toHaveCount(2);
  });
});
