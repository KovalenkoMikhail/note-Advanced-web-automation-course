# Playwright Actions & Interactions

**Source**: 52-minute lecture on web element interactions (keyboard and mouse)  
**Video**: [Web Automation Course Lesson 8 - Actions & Interactions](https://youtu.be/LESSON_8_VIDEO_ID)

---

## 🎯 Overview

Understanding how to interact with web elements using Playwright's action methods, what happens "under the hood" during these interactions, and performance considerations for different approaches.

---

## 🎬 YouTube Productivity Tips

### Keyboard Shortcuts

**Speed control:**
```
Shift + .    # Increase speed
Shift + ,    # Decrease speed
```

**Navigation:**
```
L            # Jump 10 seconds forward
J            # Jump 10 seconds backward
K            # Play/Pause
```

### Developer Hack: Beyond 2x Speed [05:20]

**Set custom playback rate in browser console:**
```javascript
document.querySelector('video').playbackRate = 3  // 3x speed
document.querySelector('video').playbackRate = 5  // 5x speed
```

**Why useful:**
- Watch lectures faster
- Review content quickly
- Time-saving for experienced learners

---

## ⌨️ Text Input Actions

### fill() - Standard Method [18:28]

**Fast copy-paste style input via CDP `insertText` command.**

**Basic usage:**
```typescript
// Fill text input
await page.getByLabel('Email').fill('test@example.com');

// Fill password
await page.getByPlaceholder('Password').fill('secret123');

// Clear and fill
await page.getByRole('textbox').fill('');  // Clear
await page.getByRole('textbox').fill('New text');
```

**How it works [22:08]:**
- Uses Chrome DevTools Protocol `insertText` command
- Effectively copy-pastes entire string at once
- **Fast** - completes in milliseconds
- Does NOT trigger individual `keydown`/`keyup` events

**Example:**
```typescript
test('login with fill()', async ({ page }) => {
  await page.goto('https://example.com/login');
  
  // Fast input
  await page.getByLabel('Username').fill('john.doe');
  await page.getByLabel('Password').fill('MyP@ssw0rd!');
  
  await page.getByRole('button', { name: 'Login' }).click();
});
```

**When to use:**
- ✅ Standard form filling
- ✅ Performance-critical scenarios
- ✅ Most reliable for general use
- ✅ Default choice for 99% of cases

---

### pressSequentially() - Human-Like Typing [12:36]

**Types characters one by one, much slower than fill().**

**Basic usage:**
```typescript
// Type character by character
await page.getByLabel('Search').pressSequentially('laptop');

// With delay between keystrokes
await page.getByLabel('Username').pressSequentially('john', { delay: 100 });
```

**How it works [25:59]:**
- Sends individual `keydown` and `keyup` events for each character
- Mimics human typing behavior
- **Slow** - takes time proportional to string length
- Triggers JavaScript keyboard event listeners

**Example with delay:**
```typescript
test('search with human typing', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Type slowly (100ms between characters)
  await page.getByPlaceholder('Search...').pressSequentially('automation testing', {
    delay: 100
  });
  
  await page.keyboard.press('Enter');
});
```

**When to use:**
- ⚠️ Site has specific keyboard listeners (e.g., autocomplete)
- ⚠️ Testing typing behavior explicitly
- ⚠️ Site blocks fast input (anti-bot detection)
- ⚠️ Demonstrating user experience

**Performance comparison:**
```typescript
// fill() - ~10ms
await page.locator('input').fill('Hello World');

// pressSequentially() - ~1100ms (11 chars × 100ms)
await page.locator('input').pressSequentially('Hello World', { delay: 100 });
```

---

### fill() vs pressSequentially() - Interview Question [18:10]

**Common interview topic - know the difference!**

| Aspect | fill() | pressSequentially() |
|--------|--------|---------------------|
| **Speed** | ⚡ Fast (milliseconds) | 🐌 Slow (seconds) |
| **Implementation** | CDP `insertText` | Individual key events |
| **Events fired** | `input`, `change` | `keydown`, `keypress`, `keyup`, `input` |
| **Use case** | Standard forms | Keyboard listener testing |
| **Reliability** | ✅ High | ⚠️ Can be flaky |
| **Best for** | Production tests | Edge cases only |

**When interviewer asks:**
> "What's the difference between fill() and pressSequentially()?"

**Answer:**
> "fill() uses the Chrome DevTools Protocol to insert text instantly (like copy-paste), making it fast and reliable. pressSequentially() types character-by-character with real keyboard events, mimicking human typing. I use fill() for 99% of cases because it's faster and more stable. pressSequentially() is only needed when the application specifically listens to individual keystroke events, like autocomplete or character counters."

---

## ☑️ Checkboxes & Radio Buttons [07:00]

### check() & uncheck()

**HTML:**
```html
<input type="checkbox" id="subscribe"> Subscribe to newsletter
<input type="radio" name="plan" value="premium"> Premium Plan
```

**Playwright:**
```typescript
// Check checkbox
await page.getByRole('checkbox', { name: 'Subscribe' }).check();

// Uncheck checkbox
await page.getByRole('checkbox', { name: 'Subscribe' }).uncheck();

// Check radio button
await page.getByRole('radio', { name: 'Premium Plan' }).check();
```

**With assertions:**
```typescript
// Verify checked state
await expect(page.getByRole('checkbox', { name: 'Subscribe' })).toBeChecked();
await expect(page.getByRole('checkbox', { name: 'Subscribe' })).not.toBeChecked();
```

**Smart behavior:**
- `check()` does nothing if already checked
- `uncheck()` does nothing if already unchecked
- Idempotent operations

**Example:**
```typescript
test('accept terms and conditions', async ({ page }) => {
  await page.goto('https://example.com/signup');
  
  // Check all required checkboxes
  await page.getByRole('checkbox', { name: 'I agree to Terms' }).check();
  await page.getByRole('checkbox', { name: 'I am 18+' }).check();
  
  // Select payment plan
  await page.getByRole('radio', { name: 'Monthly' }).check();
  
  // Verify
  await expect(page.getByRole('checkbox', { name: 'I agree to Terms' })).toBeChecked();
});
```

---

## 📝 Dropdown Selection [08:18]

### selectOption()

**HTML:**
```html
<select id="country">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</select>
```

**Select by value:**
```typescript
await page.locator('#country').selectOption('us');
```

**Select by label:**
```typescript
await page.locator('#country').selectOption({ label: 'United States' });
```

**Select by index:**
```typescript
await page.locator('#country').selectOption({ index: 0 });
```

**Select multiple (if multiple attribute exists):**
```typescript
await page.locator('#countries').selectOption(['us', 'uk', 'ca']);
```

**Example:**
```typescript
test('fill shipping form', async ({ page }) => {
  await page.goto('https://shop.example.com/checkout');
  
  // Select country
  await page.locator('#country').selectOption('us');
  
  // Select state
  await page.locator('#state').selectOption({ label: 'California' });
  
  // Verify selection
  await expect(page.locator('#country')).toHaveValue('us');
});
```

---

## 🖱️ Mouse Interactions

### click() - Real Mouse Click [42:13]

**Executes real click by moving mouse to coordinates, pressing down, releasing.**

**Basic usage:**
```typescript
// Simple click
await page.getByRole('button', { name: 'Submit' }).click();

// Click with options
await page.getByText('Add to Cart').click({
  button: 'right',     // Right click
  clickCount: 2,       // Double click
  delay: 100           // Hold for 100ms
});
```

**What happens under the hood [42:48]:**
```
1. Move mouse to element center coordinates
2. Mouse down event
3. Mouse up event
```

**Debug output:**
```
pw:protocol SEND ► {"method":"Input.dispatchMouseEvent","params":{"type":"mouseMoved","x":250,"y":100}}
pw:protocol SEND ► {"method":"Input.dispatchMouseEvent","params":{"type":"mousePressed","button":"left"}}
pw:protocol SEND ► {"method":"Input.dispatchMouseEvent","params":{"type":"mouseReleased","button":"left"}}
```

**Click options:**
```typescript
// Click at specific position
await page.locator('button').click({ position: { x: 10, y: 10 } });

// Click with modifier keys
await page.locator('a').click({ modifiers: ['Control'] });  // Ctrl+Click

// Multiple clicks
await page.locator('button').click({ clickCount: 3 });  // Triple click
```

**Example:**
```typescript
test('add products to cart', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Click multiple products
  await page.locator('.product-card').first().click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  // Go back
  await page.goBack();
  
  // Click another product
  await page.locator('.product-card').nth(1).click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
});
```

---

### dblclick() - Double Click [45:44]

**Perform double click action.**

```typescript
// Double click element
await page.locator('.file-item').dblclick();

// Open file in file manager
await page.getByText('document.pdf').dblclick();
```

**Use cases:**
- Opening files
- Selecting words
- Expanding tree nodes

---

### hover() - Mouse Over [09:18]

**Move mouse over element to trigger hover effects.**

```typescript
// Hover over element
await page.getByRole('link', { name: 'Products' }).hover();

// Wait for submenu to appear
await expect(page.locator('.submenu')).toBeVisible();

// Click submenu item
await page.getByRole('link', { name: 'Laptops' }).click();
```

**Example with dropdown menu:**
```typescript
test('navigate dropdown menu', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Hover over main menu
  await page.getByRole('link', { name: 'Products' }).hover();
  
  // Wait for submenu
  await page.waitForSelector('.submenu');
  
  // Click submenu item
  await page.locator('.submenu').getByText('Electronics').click();
  
  // Verify navigation
  await expect(page).toHaveURL(/electronics/);
});
```

---

### Force Click [11:55]

**Click elements that are technically covered by others.**

**When needed:**
- Element covered by overlay
- Element outside viewport
- Element temporarily hidden

```typescript
// Force click (bypass visibility checks)
await page.locator('button').click({ force: true });
```

**Example:**
```typescript
test('close modal by clicking overlay', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Open modal
  await page.getByRole('button', { name: 'Open Dialog' }).click();
  
  // Click overlay to close (overlay covers other elements)
  await page.locator('.modal-overlay').click({ force: true });
  
  // Verify modal closed
  await expect(page.locator('.modal')).not.toBeVisible();
});
```

**⚠️ Warning:** Force clicking bypasses actionability checks. Use only when necessary.

---

### Drag and Drop [14:56]

#### Automatic: dragTo()

**Simplest approach:**
```typescript
// Drag element to target
await page.locator('#source').dragTo(page.locator('#target'));
```

**Example:**
```typescript
test('drag task to done column', async ({ page }) => {
  await page.goto('https://example.com/kanban');
  
  // Drag task from "In Progress" to "Done"
  await page
    .locator('.task-card')
    .filter({ hasText: 'Write tests' })
    .dragTo(page.locator('.column[data-status="done"]'));
  
  // Verify task moved
  await expect(
    page.locator('.column[data-status="done"] .task-card').filter({ hasText: 'Write tests' })
  ).toBeVisible();
});
```

#### Manual: hover() + mouse.down() + hover() + mouse.up()

**Full control over drag operation:**
```typescript
test('manual drag and drop', async ({ page }) => {
  await page.goto('https://example.com/drag-demo');
  
  const source = page.locator('#source');
  const target = page.locator('#target');
  
  // Manual drag sequence
  await source.hover();           // Move to source
  await page.mouse.down();        // Press mouse button
  await target.hover();           // Move to target
  await page.mouse.up();          // Release mouse button
  
  // Verify
  await expect(target).toContainText('Dropped!');
});
```

---

## ⌨️ Keyboard Actions

### press() - Single Key

```typescript
// Press Enter
await page.keyboard.press('Enter');

// Press key combination
await page.keyboard.press('Control+A');  // Select all
await page.keyboard.press('Control+C');  // Copy
await page.keyboard.press('Control+V');  // Paste

// Press special keys
await page.keyboard.press('Escape');
await page.keyboard.press('Tab');
await page.keyboard.press('ArrowDown');
```

**Example:**
```typescript
test('keyboard navigation', async ({ page }) => {
  await page.goto('https://example.com/search');
  
  // Type search query
  await page.getByPlaceholder('Search...').fill('playwright');
  
  // Press Enter instead of clicking search button
  await page.keyboard.press('Enter');
  
  // Navigate results with arrow keys
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
});
```

### type() - Type String

```typescript
// Type text (similar to pressSequentially but through page.keyboard)
await page.keyboard.type('Hello World');

// With delay
await page.keyboard.type('Slow typing', { delay: 100 });
```

---

## 🚀 JavaScript Execution - Advanced

### page.evaluate() [32:54]

**Execute raw JavaScript in browser context.**

**Basic usage:**
```typescript
// Execute JS function
await page.evaluate(() => {
  document.querySelector('h1').textContent = 'Modified!';
});

// Return value from browser
const title = await page.evaluate(() => {
  return document.title;
});
console.log(title);
```

**Passing arguments:**
```typescript
// Pass data to browser context
const result = await page.evaluate((data) => {
  console.log('Data from Node:', data);
  return data.toUpperCase();
}, 'hello');

console.log(result);  // 'HELLO'
```

**Performance advantage [36:27]:**
```typescript
// SLOW: Multiple Playwright actions
for (let i = 0; i < 100; i++) {
  await page.locator(`#item-${i}`).click();
}

// FAST: Single JS execution
await page.evaluate(() => {
  for (let i = 0; i < 100; i++) {
    document.querySelector(`#item-${i}`).click();
  }
});
```

**⚠️ Important:** `page.evaluate()` skips Playwright's actionability checks:
- No visibility verification
- No stability checks
- No automatic waiting
- Runs directly in browser

**When to use:**
- Performance-critical operations
- Bulk DOM manipulations
- Getting computed values
- Setting up test data

**When NOT to use:**
- Standard user interactions (use Playwright actions)
- When actionability checks needed
- When auto-waiting is important

**Example:**
```typescript
test('bulk operations with evaluate', async ({ page }) => {
  await page.goto('https://example.com/products');
  
  // Get all product prices (fast)
  const prices = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.price'))
      .map(el => parseFloat(el.textContent.replace('$', '')));
  });
  
  console.log('Total products:', prices.length);
  console.log('Average price:', prices.reduce((a, b) => a + b) / prices.length);
  
  // Find cheapest product
  const minPrice = Math.min(...prices);
  console.log('Cheapest:', minPrice);
});
```

---

## 🎓 Actions Summary Table

| Action | Playwright Method | Use Case | Speed |
|--------|------------------|----------|-------|
| **Type text** | `locator.fill('text')` | Standard input | ⚡ Fast |
| **Human typing** | `locator.pressSequentially('text')` | Keyboard listeners | 🐌 Slow |
| **Click** | `locator.click()` | Buttons, links | ⚡ Fast |
| **Double click** | `locator.dblclick()` | Files, selections | ⚡ Fast |
| **Check/Uncheck** | `locator.check()` / `uncheck()` | Checkboxes | ⚡ Fast |
| **Hover** | `locator.hover()` | Menus, tooltips | ⚡ Fast |
| **Select option** | `locator.selectOption('value')` | Dropdowns | ⚡ Fast |
| **Press key** | `keyboard.press('Enter')` | Keyboard navigation | ⚡ Fast |
| **Drag & drop** | `locator.dragTo(target)` | Drag operations | ⚡ Fast |
| **Execute JS** | `page.evaluate(() => {...})` | Bulk operations | ⚡⚡ Fastest |

---

## 🎬 Practical Examples

### Example 1: Complete Form Submission

```typescript
test('submit registration form', async ({ page }) => {
  await page.goto('https://example.com/register');
  
  // Fill text inputs
  await page.getByLabel('First Name').fill('John');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByLabel('Email').fill('john.doe@example.com');
  await page.getByLabel('Password').fill('SecureP@ss123');
  
  // Select dropdown
  await page.locator('#country').selectOption('us');
  
  // Check checkbox
  await page.getByRole('checkbox', { name: 'I agree to terms' }).check();
  
  // Select radio button
  await page.getByRole('radio', { name: 'Individual' }).check();
  
  // Submit form
  await page.getByRole('button', { name: 'Register' }).click();
  
  // Verify success
  await expect(page.getByText('Registration successful')).toBeVisible();
});
```

### Example 2: Shopping Cart

```typescript
test('add items and checkout', async ({ page }) => {
  await page.goto('https://shop.example.com');
  
  // Search with human typing (for autocomplete)
  await page.getByPlaceholder('Search products...').pressSequentially('laptop', {
    delay: 50
  });
  
  // Wait for autocomplete
  await page.waitForSelector('.autocomplete-suggestions');
  
  // Press arrow down and Enter
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  // Add to cart
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  
  // Hover over cart icon to see preview
  await page.locator('.cart-icon').hover();
  await expect(page.locator('.cart-preview')).toBeVisible();
  
  // Click checkout
  await page.getByRole('link', { name: 'Checkout' }).click();
});
```

### Example 3: Drag and Drop Builder

```typescript
test('build layout with drag and drop', async ({ page }) => {
  await page.goto('https://example.com/page-builder');
  
  // Drag widgets from palette to canvas
  await page
    .locator('.widget[data-type="header"]')
    .dragTo(page.locator('.canvas-dropzone'));
  
  await page
    .locator('.widget[data-type="text"]')
    .dragTo(page.locator('.canvas-dropzone'));
  
  await page
    .locator('.widget[data-type="button"]')
    .dragTo(page.locator('.canvas-dropzone'));
  
  // Verify widgets added
  await expect(page.locator('.canvas-dropzone .widget')).toHaveCount(3);
  
  // Save layout
  await page.getByRole('button', { name: 'Save' }).click();
});
```

### Example 4: Keyboard Shortcuts

```typescript
test('use keyboard shortcuts', async ({ page }) => {
  await page.goto('https://example.com/editor');
  
  // Type content
  await page.locator('.editor').fill('Hello World');
  
  // Select all
  await page.keyboard.press('Control+A');
  
  // Bold
  await page.keyboard.press('Control+B');
  
  // Verify formatting applied
  await expect(page.locator('.editor strong')).toHaveText('Hello World');
  
  // Undo
  await page.keyboard.press('Control+Z');
  
  // Save with keyboard
  await page.keyboard.press('Control+S');
  
  // Verify save message
  await expect(page.getByText('Saved')).toBeVisible();
});
```

### Example 5: Performance with evaluate()

```typescript
test('bulk data extraction', async ({ page }) => {
  await page.goto('https://example.com/products');
  
  // Extract all product data at once (fast)
  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-card')).map(card => ({
      name: card.querySelector('.name')?.textContent?.trim(),
      price: card.querySelector('.price')?.textContent?.trim(),
      inStock: card.querySelector('.in-stock') !== null,
      rating: parseFloat(card.querySelector('.rating')?.textContent || '0')
    }));
  });
  
  console.log(`Found ${products.length} products`);
  
  // Filter in Node.js
  const inStockProducts = products.filter(p => p.inStock);
  const highRated = products.filter(p => p.rating >= 4.5);
  
  console.log(`In stock: ${inStockProducts.length}`);
  console.log(`High rated: ${highRated.length}`);
});
```

---

## 💡 Best Practices

### ✅ DO

```typescript
// Use fill() for standard text input
await page.getByLabel('Email').fill('test@example.com');

// Use check()/uncheck() for checkboxes
await page.getByRole('checkbox').check();

// Use specific actions for their purpose
await page.locator('button').click();
await page.locator('input').hover();

// Use keyboard.press() for keyboard navigation
await page.keyboard.press('Enter');

// Use evaluate() for bulk operations
await page.evaluate(() => { /* bulk work */ });
```

### ❌ DON'T

```typescript
// Don't use pressSequentially() when fill() works
await page.locator('input').pressSequentially('slow');  // Bad
await page.locator('input').fill('fast');               // Good

// Don't force click unless necessary
await page.locator('button').click({ force: true });    // Avoid

// Don't use evaluate() for single interactions
await page.evaluate(() => {                             // Bad
  document.querySelector('button').click();
});
await page.locator('button').click();                   // Good

// Don't chain too many actions without verification
await page.locator('button').click();
await page.locator('input').fill('text');
await page.locator('submit').click();
// Add assertions between steps!
```

---

## 🐛 Debugging Actions

### Enable Debug Logs

**See CDP commands:**
```bash
DEBUG=pw:protocol npx playwright test
```

**Example output for click():**
```
pw:protocol SEND ► {"method":"Input.dispatchMouseEvent","params":{"type":"mouseMoved","x":250,"y":100}}
pw:protocol SEND ► {"method":"Input.dispatchMouseEvent","params":{"type":"mousePressed","button":"left"}}
pw:protocol SEND ► {"method":"Input.dispatchMouseEvent","params":{"type":"mouseReleased","button":"left"}}
```

### Debug Mode

```bash
npx playwright test --debug
```

**Features:**
- Step through actions
- Inspect elements
- Test locators
- See action sequence

---

## 📚 Homework

### Required Tasks:

1. ✅ Practice using `fill()` vs `pressSequentially()`
2. ✅ Implement form submission test
3. ✅ Create drag and drop test
4. ✅ Use `hover()` for dropdown menus
5. ✅ Experiment with `page.evaluate()`
6. ✅ Try keyboard navigation with `keyboard.press()`
7. ✅ Compare performance: Playwright actions vs `evaluate()`

### Practice Exercises:

**Exercise 1**: Fill registration form
```typescript
test('registration form', async ({ page }) => {
  // TODO: Fill all fields
  // TODO: Select country dropdown
  // TODO: Check terms checkbox
  // TODO: Submit form
  // TODO: Verify success message
});
```

**Exercise 2**: Test autocomplete with pressSequentially()
```typescript
test('autocomplete search', async ({ page }) => {
  // TODO: Type slowly to trigger autocomplete
  // TODO: Wait for suggestions
  // TODO: Navigate with arrow keys
  // TODO: Press Enter to select
});
```

**Exercise 3**: Drag and drop sorting
```typescript
test('reorder items by drag', async ({ page }) => {
  // TODO: Drag item from position 3 to position 1
  // TODO: Verify new order
});
```

### Challenge:

**Interview preparation:**
> Explain the difference between `fill()` and `pressSequentially()` with code examples and use cases.

**Create test that:**
- Fills form with `fill()`
- Times the execution
- Fills same form with `pressSequentially()`
- Times the execution
- Compares performance

---

## ⏭️ Next Lesson Preview [51:34]

**Lesson 9 will cover:**
- **Assertions**: Verifying element states and content
- **AAA Pattern**: Arrange-Act-Assert test structure
- **Best practices**: Writing maintainable tests

---

## 🔗 Resources

- **Video**: [Lesson 8 - Actions & Interactions](https://youtu.be/LESSON_8_VIDEO_ID)
- **Course GitHub**: [Playwright Course Repository](https://github.com/playwright-course)
- **Playwright Docs**: [Actions Guide](https://playwright.dev/docs/input)
- **CDP Protocol**: [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

---

## 🎓 Key Takeaways

1. **fill() is default** - Fast, reliable, use for 99% of text input
2. **pressSequentially() for edge cases** - Only when keyboard listeners needed
3. **Know the interview answer** - fill() vs pressSequentially() difference
4. **click() is smart** - Automatically moves mouse and performs real click
5. **hover() for menus** - Trigger hover effects and dropdowns
6. **dragTo() for drag-drop** - Simple automatic drag and drop
7. **evaluate() for performance** - Bulk operations in browser context
8. **check()/uncheck() for booleans** - Idempotent checkbox operations
9. **keyboard.press() for navigation** - Use keyboard shortcuts
10. **Debug with logs** - See CDP commands with DEBUG=pw:protocol

---

**Mastering actions is essential for realistic test automation!** 🎯
