# Lecture 2: HTML, DOM, CSS & XPath Selectors

**Source**: 70-minute lecture from Advanced Web Automation JavaScript/TypeScript Course  
**Instructor**: Ilarion Halushka  
**Video**: [Advanced Web Automation Lesson 2 - CSS, XPath, DOM, HTML](https://www.youtube.com/watch?v=VIDEO_ID)  
**Date**: December 18, 2025

---

## 🎯 Learning Objectives

By the end of this lecture, you will be able to:

1. ✅ Understand HTML structure and attributes
2. ✅ Explain the Document Object Model (DOM) tree
3. ✅ Distinguish between parent, child, sibling, and descendant relationships
4. ✅ Write CSS selectors (ID, class, tag, attribute)
5. ✅ Use CSS combinators (descendant, child, sibling)
6. ✅ Apply CSS pseudo-classes (first-child, last-child, nth-child)
7. ✅ Write XPath expressions (absolute and relative)
8. ✅ Navigate up the DOM tree using XPath
9. ✅ Select elements by text content using XPath
10. ✅ Choose between CSS and XPath based on use case
11. ✅ Use browser DevTools to generate selectors
12. ✅ Apply best practices for stable, maintainable selectors

---

## 📋 Table of Contents

1. [HTML Basics](#1-html-basics)
2. [The Document Object Model (DOM)](#2-the-document-object-model-dom)
3. [DOM Tree Structure](#3-dom-tree-structure)
4. [CSS Selectors](#4-css-selectors)
   - [Basic Selectors](#41-basic-selectors)
   - [Relationship Combinators](#42-relationship-combinators)
   - [Pseudo-classes](#43-pseudo-classes)
5. [XPath Selectors](#5-xpath-selectors)
   - [Basic XPath](#51-basic-xpath)
   - [XPath Axes](#52-xpath-axes)
   - [Text-based Selection](#53-text-based-selection)
6. [Tools for Generating Selectors](#6-tools-for-generating-selectors)
7. [CSS vs XPath Comparison](#7-css-vs-xpath-comparison)
8. [Best Practices](#8-best-practices)
9. [Interview Questions](#9-interview-questions)
10. [Homework](#10-homework)
11. [Resources](#11-resources)
12. [Summary](#12-summary)

---

## 1. HTML Basics

**[00:54]** - Introduction to HTML structure

### What is HTML?

**HTML (HyperText Markup Language)** is the standard language for creating web pages. Every webpage you see is built with HTML.

### HTML Tags and Elements

HTML uses **tags** to define elements:

```html
<!-- Opening tag, content, closing tag -->
<button>Click Me</button>

<!-- Self-closing tag -->
<input type="text" />

<!-- Nested elements -->
<div>
  <h1>Title</h1>
  <p>Paragraph text</p>
</div>
```

### HTML Attributes

**Attributes** provide additional information about elements:

```html
<!-- Common attributes -->
<input 
  id="email"           <!-- Unique identifier -->
  class="form-input"   <!-- CSS class -->
  type="email"         <!-- Input type -->
  name="userEmail"     <!-- Form field name -->
  placeholder="Enter email"  <!-- Hint text -->
  required             <!-- Validation attribute -->
/>

<a 
  href="https://example.com"  <!-- Link destination -->
  target="_blank"             <!-- Open in new tab -->
  rel="noopener"              <!-- Security attribute -->
>
  Click here
</a>

<button
  id="submit-btn"
  class="btn btn-primary"
  data-test-id="submit"       <!-- Custom data attribute -->
  disabled                    <!-- Disabled state -->
>
  Submit
</button>
```

### Common HTML Elements

```html
<!-- Text elements -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>Paragraph</p>
<span>Inline text</span>

<!-- Structure -->
<div>Block container</div>
<header>Page header</header>
<nav>Navigation</nav>
<main>Main content</main>
<footer>Page footer</footer>
<section>Content section</section>
<article>Independent content</article>

<!-- Forms -->
<form>
  <input type="text" />
  <textarea></textarea>
  <select>
    <option>Option 1</option>
  </select>
  <button type="submit">Submit</button>
</form>

<!-- Links and media -->
<a href="#">Link</a>
<img src="image.jpg" alt="Description" />
<video src="video.mp4"></video>

<!-- Lists -->
<ul>
  <li>Unordered item</li>
</ul>
<ol>
  <li>Ordered item</li>
</ol>

<!-- Tables -->
<table>
  <thead>
    <tr>
      <th>Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data</td>
    </tr>
  </tbody>
</table>
```

---

## 2. The Document Object Model (DOM)

**[05:20]** - Understanding the DOM

### What is the DOM?

The **DOM (Document Object Model)** is a programming interface for HTML documents. When a browser loads an HTML page, it creates a **tree-like structure** representing all elements.

**Key Concepts**:
- The DOM is **NOT** the HTML code you write
- The DOM is what the **browser creates** from your HTML
- JavaScript can **modify** the DOM (add, remove, change elements)
- The DOM is **dynamic** and can change after page load

### How the Browser Creates the DOM

```
1. Browser receives HTML code
   ↓
2. Browser parses HTML
   ↓
3. Browser builds DOM tree in memory
   ↓
4. Browser renders the page
   ↓
5. JavaScript can modify the DOM
   ↓
6. Browser re-renders changed parts
```

### Example: HTML → DOM Conversion

**HTML Code**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>Hello World</p>
</body>
</html>
```

**DOM Tree** (what browser creates):
```
Document
  └── html
      ├── head
      │   └── title
      │       └── "My Page" (text node)
      └── body
          ├── h1
          │   └── "Welcome" (text node)
          └── p
              └── "Hello World" (text node)
```

---

## 3. DOM Tree Structure

**[06:59]** - Understanding tree relationships

### Tree Terminology

The DOM uses **family tree** terminology:

```
        grandfather (div)
              │
        ┌─────┴─────┐
        │           │
      parent      uncle
     (form)      (aside)
        │
    ┌───┴───┐
    │       │
  child   sibling
 (input) (button)
```

### Relationships in the DOM

**1. Root** - The top-level element (`<html>`)

```html
<html>  <!-- This is the root -->
  <head>...</head>
  <body>...</body>
</html>
```

**2. Parent & Child** - Direct relationship

```html
<div>         <!-- Parent -->
  <input />   <!-- Child -->
  <button />  <!-- Child -->
</div>
```

**3. Siblings** - Elements at the same level

```html
<div>
  <input />   <!-- Sibling 1 -->
  <button />  <!-- Sibling 2 -->
  <span />    <!-- Sibling 3 -->
</div>
```

**4. Descendants** - Children, grandchildren, etc.

```html
<div>              <!-- Ancestor -->
  <form>           <!-- Descendant (child) -->
    <fieldset>     <!-- Descendant (grandchild) -->
      <input />    <!-- Descendant (great-grandchild) -->
    </fieldset>
  </form>
</div>
```

**5. Ancestors** - Parents, grandparents, etc.

```html
<html>        <!-- Ancestor -->
  <body>      <!-- Ancestor -->
    <main>    <!-- Ancestor -->
      <div>   <!-- Ancestor -->
        <input />  <!-- This element has 4 ancestors -->
      </div>
    </main>
  </body>
</html>
```

### Visual DOM Tree Example

```html
<html>
  <head>
    <title>Shop</title>
  </head>
  <body>
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
      </nav>
    </header>
    <main>
      <section>
        <h1>Products</h1>
        <div class="product">
          <img src="laptop.jpg" />
          <h2>Laptop</h2>
          <button>Buy</button>
        </div>
      </section>
    </main>
  </body>
</html>
```

**Tree Structure**:
```
html
├── head
│   └── title
│       └── "Shop"
└── body
    ├── header
    │   └── nav
    │       ├── a ("Home")
    │       └── a ("Products")
    └── main
        └── section
            ├── h1 ("Products")
            └── div.product
                ├── img
                ├── h2 ("Laptop")
                └── button ("Buy")
```

**Relationships**:
- `header` and `main` are **siblings**
- `nav` is a **child** of `header`
- `nav` is a **descendant** of `body`
- Both `a` elements are **children** of `nav`
- `button` is a **grandchild** of `div.product`'s parent (`section`)

---

## 4. CSS Selectors

**[22:04]** - CSS selector fundamentals

### 4.1 Basic Selectors

#### 4.1.1 ID Selector (#)

**[22:30]** - Most specific and unique

The `#` symbol selects elements by their `id` attribute.

**HTML**:
```html
<input id="email-input" type="email" />
<button id="submit-btn">Submit</button>
<div id="error-message">Invalid email</div>
```

**CSS Selectors**:
```css
#email-input       /* Selects the input */
#submit-btn        /* Selects the button */
#error-message     /* Selects the div */
```

**JavaScript (using querySelector)**:
```javascript
document.querySelector('#email-input')
document.querySelector('#submit-btn')
document.querySelector('#error-message')
```

**✅ Best Practice**: IDs should be **unique** on the page. Use ID selectors whenever possible - they're the most stable.

---

#### 4.1.2 Class Selector (.)

**[24:50]** - Can be reused on multiple elements

The `.` symbol selects elements by their `class` attribute.

**HTML**:
```html
<button class="btn">Cancel</button>
<button class="btn btn-primary">Submit</button>
<button class="btn btn-danger">Delete</button>
```

**CSS Selectors**:
```css
.btn              /* Selects all 3 buttons */
.btn-primary      /* Selects only "Submit" */
.btn-danger       /* Selects only "Delete" */
```

**Multiple Classes**:
```css
.btn.btn-primary  /* Element must have BOTH classes */
```

**JavaScript**:
```javascript
// Select first element with class
document.querySelector('.btn')

// Select ALL elements with class
document.querySelectorAll('.btn')  // Returns array-like NodeList
```

---

#### 4.1.3 Tag Selector

**[23:58]** - Selects by element type

Selects all elements of a specific tag name.

**HTML**:
```html
<input type="text" />
<input type="email" />
<button>Click</button>
<div>Container</div>
```

**CSS Selectors**:
```css
input      /* Selects both inputs */
button     /* Selects the button */
div        /* Selects the div */
```

**JavaScript**:
```javascript
document.querySelectorAll('input')   // All inputs
document.querySelector('button')     // First button
```

⚠️ **Caution**: Tag selectors are **not specific**. Use them carefully or combine with other selectors.

---

#### 4.1.4 Attribute Selector ([])

**[26:10]** - Select by any attribute

The `[]` syntax selects elements based on attribute values.

**HTML**:
```html
<input type="text" name="username" />
<input type="email" name="email" />
<input type="password" name="password" />
<button type="submit">Submit</button>
<a href="https://google.com" target="_blank">Google</a>
<div data-test-id="login-form">...</div>
```

**CSS Selectors**:

```css
/* Exact match */
[type="email"]           /* Input with type="email" */
[name="username"]        /* Input with name="username" */
[data-test-id="login-form"]  /* Element with data-test-id */

/* Attribute exists */
[type]                   /* Any element with 'type' attribute */
[href]                   /* Any element with 'href' attribute */

/* Contains substring */
[href*="google"]         /* href contains "google" */
[class*="btn"]           /* class contains "btn" */

/* Starts with */
[href^="https"]          /* href starts with "https" */
[class^="btn-"]          /* class starts with "btn-" */

/* Ends with */
[href$=".pdf"]           /* href ends with ".pdf" */
[src$=".jpg"]            /* src ends with ".jpg" */
```

**JavaScript Examples**:
```javascript
// Exact attribute value
document.querySelector('[type="email"]')

// Attribute contains value
document.querySelector('[href*="google"]')

// Custom data attributes (best for testing!)
document.querySelector('[data-test-id="submit-button"]')
```

**✅ Best Practice**: Use `data-test-id` or `data-testid` attributes for test automation - they won't change when design changes.

---

### 4.2 Relationship Combinators

**[32:43]** - Navigating the DOM tree

CSS provides ways to select elements based on their relationships.

#### 4.2.1 Descendant Selector (space)

**Syntax**: `E F` (space between)  
**Meaning**: Select all `F` elements inside `E` (at any depth)

**HTML**:
```html
<div id="container">
  <p>Paragraph 1</p>
  <section>
    <p>Paragraph 2</p>
    <article>
      <p>Paragraph 3</p>
    </article>
  </section>
</div>
```

**CSS Selector**:
```css
#container p
```
**Selects**: All 3 `<p>` elements (regardless of nesting depth)

**JavaScript**:
```javascript
document.querySelectorAll('#container p')
// Returns: [p, p, p] (all 3 paragraphs)
```

---

#### 4.2.2 Child Selector (>)

**Syntax**: `E > F`  
**Meaning**: Select only **direct children** `F` of `E`

**HTML**:
```html
<div id="container">
  <p>Direct child</p>
  <section>
    <p>Grandchild (not selected)</p>
  </section>
</div>
```

**CSS Selector**:
```css
#container > p
```
**Selects**: Only the first `<p>` (direct child)

**JavaScript**:
```javascript
document.querySelector('#container > p')
// Returns: First <p> only
```

**Comparison**:
```css
#container p     /* Selects ALL p elements (descendants) */
#container > p   /* Selects ONLY direct children p elements */
```

---

#### 4.2.3 Adjacent Sibling Selector (+)

**Syntax**: `E + F`  
**Meaning**: Select `F` that comes **immediately after** `E`

**HTML**:
```html
<h1>Title</h1>
<p>First paragraph</p>
<p>Second paragraph</p>
<span>Not selected</span>
```

**CSS Selector**:
```css
h1 + p
```
**Selects**: Only "First paragraph" (immediately after `h1`)

**JavaScript**:
```javascript
document.querySelector('h1 + p')
// Returns: <p>First paragraph</p>
```

---

#### 4.2.4 General Sibling Selector (~)

**Syntax**: `E ~ F`  
**Meaning**: Select **all** `F` siblings after `E`

**HTML**:
```html
<h1>Title</h1>
<p>First paragraph</p>
<p>Second paragraph</p>
<span>Span</span>
<p>Third paragraph</p>
```

**CSS Selector**:
```css
h1 ~ p
```
**Selects**: All 3 `<p>` elements (all siblings after `h1`)

**JavaScript**:
```javascript
document.querySelectorAll('h1 ~ p')
// Returns: [p, p, p] (all 3 paragraphs)
```

---

### 4.3 Pseudo-classes

**[39:10]** - Selecting by position or state

Pseudo-classes use `:` to select elements based on their state or position.

#### 4.3.1 :first-child

Selects element if it's the **first child** of its parent.

**HTML**:
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

**CSS Selector**:
```css
li:first-child
```
**Selects**: "First item"

**JavaScript**:
```javascript
document.querySelector('li:first-child')
```

---

#### 4.3.2 :last-child

Selects element if it's the **last child** of its parent.

**CSS Selector**:
```css
li:last-child
```
**Selects**: "Third item"

---

#### 4.3.3 :nth-child(n)

Selects element based on its position.

**CSS Selectors**:
```css
li:nth-child(1)     /* First item (same as :first-child) */
li:nth-child(2)     /* Second item */
li:nth-child(3)     /* Third item */

/* Formulas */
li:nth-child(2n)    /* Even items (2, 4, 6, ...) */
li:nth-child(2n+1)  /* Odd items (1, 3, 5, ...) */
li:nth-child(3n)    /* Every 3rd (3, 6, 9, ...) */

/* Keywords */
li:nth-child(even)  /* Even items */
li:nth-child(odd)   /* Odd items */
```

**JavaScript Example**:
```javascript
// Select 3rd list item
document.querySelector('li:nth-child(3)')

// Select all even items
document.querySelectorAll('li:nth-child(even)')
```

---

#### 4.3.4 Other Useful Pseudo-classes

```css
/* State-based */
input:focus          /* Input that has focus */
input:disabled       /* Disabled inputs */
input:checked        /* Checked checkboxes/radios */
a:hover              /* Link on mouse hover */

/* Content-based */
:empty               /* Elements with no children */
:not(.excluded)      /* Elements without 'excluded' class */

/* Form-related */
:required            /* Required form fields */
:optional            /* Optional form fields */
:valid               /* Valid form inputs */
:invalid             /* Invalid form inputs */
```

---

### CSS Selector Combinations

You can **combine** selectors for precise targeting:

```css
/* Multiple conditions */
input[type="email"].form-input#email
/* Element must be: input AND type="email" AND class "form-input" AND id "email" */

/* Nested relationships */
#login-form > div > input[type="text"]:first-child
/* Direct child hierarchy with conditions */

/* Multiple selectors (comma) */
h1, h2, h3
/* Select all h1, h2, and h3 elements */

input[type="text"],
input[type="email"],
input[type="password"]
/* Select multiple input types */
```

---

## 5. XPath Selectors

**[47:24]** - XPath fundamentals

### What is XPath?

**XPath (XML Path Language)** is a query language for selecting nodes in an XML/HTML document. It's more powerful than CSS but slightly more complex.

**Why use XPath?**
- ✅ Can navigate **up** the tree (parent, ancestor)
- ✅ Can select by **text content**
- ✅ More **flexible** for complex queries
- ❌ Slightly **slower** than CSS
- ❌ Longer, less readable syntax

---

### 5.1 Basic XPath

**[49:54]** - Absolute vs Relative paths

#### Absolute Path (/)

Starts from the root and goes down step by step.

**HTML**:
```html
<html>
  <body>
    <div>
      <input id="email" />
    </div>
  </body>
</html>
```

**XPath**:
```xpath
/html/body/div/input
```

❌ **Problem**: Breaks easily if structure changes. **Never use** in tests.

---

#### Relative Path (//)

Searches for elements **anywhere** in the document.

**XPath**:
```xpath
//input
```
**Meaning**: Find any `<input>` element anywhere

**More examples**:
```xpath
//button                 /* Any button */
//div                    /* Any div */
//input[@type="email"]   /* Any input with type="email" */
```

---

### 5.2 XPath Axes

**[59:54]** - Navigating relationships

#### Basic XPath Syntax

```xpath
//tagname[@attribute='value']
```

**Examples**:
```xpath
//input[@id='email']
//button[@type='submit']
//div[@class='container']
//a[@href='https://google.com']
```

---

#### Selecting by Attribute

**HTML**:
```html
<input type="text" name="username" />
<input type="email" name="email" />
<button type="submit">Submit</button>
```

**XPath Selectors**:
```xpath
//input[@type='text']
//input[@name='username']
//button[@type='submit']

/* Multiple conditions (AND) */
//input[@type='text' and @name='username']

/* Contains */
//input[contains(@class, 'form')]
//a[contains(@href, 'google')]

/* Starts with */
//input[starts-with(@id, 'email')]

/* Ends with (XPath 2.0+) */
//a[ends-with(@href, '.pdf')]
```

---

#### Navigating Up: Parent (..)

**[59:54]** - One of XPath's biggest advantages

**HTML**:
```html
<div class="product">
  <h2>Laptop</h2>
  <span class="price">$999</span>
  <button>Buy</button>
</div>
```

**Scenario**: Find price, then find the Buy button in the **same product**.

**XPath**:
```xpath
//span[@class='price']/..               /* Go to parent div */
//span[@class='price']/../button        /* Go to parent, then to button */
//span[text()='$999']/../button         /* Find by price text, then button */
```

**CSS can't do this!** You can only go down, not up.

---

#### Navigating to Ancestors

```xpath
//input/ancestor::form                  /* Find parent form */
//button/ancestor::div[@class='modal']  /* Find ancestor div with class */
//span/ancestor::*[2]                   /* 2nd ancestor (grandparent) */
```

---

#### Selecting Siblings

**HTML**:
```html
<div>
  <label>Email</label>
  <input type="email" />
  <span class="error">Invalid email</span>
</div>
```

**XPath**:
```xpath
//label[text()='Email']/following-sibling::input
/* Find label with text "Email", then find its sibling input */

//input[@type='email']/following-sibling::span
/* Find input, then find its sibling span (error message) */

//span[@class='error']/preceding-sibling::input
/* Find span, then find preceding sibling input */
```

---

### 5.3 Text-based Selection

**[54:26]** - XPath's killer feature

#### Exact Text Match

**HTML**:
```html
<button>Login</button>
<button>Sign Up</button>
<a>Forgot Password?</a>
```

**XPath**:
```xpath
//button[text()='Login']
//button[text()='Sign Up']
//a[text()='Forgot Password?']
```

**JavaScript**:
```javascript
document.evaluate(
  "//button[text()='Login']",
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue
```

**Or with Playwright**:
```javascript
await page.locator('//button[text()="Login"]').click()
```

---

#### Partial Text Match

```xpath
/* Contains */
//button[contains(text(), 'Log')]      /* Matches "Login", "Logout", etc. */
//div[contains(text(), 'Welcome')]     /* Matches "Welcome back", etc. */

/* Case-insensitive (XPath 2.0) */
//button[contains(lower-case(text()), 'login')]
```

---

#### Combining Text with Attributes

```xpath
/* Button with specific text AND class */
//button[text()='Submit' and @class='btn-primary']

/* Link with text containing "Download" AND href ending with .pdf */
//a[contains(text(), 'Download') and contains(@href, '.pdf')]
```

---

### 5.4 XPath Position

Select by position in the list:

```xpath
//ul/li[1]                /* First list item */
//ul/li[2]                /* Second list item */
//ul/li[last()]           /* Last list item */
//ul/li[position() < 3]   /* First two items */
```

---

### 5.5 XPath Wildcards

```xpath
//*                      /* Any element */
//div/*                  /* Any child of div */
//input[@*]              /* Input with any attribute */
//*[@id='email']         /* Any element with id="email" */
```

---

## 6. Tools for Generating Selectors

**[14:32]** - Browser DevTools and extensions

### 6.1 Chrome DevTools

**[14:57]** - Built-in selector generator

**How to use**:
1. Right-click element on page
2. Select **"Inspect"**
3. In DevTools, right-click the highlighted HTML
4. Choose **Copy** → **Copy selector** (CSS) or **Copy XPath**

**Example Output**:

**CSS**:
```css
#root > div > main > form > input:nth-child(2)
```

**XPath**:
```xpath
/html/body/div/main/form/input[2]
```

⚠️ **Warning**: Auto-generated selectors are often **fragile**. Prefer custom `id` or `data-test-id` attributes.

---

### 6.2 Chrome Recorder

**[18:24]** - Record user actions

1. Open DevTools (F12)
2. Go to **Recorder** tab
3. Click **"Start new recording"**
4. Perform actions on page
5. Click **"End recording"**
6. Export as **Puppeteer**, **Playwright**, or **JSON**

**Generated selector example**:
```javascript
await page.click('[aria-label="Search"]')
```

---

### 6.3 Browser Extensions

**ChroPath** (Recommended):
- Shows CSS and XPath for selected element
- Validates selectors in real-time
- Highlights matching elements
- [Chrome Web Store](https://chrome.google.com/webstore)

**SelectorsHub**:
- Auto-generates selectors
- Suggests improvements
- XPath and CSS support

**How to use**:
1. Install extension
2. Right-click element → **ChroPath** (or shortcut)
3. See suggested selectors
4. Test selectors in the tool

---

### 6.4 Testing Selectors in Console

**CSS Selector**:
```javascript
// Test CSS selector
document.querySelector('#email')
document.querySelectorAll('.btn')

// Shorthand
$('#email')          // Same as querySelector
$$('.btn')           // Same as querySelectorAll
```

**XPath**:
```javascript
// Test XPath
$x("//button[text()='Login']")
$x("//input[@type='email']")
```

**Check if selector is unique**:
```javascript
// Should return only 1 element
$$('#email').length === 1  // true = unique
$$('.btn').length          // > 1 = not unique
```

---

## 7. CSS vs XPath Comparison

**[01:06:32]** - When to use each

| Feature | CSS | XPath |
|---------|-----|-------|
| **Speed** | ⚡ Faster | 🐢 Slower |
| **Readability** | ✅ Easier to read | ❌ More complex |
| **Navigate Down** | ✅ Yes | ✅ Yes |
| **Navigate Up** | ❌ No | ✅ Yes |
| **Select by Text** | ❌ No | ✅ Yes |
| **Browser Support** | ✅ All browsers | ⚠️ Most browsers |
| **Playwright Support** | ✅ Native | ✅ Native |
| **Maintainability** | ✅ Easier | ❌ More complex |

---

### When to Use CSS

**✅ Use CSS when**:
- Element has `id` or `class`
- You can use attribute selectors
- Structure is simple (going down only)
- You want readable selectors
- Performance matters

**Example**:
```css
#login-button
.form-input[type="email"]
button.btn-primary
```

---

### When to Use XPath

**✅ Use XPath when**:
- You need to navigate **up** (find parent)
- You need to select by **text content**
- CSS can't express the relationship
- You need complex conditions

**Example**:
```xpath
/* Find button by text */
//button[text()='Submit']

/* Find parent of element */
//span[@class='price']/../button

/* Complex condition */
//div[contains(@class, 'product') and .//span[text()='$999']]
```

---

### Performance Comparison

```javascript
// CSS (faster)
console.time('CSS')
document.querySelectorAll('.btn')
console.timeEnd('CSS')
// CSS: 0.2ms

// XPath (slower)
console.time('XPath')
$x("//button[@class='btn']")
console.timeEnd('XPath')
// XPath: 0.8ms
```

**Result**: CSS is **~4x faster**, but XPath is more powerful.

---

## 8. Best Practices

**[01:07:24]** - Writing stable selectors

### 8.1 Selector Priority (Best to Worst)

```
1. ⭐ data-test-id (custom attributes)
   Example: [data-test-id="submit-button"]

2. ✅ Unique ID
   Example: #login-button

3. ✅ Name attribute
   Example: [name="email"]

4. ⚠️ Class (if stable)
   Example: .btn-primary

5. ⚠️ Accessibility attributes
   Example: [aria-label="Search"]

6. ❌ Tag + Attribute
   Example: button[type="submit"]

7. ❌ Long CSS paths
   Example: div > div > form > button

8. ❌ nth-child
   Example: li:nth-child(3)

9. ❌ Absolute XPath
   Example: /html/body/div[2]/form/button
```

---

### 8.2 Add Custom Test IDs

**✅ Best Practice**: Add `data-test-id` to your HTML for testing.

**HTML**:
```html
<!-- Add data-test-id for testing -->
<button 
  class="btn btn-primary"
  data-test-id="submit-button"
>
  Submit
</button>

<input 
  type="email"
  class="form-input"
  data-test-id="email-input"
/>
```

**Test Code**:
```javascript
// Stable selector (won't break if class changes)
document.querySelector('[data-test-id="submit-button"]')
document.querySelector('[data-test-id="email-input"]')
```

**Why?**
- Won't change when design changes
- Clear purpose (this is for testing)
- Easy to read and maintain

---

### 8.3 Avoid Fragile Selectors

**❌ Don't Do This**:
```css
/* Too specific, breaks easily */
#root > div > main > section > div:nth-child(3) > form > button

/* Relies on position */
li:nth-child(5)

/* Class might change with redesign */
.css-1h8iw9x > div > button
```

**✅ Do This Instead**:
```css
/* Use stable attributes */
[data-test-id="submit-button"]
#submit-button
[name="submit"]

/* Or XPath with text */
//button[text()='Submit']
```

---

### 8.4 Keep Selectors Simple

**❌ Too Complex**:
```css
#app > div.container > main > section.products > div:nth-child(2) > article > button.buy
```

**✅ Simple and Clear**:
```css
[data-test-id="buy-button"]
```

**Or**:
```xpath
//button[text()='Buy Now']
```

---

### 8.5 Test Selector Uniqueness

Always verify your selector matches **only one element**:

```javascript
// Check if selector is unique
const elements = document.querySelectorAll('.btn')
console.log(elements.length)  // Should be 1

// Or check in Playwright test
const count = await page.locator('.btn').count()
expect(count).toBe(1)  // Ensure only 1 match
```

---

## 9. Interview Questions

### Q1: What is the DOM?

**Answer**:

The **DOM (Document Object Model)** is a programming interface for HTML documents. When a browser loads HTML, it creates a tree-like structure representing all elements and their relationships.

**Key Points**:
- The DOM is NOT the HTML source code
- The DOM is created by the browser from HTML
- JavaScript can modify the DOM dynamically
- The DOM represents parent-child relationships
- Every HTML element becomes a "node" in the DOM tree

**Example**:
```html
<!-- HTML -->
<div id="container">
  <p>Hello</p>
</div>

<!-- DOM Tree -->
div#container
  └── p
      └── "Hello" (text node)
```

---

### Q2: What's the difference between `querySelector` and `querySelectorAll`?

**Answer**:

- **`querySelector()`**: Returns the **first** matching element or `null`
- **`querySelectorAll()`**: Returns **all** matching elements as a NodeList

**Example**:
```javascript
// querySelector - returns single element
const button = document.querySelector('.btn')
console.log(button)  // <button class="btn">...</button>

// querySelectorAll - returns NodeList (array-like)
const allButtons = document.querySelectorAll('.btn')
console.log(allButtons)  // NodeList [button, button, button]
console.log(allButtons.length)  // 3

// Iterate over all
allButtons.forEach(btn => {
  console.log(btn.textContent)
})
```

---

### Q3: What's the difference between `>` and space in CSS selectors?

**Answer**:

- **Space (` `)**: Descendant selector - selects **all** descendants (children, grandchildren, etc.)
- **`>`**: Child selector - selects **only direct** children

**Example**:
```html
<div id="parent">
  <p>Direct child</p>
  <section>
    <p>Grandchild</p>
  </section>
</div>
```

```css
/* Descendant (space) */
#parent p     /* Selects BOTH <p> elements */

/* Direct child (>) */
#parent > p   /* Selects ONLY first <p> (direct child) */
```

---

### Q4: Can CSS select elements by text content?

**Answer**:

**No**, CSS cannot select elements based on their text content. You must use **XPath** for this.

**CSS (can't do this)**:
```css
/* ❌ Doesn't work in CSS */
button[text="Login"]
```

**XPath (works)**:
```xpath
/* ✅ Works in XPath */
//button[text()='Login']
//button[contains(text(), 'Log')]
```

**Alternative in JavaScript**:
```javascript
// Filter by text content
Array.from(document.querySelectorAll('button'))
  .find(btn => btn.textContent === 'Login')
```

---

### Q5: When should you use CSS vs XPath selectors?

**Answer**:

**Use CSS when**:
- ✅ Element has `id`, `class`, or unique attributes
- ✅ You only need to navigate down the tree
- ✅ Performance is critical
- ✅ You want readable, simple selectors

**Use XPath when**:
- ✅ You need to navigate **up** to parent/ancestor
- ✅ You need to select by **text content**
- ✅ CSS can't express the relationship
- ✅ You need complex boolean logic

**Examples**:

```css
/* CSS is better here */
#login-button
.form-input[type="email"]
```

```xpath
/* XPath is better here */
//button[text()='Login']                  /* Select by text */
//span[@class='price']/../button          /* Go up to parent */
//div[.//span[contains(text(), '$999')]]  /* Complex nesting */
```

---

### Q6: What are `data-test-id` attributes and why use them?

**Answer**:

**`data-test-id`** is a custom HTML attribute specifically added for test automation. It's the **most stable** way to select elements.

**Why use them?**
- ✅ Won't change when design changes (classes, styles)
- ✅ Clear intent (this is for testing)
- ✅ Independent of business logic
- ✅ Easy to maintain

**Example**:
```html
<!-- Add to HTML -->
<button 
  class="btn-primary large-button shadow"
  data-test-id="submit-button"
>
  Submit
</button>

<!-- Test code (stable!) -->
<script>
  document.querySelector('[data-test-id="submit-button"]')
</script>
```

**Alternative names**:
- `data-testid` (React Testing Library convention)
- `data-qa`
- `data-cy` (Cypress convention)
- `data-automation-id`

---

### Q7: Explain the DOM tree relationship terms

**Answer**:

DOM uses **family tree** terminology:

```
       Ancestor
          │
    ┌─────┴─────┐
  Parent      Uncle
    │
  ┌─┴─┐
Child Sibling
  │
Descendant
```

**Terms**:
- **Parent**: Direct container
- **Child**: Direct element inside parent
- **Sibling**: Elements at the same level
- **Ancestor**: Any parent, grandparent, etc. (going up)
- **Descendant**: Any child, grandchild, etc. (going down)

**Example**:
```html
<div>              <!-- Parent of ul -->
  <ul>             <!-- Parent of li, child of div -->
    <li>Item 1</li>  <!-- Child of ul, sibling of other li -->
    <li>Item 2</li>  <!-- Sibling of Item 1 -->
  </ul>
</div>
```

---

### Q8: What is the difference between `id` and `class` attributes?

**Answer**:

| Attribute | Purpose | Uniqueness | Selector |
|-----------|---------|------------|----------|
| **`id`** | Unique identifier | **One per page** | `#id` |
| **`class`** | Grouping/styling | **Can repeat** | `.class` |

**Example**:
```html
<!-- ID: Unique -->
<button id="submit-btn">Submit</button>
<!-- ❌ Don't repeat IDs -->
<button id="submit-btn">Another</button>  <!-- Bad practice! -->

<!-- Class: Can repeat -->
<button class="btn">Cancel</button>
<button class="btn">Submit</button>
<button class="btn">Delete</button>
```

**Best Practices**:
- Use `id` for **unique** elements
- Use `class` for **multiple** elements with same styling/behavior
- Prefer `id` for test selectors (more specific)

---

### Q9: How do you find a parent element?

**Answer**:

**CSS**: ❌ Cannot navigate up to parent

**XPath**: ✅ Use `..` to go to parent

```xpath
/* Find element, then go to parent */
//span[@class='price']/..

/* Find parent with specific attribute */
//button[@type='submit']/ancestor::form

/* Go up 2 levels (grandparent) */
//input/ancestor::*[2]
```

**JavaScript**:
```javascript
// Get parent
const input = document.querySelector('#email')
const parent = input.parentElement

// Get ancestor
const form = input.closest('form')
```

---

### Q10: What are CSS pseudo-classes?

**Answer**:

**Pseudo-classes** select elements based on their **state** or **position** using `:` syntax.

**Common Pseudo-classes**:

```css
/* Position */
li:first-child        /* First child */
li:last-child         /* Last child */
li:nth-child(3)       /* 3rd child */
li:nth-child(even)    /* Even children */

/* State */
input:focus           /* Has focus */
input:disabled        /* Is disabled */
input:checked         /* Is checked */
a:hover               /* Mouse hover */

/* Form */
input:required        /* Required field */
input:valid           /* Valid input */
input:invalid         /* Invalid input */

/* Other */
div:empty             /* No children */
:not(.excluded)       /* Doesn't have class */
```

**Example**:
```javascript
// Select first list item
document.querySelector('li:first-child')

// Select all even items
document.querySelectorAll('li:nth-child(even)')
```

---

## 10. Homework

**[56:33]** - Practice exercises

### Required Tasks

#### Task 1: Practice CSS Selectors
Open any website (e.g., Amazon, YouTube) and:
1. Open DevTools Console (F12)
2. Select 10 elements using **CSS selectors**
3. Try different selector types:
   - By ID: `$('#element-id')`
   - By class: `$('.class-name')`
   - By attribute: `$('[type="text"]')`
   - By relationship: `$('#parent > .child')`
   - By pseudo-class: `$('li:first-child')`

**Example**:
```javascript
// YouTube homepage
$('#logo')                          // YouTube logo
$('.ytd-searchbox')                 // Search box
$('[aria-label="Search"]')          // Search button
$('#voice-search-button')           // Voice search
$('ytd-guide-entry-renderer:first-child')  // First sidebar item
```

---

#### Task 2: Practice XPath Selectors
Same website, select 10 elements using **XPath**:
1. Use `$x()` in console
2. Try text-based selection
3. Navigate up to parents
4. Use contains() for partial matches

**Example**:
```javascript
// YouTube
$x("//button[text()='Search']")
$x("//input[@id='search']")
$x("//span[contains(text(), 'Subscribe')]")
$x("//button[@aria-label='Search']/ancestor::form")
$x("//ytd-guide-entry-renderer[1]")
```

---

#### Task 3: Compare CSS vs XPath
For the same element, write **both** CSS and XPath selectors:

**Example - Login Button**:
```javascript
// CSS
$('#login-button')
$('.btn-login')
$('button[type="submit"]')

// XPath
$x("//button[@id='login-button']")
$x("//button[@class='btn-login']")
$x("//button[text()='Login']")  // XPath advantage!
```

Document which is **easier** for each case.

---

#### Task 4: Find Parent Elements
Practice navigating **up** the DOM tree:

**HTML**:
```html
<div class="product">
  <h2>Laptop</h2>
  <span class="price">$999</span>
  <button>Buy</button>
</div>
```

**Tasks**:
1. Find the price span
2. Navigate to its parent div
3. Find the button within that parent

**XPath Solution**:
```javascript
// Find price, go to parent, find button
$x("//span[@class='price']/../button")

// Or find by text
$x("//span[text()='$999']/../button")
```

---

### Practice Exercises

#### Exercise 1: Selector Stability
Given this HTML:
```html
<div class="css-xyz123">
  <button class="css-abc456">Submit</button>
</div>
```

**Questions**:
1. Why is this selector fragile?
2. What would you add to make it stable?
3. Write a better selector

**Answer**:
```html
<!-- Add data-test-id -->
<button 
  class="css-abc456"
  data-test-id="submit-button"
>
  Submit
</button>

<!-- Stable selector -->
<script>
  $('[data-test-id="submit-button"]')
</script>
```

---

#### Exercise 2: Complex Relationships
**HTML**:
```html
<ul id="products">
  <li>
    <h3>Product 1</h3>
    <span class="price">$50</span>
  </li>
  <li>
    <h3>Product 2</h3>
    <span class="price">$75</span>
  </li>
</ul>
```

**Tasks**:
1. Select all product names (CSS)
2. Select all prices (CSS)
3. Select the second product (CSS)
4. Select product with price $75 (XPath)

**Solutions**:
```javascript
// 1. All product names
$$('#products h3')

// 2. All prices
$$('#products .price')

// 3. Second product
$('#products li:nth-child(2)')

// 4. Product with $75 price
$x("//span[@class='price' and text()='$75']/ancestor::li")
```

---

#### Exercise 3: Text-based Selection
Open **any website** and find:
1. Button with text "Search"
2. Link with text "Help"
3. Heading containing "Welcome"

**Solutions**:
```javascript
$x("//button[text()='Search']")
$x("//a[text()='Help']")
$x("//h1[contains(text(), 'Welcome')]")
```

---

### Challenge

#### Challenge 1: Selector Olympics
Open **Amazon.com** or similar e-commerce site:

1. Find the search input (3 different ways)
2. Find "Add to Cart" button by text
3. Find the price of the first product
4. Find all product titles
5. Navigate from price to product container

Document **all selectors** used and explain why you chose each.

---

#### Challenge 2: Build Selector Library
Create a cheat sheet with selectors for a website:

**Example - Gmail**:
```javascript
const gmail = {
  compose: $('[data-tooltip="Compose"]'),
  inbox: $x("//a[contains(text(), 'Inbox')]"),
  search: $('[aria-label="Search mail"]'),
  firstEmail: $('.zA:first-child'),
  starButton: $('[data-tooltip="Star"]')
}
```

---

## 11. Resources

### Official Documentation
- [CSS Selectors - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [XPath - MDN](https://developer.mozilla.org/en-US/docs/Web/XPath)
- [DOM Introduction - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [querySelector - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

### Interactive Learning
- [CSS Diner](https://flukeout.github.io/) - Interactive CSS selector game
- [XPath Playground](https://scrapinghub.github.io/xpath-playground/) - Test XPath online

### Tools
- [ChroPath Extension](https://chrome.google.com/webstore/detail/chropath/ljngjbnaijcbncmcnjfhigebomdlkcjo)
- [SelectorsHub Extension](https://chrome.google.com/webstore/detail/selectorshub/ndgimibanhlabgdgjcpbbndiehljcpfh)

### Video Course
- **Source**: [Advanced Web Automation Lesson 2 - CSS, XPath, DOM, HTML](https://www.youtube.com/watch?v=VIDEO_ID)
- **Duration**: 70 minutes
- **Instructor**: Ilarion Halushka

---

## 12. Summary

### 🎯 Key Takeaways

1. **HTML** is the source code; **DOM** is the tree structure created by the browser
2. **CSS selectors** are faster but can only go down the tree
3. **XPath** is more powerful (can go up, select by text) but slower
4. **ID selectors** (`#id`) are the most stable and specific
5. **data-test-id** attributes are best for test automation
6. Use **DevTools** to inspect elements and test selectors
7. **Avoid fragile selectors** (nth-child, long paths, generated classes)
8. **CSS** is preferred for simple cases; **XPath** for complex relationships

---

### What You Learned

✅ HTML structure and attributes  
✅ DOM tree relationships (parent, child, sibling, descendant)  
✅ CSS selector types (ID, class, tag, attribute)  
✅ CSS combinators (space, >, +, ~)  
✅ CSS pseudo-classes (:first-child, :nth-child, :hover)  
✅ XPath basics (// for descendant, / for child)  
✅ XPath navigation (.. for parent, ancestor::)  
✅ XPath text selection (text()='...', contains())  
✅ Browser DevTools for selector generation  
✅ Best practices for stable, maintainable selectors  

---

### Next Steps

In **Lecture 3**, we'll:
- Install Playwright framework
- Set up Node.js and npm
- Create our first automated test
- Use the selectors we learned today in real tests

---

**Congratulations!** You now understand how to find any element on a webpage using CSS and XPath. This is the foundation of all web automation. 🎉

---

**Last Updated**: December 18, 2025  
**Course**: Advanced Web Automation JavaScript/TypeScript  
**Lecture**: 2 of 13
