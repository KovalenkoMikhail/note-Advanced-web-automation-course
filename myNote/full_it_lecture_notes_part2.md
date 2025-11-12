# Full IT Lecture Notes - Part 2

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

- **`text()`** - used inside an element
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

- **`//*[contains(@href, 'google.com')]`** - using Contains
- **`//*[starts-with(@id, 'user')]`** - starts with
- **`//*[ends-with(@id, 'name')]`** - ends with

### CSS Selectors:

#### Main Selectors:

- **`#my-id`** - by ID
- **`.my-class`** - by class
- **`[name='q']`** - by attribute
- **`button[type='submit']`** - by tag and attribute

### Difference Between Static and Dynamic Path:

#### Static Path:

- **`html/body/div[1]/div[2]`** - strictly tied to structure

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

**Telegram bot interacts with the user via the Telegram API**

### Message Retrieval Mechanisms:

#### Long Polling:

- **Bot asks "Are there new messages?"** - simple but inefficient

#### Webhook:

- **Bot provides Telegram with a URL** - Telegram sends messages to this URL

### Connecting to the API:

1. **Create a bot service in Telegram** (via Bot Father)
2. **Get a token** (from Bot Father)
3. **API request must include the token**
4. **Token is set in configurations**

### Operation Features:

- **Like a regular REST API** - the bot maintains states
- **Important to test full paths** - considering state persistence

## 11. Additional Git Commands

### Restoring a Deleted Commit

#### Condition:

- **If you have the commit ID (in git reflog)**

#### Recovery Steps:

1. **Create a new branch pointing to the commit**
2. **`git branch <branch name> abcde123`** - switch to the commit
3. **Reset the branch to the commit**

#### Important Notes:

- **Commits are deleted over time** - Git automatically cleans up unused commits
- **Git garbage collection** - process of cleaning up unused objects

## 12. Additional HTTP Methods

### HTTP Methods:

#### OPTIONS:

- **Request metadata about a resource** - to find out which methods the resource supports

#### HEAD:

- **Works like GET but without response body** - retrieves only headers

### Local Storage:

- **Local Storage** - data persists even after closing the browser

## 13. Data Storage in the Browser

### Comparison of Storage Mechanisms:

| Characteristic  | Cookie                                          | Local Storage                                                           | Session Storage                          |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------- |
| **Lifetime**    | Set by server                                   | Persists until manually cleared by user                                 | Valid until browser tab is closed        |
| **Access**      | Available to client (browser) and server        | Only for client (browser)                                               | Only for client (browser)                |
| **Data Volume** | 2-5 KB                                          | 5-10 MB                                                                 | Temporary storage                        |
| **Purpose**     | Authentication, personalization, tracking       | Storing data that should persist long-term (e.g., interface theme mode) | Temporary data storage                   |
| **Security**    | Vulnerable to CSRF (Cross-Site Request Forgery) | Vulnerable to XSS (Cross-Site Scripting)                                | Vulnerable to XSS (Cross-Site Scripting) |
| **Example**     | Session token                                   | Interface settings                                                      | Filled form before submission            |

## 14. Linux Commands

### Working with the File System:

#### Navigation:

- **`pwd`** - current folder
- **`ls`** - list folders
- **`ls -l`** - more detailed info
- **`ls -R`** - recursively list folders

#### Changing Directories:

- **`cd <folder name>`** - open folder
- **`cd ..`** - go back
- **`cd -`** - return to previous folder
- **`dirs -v`** - show folder history

#### Working with Files:

- **`touch`** - create file
- **`rm`** - delete
- **`rmdir`** - delete directory
- **`cp`** - copy
- **`mv`** - rename and move files

#### Finding Files:

- **`find . -name "d*"`** - search
- **`sudo find . -type f -name ".*"`** - find hidden files
- **`rm -rf`** - recursively force delete folder with all files and subfolders

#### Working with Text:

- **`echo`** - output to console
- **`echo "test" >> animal22.json`** - use echo to write to file
- **`nano`** - edit file
- **`cat`** - view file
- **`vim`** - exit :wq

#### File Analysis:

- **`wc -w animal22.json`** - word count
- **`wc -l`** - line count
- **`wc -m`** - character count
- **`diff`** - compare files

## 15. HTML Basics

### HTML Document Structure:

#### Main Elements:

- **`<!DOCTYPE html>`** - first element in HTML to specify document type
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
- **`<img src="img.jpg" alt="Description">`** - image with alt text

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
- **`<fieldset>`** - group of fields
- **`<legend>`** - group title

### Element Types:

#### Block Elements:

- **`div, p, h1..`** - take full width

#### Inline Elements:

- **`span, a, img`** - take only necessary space

### Semantic Elements:

- **`<header>`** - header
- **`<nav>`** - navigation
- **`<section>`** - section
- **`<article>`** - independent content block

### Attributes:

- **`id, class, style, title, lang`** - main attributes

### Meta Elements:

- **`<title>`** - page title
- **`<link>`** - external resources
- **`<script>`** - scripts

## 16. Mocks and Stubs in Testing

### Mocks

#### Definition:

- **Fully functional test objects**
- **Allow working with arguments and expectation checks**

#### Placement and Launch:

- **Located on a mock server**
- **Stored in a separate folder in the repository**
- **Can be run locally or via Docker**

#### Launch Commands:

- **`docker compose up -d mock-service`** - launch via Docker
- **Can be deployed via CI/CD pipeline**

#### Architecture:

- **Mock service runs as a sidecar container** with the tested application
- **Mock service configuration possible via Bash in `.env` file**

#### Configuration Example:

- **`Payment-Service = http://mock-service:8080`**
- **Mock configuration files should be placed next to its code**

### Stubs

#### Definition:

- **Return pre-prepared responses**

## 17. Playwright - Web Automation

### Working with Files:

#### File Upload:

- **`Set Input Files (selector, 'file.png')`** - set input files

#### Clear:

- **`Clear (selector)`** - clear

### Dialogs and Popups:

#### Handling Dialogs:

- **`on('dialog', async dialog => { await dialog.accept(); })`** - handle alerts
- **`on('popup', async popup => { await popup.waitForLoadState() })`** - handle popups

### JavaScript in Browser:

#### Executing JS:

- **`Evaluate (() => document.title)`** - execute JS in browser
- **`EvaluateHandle (() => window)`** - get reference to object

### Screenshots and Recording:

#### Screen Capture:

- **`Screenshot ({ path: 'screenshot.png' })`** - take screenshot
- **`recordVideo()`** - record video

## 18. Postman - API Testing

### Postman Variables (Priority):

#### Variable Priority Order:

1. **Local** - highest priority
2. **Data variable** - with JSON or CSV, no need to specify
3. **Environment**
4. **Collection**
5. **Global variable** - lowest priority

---

_Continued in the next part..._
