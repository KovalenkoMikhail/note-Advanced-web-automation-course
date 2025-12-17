# 🔍 CDP Protocol Debugging Exercise - Lecture 5

**Date**: December 18, 2025  
**Exercise**: Observe Chrome DevTools Protocol (CDP) communication during test execution

---

## 🎯 What We Learned

By running `DEBUG=pw:protocol npx playwright test`, we can see **exactly** what Playwright sends to Chrome and receives back through WebSocket communication.

---

## 📊 Key CDP Commands Observed

### 1️⃣ Browser Initialization
```
SEND ► {"id":1,"method":"Browser.getVersion"}
◀ RECV {"id":1,"result":{"protocolVersion":"1.3","product":"HeadlessChrome/143.0.7499.4"}}
```
**What happened**: Playwright checks which Chrome version it's talking to.

---

### 2️⃣ Browser Context Creation
```
SEND ► {"id":3,"method":"Target.createBrowserContext","params":{"disposeOnDetach":true}}
◀ RECV {"id":3,"result":{"browserContextId":"09997F8C5C8A346CF7D11F926CB7539C"}}
```
**What happened**: Creates isolated browser context (like incognito mode) with unique ID.

---

### 3️⃣ Page Creation
```
SEND ► {"id":5,"method":"Target.createTarget","params":{"url":"about:blank","browserContextId":"..."}}
◀ RECV {"method":"Target.attachedToTarget","params":{"sessionId":"9429B10A425E45234A95C24AB007F8DB"}}
```
**What happened**: Creates new page/tab and gets WebSocket session ID for communication.

---

### 4️⃣ Enable Page Features
```
SEND ► {"id":7,"method":"Page.enable","sessionId":"9429B10A425E45234A95C24AB007F8DB"}
SEND ► {"id":9,"method":"Log.enable","params":{},"sessionId":"..."}
SEND ► {"id":10,"method":"Page.setLifecycleEventsEnabled","params":{"enabled":true}}
SEND ► {"id":11,"method":"Runtime.enable","params":{},"sessionId":"..."}
SEND ► {"id":13,"method":"Network.enable","sessionId":"..."}
```
**What happened**: Enables monitoring for:
- Page events (navigation, load)
- Console logs
- Lifecycle events (DOMContentLoaded, load, networkIdle)
- JavaScript runtime
- Network requests

---

### 5️⃣ Browser Configuration
```
SEND ► {"id":16,"method":"Browser.setWindowBounds","params":{"windowId":1,"bounds":{"width":1280,"height":720}}}
SEND ► {"id":17,"method":"Emulation.setDeviceMetricsOverride","params":{"mobile":false,"width":1280,"height":720}}
```
**What happened**: Sets viewport size to 1280×720 pixels.

---

### 6️⃣ User Agent Override
```
SEND ► {"id":18,"method":"Emulation.setUserAgentOverride","params":{"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.7499.4 Safari/537.36"}}
```
**What happened**: Makes Chrome pretend to be Windows 10 with US locale.

---

### 7️⃣ Font & Media Emulation
```
SEND ► {"id":20,"method":"Page.setFontFamilies","params":{"fontFamilies":{"standard":"Times","fixed":"Courier","serif":"Times","sansSerif":"Helvetica"}}}
SEND ► {"id":21,"method":"Emulation.setEmulatedMedia","params":{"features":[{"name":"prefers-color-scheme","value":"light"}]}}
```
**What happened**: Sets default fonts and media preferences (light mode, no animations).

---

### 8️⃣ Create Utility World
```
SEND ► {"id":12,"method":"Page.addScriptToEvaluateOnNewDocument","params":{"source":"","worldName":"__playwright_utility_world_page@..."}}
SEND ► {"id":23,"method":"Page.createIsolatedWorld","params":{"frameId":"...","worldName":"__playwright_utility_world_page@..."}}
```
**What happened**: Creates isolated JavaScript context for Playwright's internal scripts (selectors, waits, etc.).

---

### 9️⃣ Page Lifecycle Events
```
◀ RECV {"method":"Page.lifecycleEvent","params":{"frameId":"...","name":"commit"}}
◀ RECV {"method":"Page.lifecycleEvent","params":{"name":"DOMContentLoaded"}}
◀ RECV {"method":"Page.lifecycleEvent","params":{"name":"load"}}
◀ RECV {"method":"Page.lifecycleEvent","params":{"name":"networkAlmostIdle"}}
◀ RECV {"method":"Page.lifecycleEvent","params":{"name":"networkIdle"}}
```
**What happened**: Chrome reports page loading progress:
1. **commit** - Navigation started
2. **DOMContentLoaded** - HTML parsed, DOM ready
3. **load** - All resources loaded
4. **networkAlmostIdle** - No network activity for 0.5s
5. **networkIdle** - No network activity for 2s

---

### 🔟 JavaScript Context Created
```
◀ RECV {"method":"Runtime.executionContextCreated","params":{"context":{"id":1,"origin":"://","name":"","auxData":{"isDefault":true,"type":"default"}}}}
```
**What happened**: JavaScript execution environment is ready for `page.evaluate()` calls.

---

## 💡 Key Insights

### WebSocket Communication Pattern
```
Your Test Code
     ↓
Playwright (Node.js)
     ↓ [WebSocket]
Chrome DevTools Protocol
     ↓
Chrome Browser
```

Every single Playwright action translates to CDP commands:
- `page.goto()` → `Page.navigate`
- `page.click()` → `Runtime.evaluate` (to find element) + `Input.dispatchMouseEvent`
- `page.fill()` → `Runtime.evaluate` + `Input.insertText`
- `expect(page).toHaveTitle()` → `Runtime.evaluate` (to get document.title)

---

## 🎓 What This Teaches Us

1. **Everything is asynchronous** - Notice all messages have IDs for request/response matching
2. **Playwright is smart** - It creates isolated worlds to avoid conflicts with page JavaScript
3. **WebSocket is fast** - All this happens in milliseconds
4. **CDP is powerful** - You can control EVERYTHING in Chrome (network, performance, security, etc.)

---

## 🧪 Try This Yourself

Run these commands to see different CDP patterns:

### See navigation commands:
```bash
DEBUG=pw:protocol npx playwright test tests/example.spec.ts --grep "has title" 2>&1 | grep "Page.navigate"
```

### See only evaluation commands:
```bash
DEBUG=pw:protocol npx playwright test 2>&1 | grep "Runtime.evaluate"
```

### See network requests:
```bash
DEBUG=pw:protocol npx playwright test 2>&1 | grep "Network.request"
```

### See all CDP categories:
```bash
DEBUG=pw:protocol npx playwright test 2>&1 | grep "SEND" | cut -d'"' -f6 | cut -d'.' -f1 | sort | uniq
```

Expected output:
```
Browser
Emulation
Input
Log
Network
Page
Runtime
Target
```

---

## 📝 Interview Question

**Q: What is the Chrome DevTools Protocol (CDP)?**

**A**: CDP is a WebSocket-based protocol that allows external tools to instrument, inspect, debug, and control Chromium browsers. Playwright uses CDP to:
- Create browser contexts and pages
- Navigate to URLs
- Execute JavaScript
- Intercept network requests
- Take screenshots
- Emulate devices
- Monitor console logs
- Inject scripts

Every Playwright action translates to one or more CDP commands sent via WebSocket. For example, `page.goto('https://example.com')` sends:
1. `Page.enable` - Enable page domain
2. `Page.navigate` - Navigate to URL
3. Receive `Page.frameStartedLoading`, `Page.frameStoppedLoading`, `Page.lifecycleEvent` events

---

## 🔧 Practical Applications

### 1. Debugging Flaky Tests
If a test is flaky, run with `DEBUG=pw:protocol` to see:
- When selectors are evaluated
- Network timing issues
- JavaScript errors in isolated world

### 2. Performance Analysis
Count how many CDP commands your test generates:
```bash
DEBUG=pw:protocol npx playwright test 2>&1 | grep "SEND" | wc -l
```
Fewer commands = faster tests!

### 3. Understanding Auto-Waiting
Watch for `Runtime.evaluate` calls - Playwright repeatedly evaluates selectors until element appears (auto-retry).

---

## ✅ Exercise Complete!

**What we did:**
- ✅ Ran tests with `DEBUG=pw:protocol`
- ✅ Observed WebSocket communication
- ✅ Understood browser initialization flow
- ✅ Saw lifecycle events in action
- ✅ Learned CDP command structure

**Next steps:**
- Try debugging your own tests with this flag
- Explore other DEBUG options: `DEBUG=pw:api`, `DEBUG=pw:browser`
- Read CDP documentation: https://chromedevtools.github.io/devtools-protocol/

---

**Pro Tip**: Use `DEBUG=pw:api` to see high-level Playwright API calls instead of low-level CDP commands. This is better for understanding test flow!

```bash
DEBUG=pw:api npx playwright test tests/example.spec.ts
```

Output will show:
```
pw:api => page.goto('https://playwright.dev/')
pw:api => expect.toHaveTitle('Playwright')
```

Much cleaner! 🎉
