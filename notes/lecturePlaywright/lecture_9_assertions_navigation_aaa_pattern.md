# Assertions, Navigation & AAA Pattern

**Source**: 52-minute lecture on test structure, assertions, and navigation  
**Video**: [Web Automation Course Lesson 9 - AAA Pattern, Assertions, Navigation](https://youtu.be/LESSON_9_VIDEO_ID)

---

## 🎯 Overview

Understanding the AAA (Arrange-Act-Assert) pattern for structured test writing, Playwright's auto-retrying assertions, navigation methods, and best practices for stable test automation.

---

## 🏗️ AAA Pattern (Arrange-Act-Assert)

### Industry-Standard Test Structure [35:36]

**The AAA pattern is the foundation of well-structured tests.**

### Three Phases

#### 1. Arrange [36:10]

**Prepare the test environment and preconditions.**

**Common arrange activities:**
- Navigate to the page
- Log in (if needed)
- Set up test data
- Configure browser state
- Navigate to specific section

**Example:**
```typescript
test('user can add product to cart', async ({ page }) => {
  // ARRANGE: Prepare test environment
  await page.goto('https://shop.example.com');
  await page.getByRole('link', { name: 'Products' }).click();
  
  // ... rest of test
});
```

#### 2. Act [36:57]

**Perform the actions being tested.**

**What to do:**
- Execute the user action
- Click buttons
- Fill forms
- Submit data
- Trigger the feature you're testing

**Example:**
```typescript
test('user can add product to cart', async ({ page }) => {
  // ARRANGE
  await page.goto('https://shop.example.com');
  await page.getByRole('link', { name: 'Products' }).click();
  
  // ACT: Perform the action being tested
  await page.getByRole('button', { name: 'Add to Cart' }).first().click();
  
  // ... assertions
});
```

#### 3. Assert [37:06]

**Verify the results and expected behavior.**

**What to check:**
- Expected elements are visible
- Text content is correct
- URL changed as expected
- Data was saved
- Error messages appear (for negative tests)

**Example:**
```typescript
test('user can add product to cart', async ({ page }) => {
  // ARRANGE
  await page.goto('https://shop.example.com');
  await page.getByRole('link', { name: 'Products' }).click();
  
  // ACT
  await page.getByRole('button', { name: 'Add to Cart' }).first().click();
  
  // ASSERT: Verify expected results
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await expect(page.getByText('Item added to cart')).toBeVisible();
});
```

---

### Complete AAA Example

```typescript
test('complete purchase flow', async ({ page }) => {
  // ========== ARRANGE ==========
  // Prepare test environment
  await page.goto('https://shop.example.com');
  
  // Login first
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Navigate to products
  await page.getByRole('link', { name: 'Products' }).click();
  
  // ========== ACT ==========
  // Perform actions being tested
  await page.getByText('Premium Laptop').click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  
  // ========== ASSERT ==========
  // Verify expected results
  await expect(page).toHaveURL(/checkout/);
  await expect(page.getByText('Order Summary')).toBeVisible();
  await expect(page.getByText('Premium Laptop')).toBeVisible();
});
```

---

### Why AAA Pattern?

**Benefits:**
- ✅ **Clarity** - Easy to understand test intent
- ✅ **Structure** - Consistent across all tests
- ✅ **Maintainability** - Easy to modify
- ✅ **Readability** - Anyone can follow the logic
- ✅ **Debugging** - Know which phase failed

**Without AAA (messy):**
```typescript
test('bad example', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.getByText('Hello')).toBeVisible();
  await page.click('button');
  await page.goto('https://example.com/products');
  await expect(page).toHaveURL(/products/);
  await page.fill('input', 'text');
  // What is this test even testing?
});
```

**With AAA (clear):**
```typescript
test('good example', async ({ page }) => {
  // ARRANGE: Setup
  await page.goto('https://example.com/products');
  
  // ACT: Search for product
  await page.getByPlaceholder('Search').fill('laptop');
  await page.getByRole('button', { name: 'Search' }).click();
  
  // ASSERT: Verify results
  await expect(page).toHaveURL(/search.*laptop/);
  await expect(page.locator('.product-card')).toHaveCount(10);
});
```

---

## ✅ Assertions (Checks)

### Auto-Retrying Assertions [06:19]

**Playwright automatically retries assertions until timeout (default 5 seconds).**

**How it works:**
```
1. Check condition → Failed
2. Wait 100ms
3. Check condition → Failed
4. Wait 100ms
5. Check condition → Passed! ✓
```

**Why auto-retry is powerful:**
- Handles loading states automatically
- Waits for animations to complete
- Deals with network delays
- Makes tests more stable

**Example:**
```typescript
// This will retry for up to 5 seconds
await expect(page.getByText('Loading...')).not.toBeVisible();
await expect(page.getByText('Data loaded')).toBeVisible();
```

**Configure timeout:**
```typescript
// Custom timeout (10 seconds)
await expect(page.getByText('Slow operation')).toBeVisible({ timeout: 10000 });

// Global timeout in config
export default {
  expect: {
    timeout: 10000  // 10 seconds for all assertions
  }
};
```

---

### Common Assertions

#### toBeVisible() [11:54]

**Check if element is visible on page.**

```typescript
// Element should be visible
await expect(page.getByText('Welcome')).toBeVisible();

// Element should NOT be visible
await expect(page.getByText('Loading...')).not.toBeVisible();

// Multiple elements
await expect(page.getByRole('button')).toBeVisible();  // At least one visible
```

**Example:**
```typescript
test('modal appears on click', async ({ page }) => {
  await page.goto('https://example.com');
  
  // ARRANGE: Modal not visible initially
  await expect(page.locator('.modal')).not.toBeVisible();
  
  // ACT: Click button to open modal
  await page.getByRole('button', { name: 'Open Dialog' }).click();
  
  // ASSERT: Modal now visible
  await expect(page.locator('.modal')).toBeVisible();
  await expect(page.getByText('Dialog Content')).toBeVisible();
});
```

---

#### toHaveText() [27:43]

**Check element contains specific text.**

```typescript
// Exact text match
await expect(page.getByTestId('username')).toHaveText('John Doe');

// Partial match (contains)
await expect(page.getByRole('heading')).toHaveText(/Welcome/);

// Array of texts (for lists)
await expect(page.getByRole('listitem')).toHaveText([
  'Item 1',
  'Item 2',
  'Item 3'
]);
```

**Case sensitivity:**
```typescript
// Case-insensitive with regex
await expect(page.getByText('title')).toHaveText(/welcome/i);
```

**Example:**
```typescript
test('display user profile', async ({ page }) => {
  // ARRANGE
  await page.goto('https://example.com/profile');
  
  // ASSERT: Check profile data
  await expect(page.getByTestId('username')).toHaveText('John Doe');
  await expect(page.getByTestId('email')).toHaveText('john@example.com');
  await expect(page.getByTestId('role')).toHaveText(/admin/i);
});
```

---

#### toHaveURL() [21:00]

**Verify current page URL.**

```typescript
// Exact URL
await expect(page).toHaveURL('https://example.com/products');

// Regex pattern
await expect(page).toHaveURL(/products/);
await expect(page).toHaveURL(/checkout\/step-\d+/);

// With query parameters
await expect(page).toHaveURL(/search\?q=laptop/);
```

**Example:**
```typescript
test('navigation to products page', async ({ page }) => {
  // ARRANGE
  await page.goto('https://example.com');
  
  // ACT: Navigate to products
  await page.getByRole('link', { name: 'Products' }).click();
  
  // ASSERT: URL changed
  await expect(page).toHaveURL(/\/products/);
  await expect(page).toHaveURL('https://example.com/products');
});
```

---

#### toBeEnabled() / toBeEditable() [30:10]

**Check input fields and button states.**

**toBeEnabled():**
```typescript
// Button is enabled
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();

// Button is disabled
await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
```

**toBeEditable():**
```typescript
// Input is editable
await expect(page.getByLabel('Email')).toBeEditable();

// Input is readonly
await expect(page.getByLabel('User ID')).not.toBeEditable();
```

**Example:**
```typescript
test('form validation enables submit', async ({ page }) => {
  await page.goto('https://example.com/form');
  
  // ARRANGE: Submit button disabled initially
  await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
  
  // ACT: Fill required fields
  await page.getByLabel('Name').fill('John');
  await page.getByLabel('Email').fill('john@example.com');
  
  // ASSERT: Submit button now enabled
  await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
});
```

---

### All Assertion Methods

| Assertion | Purpose | Example |
|-----------|---------|---------|
| `toBeVisible()` | Element is visible | `await expect(locator).toBeVisible()` |
| `toBeHidden()` | Element is hidden | `await expect(locator).toBeHidden()` |
| `toHaveText()` | Contains text | `await expect(locator).toHaveText('text')` |
| `toContainText()` | Partial text match | `await expect(locator).toContainText('part')` |
| `toHaveValue()` | Input has value | `await expect(input).toHaveValue('text')` |
| `toHaveURL()` | Page URL matches | `await expect(page).toHaveURL(/url/)` |
| `toHaveTitle()` | Page title matches | `await expect(page).toHaveTitle('Title')` |
| `toBeEnabled()` | Element is enabled | `await expect(button).toBeEnabled()` |
| `toBeDisabled()` | Element is disabled | `await expect(button).toBeDisabled()` |
| `toBeEditable()` | Input is editable | `await expect(input).toBeEditable()` |
| `toBeChecked()` | Checkbox checked | `await expect(checkbox).toBeChecked()` |
| `toHaveCount()` | Element count | `await expect(locator).toHaveCount(5)` |
| `toHaveAttribute()` | Has attribute | `await expect(locator).toHaveAttribute('href')` |
| `toHaveClass()` | Has CSS class | `await expect(locator).toHaveClass('active')` |

---

## 🔄 Hard vs Soft Assertions

### Hard Assertions [31:06]

**Default behavior - test stops on failure.**

```typescript
test('hard assertions stop on failure', async ({ page }) => {
  await page.goto('https://example.com');
  
  await expect(page.getByText('Header')).toBeVisible();  // ✓ Pass
  await expect(page.getByText('Missing')).toBeVisible(); // ✗ FAIL - TEST STOPS HERE
  await expect(page.getByText('Footer')).toBeVisible();  // Never executed
});
```

**Result:**
```
✗ Test failed at line 5
  Expected element to be visible
  Footer check never ran
```

---

### Soft Assertions [32:06]

**Continue test even after failure - report all errors at end.**

```typescript
test('soft assertions continue on failure', async ({ page }) => {
  await page.goto('https://example.com');
  
  await expect.soft(page.getByText('Header')).toBeVisible();  // ✓ Pass
  await expect.soft(page.getByText('Missing')).toBeVisible(); // ✗ Fail but continue
  await expect.soft(page.getByText('Footer')).toBeVisible();  // ✓ Pass - still runs!
});
```

**Result:**
```
✗ Test failed with 1 soft assertion error:
  - Line 5: Expected element "Missing" to be visible
```

---

### When to Use Each

**Hard Assertions (default):**
- ✅ Critical checks that block further steps
- ✅ When test can't continue if assertion fails
- ✅ Most common use case

**Soft Assertions:**
- ✅ Checking multiple independent things
- ✅ Visual regression testing
- ✅ Gathering all issues at once
- ✅ Non-blocking validations

**Example - Page Layout Check:**
```typescript
test('verify page layout', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Check all layout elements (soft assertions)
  await expect.soft(page.getByRole('banner')).toBeVisible();      // Header
  await expect.soft(page.getByRole('navigation')).toBeVisible();  // Nav
  await expect.soft(page.getByRole('main')).toBeVisible();        // Content
  await expect.soft(page.getByRole('contentinfo')).toBeVisible(); // Footer
  
  // If ANY fail, we still see ALL failures in report
});
```

---

## 🧭 Navigation

### goto() - Primary Navigation

**Navigate to URL.**

```typescript
// Simple navigation
await page.goto('https://example.com');

// With options
await page.goto('https://example.com', {
  waitUntil: 'networkidle',  // Wait until no network requests
  timeout: 30000             // 30 second timeout
});
```

**waitUntil options:**
```typescript
// Wait until DOM loaded (fastest)
await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });

// Wait until load event (default)
await page.goto('https://example.com', { waitUntil: 'load' });

// Wait until no network activity (slowest, most reliable)
await page.goto('https://example.com', { waitUntil: 'networkidle' });
```

---

### waitForURL() [46:05]

**Wait for URL to match pattern (useful for redirects).**

```typescript
// Wait for specific URL
await page.waitForURL('https://example.com/dashboard');

// Wait for URL pattern
await page.waitForURL(/dashboard/);
await page.waitForURL(/checkout\/step-\d+/);
```

**Use case - Multiple redirects:**
```typescript
test('login redirects to dashboard', async ({ page }) => {
  // ARRANGE
  await page.goto('https://example.com/login');
  
  // ACT: Login
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // ASSERT: Wait for final URL after redirects
  // Login → /auth/verify → /auth/success → /dashboard
  await page.waitForURL(/dashboard/);
  await expect(page).toHaveURL('https://example.com/dashboard');
});
```

**Why waitForURL() is useful:**
- Handles redirect chains
- Waits for final URL
- More reliable than checking multiple times

---

### Other Navigation Methods

```typescript
// Go back
await page.goBack();

// Go forward
await page.goForward();

// Reload page
await page.reload();
```

---

## ⚠️ Hydration Issues [47:29]

### What is Hydration?

**Modern frameworks (React, Next.js, Vue) render HTML first, then "hydrate" with JavaScript.**

**Problem:**
1. Server sends HTML → Element visible
2. User clicks → Nothing happens (JS not ready yet)
3. JS loads and hydrates → Element becomes interactive

**Playwright handles most cases automatically, but can cause flaky tests.**

**Example of potential issue:**
```typescript
test('click might fail during hydration', async ({ page }) => {
  await page.goto('https://react-app.example.com');
  
  // Element is visible BUT not yet interactive
  await page.getByRole('button', { name: 'Submit' }).click();
  // ⚠️ Click might fail if hydration not complete
});
```

**Solutions:**

**1. Playwright auto-waits (usually works):**
```typescript
// Playwright waits for actionability
await page.getByRole('button').click();  // Waits until interactive
```

**2. Explicit wait for stability:**
```typescript
// Wait for element to be stable
await expect(page.getByRole('button')).toBeVisible();
await page.waitForTimeout(1000);  // Give time for hydration
await page.getByRole('button').click();
```

**3. Wait for network idle:**
```typescript
await page.goto('https://example.com', { waitUntil: 'networkidle' });
```

**4. Check for specific indicator:**
```typescript
// Wait for hydration indicator
await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
await page.getByRole('button').click();
```

---

## 💡 Practical Tips

### Tip of the Day: Editable Page [04:01]

**Make entire page editable for layout testing.**

**Browser console:**
```javascript
document.body.contentEditable = true
```

**Now you can:**
- Edit any text on page
- Test how layout handles long strings
- Check text overflow behavior
- Simulate user edits

**Use case:**
```typescript
test('test layout with long text', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Make page editable
  await page.evaluate(() => {
    document.body.contentEditable = true;
  });
  
  // Edit text to be very long
  await page.locator('h1').fill('Very long title that might break the layout design');
  
  // Check if layout breaks
  await page.screenshot({ path: 'long-title.png' });
});
```

---

### Optimization Advice [01:30]

**Don't waste time on premature optimization.**

❌ **Bad prioritization:**
```typescript
// Trying to save 5ms
await page.evaluate(() => document.querySelector('button').click());
// vs
await page.locator('button').click();
```

✅ **Good prioritization:**
```typescript
// Focus on stability and business-critical flows
test('critical: user can purchase product', async ({ page }) => {
  // Use reliable Playwright methods
  await page.goto('https://shop.example.com');
  await page.getByRole('button', { name: 'Buy Now' }).click();
  await expect(page).toHaveURL(/checkout/);
});
```

**Focus on:**
1. **Stability** - Tests that don't flake
2. **Business value** - Critical user flows
3. **Maintainability** - Easy to update
4. **Clarity** - Easy to understand

**Ignore:**
- Saving milliseconds per test
- Complex optimizations
- Over-engineering

---

### Code Review: Tools Change, Logic Doesn't [40:56]

**Instructor reviews 2017 Protractor code - same concepts!**

**Protractor (2017):**
```javascript
element(by.id('email')).sendKeys('test@example.com');
element(by.css('.submit')).click();
expect(element(by.css('.success')).isDisplayed()).toBe(true);
```

**Playwright (2024):**
```typescript
await page.locator('#email').fill('test@example.com');
await page.locator('.submit').click();
await expect(page.locator('.success')).toBeVisible();
```

**Key insight:**
> "Tools evolve, but the fundamental logic remains: locate, interact, verify. Master the concepts, not just the syntax."

---

## 🎬 Practical Examples

### Example 1: Complete Registration Flow

```typescript
test('user registration with AAA pattern', async ({ page }) => {
  // ========== ARRANGE ==========
  await page.goto('https://example.com/register');
  
  // ========== ACT ==========
  // Fill registration form
  await page.getByLabel('Username').fill('johndoe');
  await page.getByLabel('Email').fill('john@example.com');
  await page.getByLabel('Password').fill('SecurePass123!');
  await page.getByLabel('Confirm Password').fill('SecurePass123!');
  
  // Accept terms
  await page.getByRole('checkbox', { name: 'I agree to terms' }).check();
  
  // Submit
  await page.getByRole('button', { name: 'Register' }).click();
  
  // ========== ASSERT ==========
  // Verify registration success
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Welcome, johndoe!')).toBeVisible();
  await expect(page.getByRole('heading')).toHaveText('Dashboard');
});
```

### Example 2: Search and Filter

```typescript
test('search and filter products', async ({ page }) => {
  // ARRANGE
  await page.goto('https://shop.example.com');
  
  // ACT: Search
  await page.getByPlaceholder('Search products').fill('laptop');
  await page.keyboard.press('Enter');
  
  // Wait for results
  await page.waitForURL(/search.*laptop/);
  
  // ACT: Apply filters
  await page.getByRole('checkbox', { name: 'In Stock' }).check();
  await page.getByRole('checkbox', { name: 'Free Shipping' }).check();
  
  // ASSERT: Verify results
  await expect(page.locator('.product-card')).toHaveCount(10);
  
  // Soft assertions for all products
  const products = page.locator('.product-card');
  const count = await products.count();
  
  for (let i = 0; i < count; i++) {
    await expect.soft(products.nth(i).locator('.in-stock-badge')).toBeVisible();
    await expect.soft(products.nth(i).locator('.free-shipping-badge')).toBeVisible();
  }
});
```

### Example 3: Form Validation

```typescript
test('form validation with soft assertions', async ({ page }) => {
  // ARRANGE
  await page.goto('https://example.com/contact');
  
  // ACT: Submit empty form
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // ASSERT: Check all validation errors (soft assertions)
  await expect.soft(page.getByText('Name is required')).toBeVisible();
  await expect.soft(page.getByText('Email is required')).toBeVisible();
  await expect.soft(page.getByText('Message is required')).toBeVisible();
  
  // Submit button should still be enabled
  await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
});
```

### Example 4: Login with Redirects

```typescript
test('login handles multiple redirects', async ({ page }) => {
  // ARRANGE
  await page.goto('https://example.com/login');
  
  // ACT: Login
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // ASSERT: Wait for final URL after redirect chain
  // /login → /auth → /verify → /dashboard
  await page.waitForURL(/dashboard/);
  await expect(page).toHaveURL('https://example.com/dashboard');
  await expect(page.getByRole('heading')).toHaveText('Dashboard');
});
```

---

## 📚 Homework

### Required Tasks:

1. ✅ Practice writing tests using AAA pattern
2. ✅ Use all common assertions (toBeVisible, toHaveText, toHaveURL)
3. ✅ Experiment with soft assertions
4. ✅ Use waitForURL() for redirect scenarios
5. ✅ Review Playwright assertions documentation
6. ✅ Refactor existing tests to follow AAA pattern

### Practice Exercises:

**Exercise 1**: Rewrite test using AAA
```typescript
// Before: Mixed structure
test('login', async ({ page }) => {
  await page.goto('https://example.com');
  await page.fill('#email', 'test@test.com');
  await expect(page.locator('.header')).toBeVisible();
  await page.click('button');
  await expect(page).toHaveURL(/dashboard/);
});

// After: Clear AAA structure
test('login', async ({ page }) => {
  // ARRANGE
  await page.goto('https://example.com/login');
  
  // ACT
  await page.getByLabel('Email').fill('test@test.com');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // ASSERT
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading')).toHaveText('Dashboard');
});
```

**Exercise 2**: Use soft assertions for layout
```typescript
test('verify page layout', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Use soft assertions to check all layout components
  await expect.soft(page.getByRole('banner')).toBeVisible();
  await expect.soft(page.getByRole('navigation')).toBeVisible();
  await expect.soft(page.getByRole('main')).toBeVisible();
  await expect.soft(page.getByRole('contentinfo')).toBeVisible();
  
  // Get report of all failures
});
```

**Exercise 3**: Handle redirects with waitForURL()
```typescript
test('OAuth login with redirects', async ({ page }) => {
  // ARRANGE
  await page.goto('https://app.example.com');
  
  // ACT: Click OAuth button
  await page.getByRole('button', { name: 'Login with Google' }).click();
  
  // Wait for redirect chain to complete
  await page.waitForURL(/google\.com\/oauth/);
  // ... handle OAuth flow ...
  await page.waitForURL(/app\.example\.com\/dashboard/);
  
  // ASSERT
  await expect(page.getByText('Welcome back!')).toBeVisible();
});
```

### Challenge:

Write a complete e-commerce test using:
- AAA pattern for structure
- Multiple assertions (toBeVisible, toHaveText, toHaveURL)
- Soft assertions for product validation
- waitForURL() for checkout flow
- At least 3 phases clearly separated

---

## ⏭️ Next Lesson Preview [50:10]

**Lesson 10 will cover:**
- **Practical session**: Writing 10 real-world automated tests
- **Live website testing**: Actual production site
- **Best practices**: Real-world patterns and solutions
- **Common scenarios**: Login, search, cart, checkout

---

## 🔗 Resources

- **Video**: [Lesson 9 - AAA Pattern, Assertions, Navigation](https://youtu.be/LESSON_9_VIDEO_ID)
- **Playwright Assertions Docs**: [playwright.dev/docs/test-assertions](https://playwright.dev/docs/test-assertions)
- **AAA Pattern**: [Martin Fowler's Blog](https://martinfowler.com/bliki/GivenWhenThen.html)

---

## 🎓 Key Takeaways

1. **AAA Pattern** - Arrange, Act, Assert for clear test structure
2. **Auto-retry** - Assertions automatically retry for up to 5 seconds
3. **toBeVisible()** - Most common assertion for element visibility
4. **toHaveText()** - Verify text content with regex support
5. **toHaveURL()** - Check navigation and redirects
6. **Hard assertions** - Stop on failure (default)
7. **Soft assertions** - Continue and report all failures
8. **waitForURL()** - Handle redirect chains reliably
9. **Hydration awareness** - Modern frameworks need time to become interactive
10. **Focus on stability** - Not premature optimization

---

**Structured tests with AAA pattern are easier to maintain and understand!** 🎯
