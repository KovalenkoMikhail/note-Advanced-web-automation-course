# Full IT Lecture Notes - Part 2

_Translated from original Russian notes based on 434 screenshots. Original created: 2024._

## 9. Web Automation and Locators

### XPath Locators

#### Main operators and axes:

- **`/`** - direct child
- **`//`** - any descendant
- **`.`** - current node
- **`..`** - parent node
- **`@`** - element attribute

#### Filters:

- **`[]`** - for filtering
- **Example:** `//div[@class = 'ticket']`

#### XPath functions:

- **`text()`** - used inside an element
- **`contains()`** - contains
- **`starts-with()`** - starts with
- **`ends-with()`** - ends with
- **`position()`** - position

#### Logical operators:

- **`and, or`** - for combined conditions
- **Example:** `//a[@class = 'link' and contains(text(), 'example')]`

### XPath locator examples:

#### By attributes:

- **`//*[@id='username']`** - by ID
- **`//*[@class='passwords']`** - by class name
- **`//*[@name='pass']`** - by name
- **`//p`** - by tag name

#### By text:

- **`//*[text()='Submit']`** - by text

#### Using functions:

- **`//*[contains(@href, 'google.com')]`** - using contains
- **`//*[starts-with(@id, 'user')]`** - at the start
- **`//*[ends-with(@id, 'name')]`** - at the end

### CSS selectors:

#### Basic selectors:

- **`#my-id`** - by ID
- **`.my-class`** - by class
- **`[name='q']`** - by attribute
- **`button[type='submit']`** - by tag and attribute

### Difference between static and dynamic paths:

#### Static path:

- **`html/body/div[1]/div[2]`** - tightly bound to structure

#### Dynamic path:

- **`//input[contains(@id,'user')]`** - more flexible search

### General XPath syntax:

**`Path = // tag_name [@attribute = 'value']`**

#### Examples:

- **`//input[@id = 'username']`** - by tag name
- **`//button[contains(@class, 'Submit')]`** - using contains()
- **`//input[starts-with(@name, 'email')]`** - using starts-with()
- **`//input[@id='password']/preceding-sibling::label`** - using preceding-sibling

## 10. Telegram Bot API

### Interaction with the user

**A Telegram bot communicates with users via the Telegram API**

### Message retrieval mechanisms:

#### Long Polling:

- **The bot asks "Are there new messages?"** - simple but inefficient

#### Webhook:

- **The bot provides Telegram with a URL** - to which Telegram sends messages itself

### Connecting to the API:

1. **Create a bot service in Telegram** (via Bot Father)
2. **Obtain a token** (from Bot Father)
3. **API requests must include the token**
4. **The token is set in configurations**

### Operational notes:

- **As with a typical REST API** - the bot stores states
- **It is important to test full flows** - taking state persistence into account

## 11. Additional Git commands

### Restoring a deleted commit

#### Condition:

- **If you have the commit ID (in git reflog)**

#### Restore steps:

1. **Create a new branch pointing to the commit**
2. **`git branch <branch-name> abcde123`** - point to the commit
3. **Reset the branch to the commit**

#### Important notes:

- **Commits are cleaned up over time** - Git automatically prunes unreachable commits
- **Git garbage collection** - the process that removes unused objects

## 12. Additional HTTP methods

### HTTP methods:

#### OPTIONS:

- **Request metadata about a resource** - to find out which methods the resource supports

#### HEAD:

- **Works like GET but without a response body** - retrieves only headers

### Local storage:

- **Local Storage** - data persists even after the browser is closed

## 13. Storing data in the browser

### Comparison of storage mechanisms:

| Characteristic   | Cookie                                          | Local Storage                                                             | Session Storage                          |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| **Lifetime**     | Set by the server                               | Persist until the user clears them manually                               | Valid until the browser tab is closed    |
| **Access**       | Accessible by client (browser) and server       | Client-only (browser)                                                     | Client-only (browser)                    |
| **Storage size** | 2-5 KB                                          | 5-10 MB                                                                   | Temporary storage                        |
| **Use cases**    | Authentication, personalization, tracking       | Storing data that should persist for a long time (e.g., UI theme setting) | Temporary storage of data                |
| **Security**     | Vulnerable to CSRF (Cross-Site Request Forgery) | Vulnerable to XSS (Cross-Site Scripting)                                  | Vulnerable to XSS (Cross-Site Scripting) |
| **Example**      | Session token                                   | UI settings                                                               | A filled form before submission          |

## 14. Linux commands

### Working with the filesystem:

#### Navigation:

- **`pwd`** - current folder
- **`ls`** - list nested folders
- **`ls -l`** - more detailed information
- **`ls -R`** - recursively traverse folders

#### Changing directories:

- **`cd <folder_name>`** - open a folder
- **`cd ..`** - go back
- **`cd -`** - return to the previous folder
- **`dirs -v`** - shows the directories you have been in

#### File operations:

- **`touch`** - create a file
- **`rm`** - remove
- **`rmdir`** - remove directory
- **`cp`** - copy
- **`mv`** - rename and move files

#### Finding files:

- **`find . -name "d*"`** - search
- **`sudo find . -type f -name ".*"`** - find hidden files
- **`rm -rf`** - force remove a folder recursively with all files and contents

#### Working with text:

- **`echo`** - print to console
- **`echo "test" >> animal22.json`** - append to a file via echo
- **`nano`** - edit a file
- **`cat`** - view a file
- **`vim`** - exit with :wq

#### File analysis:

- **`wc -w animal22.json`** - word count
- **`wc -l`** - line count
- **`wc -m`** - character count
- **`diff`** - compare files

## 15. HTML basics

### HTML document structure:

#### Main elements:

- **`<!DOCTYPE html>`** - the first element to declare the document type
- **`<html>`** - root element, defines the document type
- **`<head>`** - metadata (title, encoding, styles, scripts)
- **`<body>`** - page content

### Core HTML elements:

#### Headings:

- **`<h1>...<h6>`** - headings of different levels

#### Text elements:

- **`<p>`** - paragraph
- **`<br>`** - line break
- **`<hr>`** - horizontal rule

#### Links and images:

- **`<a href="URL">TEXT</a>`** - links
- **`<a target="_blank">`** - open in a new tab
- **`<img src="img.jpg" alt="Description">`** - image with alt text

#### Lists:

- **`<ol> <li></li> </ol>`** - ordered lists
- **`<ul> <li></li> </ul>`** - unordered lists

#### Forms:

- **`<form>`** - form
- **`<input type="text|number|password">`** - input fields
- **`<textarea>`** - multi-line field
- **`<button>`** - button
- **`<label>`** - label for a field
- **`<select>`** - dropdown
- **`<option>`** - dropdown item
- **`<fieldset>`** - group of fields
- **`<legend>`** - group title

### Element types:

#### Block elements:

- **`div, p, h1..`** - occupy full available width

#### Inline elements:

- **`span, a, img`** - occupy only required space

### Semantic elements:

- **`<header>`** - header
- **`<nav>`** - navigation
- **`<section>`** - section
- **`<article>`** - standalone content block

### Attributes:

- **`id, class, style, title, lang`** - main attributes

### Meta elements:

- **`<title>`** - page title
- **`<link>`** - include external resources
- **`<script>`** - include scripts

## 16. Mocks and stubs in testing

### Mocks

#### Definition:

- **Fully featured test objects**
- **Allow working with arguments and verifying expectations**

#### Placement and running:

- **Hosted on a mock server**
- **Stored in a separate folder in the repository**
- **Can be run locally or via Docker**

#### Run commands:

- **`docker compose up -d mock-service`** - start via Docker
- **Can be deployed via CI/CD pipeline**

#### Architecture:

- **The mock service runs as a sidecar container** alongside the application under test
- **Mock service configuration can be set via Bash in a `.env` file**

#### Example configuration:

- **`Payment-Service = http://mock-service:8080`**
- **Config files for mocks are recommended to live next to their code**

### Stubs

#### Definition:

- **Return pre-prepared responses**

## 17. Playwright - web automation

### File operations:

#### Uploading files:

- **`Set Input Files (selector, 'file.png')`** - set input files

#### Clearing:

- **`Clear (selector)`** - clear

### Dialogs and popups:

#### Handling dialogs:

- **`on('dialog', async dialog => { await dialog.accept(); })`** - handle alerts
- **`on('popup', async popup => { await popup.waitForLoadState() })`** - handle popups

### JavaScript in the browser:

#### Executing JS:

- **`Evaluate (() => document.title)`** - run JS in the browser
- **`EvaluateHandle (() => window)`** - get a handle to the object

### Screenshots and recording:

#### Capture screen:

- **`Screenshot ({ path: 'screenshot.png' })`** - take a screenshot
- **`recordVideo()`** - record video

## 18. Postman - API testing

### Postman variables (priority):

#### Variable priority order:

1. **Local** - highest priority
2. **Data variable** - from JSON or CSV (no explicit naming required)
3. **Environment**
4. **Collection**
5. **Global variable** - lowest priority

---

_Continued in the next part..._
