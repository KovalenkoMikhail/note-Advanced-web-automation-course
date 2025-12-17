# Playwright Installation & Setup

**Source**: 50-minute lecture on Playwright automation framework installation and first test execution

---

## 🎯 Overview

Complete guide to installing Playwright automation framework, required tools (Node.js, npm, Git, VS Code), and running your first automated tests.

---

## 🔍 Element Selection in Chrome DevTools

### Alternative Selection Method
Instead of browser extensions (like ChroPath), use Chrome DevTools built-in search:

1. **Open Elements tab** in DevTools
2. **Press** `Ctrl+F` (Windows) or `Cmd+F` (Mac)
3. **Search by CSS or XPath** directly in the search box

**Examples:**
```css
/* CSS Selector - ID */
#footer-wrap

/* CSS Selector - Class */
.copyright
```

```xpath
<!-- XPath - ID -->
//div[@id='footer-wrap']

<!-- XPath - Class -->
//div[@class='copyright']
```

**Why useful**: Test selectors before using them in `document.querySelector()` or automation scripts.

---

## 🛠️ Required Tools

### 1. **Node.js + npm**
- **What it is**: JavaScript runtime environment that runs JS outside the browser
- **Why needed**: Playwright uses Node.js to execute tests
- **Install**: [nodejs.org](https://nodejs.org) - Download LTS version (recommended for most users)
- **Verify installation**:
```bash
node --version
npm --version
```

### 2. **Git**
- **What it is**: Version control system for managing projects
- **Verify installation**:
```bash
git --version
```
- **Windows users**: Install [Git Bash](https://git-scm.com/downloads) - provides Unix-like terminal commands

### 3. **VS Code**
- **What it is**: Code editor (like text editor but for programming)
- **Install**: [code.visualstudio.com](https://code.visualstudio.com)

---

## 📦 Playwright Installation

### Step 1: Create Project Folder
```bash
# Create and navigate to project folder
mkdir playwright-demo
cd playwright-demo
```

### Step 2: Install Playwright
```bash
npm init playwright@latest
```

**Installation prompts:**
1. Language: **TypeScript** (recommended)
2. Test folder: **tests/** (default - press Enter)
3. GitHub Actions workflow: **Yes**
4. Install browsers: **Yes**

### Step 3: Verify Installation
Playwright creates this structure:
```
playwright-demo/
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
└── node_modules/
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npx playwright test
```

**Output example:**
```
Running 6 tests using 3 workers
  6 passed (5s)
```

### Run Specific Test File
```bash
npx playwright test tests/example.spec.ts
```

### View Test Report
```bash
npx playwright show-report
```
Opens HTML report in browser at `localhost:9323`

---

## 🎨 UI Mode (Interactive Testing)

**Run tests with visual interface:**
```bash
npx playwright test --ui
```

**Features:**
- Watch tests execute in real browser
- See each step/action
- Timeline of page loads and assertions
- Click specific test to run (not entire file)

**Note**: First page load slower (~700ms) due to caching, subsequent loads faster (~100ms)

---

## ⚙️ Configuration

### Run Tests on Single Browser

Edit `playwright.config.ts`:
```typescript
// Comment out browsers you don't need
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  
  // Comment these out for chromium-only
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },
],
```

**Commenting shortcut**: `Ctrl+/` or `Cmd+/`

---

## 🧩 VS Code Playwright Extension

### Installation
1. Open **Extensions** panel in VS Code (left sidebar)
2. Search: **Playwright**
3. Click **Install**
4. Restart VS Code if prompted

### Features

#### 1. Run Single Test
Click green ▶️ button next to test function:
```typescript
test('has title', async ({ page }) => {  // ← Click here
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

#### 2. Right-Click Options
- **Run test** - Execute test
- **Debug test** - Run with debugger
- **Reveal in Test Explorer** - Show in sidebar
- **Add breakpoint** - Pause execution at line
- **Show browser** - Toggle browser visibility
- **Show trace viewer** - View detailed execution trace
- **Record test** - Generate test by recording actions

#### 3. Test Explorer
Shows all tests in sidebar tree view

---

## 📝 Example Test Breakdown

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // 1. Navigate to page
  await page.goto('https://playwright.dev/');
  
  // 2. Assert title contains "Playwright"
  await expect(page).toHaveTitle(/Playwright/);
});
```

**Test execution steps in UI mode:**
1. `goto` - Navigate to URL (~700ms first time)
2. `toHaveTitle` - Verify page title matches regex
3. Pass/Fail status shown

---

## 🐙 Git & GitHub Setup

### Initialize Git Repository
```bash
git init
git status
git add .
git commit -m "Initial commit"
```

### Push to GitHub
1. **Create new repository** on [github.com](https://github.com)
2. **Push existing repository**:
```bash
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

### Make Changes and Push
```bash
# After editing files
git status
git add filename.ts
git commit -m "Refactor: remove wait 5 seconds"
git push
```

---

## 🎯 What is Playwright Framework?

A framework consists of:

### 1. **Tools**
- Test recorder
- Element selectors
- Debuggers
- Test runners

### 2. **Libraries**
- Assertions (`expect()`)
- Locators (element finding)
- Page interactions

### 3. **Conventions & Guidelines**
- Project structure patterns
- Code organization
- Best practices

### 4. **Architecture**
Forces specific patterns for:
- Test file organization
- Naming conventions
- Configuration structure

---

## 💡 Best Practices

### 1. Learn to Use Official Docs
- Always check [playwright.dev](https://playwright.dev) first
- Use documentation search feature
- Tutorials get outdated, official docs stay current

### 2. Experiment Yourself
- Don't just watch tutorials
- Run commands yourself
- Break things and fix them
- Play with VS Code extension features

### 3. Understand Your Tools
- Know why Node.js is needed (runs JS outside browser)
- Understand npm (package manager)
- Learn Git basics (version control)

---

## 📚 Homework

### Required:
1. ✅ Install Node.js + npm
2. ✅ Install Git (Windows: Git Bash)
3. ✅ Install VS Code
4. ✅ Install Playwright (`npm init playwright@latest`)
5. ✅ Install VS Code Playwright extension
6. ✅ Run first test (`npx playwright test`)
7. ✅ Create GitHub repository and push code

### Explore:
- Run tests in UI mode (`npx playwright test --ui`)
- Toggle browser visibility in VS Code extension
- View test reports (`npx playwright show-report`)
- Click through VS Code extension features

### Optional (JavaScript Fundamentals):
If new to programming, start learning JavaScript at [javascript.info](https://javascript.info):
- Introduction (2 sections)
- JavaScript Fundamentals (14 sections)
- Code quality, Objects, Data types (selective sections)

**Note**: If you know another programming language basics, JavaScript fundamentals can wait.

---

## 🔧 Troubleshooting

### Test Doesn't Show Browser Window
In UI mode, click **specific test** (not file name) to see browser execution.

### Git Commands Don't Work on Windows
Install Git Bash and use it instead of Command Prompt/PowerShell.

### `node --version` Shows Nothing
Node.js not installed or not in PATH. Reinstall from [nodejs.org](https://nodejs.org).

---

## 🎓 Key Takeaways

1. **Playwright = Framework** for web testing/automation
2. **Node.js = Required** to run JavaScript tests outside browser
3. **npm = Package manager** comes with Node.js
4. **Git = Version control** for code management
5. **VS Code extension** makes running tests easier (green play buttons)
6. **UI mode** shows visual test execution
7. **Official docs > Tutorials** for up-to-date information

---

## 📊 Command Reference

| Command | Purpose |
|---------|---------|
| `npx playwright test` | Run all tests |
| `npx playwright test file.spec.ts` | Run specific test file |
| `npx playwright test --ui` | Run in UI mode |
| `npx playwright show-report` | View HTML report |
| `node --version` | Check Node.js version |
| `npm --version` | Check npm version |
| `git --version` | Check Git version |

---

## 🔗 Resources

- **Playwright Docs**: [playwright.dev](https://playwright.dev)
- **Node.js**: [nodejs.org](https://nodejs.org)
- **Git**: [git-scm.com](https://git-scm.com)
- **VS Code**: [code.visualstudio.com](https://code.visualstudio.com)
- **JavaScript Tutorial**: [javascript.info](https://javascript.info)
