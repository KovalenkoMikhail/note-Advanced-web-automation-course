# Complete IT Lecture Notes - Part 2

## 9. Web Automation and Locators

### XPath Locators

#### Main Operators and Axes:

- **`/`** - direct child
- **`//`** - any descendant
- **`.`** - current element
- **`..`** - parent element
- **`@`** - element attribute

#### Filters:

- **`[]`** - for filtering
- **Example:** `//div[@class = 'ticket']`

#### XPath Functions:

- **`text()`** - used inside element
- **`contains()`** - contains
- **`starts-with()`** - starts with
- **`ends-with()`** - ends with
- **`position()`** - position

#### Logical Operators:

- **`and, or`** - for combined conditions
- **Example:** `//a[@class = 'link' and contains(text(), 'example')]`

### XPath Locator Examples:

#### By Attributes:

- **`//*[@id='username']`** - by ID
- **`//*[@class='passwords']`** - by class name
- **`//*[@name='pass']`** - by name
- **`//p`** - by tag name

#### By Text:

- **`//*[text()='Submit']`** - by text

#### Using Functions:

- **`//*[contains(@href, 'google.com')]`** - use Contains
- **`//*[starts-with(@id, 'user')]`** - at the beginning
- **`//*[ends-with(@id, 'name')]`** - at the end

### CSS Selectors:

#### Main Selectors:

- **`#my-id`** - by ID
- **`.my-class`** - by class
- **`[name='q']`** - by attribute
- **`button[type='submit']`** - by tag and attribute

### Difference Between Static and Dynamic Path:

#### Static Path:

- **`html/body/div[1]/div[2]`** - tightly bound to structure

#### Dynamic Path:

- **`//input[contains(@id,'user')]`** - more flexible search

### General XPath Syntax:

**`Path = // tag_name [@attribute = 'value']`**

#### Examples:

- **`//input[@id = 'username']`** - by tag name
- **`//button[contains(@class, 'Submit')]`** - using contains()
- **`//input[starts-with(@name, 'email')]`** - using starts-with()
- **`//input[@id='password']/preceding-sibling::label`** - using preceding-sibling

## 10. Telegram Bot API

### User Interaction

**Telegram bot interacts with user through Telegram API**

### Message Receiving Mechanisms:

#### Long Polling:

- **Bot asks "Are there new messages?"** - simple but inefficient

#### Webhook:

- **Bot gives Telegram a URL** - to which Telegram itself sends messages

### API Connection:

1. **Create bot service in Telegram** (through Bot Father)
2. **Get token** (from Bot Father)
3. **API request must contain token**
4. **Token is set in configurations**

### Operation Features:

- **Like in regular REST API** - bot stores states
- **Important to test complete paths** - considering state preservation

## 11. Additional Git Commands

### Restoring Deleted Commit

#### Condition:

- **If commit ID exists (in git reflog)**

#### Restoration Steps:

1. **Create new branch pointing to commit**
2. **`git branch <branch name> abcde123`** - switch to commit
3. **Reset branch to commit**

#### Important Points:

- **Commits are deleted over time** - Git automatically cleans unused commits
- **Git garbage collection** - process of cleaning unused objects

## 12. Additional HTTP Methods

### HTTP Methods:

#### OPTIONS:

- **Request resource metadata** - to get information about which methods the resource handles

#### HEAD:

- **Works like GET, but without response body** - gets only headers

### Local Storage:

- **Local Storage** - data is saved even after closing browser

## 13. Browser Data Storage

### Storage Mechanisms Comparison:

| Feature          | Cookie                                           | Local Storage                                                                       | Session Storage                           |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| **Lifetime**     | Set by server                                    | Saved until user manually clears them                                               | Valid until browser tab is closed         |
| **Access**       | Available for client (browser) and server        | Only for client (browser)                                                           | Only for client (browser)                 |
| **Data Volume**  | 2-5 KB                                           | 5-10 MB                                                                             | Temporary storage                         |
| **Purpose**      | Authentication, personalization, tracking        | Store data that should persist long-term (e.g., interface theme mode)               | Temporary data storage                    |
| **Security**     | Vulnerable to CSRF (Cross-Site Request Forgery)  | Vulnerable to XSS (Cross-Site Scripting)                                            | Vulnerable to XSS (Cross-Site Scripting)  |
| **Example**      | Session token                                    | Interface settings                                                                  | Filled form before submission             |

## 14. Linux Commands

### Working with File System:

#### Navigation:

- **`pwd`** - current folder
- **`ls`** - nested folders
- **`ls -l`** - more detailed information
- **`ls -R`** - recursively go through folders

#### Directory Navigation:

- **`cd <folder name>`** - open folder
- **`cd ..`** - go back
- **`cd -`** - return to previous folder
- **`dirs -v`** - shows which folders you've been in

#### Working with Files:

- **`touch`** - create file
- **`rm`** - remove
- **`rmdir`** - remove directory
- **`cp`** - copy
- **`mv`** - rename and move files

#### File Search:

- **`find . -name "d*"`** - search
- **`sudo find . -type f -name ".*"`** - finds hidden files
- **`rm -rf`** - recursively force delete folder with all files and nested items

#### Working with Text:

- **`echo`** - output to console
- **`echo "test" >> animal22.json`** - through echo can write to file
- **`nano`** - edit file
- **`cat`** - view file
- **`vim`** - exit with :wq

#### File Analysis:

- **`wc -w animal22.json`** - word count
- **`wc -l`** - line count
- **`wc -m`** - character count
- **`diff`** - compare files

## 15. HTML Basics

### HTML Document Structure:

#### Main Elements:

- **`<!DOCTYPE html>`** - first element in HTML to set document type
- **`<html>`** - root element, defines document type
- **`<head>`** - metadata (title, encoding, styles, scripts)
- **`<body>`** - page content

### Main HTML Elements:

#### Headings:

- **`<h1>...<h6>`** - headings of different levels

#### Text Elements:

- **`<p>`** - paragraph
- **`<br>`** - line break
- **`<hr>`** - horizontal line

#### Links and Images:

- **`<a href="URL">TEXT</a>`** - links
- **`<a target="_blank">`** - open in new tab
- **`<img src="img.jpg" alt="Description">`** - image with alternative text

#### Lists:

- **`<ol> <li></li> </ol>`** - ordered lists
- **`<ul> <li></li> </ul>`** - unordered lists

#### Forms:

- **`<form>`** - form
- **`<input type="text|number|password">`** - input fields
- **`<textarea>`** - multiline field
- **`<button>`** - button
- **`<label>`** - field label
- **`<select>`** - dropdown list
- **`<option>`** - list item
- **`<fieldset>`** - field group
- **`<legend>`** - group heading

### Element Types:

#### Block Elements:

- **`div, p, h1..`** - occupy full width

#### Inline Elements:

- **`span, a, img`** - occupy only necessary space

### Semantic Elements:

- **`<header>`** - header
- **`<nav>`** - navigation
- **`<section>`** - section
- **`<article>`** - independent content block

### Attributes:

- **`id, class, style, title, lang`** - main attributes

### Meta Elements:

- **`<title>`** - page title
- **`<link>`** - connect external resources
- **`<script>`** - connect scripts

## 16. Mocks and Stubs in Testing

### Mocks

#### Definition:

- **Full-featured test objects**
- **Allow working with arguments and expectation checks**

#### Placement and Running:

- **Located on mock server**
- **Stored in separate folder in repository**
- **Can be run locally or through Docker**

#### Startup Commands:

- **`docker compose up -d mock-service`** - run through Docker
- **Can be deployed through CI/CD pipeline**

#### Architecture:

- **Mock service runs as sidecar container** alongside tested application
- **Mock service configuration possible through Bash in `.env` file**

#### Configuration Example:

- **`Payment-Service = http://mock-service:8080`**
- **Mock configuration files recommended to place next to its code**

### Stubs

#### Definition:

- **Return pre-prepared responses**

## 17. Playwright - Web Automation

### Working with Files:

#### File Upload:

- **`Set Input Files (selector, 'file.png')`** - set input files

#### Clearing:

- **`Clear (selector)`** - clear

### Dialogs and Popups:

#### Dialog Handling:

- **`on('dialog', async dialog => { await dialog.accept(); })`** - handle alerts
- **`on('popup', async popup => { await popup.waitForLoadState() })`** - handle popups

### JavaScript in Browser:

#### JS Execution:

- **`Evaluate (() => document.title)`** - execute JS in browser
- **`EvaluateHandle (() => window)`** - get reference to object

### Screenshots and Recording:

#### Screen Capture:

- **`Screenshot ({ path: 'screenshot.png' })`** - take screenshot
- **`recordVideo()`** - record video

## 18. Postman - API Testing

### Postman Variables (priority):

#### Variable Priority Order:

1. **Local** - highest priority
2. **Data variable** - from JSON or CSV, don't need to specify what it is
3. **Environment**
4. **Collection**
5. **Global variable** - lowest priority

---

_Continued in next part..._
