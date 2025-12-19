# Project Structure: npm, package.json & Dependencies

**Source**: 72-minute lecture on JavaScript/TypeScript project fundamentals  
**Video**: [Web Automation Course Lesson 6 - npm, package.json, SemVer](https://youtu.be/VIDEO_ID_HERE)

---

## 🎯 Overview

Understanding the fundamental components of JavaScript/TypeScript projects: package.json, dependencies, npm/npx, node_modules, semantic versioning, and project structure.

---

## 📦 package.json

### What is package.json?

**Project manifest file** containing metadata, scripts, and dependencies.

### Key Sections

#### 1. Project Metadata
```json
{
  "name": "playwright-demo",
  "version": "1.0.0",
  "description": "Playwright automation tests",
  "author": "Your Name",
  "license": "ISC"
}
```

#### 2. Scripts [04:30]
**Custom commands** to automate tasks.

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:debug": "npx playwright test --debug",
    "test:chrome": "npx playwright test --project=chromium"
  }
}
```

**Usage:**
```bash
npm run test        # Runs: npx playwright test
npm run test:ui     # Runs: npx playwright test --ui
```

**Why useful?**
- Shorter commands
- Team consistency
- Easy to remember

#### 3. Dependencies
```json
{
  "dependencies": {
    "pg": "^8.11.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.10.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

---

## 🔧 npm & npx

### npm (Node Package Manager) [10:08]

**CLI tool for managing project dependencies.**

#### Common npm Commands

**Install dependencies:**
```bash
npm install                    # Install all from package.json
npm install playwright         # Install specific package
npm install --save-dev eslint  # Install as dev dependency
```

**Uninstall packages:**
```bash
npm uninstall playwright       # Remove package
```

**Update packages:**
```bash
npm update                     # Update all packages
npm update playwright          # Update specific package
```

**Check outdated:**
```bash
npm outdated                   # See packages with newer versions
```

### npx (Node Package Executor) [16:42]

**Executes binaries from node_modules/.bin without global install.**

**Example:**
```bash
npx playwright test
```

**What happens:**
1. Looks for `playwright` in `node_modules/.bin/`
2. Executes the binary
3. No need to install globally

**Before npx (old way):**
```bash
./node_modules/.bin/playwright test  # Long path
```

**With npx:**
```bash
npx playwright test  # Clean and simple
```

---

## 📂 Dependencies vs Dev Dependencies [26:07]

### Dependencies (Production) [28:20]

**Required for application to run in production.**

**Examples:**
- Database drivers: `pg` (PostgreSQL), `mysql`
- Web frameworks: `express`, `fastify`
- Utility libraries: `lodash`, `axios`

**Install as dependency:**
```bash
npm install pg
```

**In package.json:**
```json
{
  "dependencies": {
    "pg": "^8.11.0"
  }
}
```

### Dev Dependencies (Development Only) [27:57]

**Only needed during development and testing.**

**Examples:**
- Testing frameworks: `@playwright/test`, `jest`
- Code quality: `eslint`, `prettier`
- Type definitions: `@types/node`
- Build tools: `webpack`, `vite`

**Install as dev dependency:**
```bash
npm install --save-dev @playwright/test
npm install -D eslint  # -D is shorthand
```

**In package.json:**
```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "eslint": "^8.55.0"
  }
}
```

### When to Use Which?

| Type | When to Use | Example |
|------|-------------|---------|
| **dependencies** | Code runs in production | Database driver, API client |
| **devDependencies** | Only for development | Tests, linters, formatters |

**Production deployment:**
```bash
npm install --production  # Only installs dependencies, skips devDependencies
```

---

## 📁 node_modules [12:29]

### What is node_modules?

**Directory containing source code of all installed packages.**

**Structure:**
```
node_modules/
├── @playwright/
│   └── test/
│       ├── lib/
│       ├── index.js
│       └── package.json
├── playwright-core/
├── eslint/
└── prettier/
```

### Key Points

1. **Large folder** - Can contain thousands of files
2. **Generated automatically** - Created by `npm install`
3. **Not committed to Git** - Listed in `.gitignore`
4. **Reproducible** - Recreated from `package.json` and `package-lock.json`

### Dependency Tree [01:06:46]

Installing one package can install many others (dependencies of dependencies).

**Example:**
```bash
npm install @playwright/test
```

**Installs:**
- `@playwright/test`
  - `playwright-core` (dependency of @playwright/test)
    - `ws` (dependency of playwright-core)
    - `debug` (dependency of playwright-core)

**Result**: Nested tree in node_modules

---

## 🔒 package-lock.json [39:27]

### What is package-lock.json?

**Auto-generated file recording exact versions of every installed package.**

### Why Important?

**Problem without it:**
```json
// package.json
{
  "dependencies": {
    "playwright": "^1.40.0"  // ^ allows 1.40.x to 1.99.x
  }
}
```

- Developer A installs → gets `1.40.0`
- Developer B installs (2 weeks later) → gets `1.41.0`
- Different versions = "Works on my machine" issues

**Solution with package-lock.json:**
- Records exact version: `1.40.0`
- Everyone gets identical versions
- CI/CD uses same versions

### Key Features

```json
{
  "name": "playwright-demo",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "packages": {
    "node_modules/@playwright/test": {
      "version": "1.40.0",
      "resolved": "https://registry.npmjs.org/@playwright/test/-/test-1.40.0.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "playwright-core": "1.40.0"
      }
    }
  }
}
```

**Fields:**
- `version`: Exact version installed
- `resolved`: URL where package was downloaded
- `integrity`: SHA hash for security verification

### Best Practices

✅ **DO:** Commit `package-lock.json` to Git  
✅ **DO:** Let npm manage it automatically  
❌ **DON'T:** Edit manually  
❌ **DON'T:** Delete (unless resolving conflicts)

---

## 📊 Semantic Versioning (SemVer) [31:27]

### Version Format: Major.Minor.Patch

```
1.40.3
│ │  │
│ │  └─ Patch: Bug fixes
│ └──── Minor: New features (backward compatible)
└────── Major: Breaking changes
```

### Version Types

#### Patch Version [31:57]
**Bug fixes, no new features, no breaking changes.**

```
1.40.0 → 1.40.1 → 1.40.2
```

**Example:**
- Fixed typo in error message
- Corrected calculation bug
- Performance improvement

#### Minor Version [33:49]
**New features, backward compatible, no breaking changes.**

```
1.40.0 → 1.41.0 → 1.42.0
```

**Example:**
- Added new function to API
- New optional parameter
- New UI component

#### Major Version [35:18]
**Breaking changes, API modifications, requires code updates.**

```
1.40.0 → 2.0.0 → 3.0.0
```

**Example:**
- Removed deprecated functions
- Changed function signatures
- Renamed methods

---

## 🔢 Version Range Symbols [36:26]

### Caret (^) - Allow Minor & Patch

```json
{
  "dependencies": {
    "playwright": "^1.40.0"
  }
}
```

**Allows:**
- `1.40.0` ✅
- `1.40.1` ✅ (patch update)
- `1.41.0` ✅ (minor update)
- `2.0.0` ❌ (major update blocked)

**Use when:** You want new features and bug fixes automatically

### Tilde (~) - Allow Patch Only

```json
{
  "dependencies": {
    "playwright": "~1.40.0"
  }
}
```

**Allows:**
- `1.40.0` ✅
- `1.40.1` ✅ (patch update)
- `1.41.0` ❌ (minor update blocked)
- `2.0.0` ❌ (major update blocked)

**Use when:** You want only bug fixes, no new features

### Exact Version - No Updates

```json
{
  "dependencies": {
    "playwright": "1.40.0"
  }
}
```

**Allows:**
- `1.40.0` ✅ ONLY
- Any other version ❌

**Use when:** You need absolute stability

### Comparison Table

| Symbol | Updates Allowed | Example | Use Case |
|--------|----------------|---------|----------|
| `^1.40.0` | Minor + Patch | `1.40.x`, `1.x.x` | Default, most common |
| `~1.40.0` | Patch only | `1.40.x` | Conservative updates |
| `1.40.0` | None | Exact version | Critical stability |
| `*` or `latest` | All versions | Latest available | Not recommended |

---

## 🎬 Practical Examples

### Creating Custom Script [07:59]

**Add to package.json:**
```json
{
  "scripts": {
    "test:ui": "npx playwright test --ui"
  }
}
```

**Run:**
```bash
npm run test:ui
```

### Installing Dependencies

**Production dependency:**
```bash
npm install pg
```

**Dev dependency:**
```bash
npm install --save-dev prettier
npm install -D eslint  # shorthand
```

### Checking Dependency Tree

```bash
npm ls                    # Show all dependencies
npm ls @playwright/test   # Show specific package tree
```

**Example output:**
```
@playwright/test@1.40.0
├── playwright-core@1.40.0
│   ├── ws@8.14.2
│   └── debug@4.3.4
└── expect@29.7.0
```

---

## 🛠️ Common Workflows

### Starting New Project

```bash
# Initialize project
npm init -y

# Install dependencies
npm install @playwright/test --save-dev
npm install

# Run tests
npm test
```

### Cloning Existing Project

```bash
# Clone repository
git clone <repo-url>
cd project

# Install dependencies
npm install  # Reads package.json & package-lock.json

# Run tests
npm test
```

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update all (respecting version ranges)
npm update

# Update specific package
npm update playwright

# Update to latest (ignore range)
npm install playwright@latest
```

---

## 📋 File Purposes Summary

| File | Purpose | Commit to Git? |
|------|---------|----------------|
| `package.json` | Project config & dependencies | ✅ Yes |
| `package-lock.json` | Exact dependency versions | ✅ Yes |
| `node_modules/` | Installed package source code | ❌ No (.gitignore) |
| `playwright.config.ts` | Playwright configuration | ✅ Yes |
| `tests/` | Test files | ✅ Yes |
| `.gitignore` | Files to ignore in Git | ✅ Yes |

---

## 💡 Best Practices

### 1. Always Commit Lock File
```bash
git add package-lock.json
git commit -m "Update dependencies"
```

### 2. Use npm ci in CI/CD
```bash
npm ci  # Clean install from lock file (faster, stricter)
```

### 3. Keep Dependencies Updated
```bash
npm outdated  # Check weekly
npm update    # Update safely
```

### 4. Use Exact Versions for Critical Packages
```json
{
  "dependencies": {
    "critical-lib": "2.5.0"  // No ^ or ~
  }
}
```

### 5. Separate Dependencies Types
- Production code → `dependencies`
- Development tools → `devDependencies`

---

## 🎯 Practice Exercises

### Task 1: Create Custom Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:chrome": "npx playwright test --project=chromium",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug"
  }
}
```

Run each script:
```bash
npm run test
npm run test:chrome
npm run test:headed
npm run test:debug
```

### Task 2: Install & Uninstall

```bash
# Install as dev dependency
npm install --save-dev eslint

# Check it's in devDependencies
cat package.json

# Uninstall
npm uninstall eslint

# Verify it's removed
cat package.json
```

### Task 3: Explore Dependency Tree

```bash
# Install playwright
npm install @playwright/test

# View dependency tree
npm ls @playwright/test

# Find how many dependencies total
npm ls | wc -l
```

### Task 4: Version Experiments

Create test `package.json`:
```json
{
  "dependencies": {
    "test1": "^1.0.0",
    "test2": "~1.0.0",
    "test3": "1.0.0"
  }
}
```

Observe what versions get installed.

---

## 📚 Homework [01:11:32]

### Required:
1. ✅ Read about npm, npx, node_modules
2. ✅ Practice `npm install` and `npm uninstall`
3. ✅ Review every file in your project
4. ✅ Understand purpose of each file
5. ✅ Create 3 custom scripts in package.json
6. ✅ Check your dependency tree with `npm ls`

### Explore:
- npm documentation
- Semantic versioning official site (semver.org)
- Difference between `npm install` and `npm ci`
- How npm registry works

### Challenge:
- Find how many total dependencies are installed
- Calculate total size of node_modules
- Create script that runs tests on all browsers sequentially

---

## 🔗 Resources

- **Video**: [Lesson 6 - npm, package.json, SemVer](https://youtu.be/VIDEO_ID)
- **npm Docs**: [docs.npmjs.com](https://docs.npmjs.com)
- **Semantic Versioning**: [semver.org](https://semver.org)
- **Node.js Docs**: [nodejs.org/docs](https://nodejs.org/docs)

---

## 🎓 Key Takeaways

1. **package.json** = Project manifest with metadata, scripts, dependencies
2. **npm** = Package manager (install, update, uninstall)
3. **npx** = Package executor (runs binaries from node_modules)
4. **node_modules** = Folder with actual package source code
5. **package-lock.json** = Exact versions for reproducibility
6. **SemVer** = Major.Minor.Patch versioning system
7. **^** = Allow minor + patch updates
8. **~** = Allow patch updates only
9. **Dependencies** = Production code needs
10. **DevDependencies** = Development/testing tools only

---

## ⏭️ Next Lecture

**Advanced Topics**
- Git workflow best practices
- CI/CD integration
- Test organization patterns
- Page Object Model

---

**Understanding project structure is essential for professional development!** 🚀
