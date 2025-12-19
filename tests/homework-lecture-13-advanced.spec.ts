import { test, expect, Browser, BrowserContext } from '@playwright/test';

/**
 * Lecture 13 Homework: Browser Context, Hooks, Steps, and Tags
 * 
 * Demonstrates:
 * - Multiple browser contexts for multi-user testing
 * - Test hooks (beforeAll, beforeEach, afterEach, afterAll)
 * - test.step() for organized test reports
 * - @tags for test organization and selective running
 */

/**
 * Part 1: Test Hooks
 */
test.describe('Lecture 13: Test Hooks', () => {
  
  // beforeAll: Runs ONCE before all tests in this describe block
  test.beforeAll(async () => {
    console.log('🚀 beforeAll: Setting up test suite...');
    // Use for expensive operations: database seeding, starting servers, etc.
  });
  
  // beforeEach: Runs BEFORE EACH test
  test.beforeEach(async ({ page }) => {
    console.log('🔧 beforeEach: Preparing test...');
    // Use for: navigation, authentication, clearing state
    await page.goto('https://playwright.dev');
  });
  
  // afterEach: Runs AFTER EACH test
  test.afterEach(async ({ page }, testInfo) => {
    console.log('🧹 afterEach: Cleaning up...');
    // Use for: screenshots on failure, clearing cookies, logging
    
    if (testInfo.status !== 'passed') {
      await page.screenshot({ 
        path: `test-results/failure-${testInfo.title}.png` 
      });
      console.log('❌ Test failed, screenshot saved');
    }
  });
  
  // afterAll: Runs ONCE after all tests
  test.afterAll(async () => {
    console.log('🏁 afterAll: Tearing down test suite...');
    // Use for: cleanup, closing connections, generating reports
  });
  
  test('hooks example 1 - navigation pre-loaded', async ({ page }) => {
    // Page already at playwright.dev due to beforeEach
    await expect(page).toHaveURL('https://playwright.dev/');
    console.log('✅ Test 1 executed');
  });
  
  test('hooks example 2 - fresh page state', async ({ page }) => {
    // Fresh page again due to beforeEach
    await expect(page).toHaveTitle(/Playwright/);
    console.log('✅ Test 2 executed');
  });
});

/**
 * Part 2: Test Steps for Better Reporting
 */
test.describe('Lecture 13: Test Steps', () => {
  
  test('checkout flow with test.step for clarity', async ({ page }) => {
    
    await test.step('Navigate to homepage', async () => {
      await page.goto('https://playwright.dev');
      await expect(page).toHaveTitle(/Playwright/);
    });
    
    await test.step('Browse documentation', async () => {
      await page.getByRole('link', { name: 'Docs' }).click();
      await expect(page).toHaveURL(/.*docs.*/);
    });
    
    await test.step('Search for locators', async () => {
      await page.getByRole('link', { name: 'Locators', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Locators', exact: true }).first()).toBeVisible();
    });
    
    // Benefits:
    // ✅ Clear test structure in reports
    // ✅ Easy to identify which step failed
    // ✅ Better trace viewer organization
  });
  
  test('multi-step user journey', async ({ page }) => {
    
    await test.step('Step 1: Land on site', async () => {
      await page.goto('https://playwright.dev');
      console.log('📍 Landed on homepage');
    });
    
    await test.step('Step 2: Navigate to API docs', async () => {
      await page.getByRole('link', { name: 'API' }).click();
      console.log('📚 Navigated to API docs');
    });
    
    await test.step('Step 3: Verify API page loaded', async () => {
      await expect(page).toHaveURL(/.*api.*/);
      console.log('✅ API page verified');
    });
  });
});

/**
 * Part 3: Browser Contexts for Multi-User Testing
 */
test.describe('Lecture 13: Browser Contexts', () => {
  
  test('single user session - default context', async ({ page }) => {
    // This uses default context from fixtures
    await page.goto('https://playwright.dev');
    
    // Set some state
    await page.evaluate(() => {
      localStorage.setItem('user', 'User1');
    });
    
    const user = await page.evaluate(() => localStorage.getItem('user'));
    console.log('👤 Current user:', user);
    expect(user).toBe('User1');
  });
  
  test('multiple users with separate contexts', async ({ browser }) => {
    // Create first user context
    const user1Context = await browser.newContext();
    const user1Page = await user1Context.newPage();
    
    // Create second user context  
    const user2Context = await browser.newContext();
    const user2Page = await user2Context.newPage();
    
    await test.step('User 1 visits site', async () => {
      await user1Page.goto('https://playwright.dev');
      await user1Page.evaluate(() => {
        localStorage.setItem('user', 'Alice');
      });
      const user = await user1Page.evaluate(() => localStorage.getItem('user'));
      console.log('👤 User 1:', user);
      expect(user).toBe('Alice');
    });
    
    await test.step('User 2 visits same site', async () => {
      await user2Page.goto('https://playwright.dev');
      await user2Page.evaluate(() => {
        localStorage.setItem('user', 'Bob');
      });
      const user = await user2Page.evaluate(() => localStorage.getItem('user'));
      console.log('👤 User 2:', user);
      expect(user).toBe('Bob');
    });
    
    await test.step('Verify users are isolated', async () => {
      const user1Data = await user1Page.evaluate(() => localStorage.getItem('user'));
      const user2Data = await user2Page.evaluate(() => localStorage.getItem('user'));
      
      expect(user1Data).toBe('Alice');
      expect(user2Data).toBe('Bob');
      console.log('✅ Contexts are isolated!');
    });
    
    // Cleanup
    await user1Context.close();
    await user2Context.close();
  });
  
  test('contexts with different permissions', async ({ browser }) => {
    // Context 1: With geolocation
    const contextWithGeo = await browser.newContext({
      geolocation: { latitude: 40.7128, longitude: -74.0060 }, // New York
      permissions: ['geolocation']
    });
    const pageWithGeo = await contextWithGeo.newPage();
    
    // Context 2: Without permissions
    const contextNoGeo = await browser.newContext();
    const pageNoGeo = await contextNoGeo.newPage();
    
    console.log('🌍 Context 1: Has geolocation');
    console.log('🚫 Context 2: No permissions');
    
    await contextWithGeo.close();
    await contextNoGeo.close();
  });
});

/**
 * Part 4: Tags for Test Organization
 */

// @smoke tag: Critical tests that must pass
test('critical homepage loads @smoke @critical', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
  console.log('✅ Smoke test passed');
});

test('critical navigation works @smoke', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page).toHaveURL(/.*docs.*/);
  console.log('✅ Critical navigation test passed');
});

// @regression tag: Full test suite
test('full documentation navigation @regression', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Docs' }).click();
  await page.getByRole('link', { name: 'API' }).click();
  await page.getByRole('link', { name: 'Community' }).click();
  console.log('✅ Regression test passed');
});

// @slow tag: Time-consuming tests
test('load test with multiple pages @slow @performance', async ({ page }) => {
  const pages = [
    'https://playwright.dev',
    'https://playwright.dev/docs/intro',
    'https://playwright.dev/docs/api/class-playwright'
  ];
  
  for (const url of pages) {
    console.time(`Load ${url}`);
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    console.timeEnd(`Load ${url}`);
  }
  console.log('✅ Performance test completed');
});

// @api tag: API-related tests
test('verify external links @api @integration', async ({ page }) => {
  await page.goto('https://playwright.dev');
  
  const links = await page.getByRole('link').evaluateAll(elements => 
    elements.map(el => (el as HTMLAnchorElement).href)
  );
  
  console.log(`🔗 Found ${links.length} links`);
  expect(links.length).toBeGreaterThan(0);
});

/**
 * Part 5: Complex Example - All Concepts Together
 */
test.describe('Lecture 13: Complete Example @regression', () => {
  
  test.beforeEach(async ({ page }) => {
    console.log('🔧 Setup: Navigating to homepage');
    await page.goto('https://playwright.dev');
  });
  
  test('multi-user collaboration with steps and hooks @smoke @multiuser', async ({ browser }) => {
    
    await test.step('Create user contexts', async () => {
      const adminContext = await browser.newContext();
      const userContext = await browser.newContext();
      
      const adminPage = await adminContext.newPage();
      const userPage = await userContext.newPage();
      
      await test.step('Admin user session', async () => {
        await adminPage.goto('https://playwright.dev');
        await adminPage.evaluate(() => {
          localStorage.setItem('role', 'admin');
        });
        console.log('👑 Admin logged in');
      });
      
      await test.step('Regular user session', async () => {
        await userPage.goto('https://playwright.dev');
        await userPage.evaluate(() => {
          localStorage.setItem('role', 'user');
        });
        console.log('👤 Regular user logged in');
      });
      
      await test.step('Verify roles are isolated', async () => {
        const adminRole = await adminPage.evaluate(() => localStorage.getItem('role'));
        const userRole = await userPage.evaluate(() => localStorage.getItem('role'));
        
        expect(adminRole).toBe('admin');
        expect(userRole).toBe('user');
        console.log('✅ Roles verified and isolated');
      });
      
      // Cleanup
      await adminContext.close();
      await userContext.close();
    });
  });
});

/**
 * How to run tests with tags:
 * 
 * Run smoke tests only:
 * npx playwright test --grep "@smoke"
 * 
 * Run regression except slow tests:
 * npx playwright test --grep "@regression" --grep-invert "@slow"
 * 
 * Run critical tests only:
 * npx playwright test --grep "@critical"
 * 
 * Run multi-user tests:
 * npx playwright test --grep "@multiuser"
 * 
 * Exclude slow tests:
 * npx playwright test --grep-invert "@slow"
 * 
 * CI/CD Strategy:
 * - On commit: @smoke tests (fast, critical)
 * - On PR: @regression tests
 * - Nightly: All tests including @slow
 */

/**
 * Summary of Concepts:
 * 
 * ✅ beforeAll/afterAll: Run once per describe block
 * ✅ beforeEach/afterEach: Run before/after each test
 * ✅ test.step(): Organize tests into readable steps
 * ✅ Browser contexts: Isolate users with separate cookies/storage
 * ✅ @tags: Organize and selectively run tests
 * 
 * Benefits:
 * - Better test organization
 * - Clear failure reports
 * - Multi-user testing capability
 * - Flexible CI/CD pipelines
 * - Reduced test maintenance
 */
