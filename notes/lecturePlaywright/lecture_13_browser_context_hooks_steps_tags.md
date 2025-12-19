# 🎭 Lecture 13: Browser Context, Hooks, Steps & Tags

**Course**: Playwright JavaScript Automation Course  
**Instructor**: Ilarion Halushka  
**Video**: [Browser Context, Hooks, Steps, Tags - Lesson 13](https://www.youtube.com/watch?v=your-video-id)  
**Date**: December 18, 2025

---

## 🎯 Learning Objectives

By the end of this lecture, you will:
- ✅ Understand **Browser → Context → Page** hierarchy
- ✅ Use **multiple browser contexts** for multi-user testing
- ✅ Implement **test hooks** (beforeAll, afterAll, beforeEach, afterEach)
- ✅ Organize tests with **tags** (@smoke, @regression)
- ✅ Use **test utilities** (skip, only, fail, fixme)
- ✅ Structure tests with **test.step()** for readable reports
- ✅ Override config with **test.use()**

---

## 📋 Table of Contents

1. [Browser Architecture](#browser-architecture)
2. [Browser Contexts](#browser-contexts)
3. [Test Tags](#test-tags)
4. [Test Hooks](#test-hooks)
5. [Test Utilities](#test-utilities)
6. [Test Configuration](#test-configuration)
7. [Test Steps](#test-steps)
8. [Homework](#homework)

---

## 🏗️ Browser Architecture {#browser-architecture}

### Playwright Hierarchy [00:57]

Understanding the architecture is crucial for writing efficient tests:

```
Browser (Physical Application)
  ↓
Context (Incognito-like Isolation)
  ↓
Page (Individual Tabs)
```

---

### 1. Browser Level

**What it is**: The actual browser application (Chromium, Firefox, WebKit)

**Characteristics**:
- Heaviest operation to launch
- Shared across multiple contexts
- Usually one browser per test worker

**In tests**:
```typescript
// Playwright manages browser automatically
test('my test', async ({ browser }) => {
  // browser is provided by Playwright fixture
});
```

---

### 2. Context Level [01:49]

**What it is**: Isolated browser session (like incognito mode)

**Characteristics**:
- ✅ Isolated cookies
- ✅ Isolated local storage
- ✅ Isolated session storage
- ✅ Isolated permissions
- ✅ Independent cache
- ✅ Separate authentication state

**Think of it as**: Each context = Different user profile

**In tests**:
```typescript
test('my test', async ({ context }) => {
  // context is provided by Playwright fixture
  // Each test gets a fresh context by default
});
```

---

### 3. Page Level [05:17]

**What it is**: A single tab/window within a context

**Characteristics**:
- Shares cookies with its context
- Can have multiple pages per context
- Represents one URL/tab

**In tests**:
```typescript
test('my test', async ({ page }) => {
  // page is provided by Playwright fixture
  await page.goto('https://example.com');
});
```

---

### Visual Hierarchy

```
┌─────────────────────────────────────┐
│         Browser (Chromium)          │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Context 1 (User A)          │ │
│  │                               │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │ Page 1 (Home)           │ │ │
│  │  └─────────────────────────┘ │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │ Page 2 (Products)       │ │ │
│  │  └─────────────────────────┘ │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Context 2 (User B)          │ │
│  │                               │ │
│  │  ┌─────────────────────────┐ │ │
│  │  │ Page 1 (Chat)           │ │ │
│  │  └─────────────────────────┘ │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## 🎭 Browser Contexts {#browser-contexts}

### Why Use Multiple Contexts? [09:02]

**Use cases**:
1. **Multi-user testing**: Doctor + Patient chat
2. **Different permissions**: Admin vs Regular user
3. **Isolated sessions**: Logged in vs Logged out
4. **A/B testing**: Different feature flags
5. **Multi-tenant testing**: Different organizations

---

### Creating Multiple Contexts

#### Example: Chat Application with Two Users

```typescript
import { test, expect } from '@playwright/test';

test('doctor and patient can chat', async ({ browser }) => {
  // Create separate contexts for two users
  const doctorContext = await browser.newContext();
  const patientContext = await browser.newContext();
  
  // Create pages within contexts
  const doctorPage = await doctorContext.newPage();
  const patientPage = await patientContext.newPage();
  
  // Doctor logs in
  await doctorPage.goto('https://chat.example.com/login');
  await doctorPage.fill('#email', 'doctor@hospital.com');
  await doctorPage.fill('#password', 'password123');
  await doctorPage.click('button[type="submit"]');
  await doctorPage.waitForURL('**/chat');
  
  // Patient logs in
  await patientPage.goto('https://chat.example.com/login');
  await patientPage.fill('#email', 'patient@example.com');
  await patientPage.fill('#password', 'password456');
  await patientPage.click('button[type="submit"]');
  await patientPage.waitForURL('**/chat');
  
  // Doctor sends message
  await doctorPage.fill('#message-input', 'Hello, how can I help you?');
  await doctorPage.click('#send-button');
  
  // Patient sees message
  await expect(patientPage.locator('.message').last()).toContainText('Hello, how can I help you?');
  
  // Patient replies
  await patientPage.fill('#message-input', 'I have a question about my prescription.');
  await patientPage.click('#send-button');
  
  // Doctor sees reply
  await expect(doctorPage.locator('.message').last()).toContainText('I have a question about my prescription.');
  
  // Cleanup
  await doctorContext.close();
  await patientContext.close();
});
```

---

### Context Options

You can configure contexts with different settings:

```typescript
test('context with custom settings', async ({ browser }) => {
  const context = await browser.newContext({
    // Viewport
    viewport: { width: 1920, height: 1080 },
    
    // Locale
    locale: 'de-DE',
    
    // Timezone
    timezoneId: 'Europe/Berlin',
    
    // Geolocation
    geolocation: { latitude: 52.52, longitude: 13.405 },
    permissions: ['geolocation'],
    
    // User agent
    userAgent: 'My Custom User Agent',
    
    // Device emulation
    isMobile: true,
    hasTouch: true,
    
    // Storage state (restore login)
    storageState: 'auth.json'
  });
  
  const page = await context.newPage();
  await page.goto('https://example.com');
  
  await context.close();
});
```

---

### Real-World Example: Admin vs User

```typescript
test('admin can delete users, regular user cannot', async ({ browser }) => {
  // Admin context
  const adminContext = await browser.newContext({
    storageState: 'auth/admin.json' // Pre-saved admin session
  });
  const adminPage = await adminContext.newPage();
  
  // Regular user context
  const userContext = await browser.newContext({
    storageState: 'auth/user.json' // Pre-saved user session
  });
  const userPage = await userContext.newPage();
  
  // Admin sees delete button
  await adminPage.goto('https://app.example.com/users');
  await expect(adminPage.getByRole('button', { name: 'Delete User' })).toBeVisible();
  
  // Regular user doesn't see delete button
  await userPage.goto('https://app.example.com/users');
  await expect(userPage.getByRole('button', { name: 'Delete User' })).not.toBeVisible();
  
  await adminContext.close();
  await userContext.close();
});
```

---

### Sharing Data Between Contexts

**Important**: Contexts are isolated, so they **don't share**:
- ❌ Cookies
- ❌ Local storage
- ❌ Session storage
- ❌ Cache

**But they DO share**:
- ✅ The same browser instance (memory efficient)
- ✅ The same test database (if using one)
- ✅ The same backend server

```typescript
test('contexts are isolated', async ({ browser }) => {
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  
  const page1 = await context1.newPage();
  const page2 = await context2.newPage();
  
  // Set cookie in context1
  await context1.addCookies([
    { name: 'user_id', value: '123', domain: 'example.com', path: '/' }
  ]);
  
  // Navigate both pages
  await page1.goto('https://example.com');
  await page2.goto('https://example.com');
  
  // Check cookies
  const cookies1 = await context1.cookies();
  const cookies2 = await context2.cookies();
  
  console.log('Context 1 cookies:', cookies1); // [{ name: 'user_id', value: '123' }]
  console.log('Context 2 cookies:', cookies2); // [] (empty!)
  
  await context1.close();
  await context2.close();
});
```

---

## 🏷️ Test Tags {#test-tags}

### What are Tags? [13:11]

**Tags** allow you to categorize and selectively run tests:
- `@smoke` - Quick sanity tests
- `@regression` - Full test suite
- `@critical` - Must-pass tests
- `@slow` - Long-running tests
- `@api` - API tests only
- `@ui` - UI tests only

---

### Adding Tags [14:43]

#### Single Tag

```typescript
test('login with valid credentials @smoke', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#email', 'test@test.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

#### Multiple Tags

```typescript
test('checkout flow @smoke @critical', async ({ page }) => {
  // Test implementation
});
```

#### Tag on Describe Block

```typescript
test.describe('Authentication @smoke', () => {
  test('user can login', async ({ page }) => {
    // All tests in this block inherit @smoke tag
  });
  
  test('user can logout', async ({ page }) => {
    // Also tagged with @smoke
  });
});
```

---

### Running Tests by Tag

#### Run Only Specific Tag

```bash
# Run all @smoke tests
npx playwright test --grep "@smoke"

# Run all @critical tests
npx playwright test --grep "@critical"

# Run tests with either @smoke OR @regression
npx playwright test --grep "@smoke|@regression"

# Run tests with both @smoke AND @critical
npx playwright test --grep "(?=.*@smoke)(?=.*@critical)"
```

---

#### Exclude Specific Tag [17:24]

```bash
# Run all tests EXCEPT @slow
npx playwright test --grep-invert "@slow"

# Run all tests EXCEPT @smoke
npx playwright test --grep-invert "@smoke"

# Run @regression but NOT @slow
npx playwright test --grep "@regression" --grep-invert "@slow"
```

---

### Practical Tag Strategy

```typescript
// Critical path - must always pass
test('user can purchase product @smoke @critical', async ({ page }) => {
  // ...
});

// Full regression
test('user can filter products @regression', async ({ page }) => {
  // ...
});

// Slow tests (run nightly)
test('generate large report @slow', async ({ page }) => {
  // Takes 5 minutes
});

// Flaky tests (needs investigation)
test('notification appears @flaky', async ({ page }) => {
  // Sometimes fails randomly
});

// API tests
test('GET /users returns 200 @api', async ({ request }) => {
  // ...
});

// UI tests
test('navigation menu works @ui', async ({ page }) => {
  // ...
});
```

---

### CI/CD Integration

**GitHub Actions example**:

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  smoke-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run smoke tests
        run: npx playwright test --grep "@smoke"
  
  regression-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run regression tests
        run: npx playwright test --grep "@regression"
  
  nightly-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule'
    steps:
      - uses: actions/checkout@v3
      - name: Run all tests including slow
        run: npx playwright test
```

---

## 🪝 Test Hooks {#test-hooks}

### What are Hooks? [18:13]

**Hooks** are functions that run at specific points in the test lifecycle:
- **Set up** test environment before tests
- **Clean up** after tests
- **Share data** between tests
- **Reduce code duplication**

---

### Hook Types

| Hook | When It Runs | Use Case |
|------|--------------|----------|
| `beforeAll` | Once before all tests in describe block | Login once, share session |
| `beforeEach` | Before each individual test | Reset state, navigate to page |
| `afterEach` | After each individual test | Take screenshot, clear data |
| `afterAll` | Once after all tests in describe block | Logout, close connections |

---

### Execution Order [23:57]

```typescript
test.describe('Product Tests', () => {
  test.beforeAll(async () => {
    console.log('1. beforeAll - runs ONCE before all tests');
  });
  
  test.beforeEach(async ({ page }) => {
    console.log('2. beforeEach - runs BEFORE each test');
  });
  
  test('test 1', async ({ page }) => {
    console.log('3. Test 1 - actual test code');
  });
  
  test.afterEach(async ({ page }) => {
    console.log('4. afterEach - runs AFTER each test');
  });
  
  test('test 2', async ({ page }) => {
    console.log('3. Test 2 - actual test code');
  });
  
  test.afterAll(async () => {
    console.log('5. afterAll - runs ONCE after all tests');
  });
});
```

**Output**:
```
1. beforeAll - runs ONCE before all tests
2. beforeEach - runs BEFORE each test
3. Test 1 - actual test code
4. afterEach - runs AFTER each test
2. beforeEach - runs BEFORE each test
3. Test 2 - actual test code
4. afterEach - runs AFTER each test
5. afterAll - runs ONCE after all tests
```

---

### beforeAll Example

```typescript
test.describe('Authentication Tests', () => {
  let authToken: string;
  
  test.beforeAll(async ({ request }) => {
    // Login once and get token
    const response = await request.post('https://api.example.com/login', {
      data: { email: 'test@test.com', password: 'password123' }
    });
    const data = await response.json();
    authToken = data.token;
    
    console.log('Logged in once, token:', authToken);
  });
  
  test('test 1 uses auth token', async ({ page }) => {
    // Use authToken
    await page.goto('https://example.com', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
  });
  
  test('test 2 also uses same token', async ({ page }) => {
    // Reuse the same authToken (no need to login again!)
    await page.goto('https://example.com/profile', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
  });
});
```

---

### beforeEach Example

```typescript
test.describe('Product Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to products page before EVERY test
    await page.goto('https://shop.example.com/products');
    await page.waitForLoadState('networkidle');
    console.log('Navigated to products page');
  });
  
  test('search for laptop', async ({ page }) => {
    // Already on products page thanks to beforeEach!
    await page.fill('#search', 'laptop');
    await page.keyboard.press('Enter');
  });
  
  test('filter by price', async ({ page }) => {
    // Already on products page again!
    await page.selectOption('#price-filter', 'under-500');
  });
});
```

---

### afterEach Example

```typescript
test.describe('Screenshot Tests', () => {
  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot after every test (even if it passes)
    await page.screenshot({ 
      path: `screenshots/${testInfo.title}.png` 
    });
    
    // Or only on failure:
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ 
        path: `screenshots/FAILED-${testInfo.title}.png` 
      });
    }
  });
  
  test('test 1', async ({ page }) => {
    await page.goto('https://example.com');
  });
  
  test('test 2', async ({ page }) => {
    await page.goto('https://example.com/about');
  });
  // Screenshot taken after each test!
});
```

---

### afterAll Example

```typescript
test.describe('Database Tests', () => {
  test.beforeAll(async () => {
    // Seed database with test data
    await seedDatabase();
  });
  
  test('test 1', async ({ page }) => {
    // Use test data
  });
  
  test('test 2', async ({ page }) => {
    // Use test data
  });
  
  test.afterAll(async () => {
    // Clean up test data
    await cleanDatabase();
    console.log('Database cleaned');
  });
});
```

---

### Nested Describe Blocks

```typescript
test.describe('Outer Block', () => {
  test.beforeAll(() => console.log('1. Outer beforeAll'));
  test.beforeEach(() => console.log('2. Outer beforeEach'));
  
  test('outer test', () => {
    console.log('3. Outer test');
  });
  
  test.describe('Inner Block', () => {
    test.beforeAll(() => console.log('4. Inner beforeAll'));
    test.beforeEach(() => console.log('5. Inner beforeEach'));
    
    test('inner test', () => {
      console.log('6. Inner test');
    });
    
    test.afterEach(() => console.log('7. Inner afterEach'));
    test.afterAll(() => console.log('8. Inner afterAll'));
  });
  
  test.afterEach(() => console.log('9. Outer afterEach'));
  test.afterAll(() => console.log('10. Outer afterAll'));
});
```

**Execution order for "inner test"**:
```
1. Outer beforeAll
4. Inner beforeAll
2. Outer beforeEach
5. Inner beforeEach
6. Inner test
7. Inner afterEach
9. Outer afterEach
8. Inner afterAll
10. Outer afterAll
```

---

## 🛠️ Test Utilities {#test-utilities}

### 1. test.skip() [27:51]

**Use case**: Temporarily disable a test without deleting it

```typescript
// Skip single test
test.skip('broken test', async ({ page }) => {
  // This test won't run
});

// Skip conditionally
test('conditional skip', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Not supported on Safari');
  
  // Test runs on Chrome and Firefox, skipped on WebKit
});

// Skip entire describe block
test.describe.skip('All tests skipped', () => {
  test('test 1', async ({ page }) => {
    // Skipped
  });
  
  test('test 2', async ({ page }) => {
    // Skipped
  });
});
```

---

### 2. test.only() [28:50]

**Use case**: Run ONLY this test, ignore all others

```typescript
test('test 1', async ({ page }) => {
  // Won't run
});

test.only('test 2', async ({ page }) => {
  // ONLY this test runs
  await page.goto('https://example.com');
});

test('test 3', async ({ page }) => {
  // Won't run
});
```

**⚠️ Warning**: Don't commit `test.only()` to version control!

---

### 3. test.fail() [29:45]

**Use case**: Mark a test as expected to fail (known bug)

```typescript
test('known bug - login fails with special characters', async ({ page }) => {
  test.fail(); // If this test fails, Playwright considers it a PASS
  
  await page.goto('https://example.com/login');
  await page.fill('#email', 'test+tag@example.com'); // Special character
  await page.fill('#password', 'pass@word!');
  await page.click('button[type="submit"]');
  
  // This assertion will fail, but test.fail() makes it expected
  await expect(page).toHaveURL('/dashboard');
});
```

**Conditional fail**:
```typescript
test('conditional fail', async ({ page, browserName }) => {
  test.fail(browserName === 'webkit', 'Bug #123: Fails on Safari');
  
  // Test expected to fail on WebKit, should pass on others
});
```

---

### 4. test.fixme() [31:20]

**Use case**: Mark test as broken and needs fixing (like skip but more explicit)

```typescript
test.fixme('TODO: Fix date picker test', async ({ page }) => {
  // This test is broken and needs to be fixed
  // Similar to test.skip() but more explicit about intent
});
```

**Difference from skip**:
- `test.skip()`: "I'm intentionally not running this"
- `test.fixme()`: "This is broken, please fix it"

---

### Test Utilities Summary Table

| Method | Effect | When to Use |
|--------|--------|-------------|
| `test.skip()` | Don't run test | Temporarily disable |
| `test.only()` | Run ONLY this test | Debug single test |
| `test.fail()` | Expect test to fail | Known bug, inverts pass/fail |
| `test.fixme()` | Mark as broken | Test needs fixing |

---

## ⚙️ Test Configuration {#test-configuration}

### test.use() [33:30]

**Use case**: Override global config for specific tests

```typescript
import { test, expect } from '@playwright/test';

// Override viewport for mobile tests
test.use({ viewport: { width: 375, height: 667 } });

test('mobile layout', async ({ page }) => {
  await page.goto('https://example.com');
  // Page renders at 375x667 (iPhone SE size)
});
```

---

### Common Configuration Overrides [35:53]

#### Viewport

```typescript
test.use({ 
  viewport: { width: 1920, height: 1080 } 
});

test('desktop layout', async ({ page }) => {
  // Test with large desktop viewport
});
```

---

#### Locale

```typescript
test.use({ 
  locale: 'de-DE' 
});

test('German language', async ({ page }) => {
  await page.goto('https://example.com');
  // Site should display in German
});
```

---

#### Timezone

```typescript
test.use({ 
  timezoneId: 'America/New_York' 
});

test('New York timezone', async ({ page }) => {
  await page.goto('https://example.com');
  // Date/time displays should use EST/EDT
});
```

---

#### Geolocation

```typescript
test.use({
  geolocation: { latitude: 51.5074, longitude: -0.1278 }, // London
  permissions: ['geolocation']
});

test('location-based feature', async ({ page }) => {
  await page.goto('https://maps.example.com');
  // Map should center on London
});
```

---

#### User Agent

```typescript
test.use({
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
});

test('mobile user agent', async ({ page }) => {
  await page.goto('https://example.com');
  // Server sees mobile user agent
});
```

---

### Describe-Level Configuration

```typescript
test.describe('Mobile Tests', () => {
  // All tests in this block use mobile viewport
  test.use({ 
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true
  });
  
  test('test 1', async ({ page }) => {
    // Mobile viewport
  });
  
  test('test 2', async ({ page }) => {
    // Mobile viewport
  });
});
```

---

## 📊 Test Steps {#test-steps}

### What are Test Steps? [39:05]

**Test steps** group related actions together for better **reporting and readability**.

Without steps:
```
✓ complete checkout flow (5s)
```

With steps:
```
✓ complete checkout flow (5s)
  ✓ Fill out shipping form (1s)
  ✓ Select shipping method (500ms)
  ✓ Fill out payment details (1.5s)
  ✓ Review order (500ms)
  ✓ Submit order (1.5s)
```

---

### Using test.step() [41:05]

```typescript
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  await page.goto('https://shop.example.com/cart');
  
  await test.step('Fill out shipping form', async () => {
    await page.fill('#name', 'John Doe');
    await page.fill('#address', '123 Main St');
    await page.fill('#city', 'New York');
    await page.fill('#zip', '10001');
    await page.click('button:has-text("Continue")');
  });
  
  await test.step('Select shipping method', async () => {
    await page.click('input[value="standard"]');
    await page.click('button:has-text("Continue")');
  });
  
  await test.step('Fill out payment details', async () => {
    await page.fill('#card-number', '4111111111111111');
    await page.fill('#expiry', '12/25');
    await page.fill('#cvv', '123');
  });
  
  await test.step('Review order', async () => {
    await expect(page.locator('.order-total')).toHaveText('$99.99');
    await expect(page.locator('.shipping-address')).toContainText('123 Main St');
  });
  
  await test.step('Submit order', async () => {
    await page.click('button:has-text("Place Order")');
    await expect(page.locator('.confirmation')).toBeVisible();
  });
});
```

---

### Step Benefits

**1. Better Reports**:
```
✓ complete checkout flow (5s)
  ✓ Fill out shipping form (1s)
  ✓ Select shipping method (500ms)
  ✓ Fill out payment details (1.5s)
  ✓ Review order (500ms)
  ✗ Submit order (1.5s)
    Error: Timeout waiting for .confirmation
```

You can immediately see **which step** failed!

---

**2. Collapsible in Trace Viewer**:

When viewing traces, steps appear as expandable sections:
```
▼ complete checkout flow
  ✓ Fill out shipping form
    - page.fill('#name', 'John Doe')
    - page.fill('#address', '123 Main St')
    - page.click('button:has-text("Continue")')
  ✓ Select shipping method
  ✗ Submit order  ← Failed here
```

---

**3. Clear Test Structure**:

```typescript
test('user registration flow', async ({ page }) => {
  await test.step('Navigate to registration', async () => {
    await page.goto('https://example.com/register');
  });
  
  await test.step('Fill registration form', async () => {
    await page.fill('#email', 'test@test.com');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm-password', 'SecurePass123!');
  });
  
  await test.step('Accept terms and conditions', async () => {
    await page.check('#terms');
    await page.check('#privacy');
  });
  
  await test.step('Submit registration', async () => {
    await page.click('button[type="submit"]');
  });
  
  await test.step('Verify welcome email sent', async () => {
    // Check email service
  });
  
  await test.step('Verify user can login', async () => {
    await page.goto('https://example.com/login');
    await page.fill('#email', 'test@test.com');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
});
```

---

### Nested Steps

```typescript
test('complex flow with nested steps', async ({ page }) => {
  await test.step('Setup test data', async () => {
    await test.step('Create user', async () => {
      // Create user via API
    });
    
    await test.step('Add products to cart', async () => {
      // Add products via API
    });
  });
  
  await test.step('Execute test', async () => {
    await test.step('Navigate to checkout', async () => {
      await page.goto('https://shop.example.com/checkout');
    });
    
    await test.step('Complete purchase', async () => {
      // Purchase flow
    });
  });
  
  await test.step('Verify results', async () => {
    await test.step('Check order confirmation', async () => {
      // Verify confirmation
    });
    
    await test.step('Check email notification', async () => {
      // Verify email
    });
  });
});
```

**Report**:
```
✓ complex flow with nested steps (10s)
  ✓ Setup test data (2s)
    ✓ Create user (1s)
    ✓ Add products to cart (1s)
  ✓ Execute test (5s)
    ✓ Navigate to checkout (500ms)
    ✓ Complete purchase (4.5s)
  ✓ Verify results (3s)
    ✓ Check order confirmation (1.5s)
    ✓ Check email notification (1.5s)
```

---

## 📚 Homework {#homework}

### Required Tasks

#### 1. Multi-Context Testing ✅

Create a test with two browser contexts representing different users:

```typescript
test('two users interact @smoke', async ({ browser }) => {
  // TODO: Create two contexts
  // Context 1: User A
  // Context 2: User B
  
  // TODO: Both users navigate to same page
  
  // TODO: User A performs action
  
  // TODO: User B sees the result
  
  // TODO: Clean up contexts
});
```

**Example implementation**:
```typescript
test('seller and buyer interaction', async ({ browser }) => {
  const sellerContext = await browser.newContext();
  const buyerContext = await browser.newContext();
  
  const sellerPage = await sellerContext.newPage();
  const buyerPage = await buyerContext.newPage();
  
  // Seller lists item
  await sellerPage.goto('https://marketplace.example.com');
  await sellerPage.click('button:has-text("List Item")');
  await sellerPage.fill('#item-name', 'Vintage Camera');
  await sellerPage.fill('#price', '250');
  await sellerPage.click('button:has-text("Publish")');
  
  // Buyer sees item
  await buyerPage.goto('https://marketplace.example.com');
  await expect(buyerPage.getByText('Vintage Camera')).toBeVisible();
  
  await sellerContext.close();
  await buyerContext.close();
});
```

---

#### 2. Implement Hooks ✅

Create a test suite with all four hooks:

```typescript
test.describe('Product Suite', () => {
  // TODO: beforeAll - Login once
  
  // TODO: beforeEach - Navigate to products page
  
  // TODO: afterEach - Take screenshot
  
  // TODO: afterAll - Logout
  
  test('test 1', async ({ page }) => {
    // Your test
  });
  
  test('test 2', async ({ page }) => {
    // Your test
  });
});
```

---

#### 3. Use Tags Effectively ✅

Tag your existing tests appropriately:

```typescript
test('critical user login @smoke @critical', async ({ page }) => {
  // Critical path test
});

test('advanced filter options @regression', async ({ page }) => {
  // Full regression test
});

test('load 1000 products @slow', async ({ page }) => {
  // Slow test
});
```

Then run:
```bash
# Only smoke tests
npx playwright test --grep "@smoke"

# Everything except slow
npx playwright test --grep-invert "@slow"
```

---

#### 4. Structure Test with Steps ✅

Refactor a complex test to use `test.step()`:

```typescript
test('complete user registration', async ({ page }) => {
  await test.step('Navigate to registration page', async () => {
    // Navigation code
  });
  
  await test.step('Fill registration form', async () => {
    // Form filling code
  });
  
  await test.step('Submit and verify', async () => {
    // Submission and verification code
  });
});
```

---

### Practice Exercises

#### Exercise 1: Context Isolation ⏳

Verify that contexts are truly isolated:

```typescript
test('contexts have separate cookies', async ({ browser }) => {
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  
  // TODO: Set cookie in context1
  // TODO: Verify context2 doesn't have that cookie
  
  await context1.close();
  await context2.close();
});
```

---

#### Exercise 2: Hook Execution Order ⏳

Log the execution order of hooks:

```typescript
test.describe('Outer', () => {
  test.beforeAll(() => console.log('Outer beforeAll'));
  test.beforeEach(() => console.log('Outer beforeEach'));
  
  test('outer test', () => console.log('Outer test'));
  
  test.describe('Inner', () => {
    test.beforeAll(() => console.log('Inner beforeAll'));
    test.beforeEach(() => console.log('Inner beforeEach'));
    
    test('inner test', () => console.log('Inner test'));
    
    test.afterEach(() => console.log('Inner afterEach'));
    test.afterAll(() => console.log('Inner afterAll'));
  });
  
  test.afterEach(() => console.log('Outer afterEach'));
  test.afterAll(() => console.log('Outer afterAll'));
});
```

**Task**: Run and document the exact execution order.

---

#### Exercise 3: Conditional Skip ⏳

Skip tests based on environment:

```typescript
test('production-only feature', async ({ page }) => {
  test.skip(process.env.ENV !== 'production', 'Only run in production');
  
  // Test implementation
});

test('browser-specific feature', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Not supported on Safari');
  
  // Test implementation
});
```

---

### Challenge Exercise: Complete Test Framework 🚀

Build a complete test suite demonstrating all concepts:

```typescript
// tests/e-commerce.spec.ts
import { test, expect } from '@playwright/test';

test.describe('E-Commerce Platform @regression', () => {
  let sellerPage: Page;
  let buyerPage: Page;
  
  test.beforeAll(async ({ browser }) => {
    // Create two contexts
    const sellerContext = await browser.newContext({
      storageState: 'auth/seller.json'
    });
    const buyerContext = await browser.newContext({
      storageState: 'auth/buyer.json'
    });
    
    sellerPage = await sellerContext.newPage();
    buyerPage = await buyerContext.newPage();
  });
  
  test.beforeEach(async () => {
    // Navigate both users to marketplace
  });
  
  test('seller lists product, buyer purchases @smoke @critical', async () => {
    await test.step('Seller lists product', async () => {
      // Seller creates listing
    });
    
    await test.step('Buyer searches for product', async () => {
      // Buyer finds product
    });
    
    await test.step('Buyer adds to cart', async () => {
      // Add to cart
    });
    
    await test.step('Buyer completes checkout', async () => {
      // Checkout flow
    });
    
    await test.step('Seller sees order notification', async () => {
      // Verify seller side
    });
  });
  
  test('seller can edit listing @regression', async () => {
    // Edit test
  });
  
  test.fixme('buyer can leave review @flaky', async () => {
    // Broken test that needs fixing
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await sellerPage.screenshot({ path: `seller-${testInfo.title}.png` });
      await buyerPage.screenshot({ path: `buyer-${testInfo.title}.png` });
    }
  });
  
  test.afterAll(async () => {
    await sellerPage.close();
    await buyerPage.close();
  });
});
```

---

## 📝 Key Takeaways

### Interview Questions

**Q1: What is the difference between Browser, Context, and Page in Playwright?**

**A**:
- **Browser**: The physical browser application (Chromium, Firefox, WebKit). Heavy to launch.
- **Context**: An isolated session (like incognito mode) with its own cookies, storage, and permissions. Multiple contexts can exist in one browser.
- **Page**: A single tab/window within a context. Multiple pages can exist in one context.

**Hierarchy**: `Browser → Context → Page`

---

**Q2: When would you use multiple browser contexts?**

**A**: Use multiple contexts when you need to simulate different users or sessions simultaneously:
- Multi-user interactions (chat, collaboration)
- Different authentication states (admin vs user)
- Isolated test data
- A/B testing with different configurations

**Example**: Testing a chat feature where a doctor and patient need to message each other in real-time.

---

**Q3: What's the difference between beforeAll and beforeEach?**

**A**:
- **beforeAll**: Runs **once** before all tests in a describe block. Use for expensive operations like logging in or seeding data that can be shared.
- **beforeEach**: Runs **before every single test**. Use for resetting state or navigating to a starting page.

**Example**:
```typescript
beforeAll: Login once, get auth token
beforeEach: Navigate to products page (fresh start for each test)
```

---

**Q4: How do test tags help in CI/CD?**

**A**: Tags allow you to run different test subsets in different scenarios:
- **On every commit**: `@smoke` tests (fast, critical path)
- **On pull requests**: `@regression` tests (full suite)
- **Nightly builds**: All tests including `@slow` tests
- **Pre-production**: `@critical` tests only

**Command**: `npx playwright test --grep "@smoke"` runs only smoke tests.

---

**Q5: Why use test.step()?**

**A**: `test.step()` groups related actions for:
1. **Better reporting**: See which specific step failed
2. **Trace viewer**: Collapsible sections in traces
3. **Readability**: Clear test structure
4. **Debugging**: Easier to identify failure point

Instead of "test failed", you see "test failed at step: Fill payment details".

---

## 🔗 Resources

### Official Documentation
- [Browser Contexts](https://playwright.dev/docs/browser-contexts)
- [Test Hooks](https://playwright.dev/docs/api/class-test#test-before-all)
- [Test Annotations](https://playwright.dev/docs/test-annotations)
- [Test Configuration](https://playwright.dev/docs/test-configuration)

### Video
- [Browser Context, Hooks, Steps, Tags - Lesson 13](https://www.youtube.com/watch?v=your-video-id) by Ilarion Halushka

---

## 🎯 Summary

### What We Learned

1. ✅ **Browser Architecture**: Browser → Context → Page hierarchy
2. ✅ **Multiple Contexts**: Simulate multiple users simultaneously
3. ✅ **Test Hooks**: beforeAll, afterAll, beforeEach, afterEach
4. ✅ **Test Tags**: Organize and selectively run tests (@smoke, @regression)
5. ✅ **Test Utilities**: skip, only, fail, fixme
6. ✅ **Test Configuration**: Override settings with test.use()
7. ✅ **Test Steps**: Structure tests for better reporting

### Architecture Visual

```
🖥️ Browser (Chromium/Firefox/WebKit)
   ↓
👤 Context (Isolated Session)
   ├── 🍪 Cookies
   ├── 💾 Local Storage
   ├── 🔐 Permissions
   └── 🌐 Pages
        ├── Page 1 (Tab 1)
        ├── Page 2 (Tab 2)
        └── Page 3 (Tab 3)
```

### Tag Strategy

```
@smoke     → Fast, critical path (5 min)
@regression → Full suite (30 min)
@slow      → Long-running (2+ hours)
@critical  → Must-pass tests
@flaky     → Needs investigation
```

---

**Remember**: Contexts are isolated, hooks run in order, tags organize tests, steps make reports readable! 🎭

---

**Last Updated**: December 18, 2025  
**Next Lecture**: Lesson 14 (TBD)
