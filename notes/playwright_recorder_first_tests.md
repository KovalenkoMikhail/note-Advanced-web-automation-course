# Playwright Recorder & First Tests

**Source**: 44-minute lecture on using Playwright Recorder to create automated tests  
**Video**: [Advanced Web Automation JavaScript/TypeScript Course - Lesson 4](http://www.youtube.com/watch?v=WIwIo5chcvw)

---

## 🎯 Overview

Learn to use Playwright Recorder tool to generate automated tests by recording user interactions on real websites, then run and debug those tests.

---

## 🌐 Demo Website

**Test Site**: [E-commerce Demo](https://jq-automation.github.io/e-commerce-demo/)

### Website Features:
- Product catalog
- Shopping cart
- Checkout flow with forms
- Payment simulation
- Order confirmation

**Full Purchase Flow:**
1. Browse products
2. Add to cart
3. Fill shipping information
4. Enter payment details (test card: `4242 4242 4242 4242`)
5. Place order
6. Confirmation page

---

## 🎬 Playwright Recorder

### What is Playwright Recorder?

Tool that records your browser interactions and automatically generates test code.

**Benefits:**
- Generates human-readable test code
- Uses best-practice locators (roles, labels)
- No manual selector writing needed
- Fast test creation

---

## 📝 Recording Your First Test

### Step 1: Open Test Explorer

**VS Code:**
1. Install **Playwright Test for VS Code** extension
2. Open Test Explorer (left sidebar icon)
3. Or right-click any test → **Reveal in Test Explorer**

### Step 2: Start Recording

Click **Record new** button in Test Explorer

**What happens:**
- Opens browser window
- Recorder inspector panel appears
- Every interaction is tracked

### Step 3: Perform Actions

Navigate and interact with website:
```typescript
// Example recorded actions:
await page.goto('https://jq-automation.github.io/e-commerce-demo/');
await page.getByRole('link', { name: 'Products' }).click();
await page.getByRole('link', { name: 'Gaga the Tiger' }).click();
await page.getByRole('button', { name: 'Add to Cart' }).click();
```

### Step 4: Stop Recording

Click **Close all browsers** in Test Explorer

**Result:** Generated test appears in editor

---

## 🎨 Code Formatting with Prettier

### Install Prettier

1. **Extensions** → Search **Prettier**
2. Install **Prettier - Code formatter**
3. Restart VS Code

### Auto-format on Save

**Manual format:** `Ctrl+S` or `Cmd+S`

**Enable auto-save:**
1. Settings → **Files: Auto Save** → After delay
2. Set delay: `200ms` or `500ms`

**Before formatting:**
```typescript
await page.getByRole('textbox',{name:'Email'}).fill('test@example.com');
```

**After formatting:**
```typescript
await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
```

---

## ✏️ Record at Cursor

### Use Case
Continue recording from existing test position.

### Steps:

1. **Place cursor** where you want to add new steps
2. Click **Record at cursor** in Test Explorer
3. **Perform actions** in browser
4. **Close browser** to stop

**Example:**
```typescript
// Existing test ends here
await page.getByRole('link', { name: 'Products' }).click();

// Place cursor here, click "Record at cursor"
// New recorded actions appear below:
await page.getByRole('link', { name: 'Contact' }).click();
await page.getByPlaceholder('Enter your name').fill('Ilarion');
```

---

## 🔍 Fixing Broken Locators

### Problem: Test Fails on Element

```typescript
// Test fails here - wrong locator
await page.getByRole('textbox', { name: 'snipcart_textbox' }).click();
//                                         ^ underscore breaks it
```

**Error:**
```
Error: locator.click: Timeout waiting for locator
```

### Solution 1: Pick Locator (VS Code Extension)

1. Click **Pick locator** in Test Explorer
2. **Click element** on website
3. **Copy generated locator** from popup
4. **Paste** into test code

```typescript
// Fixed locator
await page.getByRole('textbox', { name: 'snipcart-textbox' }).click();
```

### Solution 2: Trace Viewer

**Run test with trace:**
```bash
npx playwright test --trace on
```

**In Trace Viewer:**
1. Click **target icon** (Pick locator)
2. **Select element** on page
3. **Copy locator** from panel
4. **Update test code**

---

## 🎭 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test
```bash
npx playwright test example.spec.ts
```

### UI Mode (Interactive)
```bash
npx playwright test --ui
```

**Features:**
- Visual test execution
- Step-by-step playback
- Watch mode
- Pick locator tool

---

## 👀 Watch Mode

### What is Watch Mode?

Automatically reruns tests when files change.

### Enable in UI Mode:

1. Open UI mode: `npx playwright test --ui`
2. Click **watch icon** (👁️)
3. Edit test file → **auto-saves** → **auto-runs**

**Benefits:**
- No manual rerun needed
- Instant feedback
- Faster development

---

## 📊 Example: Full E-commerce Test

```typescript
import { test, expect } from '@playwright/test';

test('complete purchase flow', async ({ page }) => {
  // Navigate to store
  await page.goto('https://jq-automation.github.io/e-commerce-demo/');
  
  // Browse products
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('link', { name: 'Gaga the Tiger' }).click();
  
  // Add to cart
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  // Go to checkout
  await page.getByRole('button', { name: 'Checkout' }).click();
  
  // Fill shipping info
  await page.getByPlaceholder('Full Name').fill('Ilarion');
  await page.getByPlaceholder('Email').fill('test@example.com');
  await page.getByPlaceholder('Street Address').fill('Freedom Street');
  await page.getByPlaceholder('City').fill('Boston');
  await page.selectOption('select[name="country"]', 'United States');
  await page.getByPlaceholder('ZIP Code').fill('12345');
  
  // Continue to payment
  await page.getByRole('button', { name: 'Continue to Payment' }).click();
  
  // Enter payment details
  await page.getByPlaceholder('Card Number').fill('4242424242424242');
  await page.selectOption('select[name="month"]', '12');
  await page.selectOption('select[name="year"]', '2030');
  await page.getByPlaceholder('CVV').fill('123');
  
  // Place order
  await page.getByRole('button', { name: 'Place Order' }).click();
  
  // Verify confirmation
  await expect(page.getByText('Thank you for your order')).toBeVisible();
  
  // Continue shopping
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: 'Products' }).click();
});
```

---

## 🛠️ Debugging Tips

### Common Issues

#### 1. Validation Errors
**Problem:** Form field validation fails during recording

**Solution:** 
- Record again with valid data
- Check field requirements (ZIP format, email format)
- Use auto-complete carefully

#### 2. Wrong Locators
**Problem:** Recorder generates unstable locator

**Solution:**
- Use **Pick locator** to get better one
- Prefer role-based locators: `getByRole()`, `getByLabel()`
- Avoid text content that changes

#### 3. Timing Issues
**Problem:** Test fails randomly

**Solution:**
- Playwright auto-waits by default
- Add explicit waits if needed: `await page.waitForLoadState()`
- Check network requests complete

---

## 📚 Locator Strategies

### Recorded Locators (Best to Worst)

**1. Role-based (Best)**
```typescript
await page.getByRole('button', { name: 'Add to Cart' });
await page.getByRole('textbox', { name: 'Email' });
await page.getByRole('link', { name: 'Products' });
```

**2. Label-based**
```typescript
await page.getByLabel('Email Address');
await page.getByLabel('Full Name');
```

**3. Placeholder**
```typescript
await page.getByPlaceholder('Enter your name');
```

**4. Text content**
```typescript
await page.getByText('Thank you for your order');
```

**5. Test ID (if available)**
```typescript
await page.getByTestId('submit-button');
```

---

## 💡 Best Practices

### 1. Start with Recorder
- Use recorder for initial test structure
- Manually refine generated code
- Add assertions and waits as needed

### 2. Use Meaningful Names
```typescript
// Good
test('user can complete checkout flow', async ({ page }) => {

// Bad
test('test1', async ({ page }) => {
```

### 3. Keep Tests Focused
- One test = One user journey
- Don't try to test everything in one test
- Break complex flows into smaller tests

### 4. Add Assertions
Recorder generates actions, but add verification:
```typescript
// After adding to cart
await page.getByRole('button', { name: 'Add to Cart' }).click();
await expect(page.getByText('Cart (1)')).toBeVisible(); // Add this
```

### 5. Clean Test Data
```typescript
// Before test
await page.goto('/');
await page.evaluate(() => localStorage.clear());

// Or use beforeEach hook
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
```

---

## 🎯 Practice Exercise

### Task: Record Blog Navigation Test

**Steps:**
1. Open Playwright recorder
2. Navigate to blog: `https://ilarion-halushka.github.io/`
3. Use search input
4. Click "About" page
5. Navigate back to articles
6. Click on article
7. Stop recording
8. Run test in UI mode
9. Enable watch mode
10. Modify test and observe auto-rerun

---

## 📊 Commands Reference

| Command | Purpose |
|---------|---------|
| `npx playwright test` | Run all tests |
| `npx playwright test file.spec.ts` | Run specific test |
| `npx playwright test --ui` | Run in UI mode |
| `npx playwright test --trace on` | Run with trace |
| `npx playwright show-report` | View last report |
| `Ctrl+S` / `Cmd+S` | Format code (Prettier) |

---

## 🔧 VS Code Extension Features

### Test Explorer Panel
- ▶️ **Run test** - Execute selected test
- 🔴 **Record new** - Start recording new test
- ⏺️ **Record at cursor** - Continue recording
- 🎯 **Pick locator** - Select element for locator
- 👁️ **Watch mode** - Auto-rerun on changes
- 🐛 **Debug** - Run with debugger

---

## 🎓 Key Takeaways

1. **Playwright Recorder** generates tests from browser interactions
2. **Role-based locators** are most reliable
3. **Pick locator** fixes broken selectors
4. **UI mode + Watch mode** = fast development
5. **Prettier** keeps code clean and readable
6. **Record at cursor** continues existing tests
7. **Trace viewer** helps debug failures

---

## 📝 Homework

### Required:
1. ✅ Record test on e-commerce demo
2. ✅ Complete full purchase flow
3. ✅ Run test and verify it passes
4. ✅ Intentionally break a locator
5. ✅ Fix using Pick locator tool
6. ✅ Enable watch mode and modify test

### Challenge:
- Record test on your favorite website
- Add custom assertions
- Handle form validation errors
- Test multiple product selections

---

## 🔗 Resources

- **E-commerce Demo**: [jq-automation.github.io/e-commerce-demo](https://jq-automation.github.io/e-commerce-demo/)
- **Playwright Docs - Recorder**: [playwright.dev/docs/codegen](https://playwright.dev/docs/codegen)
- **Playwright Docs - Locators**: [playwright.dev/docs/locators](https://playwright.dev/docs/locators)
- **Test Card Number**: `4242 4242 4242 4242`

---

## 🚨 Common Mistakes to Avoid

1. ❌ Recording too much in one test (break into smaller tests)
2. ❌ Not adding assertions (recorder only generates actions)
3. ❌ Ignoring validation errors during recording
4. ❌ Using unstable text content as locators
5. ❌ Not using Prettier (code becomes messy)

---

## ⏭️ Next Lecture

**Playwright Architecture**
- How Playwright works internally
- Browser automation mechanism
- Node.js + TypeScript integration
- Understanding test execution flow

---

**Note**: Learn JavaScript/TypeScript fundamentals if you haven't already. The earlier you start, the easier automation becomes!
