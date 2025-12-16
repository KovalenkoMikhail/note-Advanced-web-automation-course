# Programming Fundamentals

**Complete IT Lecture Notes - Theme 5**

This document covers JavaScript, HTML, Linux commands, and browser storage.

---

## Table of Contents

1. [Java Programming Basics](#1-java-programming-basics)
2. [Browser Data Storage](#2-browser-data-storage)
3. [Linux Commands](#3-linux-commands)
4. [HTML Basics](#4-html-basics)
5. [JavaScript Functions Advanced](#5-javascript-functions-advanced)
6. [JavaScript Iteration Methods](#6-javascript-iteration-methods)

---

## 1. Java Programming Basics

### ProcessBuilder and Process Handling

#### Main Methods:

- **`getInputStream()`** - method of Process object that returns data stream from standard output
- **`getErrorStream()`** - for getting error messages
- **`waitFor()`** - kills process so it doesn't hang
- **`Collectors.joining(System.lineSeparator())`** - static method from Java Stream API that collects stream elements into one large string using separator

### String Processing

- **`trim()`** - String class method that removes spaces, tabs and line breaks from start and end of string
- **Concatenation** - string joining

### Conversion and Formatting Block

This block attempts to convert text output to floating point number and format it to four decimal places, catching errors if output is not a number.

**Why?** For some errors, output goes not to error (stderr), but stdout (when dividing by 0), so need to handle separately.

### Validation and Error Handling:

1. Check `stderr` for errors, if present - throw `IllegalArgumentException`
2. Then check `stdout`, empty output
3. `try-catch Double.parseDouble` - conversion to number
4. Handle `NumberFormatException`
5. Format result to 4 decimal places

---

## 2. Browser Data Storage

### Storage Mechanisms Comparison:

| Feature          | Cookie                                           | Local Storage                                                                       | Session Storage                           |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| **Lifetime**     | Set by server                                    | Saved until user manually clears them                                               | Valid until browser tab is closed         |
| **Access**       | Available for client (browser) and server        | Only for client (browser)                                                           | Only for client (browser)                 |
| **Data Volume**  | 2-5 KB                                           | 5-10 MB                                                                             | Temporary storage                         |
| **Purpose**      | Authentication, personalization, tracking        | Store data that should persist long-term (e.g., interface theme mode)               | Temporary data storage                    |
| **Security**     | Vulnerable to CSRF (Cross-Site Request Forgery)  | Vulnerable to XSS (Cross-Site Scripting)                                            | Vulnerable to XSS (Cross-Site Scripting)  |
| **Example**      | Session token                                    | Interface settings                                                                  | Filled form before submission             |

---

## 3. Linux Commands

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

---

## 4. HTML Basics

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

---

## 5. JavaScript Functions Advanced

### Description:

- **Advanced function concepts** - anonymous functions, closures, context
- **Functional programming** - pure functions and development style

### Anonymous Functions:

#### Definition:

- **Declared without name or identifier** - function() {}
- **Arrow functions are always anonymous** - () => {}
- **Function() constructors create anonymous functions** - new Function()

#### Features:

- **Cannot easily call themselves recursively** - no name for recursion
- **Assigned to variable** - const greet = function() {}

### Arrow Functions vs Regular Functions:

#### Arrow Functions:

- **Use => syntax** - shorter syntax
- **Always anonymous** - don't have own name
- **Don't have own this** - inherit context
- **Don't have arguments, super, new.target** - limited functionality

#### Example:

```javascript
const a1 = a.map((s) => s.length);
```

### Closures:

#### Definition:

- **Function combination** - combined together
- **With references to surrounding state** - lexical environment
- **Access to outer function variables** - from inner function

#### Example:

```javascript
function init() {
  var name = 'Mozilla';
  function displayName() {
    console.log(name); // Access to outer function variable
  }
  displayName();
}
init(); // "Mozilla"
```

### Context this:

#### Context Loss:

- **Method extraction from object** - when method is assigned to variable
- **Passing as argument** - to another function
- **Inside functions** - creates new scope
- **With callbacks** - this changes
- **After async/await or setTimeout** - asynchronous context

#### Preventing Context Loss:

- **Use arrow functions** - preserve context
- **Use bind()** - bind context
- **Save this in variable** - const self = this

### Functional Programming:

#### Pure Functions:

- **Same input** - same output
- **Make code testable** - predictable behavior
- **Predictable** - without side effects

#### Development Style:

- **Software construction style** - functional approach
- **Using functions as main building blocks** - function composition

---

## 6. JavaScript Iteration Methods

### Description:

- **Iteration methods** - ways to iterate arrays and objects
- **forEach, for...in, for...of** - different iteration approaches

### forEach:

#### Basic Usage:

```javascript
let array1 = [1, 2, 3, 4, 5];
array1.forEach(function (item) {
  console.log(item); // 1,2,3,4,5
});
```

#### With Parameters:

```javascript
array1.forEach(function (item, index, array) {
  console.log('a[' + index + ']=' + item);
});
// a[0]=1, a[1]=2, a[2]=3, a[3]=4, a[4]=5
```

#### Features:

- **Accepts callback function** - defines operations for each element
- **Undefined elements don't display** - skips empty slots
- **Can use with conditions** - if inside forEach

### for...in:

#### For Objects:

```javascript
for (let key in person) {
  console.log(`${key}:${person[key]}`);
}
```

#### For Arrays:

```javascript
let arr = ['a', 'b'];
for (let i in arr) {
  console.log(i, arr[i]); // 0 a, 1 b
}
```

#### Features:

- **Iterates object (keys/names)** - enumerates properties
- **Used to enumerate object properties** - iteration over keys

### for...of:

#### Usage:

```javascript
const items = ['phone', 'table'];
for (const item of items) {
  console.log(item); // phone, table
}
```

#### Features:

- **Iterates arrays, array-like objects** - sets, maps, etc.
- **Iterates array | values (elements)** - iteration over values
- **More modern approach** - ES6+ syntax

### Method Comparison:

| Method   | Purpose              | What it iterates     |
| -------- | -------------------- | -------------------- |
| forEach  | Arrays               | Elements with index  |
| for...in | Objects/arrays       | Keys/indices         |
| for...of | Iterable objects     | Values               |

---

**Related Topics:**
- [Networking & Protocols](01_networking_protocols_http.md)
- [Testing & QA Automation](02_testing_qa_automation.md)
- [Version Control & DevOps](03_version_control_devops_cicd.md)
- [Databases & Backend APIs](04_databases_backend_apis.md)
contimue