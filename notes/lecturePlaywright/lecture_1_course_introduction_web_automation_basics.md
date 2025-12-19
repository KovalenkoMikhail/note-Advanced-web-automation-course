# 🎭 Lecture 1: Course Introduction & Web Automation Basics

**Source**: [Advanced Web Automation JavaScript / TypeScript Course - Lesson 1](https://www.youtube.com/watch?v=example)  
**Instructor**: Ilarion Halushka  
**Duration**: ~57 minutes  
**Course**: Advanced Web Automation with Playwright  
**Date**: December 18, 2025

---

## 🎯 Learning Objectives

By the end of this lecture, you will:
- ✅ Understand what web automation is and why it's valuable
- ✅ Know the technologies used in the course (JavaScript, TypeScript, Playwright)
- ✅ Use browser DevTools console to manipulate webpages
- ✅ Record tests with Selenium IDE and Chrome DevTools Recorder
- ✅ Select elements using `querySelector` and `querySelectorAll`
- ✅ Modify element properties, styles, and content with JavaScript
- ✅ Understand browser storage (localStorage, cookies)
- ✅ Navigate pages and control browser history
- ✅ Be ready to start your automation journey

---

## 📋 Table of Contents

1. [Course Introduction & Why Learn Automation](#course-introduction--why-learn-automation) [00:00]
2. [Technologies Covered](#technologies-covered)
3. [Benefits of Automation](#benefits-of-automation) [03:09]
4. [Target Audience](#target-audience) [08:39]
5. [Automated Recording Tools](#automated-recording-tools) [12:40]
   - [Selenium IDE](#selenium-ide) [12:54]
   - [Chrome DevTools Recorder](#chrome-devtools-recorder) [16:00]
6. [Interacting with Browser Console](#interacting-with-browser-console) [22:06]
   - [Selecting Elements](#selecting-elements) [22:34]
   - [Modifying Elements](#modifying-elements)
   - [Clicking & Navigation](#clicking--navigation) [24:58]
   - [Page Reload & History](#page-reload--history) [31:00]
   - [Styling & Visibility](#styling--visibility) [35:12]
   - [Browser Storage](#browser-storage) [40:20]
   - [Advanced Console Actions](#advanced-console-actions) [43:30]
   - [Scrolling & Media Control](#scrolling--media-control) [51:00]
7. [Tip of the Day](#tip-of-the-day) [20:21]
8. [Homework](#homework) [53:50]
9. [Summary](#summary)
10. [Resources](#resources)

---

## 🚀 Course Introduction & Why Learn Automation [00:00]

### What is Web Automation?

**Web automation** is the process of using software to interact with web applications automatically, simulating user actions like clicking, typing, navigating, and verifying content—without manual intervention.

### Technologies Covered in This Course

This comprehensive course will teach you:

1. **JavaScript** - The language of the web
2. **TypeScript** - Typed superset of JavaScript
3. **HTML/CSS** - Understanding web structure and styling
4. **XPath** - Advanced element selection
5. **Playwright** - Modern automation framework

### Why This Stack?

- **JavaScript/TypeScript**: Universal web language, used in frontend and backend
- **Playwright**: Modern, powerful, supports multiple browsers (Chromium, Firefox, WebKit)
- **Industry Standard**: Used by companies like Microsoft, Google, Facebook

---

## 💼 Benefits of Automation [03:09]

### 1. Career Growth 📈

**Higher Salary**: Automation engineers earn 30-50% more than manual QA testers

| Role | Average Salary (US) | Salary Range |
|------|---------------------|--------------|
| Manual QA Tester | $50,000-$70,000 | Entry to Mid |
| QA Automation Engineer | $70,000-$110,000 | Mid to Senior |
| Senior Automation Engineer | $110,000-$150,000+ | Senior+ |

### 2. Less Routine Work 🔄

**Problem**: Manual regression testing is repetitive and boring
- Click same buttons 100 times
- Fill same forms repeatedly
- Test same flows every release

**Solution**: Automate repetitive tests
- Run tests overnight
- Execute across multiple browsers simultaneously
- Focus on exploratory testing and new features

### 3. Stepping Stone to Development 👨‍💻

**Automation as a Bridge**:
- Learn programming fundamentals
- Work with code daily
- Understand software architecture
- Transition to:
  - Frontend Developer
  - Backend Developer
  - Full-Stack Developer
  - DevOps Engineer

Many successful developers started in QA automation!

### 4. Efficiency & Speed ⚡

**Manual Testing**:
- 1 tester → 1 test flow → 10 minutes
- 100 tests → 1000 minutes (16+ hours)

**Automated Testing**:
- 100 tests → Run in parallel → 5-10 minutes
- Can run 24/7 without breaks
- Consistent results every time

### 5. Confidence in Code Changes 🛡️

**Regression Suite**:
- Catch bugs before production
- Verify nothing broke after changes
- CI/CD integration (run on every commit)
- Sleep better knowing tests are running

---

## 👥 Target Audience [08:39]

### Course is Designed For:

**70% Beginners** 🌱
- No programming experience required
- Want to start career in QA Automation
- Manual testers looking to upskill
- Career changers into tech

**20% Junior Engineers** 🌿
- 0-2 years of automation experience
- Want to learn modern tools (Playwright)
- Need structured learning path
- Looking to level up skills

**10% Mid-Level Engineers** 🌳
- 2-5 years experience
- Want to learn best practices
- Interested in advanced patterns
- Looking to mentor others

### What You'll Get at Each Level:

**Beginners**:
- Step-by-step explanations
- From zero to first test
- Foundational concepts
- Plenty of examples

**Juniors**:
- Best practices and patterns
- Code organization tips
- Debugging techniques
- Interview preparation

**Mid-Level**:
- Advanced architecture patterns
- Performance optimization
- Framework design
- Team leadership skills

---

## 🎥 Automated Recording Tools [12:40]

Before writing code, let's explore "Record and Playback" tools—they're great for beginners to understand how automation works.

### Selenium IDE [12:54]

**What is it?**  
A browser extension that records your actions and plays them back automatically.

**Installation**:
1. Install Selenium IDE extension
   - [Chrome Web Store](https://chrome.google.com/webstore/detail/selenium-ide)
   - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/)

2. Open Selenium IDE from browser extensions

**Demo: Recording a Test** [13:58]

```
Example: Testing a blog navigation

1. Click "Record" button in Selenium IDE
2. Navigate to: https://example-blog.com
3. Click on "About" link
4. Verify text "About Me" appears
5. Click "Stop Recording"

Result: Selenium IDE creates a test with all actions
```

**What Gets Recorded**:
- `open` - Navigate to URL
- `click` - Click on element
- `type` - Type text into input
- `assertText` - Verify text content

**Example Generated Test**:
```json
{
  "id": "blog-navigation-test",
  "name": "Test Blog Navigation",
  "commands": [
    {
      "command": "open",
      "target": "https://example-blog.com",
      "value": ""
    },
    {
      "command": "click",
      "target": "linkText=About",
      "value": ""
    },
    {
      "command": "assertText",
      "target": "css=h1",
      "value": "About Me"
    }
  ]
}
```

**Pros** ✅:
- No coding required
- Fast to create simple tests
- Good for understanding automation

**Cons** ❌:
- Hard to maintain
- Limited customization
- Brittle tests (break easily)
- No programming logic

---

### Chrome DevTools Recorder [16:00]

**What is it?**  
Built-in Chrome tool that records actions and exports them as code.

**How to Open**: [18:08]
1. Open Chrome DevTools (`F12` or `Cmd+Option+I`)
2. Go to "Recorder" tab (may need to enable in Settings)
3. Click "Start Recording"

**Demo: Recording User Flow**

```
Example: Login Flow Recording

1. Open DevTools → Recorder
2. Click "Start recording"
3. Navigate to login page
4. Type email: test@test.com
5. Type password: password123
6. Click "Login" button
7. Stop recording

Result: Can export as Puppeteer or Playwright code!
```

**Export Options**:
- **Puppeteer** - Google's automation library
- **Playwright** - Microsoft's automation framework
- **JSON** - Raw recording data

**Example Exported Puppeteer Code**:
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to login
  await page.goto('https://example.com/login');
  
  // Type email
  await page.type('#email', 'test@test.com');
  
  // Type password
  await page.type('#password', 'password123');
  
  // Click login
  await page.click('button[type="submit"]');
  
  await browser.close();
})();
```

**Pros** ✅:
- Built into Chrome (no installation)
- Exports as actual code
- Good starting point for real tests

**Cons** ❌:
- Still generates brittle selectors
- No assertions by default
- Need to refactor code manually

---

## 🖥️ Interacting with Browser Console [22:06]

**This is where the magic happens!** The browser console lets you run JavaScript directly on any webpage. This is the foundation of automation.

### Opening the Console

**Methods**:
- Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac)
- Right-click page → "Inspect" → "Console" tab
- Chrome Menu → More Tools → Developer Tools

---

### Selecting Elements [22:34]

#### `document.querySelector()` - Select ONE Element

```javascript
// Select by CSS selector
const heading = document.querySelector('h1');
console.log(heading); // <h1>Page Title</h1>

// Select by class
const button = document.querySelector('.btn-primary');

// Select by ID
const email = document.querySelector('#email-input');

// Select by attribute
const required = document.querySelector('[required]');

// Complex selector
const firstLink = document.querySelector('nav ul li:first-child a');
```

**Returns**: 
- First matching element
- `null` if not found

#### `document.querySelectorAll()` - Select MULTIPLE Elements

```javascript
// Select all paragraphs
const paragraphs = document.querySelectorAll('p');
console.log(paragraphs.length); // e.g., 15

// Select all links
const links = document.querySelectorAll('a');

// Select all buttons with class
const buttons = document.querySelectorAll('button.submit');

// Complex: all list items in navigation
const navItems = document.querySelectorAll('nav ul li');
```

**Returns**:
- NodeList (array-like object)
- Can iterate with `.forEach()`
- Empty NodeList if nothing found

---

### Modifying Elements

#### Change Text Content

```javascript
// Select element
const heading = document.querySelector('h1');

// Change text
heading.textContent = 'New Heading Text';

// Change HTML (including tags)
heading.innerHTML = '<span style="color: red;">Red Heading</span>';
```

#### Change Input Values

```javascript
// Select input field
const emailInput = document.querySelector('#email');

// Set value
emailInput.value = 'newemail@test.com';

// Clear value
emailInput.value = '';

// Get current value
console.log(emailInput.value); // 'newemail@test.com'
```

**Real Example**:
```javascript
// Fill login form automatically
document.querySelector('#email').value = 'user@example.com';
document.querySelector('#password').value = 'secret123';
```

#### Change Attributes

```javascript
// Change image source
const img = document.querySelector('img');
img.src = 'https://example.com/new-image.jpg';

// Change link href
const link = document.querySelector('a');
link.href = 'https://google.com';

// Add/remove attributes
link.setAttribute('target', '_blank');
link.removeAttribute('target');
```

---

### Clicking & Navigation [24:58]

#### Programmatic Clicking

```javascript
// Select button and click it
const loginButton = document.querySelector('button#login');
loginButton.click();

// Click link
const aboutLink = document.querySelector('a[href="/about"]');
aboutLink.click();

// Click checkbox
const agreeCheckbox = document.querySelector('#agree-terms');
agreeCheckbox.click(); // Toggle checked state
```

**Real Example - Auto-submit Form**:
```javascript
// Fill form and submit
document.querySelector('#username').value = 'testuser';
document.querySelector('#password').value = 'pass123';
document.querySelector('button[type="submit"]').click();
```

---

### Page Reload & History [31:00]

#### Reload Page

```javascript
// Reload current page
location.reload();

// Force reload (bypass cache)
location.reload(true);
```

#### Browser History Navigation [31:27]

```javascript
// Go back (like clicking Back button)
history.back();

// Go forward
history.forward();

// Go back 2 pages
history.go(-2);

// Go forward 1 page
history.go(1);

// Check history length
console.log(history.length); // Number of pages in session
```

**Real Scenario**:
```javascript
// Navigate through pages programmatically
// Page 1
await page.goto('https://example.com');

// Page 2
await page.click('a[href="/products"]');

// Go back to Page 1
history.back();

// Go forward to Page 2
history.forward();
```

---

### Styling & Visibility [35:12]

#### Change CSS Styles

```javascript
// Select element
const box = document.querySelector('.box');

// Change background color
box.style.backgroundColor = 'red';

// Change multiple styles
box.style.backgroundColor = 'blue';
box.style.color = 'white';
box.style.padding = '20px';
box.style.borderRadius = '10px';

// All at once
box.style.cssText = 'background: blue; color: white; padding: 20px;';
```

#### Hide/Show Elements

```javascript
// Hide element (remove from layout)
const ad = document.querySelector('.advertisement');
ad.style.display = 'none';

// Show element
ad.style.display = 'block';

// Hide with visibility (keeps space)
ad.style.visibility = 'hidden';

// Show with visibility
ad.style.visibility = 'visible';
```

**This is How Ad-Blockers Work!** 💡

Ad-blockers inject JavaScript that finds ads and sets `display: none`.

```javascript
// Simple ad-blocker example
const ads = document.querySelectorAll('.ad, .advertisement, [id*="ad"]');
ads.forEach(ad => {
  ad.style.display = 'none';
});
```

#### Example: Hide All Images

```javascript
// Select all images
const images = document.querySelectorAll('img');

// Hide each image
images.forEach(img => {
  img.style.display = 'none';
});

// Result: Page with no images!
```

---

### Browser Storage [40:20]

#### localStorage - Persistent Storage

```javascript
// Set item (stays even after browser close)
localStorage.setItem('username', 'JohnDoe');
localStorage.setItem('theme', 'dark');

// Get item
const username = localStorage.getItem('username');
console.log(username); // 'JohnDoe'

// Remove item
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Store object (convert to JSON)
const user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));

// Retrieve object
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'John'
```

#### Cookies

```javascript
// Get all cookies
console.log(document.cookie);
// Output: "session=abc123; theme=dark; user_id=42"

// Set cookie
document.cookie = "username=JohnDoe";

// Set cookie with expiration
document.cookie = "token=xyz123; max-age=3600"; // 1 hour

// Set cookie with path and domain
document.cookie = "pref=light; path=/; domain=.example.com";
```

**localStorage vs Cookies**:

| Feature | localStorage | Cookies |
|---------|--------------|---------|
| **Storage** | 5-10 MB | 4 KB |
| **Expiration** | Never (manual clear) | Can set expiration |
| **Sent to Server** | No | Yes (every request) |
| **Access** | JavaScript only | JavaScript + Server |
| **Use Case** | Client-side data | Authentication tokens |

---

### Advanced Console Actions [43:30]

#### Hide All Images on Page

```javascript
// Select all images
const allImages = document.querySelectorAll('img');

// Hide each one
allImages.forEach(image => {
  image.style.display = 'none';
});

console.log(`Hidden ${allImages.length} images`);
```

#### Change All Links to Google

```javascript
// Select all links
const allLinks = document.querySelectorAll('a');

// Change each href
allLinks.forEach(link => {
  link.href = 'https://google.com';
});

console.log(`Modified ${allLinks.length} links`);
```

#### Remove All CSS (Chaos Mode!)

```javascript
// Remove all stylesheets
document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
  link.remove();
});

// Remove all style tags
document.querySelectorAll('style').forEach(style => {
  style.remove();
});

// Remove all inline styles
document.querySelectorAll('[style]').forEach(el => {
  el.removeAttribute('style');
});

// Result: Unstyled HTML only!
```

#### Count Elements

```javascript
// How many of each element?
console.log('Divs:', document.querySelectorAll('div').length);
console.log('Links:', document.querySelectorAll('a').length);
console.log('Images:', document.querySelectorAll('img').length);
console.log('Buttons:', document.querySelectorAll('button').length);
console.log('Inputs:', document.querySelectorAll('input').length);
```

#### Extract All Text from Page

```javascript
// Get all text content
const pageText = document.body.textContent;
console.log(pageText);

// Or just specific section
const mainText = document.querySelector('main').textContent;
console.log(mainText);
```

---

### Scrolling & Media Control [51:00]

#### Scroll to Element [51:00]

```javascript
// Select element
const footer = document.querySelector('footer');

// Scroll into view
footer.scrollIntoView();

// Smooth scroll
footer.scrollIntoView({ behavior: 'smooth' });

// Scroll to top
footer.scrollIntoView({ behavior: 'smooth', block: 'start' });

// Scroll to bottom
footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
```

**Real Use Case**:
```javascript
// Scroll to error message
const errorMsg = document.querySelector('.error-message');
if (errorMsg) {
  errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
```

#### Scroll by Pixels

```javascript
// Scroll down 500px
window.scrollBy(0, 500);

// Scroll up 500px
window.scrollBy(0, -500);

// Smooth scroll
window.scrollBy({
  top: 500,
  behavior: 'smooth'
});
```

#### Scroll to Specific Position

```javascript
// Scroll to top
window.scrollTo(0, 0);

// Scroll to bottom
window.scrollTo(0, document.body.scrollHeight);

// Smooth scroll to top
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
```

#### Control YouTube Video [52:17]

```javascript
// On a YouTube page, in the console:

// Get video element
const video = document.querySelector('video');

// Play video
video.play();

// Pause video
video.pause();

// Set volume (0.0 to 1.0)
video.volume = 0.5; // 50%

// Mute/unmute
video.muted = true;  // Mute
video.muted = false; // Unmute

// Skip to specific time (in seconds)
video.currentTime = 120; // 2 minutes

// Get current time
console.log(video.currentTime);

// Get duration
console.log(video.duration);

// Playback speed
video.playbackRate = 2.0;  // 2x speed
video.playbackRate = 0.5;  // 0.5x speed
video.playbackRate = 1.0;  // Normal speed
```

**Real Example - Auto-play Video**:
```javascript
// Find video, unmute, and play
const vid = document.querySelector('video');
vid.muted = false;
vid.volume = 0.7;
vid.play();
```

---

## 💡 Tip of the Day [20:21]

### "Select Text" Chrome Extension

**Problem**: Can't copy text from YouTube videos or some websites

**Solution**: Use "Select Text" extension

**How to Install**:
1. Go to Chrome Web Store
2. Search for "Select Text"
3. Click "Add to Chrome"
4. Grant permissions

**How to Use**:
1. Navigate to any webpage (even YouTube)
2. Select the text you want to copy
3. Right-click → Copy
4. Paste anywhere!

**Use Cases**:
- Copy video titles and descriptions
- Copy text from protected PDFs
- Copy from websites that disable right-click
- Extract content from images (with OCR extensions)

---

## 📝 Homework [53:50]

### Required Tasks

#### Task 1: Element Selection Practice
Visit 3 different websites and:
```javascript
// 1. Select main heading
const heading = document.querySelector('h1');
console.log(heading.textContent);

// 2. Count all links
const links = document.querySelectorAll('a');
console.log(`Total links: ${links.length}`);

// 3. Find all images
const images = document.querySelectorAll('img');
console.log(`Total images: ${images.length}`);
```

#### Task 2: Modify Page Content
On any website:
```javascript
// 1. Change page title
document.querySelector('h1').textContent = 'Modified by Me!';

// 2. Change all links to point to Google
document.querySelectorAll('a').forEach(link => {
  link.href = 'https://google.com';
});

// 3. Hide all images
document.querySelectorAll('img').forEach(img => {
  img.style.display = 'none';
});
```

#### Task 3: Form Manipulation
Find a login form and:
```javascript
// 1. Fill username
document.querySelector('#username').value = 'testuser';

// 2. Fill password
document.querySelector('#password').value = 'password123';

// 3. Click submit (DON'T actually submit!)
// document.querySelector('button[type="submit"]').click();
```

#### Task 4: Storage Experiments
```javascript
// 1. Save data to localStorage
localStorage.setItem('myName', 'YourName');
localStorage.setItem('favoriteColor', 'blue');

// 2. Read it back
console.log(localStorage.getItem('myName'));

// 3. Check cookies
console.log(document.cookie);

// 4. Clear localStorage
localStorage.clear();
```

#### Task 5: Scrolling Practice
On a long webpage:
```javascript
// 1. Scroll to bottom
window.scrollTo(0, document.body.scrollHeight);

// 2. Scroll back to top
window.scrollTo(0, 0);

// 3. Find footer and scroll to it
document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
```

---

### Practice Exercises

#### Exercise 1: Build an Ad-Blocker
```javascript
// Hide all common ad elements
const adSelectors = [
  '.ad',
  '.advertisement',
  '[id*="ad"]',
  '[class*="banner"]',
  'iframe[src*="ads"]'
];

adSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = 'none';
  });
});

console.log('Ads blocked!');
```

#### Exercise 2: Dark Mode Toggle
```javascript
// Toggle dark mode on any website
const body = document.body;

if (body.style.backgroundColor === 'black') {
  // Light mode
  body.style.backgroundColor = 'white';
  body.style.color = 'black';
} else {
  // Dark mode
  body.style.backgroundColor = 'black';
  body.style.color = 'white';
}
```

#### Exercise 3: Element Counter
```javascript
// Count and display all element types
const elementTypes = ['div', 'span', 'p', 'a', 'img', 'button', 'input'];

elementTypes.forEach(type => {
  const count = document.querySelectorAll(type).length;
  console.log(`${type}: ${count}`);
});
```

#### Exercise 4: YouTube Video Controller
On YouTube:
```javascript
// Create video controller
const video = document.querySelector('video');

// Function to skip ahead
function skipAhead(seconds) {
  video.currentTime += seconds;
}

// Function to go back
function skipBack(seconds) {
  video.currentTime -= seconds;
}

// Try it!
skipAhead(10);  // Skip 10 seconds forward
skipBack(5);    // Skip 5 seconds back
```

---

### Challenge Task 🏆

**Build a Page Inspector**:
Create a script that analyzes any webpage and reports:
- Total number of each element type
- All unique colors used
- All external links
- Page load time
- Total images and their sizes

```javascript
// Page Inspector Challenge
const inspector = {
  // Count elements
  countElements() {
    const tags = ['div', 'span', 'p', 'a', 'img', 'button', 'input', 'form'];
    tags.forEach(tag => {
      console.log(`${tag}: ${document.querySelectorAll(tag).length}`);
    });
  },
  
  // Find all colors
  findColors() {
    const elements = document.querySelectorAll('*');
    const colors = new Set();
    elements.forEach(el => {
      const bg = window.getComputedStyle(el).backgroundColor;
      const color = window.getComputedStyle(el).color;
      if (bg !== 'rgba(0, 0, 0, 0)') colors.add(bg);
      colors.add(color);
    });
    console.log('Colors used:', Array.from(colors));
  },
  
  // Find external links
  findExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    console.log('External links:', links.length);
    links.forEach(link => console.log(link.href));
  },
  
  // Run all inspections
  inspect() {
    console.log('=== Page Inspection ===');
    this.countElements();
    this.findColors();
    this.findExternalLinks();
  }
};

// Run inspector
inspector.inspect();
```

---

## 🎯 Summary

### What We Learned

#### 1. **Course Overview**
- Technologies: JavaScript, TypeScript, HTML, XPath, Playwright
- Target audience: Beginners (70%), Juniors (20%), Mid-level (10%)
- Benefits: Higher salary, less routine work, path to development

#### 2. **Recording Tools**
- **Selenium IDE**: Browser extension for record/playback
- **Chrome DevTools Recorder**: Built-in tool, exports code
- Good for beginners, but limited for real tests

#### 3. **Browser Console JavaScript**
- `document.querySelector()` - Select single element
- `document.querySelectorAll()` - Select multiple elements
- Modify text, attributes, styles
- Click elements programmatically
- Navigate with `history.back()`, `history.forward()`
- `location.reload()` to refresh page

#### 4. **Element Manipulation**
- Change text: `element.textContent = 'new text'`
- Change HTML: `element.innerHTML = '<b>bold</b>'`
- Change styles: `element.style.color = 'red'`
- Hide/show: `element.style.display = 'none'`

#### 5. **Browser Storage**
- **localStorage**: Persistent, 5-10 MB, client-only
- **Cookies**: 4 KB, sent to server, can expire
- Store/retrieve data for automation scenarios

#### 6. **Advanced Techniques**
- Hide all images (ad-blocker concept)
- Scroll to elements with `scrollIntoView()`
- Control video playback
- Manipulate page content programmatically

### Key Takeaways

✅ **Web automation simulates user actions with code**  
✅ **Browser console is a powerful learning tool**  
✅ **JavaScript can manipulate any webpage**  
✅ **Recording tools are good starting point, but not for production**  
✅ **Understanding DOM manipulation is foundation of automation**  
✅ **Next step: Learn Playwright framework for professional automation**

---

## 🎓 Interview Questions & Answers

### Q1: What is web automation and why is it important?

**Answer**: Web automation is using software to interact with web applications automatically, simulating user actions like clicking, typing, and verifying content. It's important because:

1. **Efficiency**: Run 100+ tests in minutes vs. hours manually
2. **Consistency**: Same test steps executed identically every time
3. **Regression Prevention**: Catch bugs before production
4. **CI/CD Integration**: Automated tests on every code commit
5. **Cost Reduction**: Less manual testing time = lower costs

**Example**: Instead of manually testing a login flow 100 times, automation does it in seconds across multiple browsers.

---

### Q2: What's the difference between Selenium IDE and writing code?

**Answer**:

**Selenium IDE**:
- ✅ No coding required
- ✅ Fast to create simple tests
- ❌ Hard to maintain
- ❌ No programming logic (loops, conditions)
- ❌ Brittle (breaks easily with UI changes)

**Writing Code (Playwright/Selenium)**:
- ✅ Full programming capabilities
- ✅ Reusable functions and components
- ✅ Better error handling
- ✅ Can integrate with CI/CD
- ✅ More maintainable
- ⚠️ Requires programming knowledge

**Verdict**: Use Selenium IDE for learning, but write code for real projects.

---

### Q3: Explain the difference between `querySelector` and `querySelectorAll`.

**Answer**:

**`querySelector()`**:
- Returns **one element** (the first match)
- Returns `null` if not found
- Use when you need single element

```javascript
const heading = document.querySelector('h1');
// Returns: <h1>Title</h1>
```

**`querySelectorAll()`**:
- Returns **NodeList** (array-like) with all matches
- Returns empty NodeList if not found
- Use when you need multiple elements

```javascript
const links = document.querySelectorAll('a');
// Returns: NodeList [<a>, <a>, <a>, ...]
```

**Example**:
```javascript
// Single element
document.querySelector('button').click(); // Clicks first button

// Multiple elements
document.querySelectorAll('button').forEach(btn => {
  btn.click(); // Clicks ALL buttons
});
```

---

### Q4: What's the difference between localStorage and cookies?

**Answer**:

| Feature | localStorage | Cookies |
|---------|--------------|---------|
| **Storage Size** | 5-10 MB | 4 KB |
| **Expiration** | Never (manual clear only) | Can set expiration date |
| **Sent to Server** | No (client-only) | Yes (every HTTP request) |
| **Access** | JavaScript only | JavaScript + Server |
| **Use Case** | User preferences, app state | Authentication tokens |
| **API** | `localStorage.setItem()` | `document.cookie` |

**Example**:
```javascript
// localStorage - stays forever
localStorage.setItem('theme', 'dark');

// Cookie - expires in 1 hour
document.cookie = "session=abc123; max-age=3600";
```

**When to use what**:
- **localStorage**: Save user settings, cache data
- **Cookies**: Authentication, tracking, server needs access

---

### Q5: How do ad-blockers work (based on what we learned)?

**Answer**: Ad-blockers use JavaScript to:

1. **Identify ad elements** using common selectors:
   - Classes: `.ad`, `.advertisement`, `.banner`
   - IDs: `#ad`, `#google_ads`
   - Attributes: `[data-ad]`

2. **Hide them** using CSS:
   ```javascript
   element.style.display = 'none';
   ```

3. **Block requests** to known ad domains:
   - `ads.google.com`
   - `doubleclick.net`
   - `facebook.com/ads`

**Simple Ad-Blocker Example**:
```javascript
// Find common ad elements
const ads = document.querySelectorAll(`
  .ad, 
  .advertisement, 
  [id*="ad"], 
  iframe[src*="ads"]
`);

// Hide each one
ads.forEach(ad => {
  ad.style.display = 'none';
});
```

This is exactly how browser extensions like uBlock Origin work, but at a more sophisticated level!

---

### Q6: Why is learning browser console important for automation?

**Answer**:

1. **Foundation of Automation**: All automation frameworks (Playwright, Selenium, Puppeteer) run JavaScript in the browser behind the scenes

2. **Debugging**: When tests fail, you can inspect elements in console to understand why

3. **Selector Testing**: Test CSS selectors before writing automation code:
   ```javascript
   // Test if selector works
   document.querySelector('.login-button'); // Returns element or null
   ```

4. **Prototyping**: Try actions before coding:
   ```javascript
   // Does this click work?
   document.querySelector('button').click();
   ```

5. **Understanding DOM**: Learn how elements are structured and accessed

**Example Workflow**:
1. Open console on website
2. Test selector: `document.querySelector('#login')`
3. Test action: `document.querySelector('#login').click()`
4. If it works, write automation code:
   ```javascript
   await page.click('#login');
   ```

---

### Q7: What are the benefits of automation over manual testing?

**Answer**:

**Speed** ⚡:
- Manual: 1 test = 10 min → 100 tests = 1000 min (16 hours)
- Automated: 100 tests in parallel = 5-10 min

**Consistency** 🎯:
- Manual: Human errors, different steps each time
- Automated: Exact same steps every time

**Coverage** 🌐:
- Manual: Test 1 browser at a time
- Automated: Test Chrome, Firefox, Safari simultaneously

**Cost** 💰:
- Manual: Continuous labor costs
- Automated: One-time development, rerun infinitely

**CI/CD** 🔄:
- Manual: Can't run on every commit
- Automated: Run on every push to repository

**24/7** ⏰:
- Manual: Limited to work hours
- Automated: Run overnight, weekends

**Regression** 🛡️:
- Manual: Boring, tedious, error-prone
- Automated: Run full suite in minutes

**But**: Manual testing still needed for:
- Exploratory testing
- UX/UI evaluation
- Edge cases discovery
- Initial test planning

---

## 📚 Resources

### Official Documentation
- [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Complete JS reference
- [MDN: Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) - DOM manipulation
- [MDN: querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) - Element selection
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) - localStorage & sessionStorage

### Tools
- [Selenium IDE](https://www.selenium.dev/selenium-ide/) - Record and playback tool
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Browser developer tools
- [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) - Built-in recorder

### Browser Extensions
- **Select Text** - Copy text from any website
- **Selenium IDE** - Record browser actions
- **JSON Formatter** - Format JSON in browser
- **EditThisCookie** - Manage cookies easily

### Video Resources
- [Advanced Web Automation JavaScript / TypeScript Course - Lesson 1](https://www.youtube.com/watch?v=example) - This lecture
- [Chrome DevTools Crash Course](https://www.youtube.com/results?search_query=chrome+devtools) - Learn DevTools
- [JavaScript DOM Manipulation](https://www.youtube.com/results?search_query=javascript+dom+manipulation) - DOM tutorials

### Practice Sites
- [W3Schools JavaScript](https://www.w3schools.com/js/) - Interactive tutorials
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [FreeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/) - JavaScript certification

### Next Steps
- **Lecture 2**: Continue with JavaScript fundamentals
- **Lecture 3**: Playwright installation and setup
- **Practice**: Complete all homework exercises above
- **Explore**: Try console commands on different websites

---

## 🎬 What's Next?

In the next lectures, we'll cover:

**Lecture 2**: JavaScript Fundamentals
- Variables, functions, loops
- Arrays and objects
- Async/await
- Promises

**Lecture 3**: Playwright Installation
- Setting up Node.js and npm
- Installing Playwright
- First Playwright test
- Project structure

**Lecture 4**: Playwright Recorder
- Recording tests with Codegen
- Fixing generated selectors
- Running and debugging tests

**Keep practicing console commands—they're the foundation of everything we'll learn!** 🚀

---

**Congratulations on completing Lecture 1!** 🎉

You now understand:
- ✅ What web automation is
- ✅ Why it's valuable for your career
- ✅ How to use browser console
- ✅ How to manipulate webpages with JavaScript
- ✅ The basics of recording tools

**Next**: Complete the homework exercises and move to Lecture 2!

---

**Last Updated**: December 18, 2025  
**Course**: Advanced Web Automation with Playwright  
**Instructor**: Ilarion Halushka  
**Repository**: [ENGL-version](https://github.com/KovalenkoMikhail/ENGL-version)  
**Branch**: `playwright-note`
