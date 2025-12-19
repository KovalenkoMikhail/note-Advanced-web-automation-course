# 🐛 Lecture 12: Debugging JavaScript, Playwright Inspector & Trace Viewer

**Course**: Playwright JavaScript Automation Course  
**Instructor**: Ilarion Halushka  
**Video**: [Debugging JavaScript. Playwright Inspector, Trace Viewer - Lesson 12](https://www.youtube.com/watch?v=your-video-id)  
**Date**: December 18, 2025

---

## 🎯 Learning Objectives

By the end of this lecture, you will:
- ✅ Master **console debugging methods** beyond `console.log()`
- ✅ Use **VS Code Debugger** with breakpoints and stepping
- ✅ Debug with **Playwright Inspector** for live test execution
- ✅ Analyze failed tests with **Playwright Trace Viewer**
- ✅ Set up **conditional breakpoints** and **log points**
- ✅ Debug tests in **CI/CD environments**

---

## 📋 Table of Contents

1. [Console Debugging Methods](#console-methods)
2. [VS Code Debugger](#vscode-debugger)
3. [Playwright Debugging Tools](#playwright-tools)
4. [Trace Viewer Deep Dive](#trace-viewer)
5. [Advanced Debugging Tips](#advanced-tips)
6. [Homework](#homework)

---

## 🖥️ Console Debugging Methods {#console-methods}

### Beyond console.log() [01:47]

Most developers only use `console.log()`, but JavaScript provides many more powerful methods!

---

### 1. console.log() - Basic Output

**Use case**: General purpose debugging

```javascript
const user = { name: 'John', age: 30 };
console.log('User:', user);
// Output: User: { name: 'John', age: 30 }

console.log('Starting test...');
// Output: Starting test...
```

**Tip**: Use descriptive labels!
```javascript
// Bad ❌
console.log(result);

// Good ✅
console.log('API Response:', result);
```

---

### 2. console.warn() - Warnings

**Use case**: Highlight potential issues (shows in yellow/orange)

```javascript
if (!process.env.API_KEY) {
  console.warn('⚠️ Warning: API_KEY not found in environment variables');
}

// In tests
if (await element.count() > 1) {
  console.warn('Multiple elements found, using first one');
}
```

**Output in browser console**:
```
⚠️ Warning: API_KEY not found in environment variables
```

---

### 3. console.error() - Errors

**Use case**: Log errors clearly (shows in red)

```javascript
try {
  await page.goto('https://invalid-url.com');
} catch (error) {
  console.error('❌ Navigation failed:', error.message);
}

// Expected error in test
if (!await element.isVisible()) {
  console.error('Element not visible!', await element.locator);
}
```

**Output**:
```
❌ Navigation failed: net::ERR_NAME_NOT_RESOLVED
```

---

### 4. console.table() - Display Arrays/Objects [07:00]

**Use case**: Compare multiple objects side-by-side

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999, stock: 5 },
  { id: 2, name: 'Mouse', price: 29, stock: 50 },
  { id: 3, name: 'Keyboard', price: 79, stock: 20 }
];

console.table(products);
```

**Output**:
```
┌─────────┬────┬────────────┬───────┬───────┐
│ (index) │ id │    name    │ price │ stock │
├─────────┼────┼────────────┼───────┼───────┤
│    0    │ 1  │  'Laptop'  │  999  │   5   │
│    1    │ 2  │  'Mouse'   │  29   │  50   │
│    2    │ 3  │ 'Keyboard' │  79   │  20   │
└─────────┴────┴────────────┴───────┴───────┘
```

**Practical Test Example**:
```typescript
test('compare product details', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  const products = await page.$$eval('.product-card', cards => 
    cards.map(card => ({
      name: card.querySelector('.product-name')?.textContent,
      price: card.querySelector('.product-price')?.textContent,
      rating: card.querySelector('.product-rating')?.textContent
    }))
  );
  
  console.table(products);
  // Easy to spot differences!
});
```

**Select specific columns**:
```javascript
// Only show name and price
console.table(products, ['name', 'price']);
```

---

### 5. console.time() & console.timeEnd() - Performance [08:19]

**Use case**: Measure how long code takes to execute

```javascript
console.time('Page Load');
await page.goto('https://example.com');
console.timeEnd('Page Load');
// Output: Page Load: 1247ms
```

**Practical Examples**:

```typescript
test('measure search performance', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Measure search action
  console.time('Search Execution');
  await page.getByPlaceholder('Search').fill('laptop');
  await page.keyboard.press('Enter');
  await page.waitForLoadState('networkidle');
  console.timeEnd('Search Execution');
  // Output: Search Execution: 823ms
  
  // Measure data extraction
  console.time('Data Extraction');
  const results = await page.$$eval('.result', nodes => nodes.length);
  console.timeEnd('Data Extraction');
  // Output: Data Extraction: 45ms
});
```

**Multiple timers**:
```javascript
console.time('Timer 1');
console.time('Timer 2');

await someOperation();
console.timeEnd('Timer 1');

await anotherOperation();
console.timeEnd('Timer 2');
```

---

### 6. Pretty Printing Objects [06:17]

**Use case**: Format complex nested objects for readability

```javascript
const complexObject = {
  user: {
    name: 'John',
    address: {
      street: '123 Main St',
      city: 'New York',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    }
  },
  orders: [
    { id: 1, total: 99.99 },
    { id: 2, total: 149.99 }
  ]
};

// Bad: Hard to read ❌
console.log(complexObject);
// Output: { user: { name: 'John', address: { street: '123 Main St', city: ...

// Good: Formatted with indentation ✅
console.log(JSON.stringify(complexObject, null, 2));
```

**Output**:
```json
{
  "user": {
    "name": "John",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "coordinates": {
        "lat": 40.7128,
        "lng": -74.006
      }
    }
  },
  "orders": [
    { "id": 1, "total": 99.99 },
    { "id": 2, "total": 149.99 }
  ]
}
```

**Parameters explained**:
```javascript
JSON.stringify(
  object,      // Object to stringify
  null,        // Replacer function (null = include all properties)
  2            // Indentation spaces (2 or 4 is common)
);
```

**In Playwright tests**:
```typescript
test('debug API response', async ({ request }) => {
  const response = await request.get('https://api.example.com/products');
  const data = await response.json();
  
  console.log('API Response:', JSON.stringify(data, null, 2));
});
```

---

### Console Methods Summary Table

| Method | Use Case | Color | Example |
|--------|----------|-------|---------|
| `console.log()` | General output | Normal | `console.log('Value:', x)` |
| `console.warn()` | Warnings | Yellow/Orange | `console.warn('Missing data')` |
| `console.error()` | Errors | Red | `console.error('Test failed')` |
| `console.table()` | Arrays/Objects | Normal | `console.table(products)` |
| `console.time()` | Start timer | Normal | `console.time('Load')` |
| `console.timeEnd()` | End timer | Normal | `console.timeEnd('Load')` |

---

## 🛠️ VS Code Debugger {#vscode-debugger}

### What is a Debugger? [10:19]

A **debugger** allows you to:
- **Pause** code execution at specific lines
- **Inspect** variable values
- **Step through** code line-by-line
- **Modify** variables on-the-fly
- **Evaluate** expressions in the debug console

---

### Setting Up Breakpoints [15:16]

#### How to Set a Breakpoint

1. **Click on the left margin** next to line number (red dot appears)
2. Or **press F9** while cursor is on the line
3. Or **right-click** and select "Add Breakpoint"

**Example Test**:
```typescript
test('debug product search', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Set breakpoint here 🔴
  await page.getByPlaceholder('Search').fill('laptop');
  
  // Execution will pause, allowing you to inspect:
  // - page object
  // - Current URL
  // - Network requests
  
  await page.keyboard.press('Enter');
  const results = await page.$$('.product-card');
  
  // Set another breakpoint here 🔴
  console.log('Found products:', results.length);
});
```

---

### Debug Controls [20:05]

When code is paused at a breakpoint, you have these controls:

| Button | Shortcut | Action | When to Use |
|--------|----------|--------|-------------|
| **Continue** | F5 | Resume until next breakpoint | Skip to next pause point |
| **Step Over** | F10 | Execute current line, move to next | Stay at current level |
| **Step Into** | F11 | Go inside function call | Debug function internals |
| **Step Out** | Shift+F11 | Finish current function | Exit function quickly |
| **Restart** | Ctrl+Shift+F5 | Restart debugger | Start over |
| **Stop** | Shift+F5 | End debug session | Quit debugging |

---

#### Step Over (F10)

**Use case**: Execute line and move to next one (don't go into functions)

```typescript
async function login(page, email, password) {
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
}

test('user login', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Breakpoint here 🔴
  await login(page, 'test@test.com', 'password123'); // Press F10
  
  // Jumps to next line WITHOUT stepping into login() function
  await expect(page).toHaveURL('/dashboard');
});
```

---

#### Step Into (F11)

**Use case**: Go inside the function to debug its implementation

```typescript
async function addToCart(page, productName) {
  // Breakpoint here will be hit when you Step Into 🔴
  const product = await page.getByText(productName);
  await product.click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
}

test('add product to cart', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Breakpoint here 🔴
  await addToCart(page, 'Laptop'); // Press F11
  
  // Execution jumps INSIDE addToCart() function
});
```

---

#### Step Out (Shift+F11)

**Use case**: Finish current function and return to caller

```typescript
async function fillShippingForm(page, data) {
  await page.fill('#name', data.name);
  await page.fill('#address', data.address);
  await page.fill('#city', data.city);
  // Breakpoint here 🔴 - Press Shift+F11
  await page.fill('#zip', data.zip);
  // Immediately returns to caller without stepping through rest
}

test('checkout flow', async ({ page }) => {
  await fillShippingForm(page, { name: 'John', address: '123 Main' });
  // Execution resumes here
});
```

---

### Inspecting Variables

When paused at a breakpoint, you can inspect:

**Variables Panel** (left sidebar):
```
▼ Local
  page: Page
  email: "test@test.com"
  password: "password123"
  
▼ Closure
  expect: Function
  
▼ Global
  console: Console
  process: Process
```

**Watch Expressions**:
```
page.url()              → "https://example.com/products"
await page.title()      → "Products - Online Shop"
results.length          → 12
```

**Debug Console** (bottom):
```javascript
> page.url()
'https://example.com/products'

> await page.$$('.product-card')
[ ElementHandle, ElementHandle, ElementHandle... ]

> await page.locator('.price').first().textContent()
'$999.99'
```

---

### Conditional Breakpoints [36:27]

**Use case**: Only pause execution when a specific condition is true

#### How to Set Conditional Breakpoint

1. **Right-click** on the line number margin
2. Select **"Add Conditional Breakpoint..."**
3. Enter condition (e.g., `product.name === 'milk'`)
4. Press Enter

**Example**:
```typescript
test('find specific product', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  const products = await page.$$('.product-card');
  
  for (const product of products) {
    const name = await product.textContent();
    
    // Conditional breakpoint: name.includes('Laptop') 🔴
    // Only pauses when product name contains "Laptop"
    console.log('Product:', name);
  }
});
```

**Common Conditions**:
```javascript
// Only when counter reaches 10
i === 10

// Only when variable is null/undefined
user === null

// Only when array has items
results.length > 0

// Only when condition fails
!isValid

// Only for specific test data
email.includes('@gmail.com')
```

---

### Log Points [04:44]

**Use case**: Add console logs **without modifying source code**

**Why use Log Points?**
- ✅ No need to add `console.log()` in code
- ✅ No risk of accidentally committing debug logs
- ✅ Can add/remove instantly
- ✅ Doesn't modify file (no unsaved changes)

#### How to Set Log Point

1. **Right-click** on line number margin
2. Select **"Add Logpoint..."**
3. Enter message with `{variable}` syntax
4. Press Enter

**Example**:
```typescript
test('process orders', async ({ page }) => {
  const orders = [
    { id: 1, total: 99.99 },
    { id: 2, total: 149.99 },
    { id: 3, total: 199.99 }
  ];
  
  for (const order of orders) {
    // Logpoint: Processing order {order.id} with total ${order.total} 💎
    await processOrder(order);
  }
});
```

**Output** (appears in Debug Console):
```
Processing order 1 with total $99.99
Processing order 2 with total $149.99
Processing order 3 with total $199.99
```

**Logpoint Syntax**:
```javascript
// Simple variable
User: {username}

// Multiple variables
Order {orderId} has {itemCount} items

// Expressions
Total: {price * quantity}

// Method calls
URL: {page.url()}
```

---

## 🎭 Playwright Debugging Tools {#playwright-tools}

### 1. Playwright VS Code Extension [38:27]

#### Installation

1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search for "Playwright Test for VSCode"
3. Click Install

#### Features [38:53]

**Debug Test Directly**:
- Right-click on test name → **"Debug Test"**
- Or click the debug icon (▶️) next to test

**Pick Locator**:
- Click "Pick Locator" button
- Click on element in browser
- Locator code is generated automatically

**Example**:
```typescript
test('use extension to debug', async ({ page }) => {
  await page.goto('https://playwright.dev');
  
  // Right-click this test in sidebar → Debug Test
  // Browser opens with debugger attached
  
  await page.getByRole('link', { name: 'Get Started' }).click();
});
```

---

### 2. Playwright Inspector [46:50]

#### What is Playwright Inspector?

A **graphical debugging tool** that:
- Opens browser alongside inspector window
- Allows step-by-step test execution
- Shows locators for elements
- Displays action logs
- Provides "Pick Locator" tool

#### Running Tests with Inspector

**Command**:
```bash
npx playwright test --debug
```

**Specific test**:
```bash
npx playwright test tests/example.spec.ts --debug
```

**Specific test name**:
```bash
npx playwright test --debug -g "add to cart"
```

---

#### Inspector Features

**Left Panel - Test Script**:
```typescript
✓ 1. page.goto('https://example.com')
✓ 2. page.getByRole('link', { name: 'Products' }).click()
→ 3. page.getByPlaceholder('Search').fill('laptop') // Current step
  4. page.keyboard.press('Enter')
  5. expect(page.locator('.result')).toBeVisible()
```

**Center - Browser Window**:
- Live browser with test execution
- Elements highlighted during actions
- Current page state visible

**Right Panel - Locator Playground**:
```
Pick Locator: 🎯 [Click to activate]

Locator:
page.getByRole('button', { name: 'Add to Cart' })

Copy ✓
```

**Bottom - Console**:
```
> page.url()
'https://example.com/products'
```

---

#### Inspector Controls

| Button | Action |
|--------|--------|
| ▶️ **Resume** | Run to next action |
| ⏭️ **Step Over** | Execute next action |
| ⏸️ **Pause** | Pause execution |
| 🎯 **Pick Locator** | Select element to get locator |
| 📋 **Copy** | Copy locator code |

---

#### Using Pick Locator

**Steps**:
1. Click **"Pick Locator"** 🎯 button in Inspector
2. Hover over element in browser (highlights in green)
3. Click element
4. Locator code appears in Inspector
5. Click **"Copy"** to use in test

**Example**:
```typescript
test('find element with inspector', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Run with --debug
  // Click "Pick Locator"
  // Click on "Add to Cart" button
  // Inspector generates:
  await page.getByRole('button', { name: 'Add to Cart' }).click();
});
```

---

### 3. Headed Mode (See Browser)

**Command**:
```bash
npx playwright test --headed
```

**Use case**: See browser actions in real-time (no debugger)

**With slow motion**:
```bash
npx playwright test --headed --slow-mo=1000
```
Adds 1000ms delay between actions.

---

## 📊 Trace Viewer Deep Dive {#trace-viewer}

### What is Trace Viewer? [49:56]

**Trace Viewer** is a powerful tool that records:
- 🎬 Every action performed
- 📸 Screenshots before/after each action
- 🌐 Network requests
- 📜 Console logs
- 🏗️ DOM snapshots
- ⏱️ Timeline of events

**Think of it as**: A video recording + debugger + network inspector combined!

---

### Enabling Traces

#### Option 1: In playwright.config.ts

```typescript
export default defineConfig({
  use: {
    // Record trace only on first retry of failed tests
    trace: 'on-first-retry',
    
    // OR: Always record traces (not recommended - slow!)
    // trace: 'on',
    
    // OR: Record traces only for failed tests
    // trace: 'retain-on-failure',
  },
});
```

**Trace Options**:
| Option | When Traces are Saved |
|--------|----------------------|
| `'on'` | Always (even passed tests) |
| `'off'` | Never |
| `'retain-on-failure'` | Only failed tests |
| `'on-first-retry'` | First retry of failed test |

---

#### Option 2: In Individual Tests

```typescript
test('with trace', async ({ page, context }) => {
  // Start tracing manually
  await context.tracing.start({ 
    screenshots: true, 
    snapshots: true 
  });
  
  await page.goto('https://example.com');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Stop and save trace
  await context.tracing.stop({ 
    path: 'trace.zip' 
  });
});
```

---

### Viewing Traces

#### After Test Failure

When a test fails with tracing enabled:
```bash
npx playwright test

# If test fails, trace is saved to:
# test-results/example-test-chromium/trace.zip
```

**Open trace**:
```bash
npx playwright show-trace test-results/example-test-chromium/trace.zip
```

---

#### Trace Viewer UI [51:23]

**Top Bar - Timeline**:
```
0s ━━━━━━━ 2s ━━━━━━━ 4s ━━━━━━━ 6s ━━━━━━━ 8s
   │       │       │       │       │
   goto    click   fill    submit  expect
```

**Left Sidebar - Actions**:
```
✓ page.goto('https://example.com')           [0ms]
✓ page.getByRole('link').click()             [150ms]
✓ page.getByLabel('Email').fill(...)         [85ms]
✗ expect(page).toHaveURL('/dashboard')       [5000ms] ❌ FAILED
```

**Center - Screenshots** [52:27]:
```
Before Action          After Action
┌─────────────┐       ┌─────────────┐
│   🖼️ Page   │  →→→  │   🖼️ Page   │
│  Screenshot │       │  Screenshot │
└─────────────┘       └─────────────┘
```

**Right Panel - Details**:
```
Action: page.getByRole('button', { name: 'Login' }).click()
Duration: 150ms
Selector: role=button[name="Login"]
Status: ✓ Success
```

---

### Trace Viewer Features

#### 1. Action Timeline [51:23]

Click on any action to see:
- Screenshot before action
- Screenshot after action
- DOM state
- Network requests during action
- Console logs

**Example**:
```
Click on: page.fill('#email', 'test@test.com')

Before:                After:
📸 Empty input field   📸 Input field with "test@test.com"
```

---

#### 2. Network Tab [54:21]

See all HTTP requests made during test:

```
GET  https://example.com                      200  1.2s  HTML
GET  https://example.com/styles.css           200  0.3s  CSS
GET  https://example.com/script.js            200  0.5s  JS
POST https://api.example.com/login            200  0.8s  JSON
GET  https://api.example.com/user/profile     200  0.4s  JSON
```

**Click on request** to see:
- Request headers
- Request body
- Response headers
- Response body

**Practical Use**:
```typescript
test('debug API call', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Action triggers API call
  await page.getByRole('button', { name: 'Load Products' }).click();
  
  // Check trace viewer → Network tab
  // Find: POST https://api.shop.com/products
  // View response body to see what API returned
});
```

---

#### 3. Console Tab

See all `console.log()`, `console.warn()`, `console.error()` output:

```
[log]   "Starting product search..."
[log]   "Found 15 products"
[warn]  "Product 'Laptop' out of stock"
[error] "Failed to load reviews"
```

---

#### 4. Source Tab

View the **test source code** with line numbers:

```typescript
1  test('add to cart', async ({ page }) => {
2    await page.goto('https://shop.example.com');
3    await page.getByText('Laptop').click();      ← Currently executing
4    await page.getByRole('button', { name: 'Add' }).click();
5    await expect(page.locator('.cart-count')).toHaveText('1');
6  });
```

---

#### 5. Call Tab

View **full stack trace** of action:

```
page.getByRole('button', { name: 'Login' }).click()
  at addToCart (page-objects/CartPage.ts:45)
  at test (tests/cart.spec.ts:12)
```

---

#### 6. Before/After Snapshots [52:27]

Click "Before" or "After" to see **exact DOM state**:

**Before Click**:
```html
<button class="btn-primary">Add to Cart</button>
<span class="cart-count">0</span>
```

**After Click**:
```html
<button class="btn-primary disabled">Added!</button>
<span class="cart-count">1</span> ← Changed!
```

**You can even interact** with the snapshot:
- Inspect elements
- Copy HTML
- View computed styles

---

### Debugging with Traces - Example Workflow

**Scenario**: Test fails with "Element not found"

**Step 1**: Open trace
```bash
npx playwright show-trace test-results/failed-test/trace.zip
```

**Step 2**: Find failed action
```
✗ page.getByRole('button', { name: 'Submit' }).click()  [5000ms] ❌
```

**Step 3**: Check "Before" screenshot
- Button is visible ✅
- Button text is "Send" ❌ (expected "Submit")

**Step 4**: Fix test
```typescript
// Before:
await page.getByRole('button', { name: 'Submit' }).click();

// After:
await page.getByRole('button', { name: 'Send' }).click();
```

---

### CI/CD Debugging [57:56]

**Problem**: Test fails on CI server, but passes locally

**Solution**: Download trace from CI

#### GitHub Actions Example

**1. Configure workflow to save traces:**
```yaml
- name: Run Playwright tests
  run: npx playwright test
  
- name: Upload trace artifacts
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-traces
    path: test-results/**/trace.zip
```

**2. Download trace from GitHub Actions**:
- Go to failed workflow run
- Click "Artifacts"
- Download `playwright-traces.zip`
- Extract it

**3. View trace locally**:
```bash
npx playwright show-trace path/to/trace.zip
```

**Now you can debug** the exact failure that happened on CI! 🎉

---

## 🚀 Advanced Debugging Tips {#advanced-tips}

### 1. Debug Specific Browser

```bash
# Debug in Chromium only
npx playwright test --debug --project=chromium

# Debug in Firefox
npx playwright test --debug --project=firefox

# Debug in WebKit (Safari)
npx playwright test --debug --project=webkit
```

---

### 2. Debug Specific Test

```bash
# By file
npx playwright test tests/login.spec.ts --debug

# By test name (grep)
npx playwright test --debug -g "user can login"

# By line number
npx playwright test tests/login.spec.ts:15 --debug
```

---

### 3. Pause Test Execution

```typescript
test('pause for manual inspection', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Pause execution and open inspector
  await page.pause();
  
  // Code below won't run until you click "Resume"
  await page.getByRole('button', { name: 'Login' }).click();
});
```

**Use case**: Manually explore page state in the middle of test

---

### 4. Screenshot on Failure

```typescript
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    // OR: 'on' to always take screenshots
  },
});
```

---

### 5. Video Recording

```typescript
export default defineConfig({
  use: {
    video: 'retain-on-failure',
    // OR: 'on' to always record
  },
});
```

**View video**:
```bash
# Video saved to:
# test-results/example-test-chromium/video.webm
open test-results/example-test-chromium/video.webm
```

---

### 6. Slow Motion for Debugging

```typescript
test('slow motion test', async ({ page }) => {
  // Slow down actions by 1000ms
  await page.goto('https://example.com', { timeout: 60000 });
  
  // Or use via command line:
  // npx playwright test --headed --slow-mo=1000
});
```

---

### 7. Debug in JetBrains IDEs [01:02:26]

**WebStorm / IntelliJ IDEA**:

**Features**:
- Click gutter to set breakpoints
- Right-click → "Debug 'test name'"
- Mute breakpoints [01:04:25]: Temporarily disable all breakpoints without removing them

**Mute Breakpoints** (Ctrl+Shift+F8):
- Useful when you have many breakpoints
- Want to run test normally
- Without removing breakpoint configuration

---

### 8. Debug Console Shortcuts

**When paused at breakpoint**, type in Debug Console:

```javascript
// Get current page title
await page.title()

// Get current URL
page.url()

// Count elements
await page.locator('.product').count()

// Get text content
await page.locator('.price').first().textContent()

// Take screenshot
await page.screenshot({ path: 'debug.png' })

// Execute JavaScript
await page.evaluate(() => document.body.style.background = 'red')
```

---

### 9. Debugging Selectors

**Test if selector works**:
```typescript
test('debug selector', async ({ page }) => {
  await page.goto('https://example.com');
  
  const locator = page.getByRole('button', { name: 'Login' });
  
  // Check if element exists
  console.log('Count:', await locator.count()); // Should be 1
  
  // Get element details
  console.log('Visible:', await locator.isVisible());
  console.log('Enabled:', await locator.isEnabled());
  console.log('Text:', await locator.textContent());
});
```

---

### 10. Debug Environment Issues

**Print environment variables**:
```typescript
test.beforeEach(async () => {
  console.table({
    'NODE_ENV': process.env.NODE_ENV,
    'BASE_URL': process.env.BASE_URL,
    'API_KEY': process.env.API_KEY ? '***' : 'NOT SET',
    'CI': process.env.CI
  });
});
```

---

## 📚 Homework {#homework}

### Required Tasks

#### 1. Practice Console Methods ✅

Create a test that uses all console methods:

```typescript
test('console methods practice', async ({ page }) => {
  console.log('🔵 Test started');
  
  await page.goto('https://shop.example.com');
  
  console.time('Product Load Time');
  const products = await page.$$eval('.product', cards => 
    cards.map(card => ({
      name: card.querySelector('.name')?.textContent,
      price: card.querySelector('.price')?.textContent,
      stock: card.querySelector('.stock')?.textContent
    }))
  );
  console.timeEnd('Product Load Time');
  
  console.table(products);
  
  if (products.length === 0) {
    console.warn('⚠️ No products found!');
  }
  
  if (products.length > 50) {
    console.error('❌ Too many products, performance issue!');
  }
  
  console.log('Pretty JSON:', JSON.stringify(products[0], null, 2));
});
```

**Goal**: See different console outputs and understand when to use each.

---

#### 2. Master VS Code Debugger ✅

**Task**: Debug this test and fix the bug

```typescript
test('buggy test - debug me!', async ({ page }) => {
  await page.goto('https://playwright.dev');
  
  // Set breakpoint here 🔴
  const links = await page.$$('a');
  
  for (let i = 0; i < links.length; i++) {
    const text = await links[i].textContent();
    
    // Conditional breakpoint: text?.includes('Get Started') 🔴
    if (text?.includes('Get Started')) {
      await links[i].click(); // ❌ Bug: Element might be stale
      break;
    }
  }
  
  await expect(page).toHaveURL(/.*docs.*/);
});
```

**Steps**:
1. Set breakpoint on line 4
2. Set conditional breakpoint on line 9
3. Step through code (F10)
4. Inspect `links` variable
5. Find the bug (stale element)
6. Fix it (use locator instead)

**Solution**:
```typescript
// Fixed version:
const links = page.getByRole('link');
const count = await links.count();

for (let i = 0; i < count; i++) {
  const text = await links.nth(i).textContent();
  if (text?.includes('Get Started')) {
    await links.nth(i).click(); // ✅ Fresh locator each time
    break;
  }
}
```

---

#### 3. Use Playwright Inspector ✅

**Run test with inspector**:
```bash
npx playwright test tests/example.spec.ts --debug
```

**Tasks**:
1. Use **Pick Locator** 🎯 to find 3 elements
2. Copy generated locators
3. Use them in a new test
4. Step through test action-by-action

**Template**:
```typescript
test('inspector practice', async ({ page }) => {
  await page.goto('https://playwright.dev');
  
  // TODO: Use Pick Locator to find:
  // 1. "Get Started" link
  // 2. Search box
  // 3. GitHub icon
  
  // Paste locators here:
  await page.getByRole('link', { name: 'Get Started' }).click();
});
```

---

#### 4. Analyze Trace File ✅

**Enable tracing**:
```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on', // Always record
  },
});
```

**Create a failing test**:
```typescript
test('intentional failure', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Get Started' }).click();
  
  // This will fail:
  await expect(page).toHaveURL('/wrong-url'); // ❌
});
```

**Tasks**:
1. Run test (it will fail)
2. Find trace file in `test-results/`
3. Open with `npx playwright show-trace trace.zip`
4. Analyze:
   - What was the expected URL?
   - What was the actual URL?
   - How long did navigation take?
   - What network requests happened?

---

### Practice Exercises

#### Exercise 1: Debug Timing Issues ⏳

```typescript
test('race condition bug', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Click button that loads data dynamically
  await page.click('#load-data');
  
  // Bug: Reads data before it loads ❌
  const data = await page.locator('#data-container').textContent();
  console.log(data); // Empty or wrong!
});
```

**Use debugger to**:
1. Set breakpoint after click
2. Check if data is loaded
3. Fix with proper wait:

```typescript
// Fixed:
await page.click('#load-data');
await page.waitForSelector('#data-container:has-text("Loaded")');
const data = await page.locator('#data-container').textContent();
```

---

#### Exercise 2: Network Debugging ⏳

**Task**: Use Trace Viewer to debug API calls

```typescript
test('debug API response', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // This triggers API call
  await page.getByRole('button', { name: 'Load More' }).click();
  
  // Expected: 20 products
  // Actual: Only 10 products
  const count = await page.locator('.product').count();
  expect(count).toBe(20); // Fails ❌
});
```

**Steps**:
1. Run test with trace enabled
2. Open trace viewer
3. Go to Network tab
4. Find API call (e.g., `GET /api/products`)
5. Check response body
6. See if API returns 10 or 20 products
7. Fix test or report API bug

---

#### Exercise 3: Log Points vs Console.log ⏳

**Task**: Refactor test to use Log Points instead of console.log

```typescript
test('with console logs', async ({ page }) => {
  await page.goto('https://example.com');
  console.log('Navigated to home page'); // Remove this
  
  await page.getByRole('link', { name: 'Products' }).click();
  console.log('Clicked Products link'); // Remove this
  
  const count = await page.locator('.product').count();
  console.log('Product count:', count); // Remove this
});
```

**Do**:
1. Remove all `console.log()` lines
2. Add Log Points on those lines instead
3. Run test - logs still appear!
4. No file changes needed ✅

---

### Challenge Exercise: Complete Debugging Workflow 🚀

**Scenario**: You have a flaky test that fails randomly

```typescript
test('flaky test', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Search for product
  await page.fill('[placeholder="Search"]', 'laptop');
  await page.keyboard.press('Enter');
  
  // Sometimes fails here:
  await page.getByText('Laptop Pro 15"').click();
  
  // Add to cart
  await page.click('button:has-text("Add to Cart")');
  
  // Verify
  await expect(page.locator('.cart-count')).toHaveText('1');
});
```

**Your Mission**:

1. **Enable full debugging**:
   - Trace: `'on'`
   - Video: `'on'`
   - Screenshots: `'on'`

2. **Run test 10 times** (to trigger flakiness):
```bash
for i in {1..10}; do npx playwright test flaky.spec.ts; done
```

3. **When it fails**:
   - Open trace viewer
   - Watch video
   - Analyze screenshots
   - Check network timing
   - Find root cause

4. **Possible issues**:
   - Product name changed?
   - Multiple products match?
   - Network slow, data not loaded?
   - Animation not finished?

5. **Fix using**:
   - Better selectors
   - Proper waits
   - Retry logic
   - Stable locators

**Example Fix**:
```typescript
// Instead of:
await page.getByText('Laptop Pro 15"').click();

// Use:
await page.getByRole('link', { name: /Laptop Pro/i }).first().click();
await page.waitForLoadState('networkidle');
```

---

## 📝 Key Takeaways

### Interview Questions

**Q1: What's the difference between console.log(), console.warn(), and console.error()?**

**A**:
- `console.log()`: General output (normal color)
- `console.warn()`: Warnings (yellow/orange, indicates potential issues)
- `console.error()`: Errors (red, indicates failures)

They help **visually categorize** debug output. In production logs, different levels can be filtered (e.g., show only errors).

---

**Q2: What is a breakpoint and how do you use it?**

**A**: A **breakpoint** pauses code execution at a specific line, allowing you to:
- Inspect variable values
- Step through code line-by-line
- Evaluate expressions
- Modify variables

**Set**: Click line margin or press F9  
**Use**: When code is paused, use Step Over (F10), Step Into (F11), or Step Out (Shift+F11)

---

**Q3: What is Playwright Trace Viewer and why is it useful?**

**A**: Trace Viewer is a tool that records every action, screenshot, network request, and DOM snapshot during test execution. It's useful for:
- Debugging failed tests (see exact failure point)
- Analyzing performance (network timing)
- CI/CD debugging (download and view locally)
- Understanding test flow (visual timeline)

**Enable**: Set `trace: 'on-first-retry'` in config  
**View**: `npx playwright show-trace trace.zip`

---

**Q4: How do you debug a test that passes locally but fails on CI?**

**A**:
1. **Enable traces** in playwright.config.ts: `trace: 'retain-on-failure'`
2. **Configure CI** to upload trace artifacts on failure
3. **Download trace.zip** from failed CI run
4. **View locally**: `npx playwright show-trace trace.zip`
5. **Analyze**: Check screenshots, network, console logs
6. **Common issues**: Timing differences, missing data, different viewport

---

**Q5: What's the difference between console.table() and console.log() for arrays?**

**A**:

```javascript
const products = [
  { name: 'Laptop', price: 999 },
  { name: 'Mouse', price: 29 }
];

console.log(products);
// Output: [Object, Object] - hard to compare

console.table(products);
// Output: Pretty table with columns - easy to compare
```

`console.table()` displays arrays/objects in a **formatted table**, making it much easier to **compare multiple items**.

---

## 🔗 Resources

### Official Documentation
- [Playwright Debugging](https://playwright.dev/docs/debug)
- [Playwright Inspector](https://playwright.dev/docs/inspector)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)

### Video
- [Debugging JavaScript. Playwright Inspector, Trace Viewer - Lesson 12](https://www.youtube.com/watch?v=your-video-id) by Ilarion Halushka

### Tools
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [VS Code Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

## 🎯 Summary

### What We Learned

1. ✅ **Console Methods**: log, warn, error, table, time/timeEnd
2. ✅ **VS Code Debugger**: Breakpoints, stepping, watches, log points
3. ✅ **Playwright Inspector**: Visual debugging with pick locator
4. ✅ **Trace Viewer**: Complete test execution recording
5. ✅ **CI Debugging**: Download and analyze traces from failed CI runs

### Debugging Tools Comparison

| Tool | Best For | Use Case |
|------|----------|----------|
| **console.log()** | Quick checks | Print variables |
| **VS Code Debugger** | Step-by-step | Complex logic bugs |
| **Playwright Inspector** | Locators | Find correct selectors |
| **Trace Viewer** | Test failures | Analyze what happened |
| **--headed** | Visual verification | See browser actions |

### Debugging Workflow

```
Test Fails
    ↓
1. Check error message
    ↓
2. Add console.log() for quick check
    ↓
3. Still unclear? → Set breakpoint
    ↓
4. Still unclear? → Run with --debug
    ↓
5. Still unclear? → Check trace viewer
    ↓
6. CI failure? → Download trace from CI
    ↓
Find Root Cause → Fix Bug → Verify
```

---

**Remember**: Start with simple `console.log()`, escalate to debugger only when needed! 🎯

---

**Last Updated**: December 18, 2025  
**Next Lecture**: Lesson 13 (TBD)
