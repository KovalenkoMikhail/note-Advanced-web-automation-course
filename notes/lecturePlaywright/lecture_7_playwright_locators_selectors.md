# Playwright Locators & Selectors

**Source**: 72-minute lecture on element identification, filtering, and strictness  
**Video**: [Web Automation Course Lesson 7 - Locators/Selectors, Strictness, Operators, Filters](https://www.youtube.com/watch?v=5N8CGd5XkuM)

---

## 🎯 Overview

Understanding how to locate elements on web pages using Playwright's accessibility-first approach, handle multiple matches with filters and operators, and work with lists and strict mode.

---

## 🔧 Follow-up & Best Practices

### Minimize Dependencies [00:18]

**Keep package.json lean** - fewer third-party libraries mean:
- Less complexity
- Easier maintenance
- Fewer security vulnerabilities
- Smaller node_modules

**Example:**
```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.10.0"
  }
}
```

### Updating Playwright [04:26]

**Install latest version:**
```bash
npm install @playwright/test@latest
```

**If you see browser errors [05:59]:**
```bash
npx playwright install
```

**Example error:**
```
Error: browserType.launch: Executable doesn't exist
```

**Solution:**
```bash
npx playwright install chromium
npx playwright install  # Install all browsers
```

---

## 🐛 Debugging Tips

### Page Pause [07:30]

**Stop execution to inspect page state.**

```typescript
import { test, expect } from '@playwright/test';

test('debug with pause', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Execution stops here
  await page.pause();
  
  // Continue after manual inspection
  await page.click('button');
});
```

**Run requirements [09:37]:**
```bash
npx playwright test --debug        # Opens Inspector
npx playwright test --headed       # Shows browser
```

**What you can do during pause:**
- Inspect DOM elements
- Test locators in Inspector
- Step through code
- Examine page state

### Browser Console Debugging [12:58]

**Access Playwright object in DevTools console.**

**Run with PWDEBUG:**
```bash
PWDEBUG=console npx playwright test
```

**In browser DevTools console:**
```javascript
// Test locators live
playwright.locator('button')
playwright.getByRole('button', { name: 'Submit' })
playwright.getByText('Hello')

// See what elements match
await playwright.locator('button').count()
await playwright.getByRole('button').all()
```

**Benefits:**
- Test locators instantly
- See what elements match
- Experiment with selectors
- No need to re-run tests

---

## 🎯 Core Playwright Locators

### Accessibility-First Approach

Playwright recommends locators that **reflect how users perceive the page**.

**Priority order:**
1. `getByRole()` - ARIA roles
2. `getByLabel()` - Form labels
3. `getByPlaceholder()` - Input placeholders
4. `getByText()` - Visible text
5. `getByTestId()` - Test IDs (most stable)

---

### 1. getByRole() [16:59]

**Find elements by ARIA role and accessible name.**

**Basic usage:**
```typescript
// Find button by role
await page.getByRole('button').click();

// Find button with specific text
await page.getByRole('button', { name: 'Submit' }).click();

// Find heading
await page.getByRole('heading', { name: 'Welcome' });

// Find link
await page.getByRole('link', { name: 'Learn more' }).click();
```

**Common ARIA roles:**
```typescript
// Buttons
page.getByRole('button', { name: 'Login' })

// Links
page.getByRole('link', { name: 'Home' })

// Text inputs
page.getByRole('textbox', { name: 'Email' })

// Checkboxes
page.getByRole('checkbox', { name: 'Subscribe' })

// Radio buttons
page.getByRole('radio', { name: 'Option 1' })

// Headings (h1-h6)
page.getByRole('heading', { name: 'Title', level: 1 })

// Lists
page.getByRole('list')
page.getByRole('listitem')

// Tables
page.getByRole('table')
page.getByRole('row')
page.getByRole('cell')
```

**Why use getByRole?**
- ✅ Accessibility-first
- ✅ Resilient to UI changes
- ✅ Works with screen readers
- ✅ Best practice

---

### 2. getByLabel() [20:11]

**Locate form fields by their associated label text.**

**HTML:**
```html
<label for="email">Email Address</label>
<input id="email" type="email">

<label>
  Password
  <input type="password">
</label>
```

**Playwright:**
```typescript
// Find by label text
await page.getByLabel('Email Address').fill('test@example.com');
await page.getByLabel('Password').fill('secret123');

// Case-insensitive
await page.getByLabel('email address').fill('test@example.com');
```

**Use when:**
- Working with forms
- Input fields have labels
- Need accessibility support

---

### 3. getByPlaceholder() [20:45]

**Find input fields by placeholder text.**

**HTML:**
```html
<input placeholder="Enter your email">
<input placeholder="Search products...">
```

**Playwright:**
```typescript
await page.getByPlaceholder('Enter your email').fill('user@test.com');
await page.getByPlaceholder('Search products...').fill('laptop');
```

**Note:** Placeholders can be changed easily, less stable than labels.

---

### 4. getByText() [21:19]

**Match elements by visible text content.**

**Basic usage:**
```typescript
// Exact text match
await page.getByText('Welcome back').click();

// Partial match
await page.getByText('Welcome').click();
```

**Regular Expressions [21:45]:**
```typescript
// Case-insensitive
await page.getByText(/welcome/i).click();

// Match pattern
await page.getByText(/item \d+/i).click();  // "Item 1", "Item 2", etc.

// Multiple words, any order
await page.getByText(/submit.*form/i).click();
```

**Examples:**
```typescript
// Button with text
await page.getByText('Add to Cart').click();

// Paragraph with text
const text = await page.getByText('Product description').textContent();

// Heading with text
await expect(page.getByText('Dashboard')).toBeVisible();
```

---

### 5. getByAltText() [23:27]

**Find images by alt attribute.**

**HTML:**
```html
<img src="logo.png" alt="Company Logo">
<img src="product.jpg" alt="Laptop Computer">
```

**Playwright:**
```typescript
await page.getByAltText('Company Logo').click();
await expect(page.getByAltText('Laptop Computer')).toBeVisible();
```

**Use for:**
- Image verification
- Clicking image links
- Accessibility testing

---

### 6. getByTestId() [25:57]

**Most stable locator using dedicated test attributes.**

**HTML:**
```html
<button data-testid="submit-button">Submit</button>
<div data-testid="user-profile">...</div>
```

**Playwright:**
```typescript
await page.getByTestId('submit-button').click();
await expect(page.getByTestId('user-profile')).toBeVisible();
```

**Benefits:**
- ✅ Most stable (won't break with UI changes)
- ✅ Clear intent (explicitly for testing)
- ✅ Not affected by text changes
- ✅ Not affected by styling changes

**Custom test ID attribute:**
```typescript
// playwright.config.ts
export default {
  use: {
    testIdAttribute: 'data-qa'  // Use data-qa instead of data-testid
  }
};
```

**Then in HTML:**
```html
<button data-qa="submit-button">Submit</button>
```

---

## 🔍 Filtering and Operators

### Filtering [29:17]

**Narrow down locators with additional conditions.**

#### filter() with hasText

**Find element containing specific text:**
```typescript
// Find button with text "Delete"
await page.getByRole('button').filter({ hasText: 'Delete' }).click();

// Find product card containing "Laptop"
await page.locator('.product-card').filter({ hasText: 'Laptop' }).click();

// Case-insensitive with regex
await page.getByRole('listitem').filter({ hasText: /premium/i }).click();
```

**HTML example:**
```html
<div class="product-card">
  <h3>Premium Laptop</h3>
  <button>Buy Now</button>
</div>
<div class="product-card">
  <h3>Standard Mouse</h3>
  <button>Buy Now</button>
</div>
```

**Playwright:**
```typescript
// Click "Buy Now" only for Laptop
await page
  .locator('.product-card')
  .filter({ hasText: 'Laptop' })
  .getByRole('button', { name: 'Buy Now' })
  .click();
```

#### filter() with has [40:07]

**Find element containing another specific element:**
```typescript
// Find list item that has a checked checkbox
await page
  .getByRole('listitem')
  .filter({ has: page.getByRole('checkbox', { checked: true }) })
  .click();

// Find product card that has "Sale" badge
await page
  .locator('.product-card')
  .filter({ has: page.locator('.sale-badge') })
  .click();
```

**Combining filters:**
```typescript
await page
  .getByRole('listitem')
  .filter({ hasText: 'Premium' })
  .filter({ has: page.locator('.in-stock') })
  .click();
```

---

### Operators

#### and() Operator [44:06]

**Match elements satisfying BOTH conditions.**

```typescript
// Button that is both primary AND disabled
await page
  .getByRole('button')
  .and(page.locator('.primary'))
  .and(page.locator('[disabled]'));

// Link with specific class AND text
await page
  .getByRole('link')
  .and(page.locator('.active'))
  .click();
```

**Example:**
```typescript
// Find element matching multiple criteria
const element = page
  .getByRole('button', { name: 'Submit' })
  .and(page.locator('.enabled'))
  .and(page.locator('[data-priority="high"]'));

await element.click();
```

#### or() Operator [47:26]

**Match elements satisfying EITHER condition.**

**Useful for:**
- A/B testing variations
- Different UI states
- Fallback locators

```typescript
// Click either "Login" or "Sign In" button
await page
  .getByRole('button', { name: 'Login' })
  .or(page.getByRole('button', { name: 'Sign In' }))
  .click();

// Find element by class OR test ID
await page
  .locator('.submit-button')
  .or(page.getByTestId('submit-btn'))
  .click();
```

**A/B testing example:**
```typescript
// Handle different UI variants
const submitButton = page
  .getByRole('button', { name: 'Complete Purchase' })
  .or(page.getByRole('button', { name: 'Buy Now' }));

await submitButton.click();
```

**Multiple alternatives:**
```typescript
const loginButton = page
  .getByRole('button', { name: 'Login' })
  .or(page.getByRole('button', { name: 'Sign In' }))
  .or(page.getByRole('button', { name: 'Enter' }));
```

---

## 📋 Lists and Strictness

### Strict Mode [51:26]

**Playwright locators are strict by default.**

**What is strict mode?**
- If locator matches **multiple elements**, Playwright throws error
- Forces you to be specific
- Prevents accidental clicks on wrong elements

**Error example:**
```typescript
await page.getByRole('button').click();
// Error: strict mode violation
// locator('button') resolved to 5 elements
```

**Why strictness is good:**
- ✅ Catches ambiguous selectors early
- ✅ Makes tests more reliable
- ✅ Forces explicit element selection

---

### Selecting from Lists

#### first() Method [54:37]

**Get the first matching element.**

```typescript
// Click first button
await page.getByRole('button').first().click();

// Get first product card
const firstProduct = page.locator('.product-card').first();
await firstProduct.click();
```

#### last() Method [54:37]

**Get the last matching element.**

```typescript
// Click last item in list
await page.getByRole('listitem').last().click();

// Get last notification
const lastNotification = page.locator('.notification').last();
```

#### nth(index) Method [56:20]

**Get element at specific position (0-based index).**

```typescript
// Click second button (index 1)
await page.getByRole('button').nth(1).click();

// Get third product (index 2)
await page.locator('.product-card').nth(2).click();

// First element (same as .first())
await page.getByRole('listitem').nth(0).click();
```

**Examples:**
```typescript
// List of buttons: [Cancel, Save, Delete]
await page.getByRole('button').nth(0).click();  // Cancel
await page.getByRole('button').nth(1).click();  // Save
await page.getByRole('button').nth(2).click();  // Delete
```

---

### List Assertions

#### toHaveCount() [01:00:03]

**Verify number of matching elements.**

```typescript
// Check there are exactly 5 products
await expect(page.locator('.product-card')).toHaveCount(5);

// Check at least one result
await expect(page.getByRole('listitem')).toHaveCount(10);

// No results
await expect(page.locator('.error-message')).toHaveCount(0);
```

#### toHaveText() with Arrays [01:00:55]

**Verify text content of multiple elements.**

```typescript
// Verify list items have specific text
await expect(page.getByRole('listitem')).toHaveText([
  'Apple',
  'Banana',
  'Cherry'
]);

// Verify table columns
await expect(page.locator('th')).toHaveText([
  'Name',
  'Price',
  'Quantity'
]);
```

**Partial match with regex:**
```typescript
await expect(page.locator('.product-name')).toHaveText([
  /laptop/i,
  /mouse/i,
  /keyboard/i
]);
```

---

## 🎬 Practical Examples

### Example 1: Login Form

```typescript
test('login with accessibility locators', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Use labels for form fields
  await page.getByLabel('Email').fill('user@test.com');
  await page.getByLabel('Password').fill('secret123');
  
  // Use role for button
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verify success message
  await expect(page.getByText('Welcome back!')).toBeVisible();
});
```

### Example 2: Product Search

```typescript
test('search and select product', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Search using placeholder
  await page.getByPlaceholder('Search products...').fill('laptop');
  await page.getByRole('button', { name: 'Search' }).click();
  
  // Verify results count
  await expect(page.locator('.product-card')).toHaveCount(10);
  
  // Click on premium laptop
  await page
    .locator('.product-card')
    .filter({ hasText: 'Premium' })
    .first()
    .click();
  
  // Verify product page
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/laptop/i);
});
```

### Example 3: Shopping Cart

```typescript
test('add multiple items to cart', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Add first three products
  const products = page.locator('.product-card');
  
  await products.nth(0).getByRole('button', { name: 'Add to Cart' }).click();
  await products.nth(1).getByRole('button', { name: 'Add to Cart' }).click();
  await products.nth(2).getByRole('button', { name: 'Add to Cart' }).click();
  
  // Verify cart count
  await expect(page.getByTestId('cart-count')).toHaveText('3');
});
```

### Example 4: Filtering with Multiple Conditions

```typescript
test('filter products by multiple criteria', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Find in-stock premium laptops
  const premiumLaptop = page
    .locator('.product-card')
    .filter({ hasText: /laptop/i })
    .filter({ hasText: /premium/i })
    .filter({ has: page.locator('.in-stock') })
    .first();
  
  await premiumLaptop.click();
});
```

### Example 5: Handling A/B Tests

```typescript
test('handle different UI variants', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Click checkout button (different text in A/B test)
  const checkoutButton = page
    .getByRole('button', { name: 'Checkout' })
    .or(page.getByRole('button', { name: 'Complete Purchase' }))
    .or(page.getByRole('button', { name: 'Buy Now' }));
  
  await checkoutButton.click();
});
```

---

## 🎓 Locator Strategy Summary

### Priority Order (Best to Worst)

1. **getByRole()** - Accessibility-first, most resilient
2. **getByLabel()** - Great for forms
3. **getByPlaceholder()** - Good for inputs
4. **getByText()** - User-facing text
5. **getByTestId()** - Most stable, requires code changes

### When to Use Each

| Locator | Best For | Stability | Accessibility |
|---------|----------|-----------|---------------|
| `getByRole()` | Buttons, links, headings | ⭐⭐⭐⭐ | ✅ Excellent |
| `getByLabel()` | Form inputs | ⭐⭐⭐⭐ | ✅ Excellent |
| `getByPlaceholder()` | Inputs without labels | ⭐⭐⭐ | ⚠️ Moderate |
| `getByText()` | Any visible text | ⭐⭐⭐ | ✅ Good |
| `getByAltText()` | Images | ⭐⭐⭐⭐ | ✅ Excellent |
| `getByTestId()` | Critical elements | ⭐⭐⭐⭐⭐ | ❌ None |

---

## 💡 Best Practices

### ✅ DO

```typescript
// Use accessibility locators
await page.getByRole('button', { name: 'Submit' }).click();

// Use test IDs for critical elements
await page.getByTestId('checkout-button').click();

// Filter to be specific
await page.locator('.product').filter({ hasText: 'Laptop' }).click();

// Use nth() for specific list items
await page.getByRole('listitem').nth(2).click();

// Assert list counts
await expect(page.locator('.product')).toHaveCount(10);
```

### ❌ DON'T

```typescript
// Don't use CSS selectors when better options exist
await page.locator('div > button.primary').click();  // Bad
await page.getByRole('button', { name: 'Submit' }).click();  // Good

// Don't rely on position without reason
await page.locator('button').first().click();  // Ambiguous

// Don't use XPath unless necessary
await page.locator('//button[@class="submit"]').click();  // Avoid

// Don't ignore strict mode errors
await page.locator('button').click();  // May fail with multiple matches
```

---

## 🔧 Debugging Checklist

When locator doesn't work:

1. **Use page.pause()** - Inspect page state
2. **Check count** - `await page.locator('selector').count()`
3. **Test in console** - Use `PWDEBUG=console`
4. **Add filters** - Narrow down matches
5. **Use .first() temporarily** - See if element exists
6. **Check timing** - Element may not be ready
7. **Verify visibility** - Element may be hidden

---

## 📚 Homework

### Required Tasks:

1. ✅ Review all locator types and their use cases
2. ✅ Practice using `getByRole()` for common elements
3. ✅ Experiment with `filter()` and operators
4. ✅ Handle lists with `.first()`, `.last()`, `.nth()`
5. ✅ Use `page.pause()` to debug locators
6. ✅ Try `PWDEBUG=console` for live testing

### Practice Exercises:

**Exercise 1**: Rewrite CSS selectors as accessibility locators
```typescript
// Before
await page.locator('.btn-primary').click();

// After
await page.getByRole('button', { name: 'Submit' }).click();
```

**Exercise 2**: Handle multiple elements
```typescript
// Click third product
await page.locator('.product-card').nth(2).click();

// Verify 10 products displayed
await expect(page.locator('.product-card')).toHaveCount(10);
```

**Exercise 3**: Use filters
```typescript
// Find and click "Delete" button inside user card for "John"
await page
  .locator('.user-card')
  .filter({ hasText: 'John' })
  .getByRole('button', { name: 'Delete' })
  .click();
```

### Challenge:

Create a test that:
- Searches for products
- Filters results by "Premium"
- Verifies count
- Adds first 3 to cart
- Uses only accessibility locators

---

## ⏭️ Next Lesson Preview [01:11:23]

**Lesson 8 will cover:**
- **Actions**: Clicking, typing, hovering, dragging
- **Assertions**: Verifying element states
- **AAA Pattern**: Arrange-Act-Assert test structure

---

## 🔗 Resources

- **Video**: [Lesson 7 - Locators/Selectors, Strictness, Operators](https://www.youtube.com/watch?v=5N8CGd5XkuM)
- **Playwright Docs**: [Locators Guide](https://playwright.dev/docs/locators)
- **ARIA Roles**: [MDN ARIA Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

---

## 🎓 Key Takeaways

1. **Accessibility-first** - Use `getByRole()`, `getByLabel()`, `getByText()`
2. **Test IDs are stable** - Use `getByTestId()` for critical elements
3. **Strict mode prevents errors** - Forces specific element selection
4. **Filter to narrow down** - Use `.filter()` with `hasText` or `has`
5. **Operators for flexibility** - `.and()` for both, `.or()` for either
6. **Handle lists explicitly** - Use `.first()`, `.last()`, `.nth()`
7. **Debug with pause** - `await page.pause()` for inspection
8. **Test live in console** - `PWDEBUG=console` for experiments

---

**Mastering locators is fundamental to reliable test automation!** 🎯
