# Pull Request: Playwright Course Homework (Lectures 3-8)

## 📚 What I Learned

### Lecture 3: Playwright Installation & Setup
- Installed Node.js, npm, Git, VS Code
- Set up Playwright with TypeScript
- Learned to run tests (CLI, UI mode, specific files)
- Used VS Code Playwright extension
- Understanding of caching (first load slow, subsequent fast)

### Lecture 4: Playwright Recorder
- Used Playwright Recorder to generate tests
- Learned Pick Locator tool to fix broken selectors
- Practiced Watch mode for auto-rerun
- Understood role-based locators (best practice)
- Formatted code with Prettier

### Lecture 5: Playwright Architecture & CDP
- TypeScript transpilation to JavaScript
- Node.js runtime environment
- Chrome DevTools Protocol (CDP) communication
- WebSocket vs HTTP protocols
- Debugging with DEBUG=pw:protocol
- Browser automation internals

### Lecture 6: npm, package.json & Dependencies
- package.json structure and purpose
- npm vs npx commands
- Dependencies vs devDependencies
- node_modules and dependency trees
- package-lock.json for version locking
- Semantic versioning (Major.Minor.Patch)
- Version symbols (^, ~, exact)

### Lecture 7: Locators & Selectors
- Accessibility-first locator strategy
- getByRole(), getByLabel(), getByText(), getByTestId()
- Filtering with hasText and has
- Operators: and(), or()
- Strict mode and handling multiple matches
- List operations: first(), last(), nth()
- Debugging with page.pause() and PWDEBUG=console

### Lecture 8: Actions & Interactions
- fill() vs pressSequentially() (interview question!)
- Mouse interactions: click(), hover(), dblclick()
- Keyboard actions and shortcuts
- Drag and drop operations
- page.evaluate() for performance
- Understanding CDP commands under the hood

---

## ✅ Homework Completed

### 1. Created Lecture Notes (6 files)

#### `notes/lecture_3_playwright_installation_setup.md`
- Complete installation guide (Node.js, npm, Git, VS Code, Playwright)
- Running tests commands and options
- VS Code extension features
- Configuration (single browser setup)
- Git workflow
- Troubleshooting section
- **Video**: [Lesson 3 - Installation](https://youtu.be/E71QCUqVl7A)

#### `notes/lecture_4_playwright_recorder_first_tests.md`
- Playwright Recorder usage guide
- Recording from cursor
- Pick Locator tool for fixing selectors
- Watch mode for auto-rerun
- E-commerce demo purchase flow example
- Debugging tips and best practices
- **Video**: [Lesson 4 - Recorder](http://www.youtube.com/watch?v=WIwIo5chcvw)

#### `notes/lecture_5_playwright_architecture_cdp.md`
- Playwright internal architecture explained
- TypeScript to JavaScript compilation
- Node.js runtime environment
- Chrome DevTools Protocol (CDP)
- WebSocket communication
- Debugging with DEBUG=pw:protocol
- **Video**: [Lesson 5 - Architecture](https://youtu.be/Y6GBBoNOgTk)

#### `notes/lecture_6_npm_package_json_dependencies.md`
- package.json structure and scripts
- npm vs npx commands
- Dependencies vs devDependencies
- node_modules and dependency trees
- package-lock.json importance
- Semantic versioning (SemVer)
- Version symbols (^, ~, exact)

#### `notes/lecture_7_playwright_locators_selectors.md`
- Accessibility-first locator strategy
- Core locators: getByRole(), getByLabel(), getByText(), getByTestId()
- Filtering with hasText and has
- Operators: and(), or()
- Strict mode and list handling
- Debugging techniques
- **Video**: [Lesson 7 - Locators](https://www.youtube.com/watch?v=5N8CGd5XkuM)

#### `notes/lecture_8_playwright_actions_interactions.md`
- fill() vs pressSequentially() (interview question!)
- Mouse interactions: click(), hover(), dblclick()
- Keyboard actions and shortcuts
- Drag and drop operations
- page.evaluate() for performance
- Understanding CDP commands

### 2. Wrote Custom Tests

#### `tests/lecture-demo.spec.ts`
10 test scenarios demonstrating lecture concepts:
- ✅ Navigation and title assertions
- ✅ Element visibility checks
- ✅ CSS selectors
- ✅ XPath selectors
- ✅ Role-based selectors (recommended approach)
- ✅ Search functionality
- ✅ Footer verification
- ✅ Caching demonstration (shows 1st load ~500ms, 2nd+ ~100ms)
- ✅ Multiple assertion types
- ✅ Page interactions

**Result**: 30 tests passing (10 scenarios × 3 browsers)

### 3. Project Setup
- Installed Playwright with TypeScript configuration
- Configured for 3 browsers (Chromium, Firefox, WebKit)
- Added GitHub Actions workflow
- All 36 tests passing (6 example + 30 custom)

---

## 📁 Repository Structure

```
ENGL-version/
├── notes/                                    # All lecture notes
│   ├── 01_networking_protocols_http.md
│   ├── 02_testing_qa_automation.md
│   ├── 03_version_control_devops_cicd.md
│   ├── 04_databases_backend_apis.md
│   ├── 05_programming_fundamentals.md
│   ├── GLOSSARY.md
│   ├── TABLE_OF_CONTENTS.md
│   ├── playwright_installation_setup.md     # NEW: Lecture 3 notes
│   └── playwright_recorder_first_tests.md   # NEW: Lecture 4 notes
├── tests/                                    # Homework tests
│   ├── example.spec.ts                       # Playwright default
│   └── lecture-demo.spec.ts                  # NEW: Custom tests
├── playwright.config.ts                      # Playwright configuration
├── package.json                              # Project dependencies
├── .github/workflows/playwright.yml          # CI/CD workflow
└── README.md                                 # Project overview
```

---

## 🧪 Test Results

### All Tests Passing ✅

```bash
Running 36 tests using 4 workers
  36 passed (15.4s)
```

### Caching Demo Results:
```
First load:  841ms  (no cache)
Second load: 174ms  (cached)
Third load:  107ms  (cached)
```

---

## 💡 Key Learnings

### Technical Skills:
1. **Playwright Recorder** - Fastest way to create initial test structure
2. **Locator Strategies** - Role-based > Label > Placeholder > Text
3. **VS Code Extension** - Green play buttons, Pick Locator, Watch mode
4. **UI Mode** - Visual debugging and step-by-step execution
5. **Prettier** - Auto-format code on save (Ctrl+S / Cmd+S)

### Best Practices:
1. Always use official documentation
2. Experiment with tools yourself (don't just watch tutorials)
3. Role-based locators are most stable
4. Watch mode speeds up development
5. Add assertions (recorder only generates actions)

---

## 🎯 Commands I Can Now Use

```bash
# Installation
npm init playwright@latest

# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/lecture-demo.spec.ts

# UI mode (interactive)
npx playwright test --ui

# View report
npx playwright show-report

# Record new test
npx playwright codegen https://example.com

# Check versions
node --version
npm --version
git --version
```

---

## 📊 Homework Checklist

### Lecture 3 (Installation):
- [x] Install Node.js + npm
- [x] Install Git (using Git Bash commands)
- [x] Install VS Code
- [x] Install Playwright
- [x] Install VS Code Playwright extension
- [x] Run first test
- [x] Create GitHub repository and push code
- [x] Create installation notes

### Lecture 4 (Recorder):
- [x] Learn Playwright Recorder
- [x] Record test from cursor
- [x] Use Pick Locator tool
- [x] Practice Watch mode
- [x] Format code with Prettier
- [x] Create recorder notes

### Extra:
- [x] Write 10 custom test scenarios
- [x] All tests passing (36 total)
- [x] Clean repository structure
- [x] Professional commit messages
- [x] Video links in notes

---

## 🚀 Ready for Review

**Branch**: `playwright-note`  
**Tests Status**: ✅ 36/36 passing  
**Notes**: 2 complete lecture guides with video links  
**Code**: Custom tests demonstrating all concepts  

**Request**: Please review and approve for merge to `main`

---

## 📝 What's Next?

After approval, I plan to:
1. Continue with Lecture 5 (Playwright Architecture)
2. Add more complex test scenarios
3. Practice JavaScript fundamentals at [javascript.info](https://javascript.info)
4. Explore advanced Playwright features

---

**Thank you for reviewing my homework!** 🙏
