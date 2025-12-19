# 📦 Lecture 11: Page Object, Page Component & OOP Composition

**Course**: Playwright JavaScript Automation Course  
**Instructor**: Ilarion Halushka  
**Video**: [Page Object, Page Component, OOP Composition - Lesson 11](https://www.youtube.com/watch?v=your-video-id)  
**Date**: December 18, 2025

---

## 🎯 Learning Objectives

By the end of this lecture, you will:
- ✅ Understand the **Page Component Pattern** for reusable UI elements
- ✅ Implement the **Page Object Pattern** for entire pages
- ✅ Apply **OOP Composition** to build maintainable test architecture
- ✅ Know when to use these patterns vs. keeping tests simple
- ✅ Refactor tests from locators-in-tests to organized Page Objects

---

## 📋 Table of Contents

1. [The Problem: Code Duplication](#the-problem)
2. [Page Component Pattern](#page-component-pattern)
3. [Page Object Pattern](#page-object-pattern)
4. [OOP Composition](#oop-composition)
5. [Pros and Cons](#pros-and-cons)
6. [Real-World Application](#real-world-application)
7. [Homework](#homework)

---

## 🚨 The Problem: Code Duplication {#the-problem}

### Before Refactoring

**Test File 1:**
```typescript
test('navigate to home', async ({ page }) => {
  await page.goto('https://example.com');
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('/home');
});
```

**Test File 2:**
```typescript
test('navigate to about', async ({ page }) => {
  await page.goto('https://example.com');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL('/about');
});
```

**Test File 3:**
```typescript
test('navigate to contact', async ({ page }) => {
  await page.goto('https://example.com');
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL('/contact');
});
```

### Issues [01:37]

1. **Repeated Navigation Code**: Every test has the same navigation logic
2. **Hard to Maintain**: If navigation changes, must update ALL test files
3. **Locators Scattered Everywhere**: No single source of truth
4. **Tests Are Too Technical**: Reading `.getByRole()` calls doesn't clearly express user intent

**Solution**: Extract repeated UI interactions into reusable components and page objects.

---

## 🧩 Page Component Pattern {#page-component-pattern}

### What is a Page Component? [00:17]

A **Page Component** represents a **reusable section** of a web page that appears across multiple pages:

- 🔹 Navigation bar (header)
- 🔹 Footer
- 🔹 Sidebar
- 🔹 Login form
- 🔹 Contact form
- 🔹 Shopping cart widget
- 🔹 Search box

### Why Use Page Components?

| Without Component | With Component |
|-------------------|----------------|
| Write locators in every test | Write locators once |
| `page.getByRole('link', { name: 'Home' }).click()` | `topNav.navigateToHome()` |
| 50 lines of repeated code | 1 line method call |
| Update 20 files if UI changes | Update 1 file |

---

### Implementation Example [09:59]

#### Step 1: Create Component File

**File**: `page-components/TopNavigationComponent.ts`

```typescript
import { Page, Locator } from '@playwright/test';

export class TopNavigationComponent {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly contactLink: Locator;
  readonly productsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Define all navigation locators once
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.aboutLink = page.getByRole('link', { name: 'About' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
  }

  // Reusable methods for common actions
  async navigateToHome() {
    await this.homeLink.click();
  }

  async navigateToAbout() {
    await this.aboutLink.click();
  }

  async navigateToContact() {
    await this.contactLink.click();
  }

  async navigateToProducts() {
    await this.productsLink.click();
  }

  // Verify navigation is visible
  async expectVisible() {
    await expect(this.homeLink).toBeVisible();
  }
}
```

#### Step 2: Create Footer Component

**File**: `page-components/FooterComponent.ts`

```typescript
export class FooterComponent {
  readonly page: Page;
  readonly copyrightText: Locator;
  readonly privacyLink: Locator;
  readonly termsLink: Locator;
  readonly socialMediaLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.copyrightText = page.locator('.footer__copyright');
    this.privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    this.termsLink = page.getByRole('link', { name: 'Terms of Service' });
    this.socialMediaLinks = page.locator('.footer__social a');
  }

  async expectCopyrightYear(year: number) {
    await expect(this.copyrightText).toContainText(year.toString());
  }

  async clickPrivacyPolicy() {
    await this.privacyLink.click();
  }

  async getSocialMediaLinksCount() {
    return await this.socialMediaLinks.count();
  }
}
```

#### Step 3: Create Contact Form Component

**File**: `page-components/ContactUsComponent.ts`

```typescript
export class ContactUsComponent {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly messageTextarea: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel('Your Name');
    this.emailInput = page.getByLabel('Email Address');
    this.messageTextarea = page.getByLabel('Message');
    this.submitButton = page.getByRole('button', { name: 'Send Message' });
    this.successMessage = page.locator('.alert-success');
  }

  async fillContactForm(name: string, email: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.messageTextarea.fill(message);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async expectSuccessMessage(text: string) {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(text);
  }

  // Complete flow method
  async sendMessage(name: string, email: string, message: string) {
    await this.fillContactForm(name, email, message);
    await this.submitForm();
  }
}
```

---

## 📄 Page Object Pattern {#page-object-pattern}

### What is a Page Object? [22:28]

A **Page Object** represents an **entire web page** and composes multiple **Page Components** together.

**Think of it like this:**
- 🏗️ **Page Object** = The whole building
- 🧱 **Page Components** = Individual rooms (kitchen, bathroom, bedroom)

### Structure

```
Page Object (ContactUsPage)
├── TopNavigationComponent (header)
├── ContactUsComponent (main form)
└── FooterComponent (footer)
```

---

### Implementation Example [23:57]

#### Contact Us Page Object

**File**: `page-objects/ContactUsPage.ts`

```typescript
import { Page, Locator } from '@playwright/test';
import { TopNavigationComponent } from '../page-components/TopNavigationComponent';
import { ContactUsComponent } from '../page-components/ContactUsComponent';
import { FooterComponent } from '../page-components/FooterComponent';

export class ContactUsPage {
  readonly page: Page;
  readonly url = '/contact';
  
  // Page-specific elements
  readonly pageHeading: Locator;
  readonly breadcrumb: Locator;
  
  // Composed components
  readonly topNav: TopNavigationComponent;
  readonly contactForm: ContactUsComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    
    // Page-specific locators
    this.pageHeading = page.getByRole('heading', { name: 'Contact Us' });
    this.breadcrumb = page.locator('.breadcrumb');
    
    // Initialize components (OOP Composition!)
    this.topNav = new TopNavigationComponent(page);
    this.contactForm = new ContactUsComponent(page);
    this.footer = new FooterComponent(page);
  }

  // Navigate to this page
  async goto() {
    await this.page.goto(this.url);
  }

  // Verify page loaded correctly
  async expectLoaded() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.page).toHaveURL(this.url);
  }

  // High-level business action
  async submitContactRequest(name: string, email: string, message: string) {
    await this.goto();
    await this.contactForm.sendMessage(name, email, message);
    await this.contactForm.expectSuccessMessage('Thank you');
  }
}
```

---

#### Products Page Object

**File**: `page-objects/ProductsPage.ts`

```typescript
export class ProductsPage {
  readonly page: Page;
  readonly url = '/products';
  
  // Page-specific elements
  readonly pageHeading: Locator;
  readonly productCards: Locator;
  readonly searchBox: Locator;
  readonly filterDropdown: Locator;
  
  // Composed components
  readonly topNav: TopNavigationComponent;
  readonly footer: FooterComponent;

  constructor(page: Page) {
    this.page = page;
    
    this.pageHeading = page.getByRole('heading', { name: 'Our Products' });
    this.productCards = page.locator('.product-card');
    this.searchBox = page.getByPlaceholder('Search products...');
    this.filterDropdown = page.getByLabel('Filter by category');
    
    this.topNav = new TopNavigationComponent(page);
    this.footer = new FooterComponent(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async searchProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async selectProduct(index: number) {
    await this.productCards.nth(index).click();
  }

  async filterByCategory(category: string) {
    await this.filterDropdown.selectOption(category);
  }
}
```

---

## 🏗️ OOP Composition {#oop-composition}

### What is Composition? [34:09]

**OOP Composition** means building complex objects by combining simpler objects, rather than using inheritance.

**Formula:**
```
Page Object = Component₁ + Component₂ + Component₃ + Page-Specific Elements
```

### Example: Payment Page [30:58]

**File**: `page-objects/PaymentPage.ts`

```typescript
import { BillingDetailsComponent } from '../page-components/BillingDetailsComponent';
import { PaymentDetailsComponent } from '../page-components/PaymentDetailsComponent';
import { SuccessScreenComponent } from '../page-components/SuccessScreenComponent';

export class PaymentPage {
  readonly page: Page;
  readonly url = '/checkout/payment';
  
  // Composed components
  readonly billingDetails: BillingDetailsComponent;
  readonly paymentDetails: PaymentDetailsComponent;
  readonly successScreen: SuccessScreenComponent;
  readonly topNav: TopNavigationComponent;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize all components
    this.billingDetails = new BillingDetailsComponent(page);
    this.paymentDetails = new PaymentDetailsComponent(page);
    this.successScreen = new SuccessScreenComponent(page);
    this.topNav = new TopNavigationComponent(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  // High-level method combining multiple components
  async completePayment(
    billingInfo: { name: string; address: string; zip: string },
    paymentInfo: { cardNumber: string; expiry: string; cvv: string }
  ) {
    // Step 1: Fill billing details
    await this.billingDetails.fillBillingForm(
      billingInfo.name,
      billingInfo.address,
      billingInfo.zip
    );
    
    // Step 2: Fill payment details
    await this.paymentDetails.fillPaymentForm(
      paymentInfo.cardNumber,
      paymentInfo.expiry,
      paymentInfo.cvv
    );
    
    // Step 3: Submit
    await this.paymentDetails.clickSubmit();
    
    // Step 4: Verify success
    await this.successScreen.expectOrderConfirmation();
  }
}
```

---

### Component Files

**File**: `page-components/BillingDetailsComponent.ts`

```typescript
export class BillingDetailsComponent {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly zipInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel('Full Name');
    this.addressInput = page.getByLabel('Billing Address');
    this.zipInput = page.getByLabel('ZIP Code');
  }

  async fillBillingForm(name: string, address: string, zip: string) {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    await this.zipInput.fill(zip);
  }
}
```

**File**: `page-components/PaymentDetailsComponent.ts`

```typescript
export class PaymentDetailsComponent {
  readonly page: Page;
  readonly cardNumberInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardNumberInput = page.getByLabel('Card Number');
    this.expiryInput = page.getByLabel('Expiry Date');
    this.cvvInput = page.getByLabel('CVV');
    this.submitButton = page.getByRole('button', { name: 'Pay Now' });
  }

  async fillPaymentForm(cardNumber: string, expiry: string, cvv: string) {
    await this.cardNumberInput.fill(cardNumber);
    await this.expiryInput.fill(expiry);
    await this.cvvInput.fill(cvv);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }
}
```

**File**: `page-components/SuccessScreenComponent.ts`

```typescript
export class SuccessScreenComponent {
  readonly page: Page;
  readonly confirmationMessage: Locator;
  readonly orderNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationMessage = page.locator('.success-message');
    this.orderNumber = page.locator('.order-number');
  }

  async expectOrderConfirmation() {
    await expect(this.confirmationMessage).toBeVisible();
    await expect(this.confirmationMessage).toContainText('Payment Successful');
  }

  async getOrderNumber(): Promise<string> {
    return await this.orderNumber.innerText();
  }
}
```

---

## 🎬 Using Page Objects in Tests

### Before: Test with Direct Locators

```typescript
test('submit contact form', async ({ page }) => {
  // Navigate
  await page.goto('https://example.com/contact');
  
  // Fill form
  await page.getByLabel('Your Name').fill('John Doe');
  await page.getByLabel('Email Address').fill('john@example.com');
  await page.getByLabel('Message').fill('Hello, I need help!');
  
  // Submit
  await page.getByRole('button', { name: 'Send Message' }).click();
  
  // Verify
  await expect(page.locator('.alert-success')).toBeVisible();
  await expect(page.locator('.alert-success')).toContainText('Thank you');
});
```

**Issues:**
- ❌ 10+ lines of technical locator code
- ❌ Hard to read and understand business logic
- ❌ If UI changes, must update every test

---

### After: Test with Page Objects [20:28]

```typescript
import { test } from '@playwright/test';
import { ContactUsPage } from './page-objects/ContactUsPage';

test('submit contact form', async ({ page }) => {
  const contactPage = new ContactUsPage(page);
  
  await contactPage.submitContactRequest(
    'John Doe',
    'john@example.com',
    'Hello, I need help!'
  );
});
```

**Benefits:**
- ✅ **3 lines** instead of 10+
- ✅ Reads like user story: "Submit contact request"
- ✅ All locators live in Page Object (single source of truth)
- ✅ If UI changes, update 1 file instead of 20 tests

---

### Complex Flow with Multiple Pages

```typescript
test('complete purchase flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const paymentPage = new PaymentPage(page);
  
  // Step 1: Navigate to products
  await homePage.goto();
  await homePage.topNav.navigateToProducts();
  
  // Step 2: Search and add to cart
  await productsPage.searchProduct('Laptop');
  await productsPage.selectProduct(0);
  await productsPage.addToCart();
  
  // Step 3: Go to cart and checkout
  await cartPage.goto();
  await cartPage.proceedToCheckout();
  
  // Step 4: Complete payment
  await paymentPage.completePayment(
    { name: 'John Doe', address: '123 Main St', zip: '12345' },
    { cardNumber: '4111111111111111', expiry: '12/25', cvv: '123' }
  );
  
  // Step 5: Verify success
  const orderNumber = await paymentPage.successScreen.getOrderNumber();
  console.log(`Order placed: ${orderNumber}`);
});
```

**This test reads like a story!** ✨

---

## ⚖️ Pros and Cons {#pros-and-cons}

### ✅ Advantages [36:05]

#### 1. Code Reusability
Write a method **once**, use it **everywhere**:

```typescript
// Without Page Object: Copy-paste 50 times
await page.getByLabel('Email').fill('test@example.com');
await page.getByLabel('Password').fill('password123');
await page.getByRole('button', { name: 'Login' }).click();

// With Page Object: One line
await loginPage.login('test@example.com', 'password123');
```

#### 2. Readability [20:28]
Tests become **human-readable**:

```typescript
// Before: Technical gibberish
await page.locator('#nav > ul > li:nth-child(3) > a').click();

// After: Clear intent
await topNav.navigateToContact();
```

#### 3. Maintainability [37:19]
**One change, one place**:

```typescript
// UI changed from <input id="email"> to <input name="user-email">

// Without Page Object: Update 100+ test files ❌
await page.locator('#email').fill('test@test.com');

// With Page Object: Update 1 component file ✅
// EmailComponent.ts
this.emailInput = page.locator('[name="user-email"]');
```

#### 4. Testability
Easy to mock components for unit testing.

#### 5. Team Collaboration
New team members understand structure quickly:
```
page-objects/
├── HomePage.ts
├── ContactUsPage.ts
└── ProductsPage.ts

page-components/
├── TopNavigationComponent.ts
├── FooterComponent.ts
└── ContactFormComponent.ts
```

---

### ❌ Disadvantages [37:50]

#### 1. Increased Complexity [37:50]
**More files to manage**:

```
Before (simple):
tests/
├── test1.spec.ts
├── test2.spec.ts
└── test3.spec.ts

After (structured):
tests/
├── page-objects/
│   ├── HomePage.ts
│   ├── ContactPage.ts
│   └── ProductsPage.ts
├── page-components/
│   ├── TopNav.ts
│   ├── Footer.ts
│   └── ContactForm.ts
└── specs/
    ├── test1.spec.ts
    ├── test2.spec.ts
    └── test3.spec.ts
```

**More files = more mental overhead**

#### 2. Time Consuming [38:57]
Refactoring takes **significant effort**:

| Task | Time Estimate |
|------|---------------|
| Write simple test | 10 minutes |
| Identify repeated components | 30 minutes |
| Create Page Components | 2 hours |
| Create Page Objects | 2 hours |
| Refactor all tests | 4 hours |
| **Total** | **8+ hours** |

#### 3. Over-Engineering [40:53]
For **small projects**, it's overkill:

```typescript
// Project: 5 tests total
// Do you really need Page Objects? 🤔

// Simple is better:
test('check homepage title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Welcome');
});

// No need for:
// - HomePage.ts
// - HomePageComponent.ts
// - Complicated folder structure
```

#### 4. Learning Curve
New developers need to learn your architecture before writing tests.

#### 5. Abstraction Can Hide Details
Sometimes you need to see the raw locator:

```typescript
// With Page Object: "Magic" happens somewhere
await loginPage.login(email, password);

// Without: Clear what's happening
await page.getByLabel('Email').fill(email);
await page.getByLabel('Password').fill(password);
```

---

### When to Use Page Objects? 🤔

| Project Size | Recommendation |
|--------------|----------------|
| **1-10 tests** | ❌ Keep it simple, direct locators |
| **10-50 tests** | ⚠️ Consider for repeated components only |
| **50+ tests** | ✅ Definitely use Page Objects |
| **100+ tests** | ✅✅ Mandatory! Otherwise unmaintainable |

**Rule of Thumb**: If you copy-paste code **3+ times**, extract it into a component.

---

## 🌐 Real-World Application [41:27]

### UI Development Uses Same Patterns! [44:35]

These patterns aren't just for testing—**real production UI code** uses the exact same architecture.

#### React.js Example

**Container (Page Object):**
```jsx
// ContactUsPage.jsx
import TopNavigation from './components/TopNavigation';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function ContactUsPage() {
  return (
    <div className="contact-page">
      <TopNavigation />
      <h1>Contact Us</h1>
      <ContactForm />
      <Footer />
    </div>
  );
}

export default ContactUsPage;
```

**Components (Page Components):**
```jsx
// components/TopNavigation.jsx
function TopNavigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}

// components/ContactForm.jsx
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    // Submit logic
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
```

**See the similarity?** Your test architecture mirrors the production code structure! 🎯

---

## 📚 Homework {#homework}

### Required Tasks

#### 1. Identify Repeated Code ✅
Review your existing tests and find:
- Which navigation code is repeated?
- Which form-filling logic appears multiple times?
- Which assertions are copy-pasted?

**Goal**: Make a list of at least 3 components to extract.

---

#### 2. Create Your First Page Component ✅
Extract a **TopNavigationComponent**:

**File**: `page-components/TopNavigationComponent.ts`

```typescript
import { Page, Locator } from '@playwright/test';

export class TopNavigationComponent {
  readonly page: Page;
  // TODO: Add your navigation locators here
  
  constructor(page: Page) {
    this.page = page;
    // TODO: Initialize locators
  }
  
  // TODO: Add navigation methods
  async navigateToHome() {
    // Your code here
  }
}
```

**Test it:**
```typescript
test('navigation works', async ({ page }) => {
  const topNav = new TopNavigationComponent(page);
  await page.goto('https://your-site.com');
  await topNav.navigateToHome();
});
```

---

#### 3. Create a Simple Page Object ✅
Create a Page Object for one page on your site:

**Requirements:**
- Must compose at least 1 component (TopNavigation)
- Must have at least 3 page-specific locators
- Must have a `goto()` method
- Must have at least 1 business-logic method

**Template:**
```typescript
import { TopNavigationComponent } from '../page-components/TopNavigationComponent';

export class HomePage {
  readonly page: Page;
  readonly url = '/';
  
  // Components
  readonly topNav: TopNavigationComponent;
  
  // Page-specific locators
  readonly pageHeading: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.topNav = new TopNavigationComponent(page);
    this.pageHeading = page.getByRole('heading', { level: 1 });
  }
  
  async goto() {
    await this.page.goto(this.url);
  }
  
  async expectLoaded() {
    await expect(this.pageHeading).toBeVisible();
  }
}
```

---

#### 4. Refactor 3 Existing Tests ✅
Take 3 of your current tests and refactor them to use Page Objects.

**Before:**
```typescript
test('test 1', async ({ page }) => {
  await page.goto('...');
  await page.getByRole('link').click();
  // ... 20 lines of locators
});
```

**After:**
```typescript
test('test 1', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.topNav.navigateToContact();
});
```

**Measure:**
- How many lines did you save?
- Is the test more readable?

---

### Practice Exercises

#### Exercise 1: Footer Component ⏳
Create a `FooterComponent` with:
- Copyright text locator
- Social media links
- Method: `expectCopyrightYear(year: number)`
- Method: `clickSocialMedia(platform: string)`

---

#### Exercise 2: Login Component ⏳
Create a `LoginComponent` with:
- Email input
- Password input
- Submit button
- Error message locator
- Method: `login(email, password)`
- Method: `expectErrorMessage(text)`

---

#### Exercise 3: Multi-Component Page ⏳
Create a **ProductPage** that composes:
- TopNavigationComponent
- ProductDetailsComponent (name, price, description)
- AddToCartComponent (quantity, add button)
- FooterComponent

Write a test that:
1. Navigates to product page
2. Verifies product details
3. Adds to cart
4. Verifies success

---

#### Exercise 4: Compare Architectures 🏆
Create the **same test twice**:

**Version A**: Direct locators (no Page Objects)  
**Version B**: Using Page Objects

**Compare:**
| Metric | Version A | Version B |
|--------|-----------|-----------|
| Lines of code | ? | ? |
| Readability (1-10) | ? | ? |
| Time to write | ? | ? |
| Time to refactor if UI changes | ? | ? |

---

### Challenge Exercise: E-commerce Flow 🚀

Build a complete e-commerce test architecture:

**Components:**
- `TopNavigationComponent`
- `ProductCardComponent`
- `ShoppingCartComponent`
- `CheckoutFormComponent`
- `PaymentComponent`

**Page Objects:**
- `HomePage`
- `ProductsPage`
- `ProductDetailPage`
- `CartPage`
- `CheckoutPage`

**Test:**
```typescript
test('complete purchase flow', async ({ page }) => {
  // 1. Browse products
  // 2. Search for item
  // 3. Add to cart
  // 4. Proceed to checkout
  // 5. Fill billing info
  // 6. Complete payment
  // 7. Verify order confirmation
});
```

**Goal**: The entire test should be **less than 15 lines** by using well-designed Page Objects!

---

## 📝 Key Takeaways

### Interview Questions

**Q1: What is the Page Object Pattern?**

**A**: The Page Object Pattern is a design pattern where each web page is represented as a class. The class encapsulates:
- Page-specific locators
- Methods for user actions
- Composed components

This creates a single source of truth for page interactions. If UI changes, you update the Page Object once, not every test.

---

**Q2: What is the difference between Page Object and Page Component?**

**A**: 
- **Page Component**: Represents a reusable section that appears across multiple pages (e.g., navigation bar, footer, login form)
- **Page Object**: Represents an entire page and composes multiple components together

Example: `ContactUsPage` (Page Object) contains `TopNavigationComponent`, `ContactFormComponent`, and `FooterComponent` (Page Components).

---

**Q3: What is OOP Composition?**

**A**: OOP Composition means building complex objects by combining simpler objects. In testing:
```typescript
class PaymentPage {
  billingDetails: BillingDetailsComponent;
  paymentDetails: PaymentDetailsComponent;
  successScreen: SuccessScreenComponent;
}
```

Instead of inheritance (PaymentPage extends BasePage), we compose different components together. This is more flexible because a page can contain any combination of components.

---

**Q4: When should you NOT use Page Objects?**

**A**: Avoid Page Objects when:
1. **Small project**: Less than 10 tests—the overhead isn't worth it
2. **Prototype/spike**: Quick exploratory testing
3. **One-off tests**: Tests that won't be maintained long-term
4. **Learning phase**: When first learning Playwright, focus on basics first

**Rule**: If you copy-paste code less than 3 times, don't extract it yet.

---

**Q5: What are the main benefits of Page Objects?**

**A**:
1. **Reusability**: Write once, use everywhere
2. **Maintainability**: UI change = update one file, not 50 tests
3. **Readability**: Tests read like user stories, not technical code
4. **Single Source of Truth**: All locators for a page live in one place
5. **Testability**: Easy to mock components for unit testing

---

## 🔗 Resources

### Official Documentation
- [Playwright Page Object Models](https://playwright.dev/docs/pom)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

### Video
- [Page Object, Page Component, OOP Composition - Lesson 11](https://www.youtube.com/watch?v=your-video-id) by Ilarion Halushka

### Further Reading
- Martin Fowler: [Page Object](https://martinfowler.com/bliki/PageObject.html)
- Selenium Guide: [Page Object Models](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

---

## 📂 Recommended Folder Structure

```
tests/
├── page-objects/
│   ├── HomePage.ts
│   ├── ContactUsPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── page-components/
│   ├── TopNavigationComponent.ts
│   ├── FooterComponent.ts
│   ├── LoginComponent.ts
│   ├── ContactFormComponent.ts
│   └── ProductCardComponent.ts
├── specs/
│   ├── home.spec.ts
│   ├── contact.spec.ts
│   └── purchase-flow.spec.ts
└── test-data/
    └── users.json
```

---

## 🎯 Summary

### What We Learned

1. ✅ **Page Component Pattern**: Extract reusable UI sections (nav, footer, forms)
2. ✅ **Page Object Pattern**: Represent entire pages as classes
3. ✅ **OOP Composition**: Build Page Objects by composing Components
4. ✅ **Pros**: Reusability, maintainability, readability
5. ✅ **Cons**: Complexity, time investment, potential over-engineering
6. ✅ **Real-world**: UI development uses the same patterns

### When to Use

| Tests Count | Recommendation |
|-------------|----------------|
| 1-10 | ❌ Simple tests, direct locators |
| 10-50 | ⚠️ Extract repeated components |
| 50+ | ✅ Use Page Objects |
| 100+ | ✅✅ Mandatory |

### Next Steps

1. Review your existing tests
2. Identify repeated code
3. Extract one component
4. Create one Page Object
5. Refactor 3 tests
6. Measure the improvement

---

**Remember**: Start simple, refactor when needed. Don't over-engineer from day 1! 🚀

---

**Last Updated**: December 18, 2025  
**Next Lecture**: Lesson 12 (TBD)
