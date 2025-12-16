# Testing, QA & Automation

**Complete IT Lecture Notes - Theme 2**

This document covers all software testing, QA practices, and automation tools.

---

## Table of Contents

1. [Software Testing Fundamentals](#1-software-testing-fundamentals)
2. [Test Case & Bug Report Structure](#2-test-case--bug-report-structure)
3. [Test Design Techniques](#3-test-design-techniques)
4. [10 QA Commandments](#4-10-qa-commandments)
5. [JUnit 5 & Automated Testing](#5-junit-5--automated-testing)
6. [Performance Testing (JMeter)](#6-performance-testing-jmeter)
7. [Web Automation & Locators (XPath, CSS)](#7-web-automation--locators)
8. [Playwright - Web Automation](#8-playwright-web-automation)
9. [Playwright Storage State](#9-playwright-storage-state)
10. [Playwright API Methods](#10-playwright-api-methods)
11. [Postman - API Testing](#11-postman-api-testing)
12. [Fetch API](#12-fetch-api)
13. [Mocks and Stubs](#13-mocks-and-stubs)
14. [Test Automation Best Practices](#14-test-automation-best-practices)
15. [Interview Preparation](#15-interview-preparation)

---

## 1. Software Testing Fundamentals

### Test Case Structure:

- **ID** - identifier
- **Title** - title
- **Type** - type
- **Priority** - priority
- **Preconditions** - preconditions
- **Steps** - steps
- **Expected Result** - expected result
- **Post conditions** - post conditions

### Software Quality Definition:

**Software Quality - a set of characteristics that satisfy established and expected needs**

### Testing Stages:

1. **Product Analysis**
2. **Work with Requirements**
3. **Test Plan**
4. **Creation of Test Documentation**
5. **Testing**
6. **Test Report**
7. **Stabilization**
8. **Operation/Maintenance**

### Build Verification:

#### Quick Testing Types:

- **Smoke** - quick test for stability of core functions
- **Sanity** - more detailed functional check

### Testing Principles:

1. **Testing shows presence of defects**
2. **Exhaustive testing is impossible**
3. **Early testing**
4. **Defect clustering**
5. **Pesticide paradox**
6. **Testing is context dependent**
7. **Absence-of-errors fallacy**

### Types of Testing:

#### Functional Testing Types:

- **Functional Testing** - what does the system do? What functions does it perform?
- **GUI Test** - Graphical User Interface
- **Security and Access Control Testing**
- **Interoperability Test**

#### Non-Functional Testing:

- **Performance**:
  - **Load Test** - many users
  - **Stress Test** - peak values
  - **Volume Test** - large data
- **Stability and Reliability**
- **Installation**
- **Failover and Recovery**
- **Usability**
- **Configuration Test**

#### Change-Related Testing:

- **Smoke Testing**
- **Regression Testing**
- **Re-test**

#### Other Types:

- **Exploratory** - system exploration, test case design based on QA tester experience
- **Ad-hoc** - informal testing without formal test cases

### Testing Levels:

1. **Unit Testing**
2. **Integration Testing**
3. **System Testing**
4. **Acceptance Testing**

### Testing Types by Execution Method:

#### Static Testing:

- **Static Test** - without code execution

#### Dynamic Testing:

- **Dynamic Test** - with code execution

### Testing Requirements:

1. **Correctness**
2. **Unambiguity**
3. **Completeness**
4. **Consistency**
5. **Ordering** (by importance/stability)
6. **Verifiability**
7. **Modifiability**
8. **Traceability**
9. **Understandability**

---

## 2. Test Case & Bug Report Structure

### Bug Report Structure:

#### Main Fields:

- **ID** - identifier
- **Title** - problem description
- **Project** - project name
- **Component** - affected component
- **Version** - product version
- **Severity** - impact level
- **Priority** - fix urgency
- **Status** - current state
- **Author** - who reported the bug
- **Assignee** - who is assigned to fix
- **Env** - reproduction environment
- **Build Version** - specific build

#### Reproduction Details:

- **Steps to Reproduce**
- **Actual Result**
- **Expected Result**

#### Bug Report Attachments:

- **Screenshots**
- **Video**
- **Credentials**
- **Browser Logs/Errors**
- **Server Logs**
- **API Request**
- **Analytics Events**
- **Database Data**
- **Database Queries**
- **Comments/Notes**
- **Task Link**
- **HAR Archive**

---

## 3. Test Design Techniques

### Test Design Techniques:

1. **Equivalence Partitioning** - keyboard input

2. **Boundary Value Analysis**:

   - **Valid values:** 1, 10
   - **Invalid values:** 0, 11
   - **Complete boundaries:**
     - **Valid:** 1, 2, 9, 10
     - **Invalid:** 0, 11

3. **Cause/Effect**

4. **Error Guessing**

5. **Pairwise Testing**:

   - **Testing pairs of combinations**
   - **Not all combinations**

6. **Decision Table**:
   - **Set of conditions**
   - **Should lead to specific action/decision**

### Diagrams and Schemes:

#### State Transition Diagram:

- **Describes system behavior**
- **System has finite number of states and transitions between them**
- **Can be converted to Decision Table**

#### Use Case:

- **Who?**
- **What do they want to do?**
- **Steps**
- **System response**

#### Block Scheme:

- **For test design and visualization**

### Testing Approaches:

- **Semi-Exhaustive Test** - in build or similar
- **Conversation-Driven** - discussions
- **Analytics-Driven** - analytics
- **Bug-Driven** - bugs

---

## 4. 10 QA Commandments

1. **Don't trust developer's "It works on my machine"**
2. **Write test cases as if you'll forget tomorrow**
3. **Test not only what should work (Happy Path), but also what should break**
4. **Ask. Always. About everything. Even if you think you know**
5. **You're not blocking the release - you're saving the company**
6. **Undocumented bug is a legend, not a fact**
7. **Automated tests can help, but don't do everything for you**
8. **Never test with the same data as developers**
9. **Less communication in team - more problems on release**
10. **Never trust words "We've checked it"**

---

## 5. JUnit 5 & Automated Testing

### Automated Tests for Calculator

Project written in **Java (21)**, uses **JUnit 5** for testing, built with **Maven**.

### JUnit 5 Test Structure

#### Annotations:

- **`@Test`** - JUnit 5 annotation. Marks method as test
- **`@DisplayName`** - Human-readable name for test method. Informative
- **`@BeforeEach`** - initialization before each test
- **`@ParameterizedTest`** - allows running the same test multiple times with different sets of input data (arguments)
- **`@MethodSource`** - to specify that test arguments are extracted to a static method

#### Positive Tests

- **`@assertEquals`** - compare expected and actual result
- Check correct work with valid data

#### Negative Tests

- **`assertThrows`** - check exception is thrown
- **`assertTrue(getMessage().contains)`** - validate error text
- Check incorrect input handling:
  - Division by 0
  - Invalid format
- Throw exceptions, ensure it doesn't just crash but gives error, check it

### Exception Handling

#### Try-catch block

- **`try:`** - code block where exceptions may occur
- If exception occurs - move to `catch` block

#### Exception Types:

- **`NumberFormatException`** - when attempting to convert non-numeric value
- **`IllegalArgumentException`** - exception type (Unchecked Exception). Thrown when method receives invalid or inappropriate argument

#### `throw` - for explicitly throwing exception

Used when code detects an error it can't handle and passes it up the call stack.

---

## 6. Performance Testing (JMeter)

### Performance Testing Types

#### Load Testing:

- **Testing work under expected load**

#### Stress Test:

- **Under load** - goal: find breaking point

#### Spike Test:

- **Sharp traffic increase** (Black Friday)

#### Soak Testing (Endurance):

- **Long-term testing under expected load**
- **Goal:** find memory leaks and other issues

### Performance Metrics

- **Response time / Latency** - server response time
- **Throughput** - number of requests per second/min (TPS - Transaction per Second)
- **CPU / Memory Usage** - critical for identifying bottlenecks
- **Error Rate** - percentage of errors under load

### Tools

- **JMeter, Gatling, LoadRunner**

### JMeter - Detailed Description

#### Main Components:

- **Test Plan** - stores test structure
- **Thread Group** - virtual users, configure
  - **Number of threads (users)** - number of users
  - **Ramp-up period** - if 100 users and Ramp up in seconds - every 0.1 sec there will be a new user
  - **Loop Count** - how many actions (cases) user will perform
- **Sampler** - actions (cases) performed by user
- **Listener** - collects test results

#### JMeter Reports:

##### Summary Report:

- **# Samples** - total number of requests
- **Average** - average response time
- **Min/Max** - response time
- **Error%** - percentage of errors
- **Throughput** - number of requests per second
- **Received/Sent** - received and sent data

##### Aggregate Report:

- **Shows response time** in which 90% of all requests fit
- **Outside stability assessment** 95/99%

##### Graph Results:

- **For visualizing graph** of loaded system
- **JMeter loads system, better from console**
- **Report as file**

#### JMeter Commands:

- **`jmeter -n -t my_test.jmx -l results.jtl`**
  - **`-n`** - run without UI
  - **`-t`** - path to Test Plan
  - **`-l`** - path to results file

#### Integration:

- **Can integrate into CI** (Continuous Integration)
- **Load Test: average load**

---

## 7. Web Automation & Locators

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

---

## 8. Playwright - Web Automation

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

---

## 9. Playwright Storage State

### Description:

- **Storage state** - saving and restoring browser state
- **Includes cookies, local storage, session storage** and other data

### Arguments for Storage State:

- **`await apiRequestContext.storageState()`** - get storage state
- **`options Object`** - configuration options
- **`indexedDB boolean`** - enable/disable IndexedDB
- **`path string`** - path to save state

### Returns:

#### cookies Array<Object>:

- **`name`** - cookie name
- **`value`** - cookie value
- **`domain`** - domain
- **`path`** - path
- **`expires (UNIX time in sec)`** - expiration time
- **`httpOnly`** - httpOnly flag
- **`secure`** - secure flag
- **`sameSite`** - sameSite policy

#### Origins Array<Object>:

- **`origin`** - data origin

#### local storage:

- **`name`** - key name
- **`value`** - value

---

## 10. Playwright API Methods

### API Request Arguments:

- **`URL String`** - request URL
- **`Options (Object)`** - object with options

### Options (Object):

#### data:

- **`string`** - string data
- **`Buffer`** - binary data
- **`Serializable`** - serializable data
- **`content-type`**: `application/json`, `application/octet-stream`

#### failOnStatusCode:

- **`boolean`** - flag for status code error handling

#### form:

- **`Object <String, string | number | boolean>`** - form data
- **`Form Data`** - form data

#### headers:

- **`Object <String, string>`** - HTTP headers

#### ignoreHTTPErrors:

- **`boolean`** - ignore HTTP errors

#### maxRedirects:

- **`number`** - maximum number of redirects

#### maxRetries:

- **`number`** - maximum number of retries

#### multipart:

- **`Object`** - multipart data
- **`name`** - field name
- **`mimeType`** - MIME type
- **`file`** - file (Buffer or Read Stream Object)
- **`file content`** - file content

#### params:

- **`Object <String, string | number | boolean>`** - URL parameters
- **`URL Search Params`** - search parameters

#### timeout:

- **`number`** - request timeout

### API Response Methods:

#### body():

- **`await apiResponse.body()`** - get response body
- **`Returns the buffer with response body`**

#### dispose():

- **`await apiResponse.dispose()`** - release resources
- **`Disposes the body of this response`**
- **`Return Promise<void>`**

#### headers():

- **`apiResponse.headers()`** - get headers
- **`Return Object<string, string>`** - returns headers object

#### headersArray():

- **`apiResponse.headersArray()`** - get headers as array
- **`Returning Array<Object>`** - returns array of objects
- **`name`** - header name
- **`value`** - header value

#### json():

- **`await apiResponse.json()`** - parse JSON
- **`Promise<Serializable>`** - returns serializable object
- **`Parse JSON`**

#### ok():

- **`await apiResponse.ok()`** - check success
- **`boolean`** - returns boolean

#### status():

- **`apiResponse.status()`** - get status code
- **`number`** - returns number

#### statusText():

- **`apiResponse.statusText()`** - get status text
- **`string`** - returns string

#### text():

- **`await apiResponse.text()`** - get text
- **`Promise<string>`** - returns Promise<string>

#### url:

- **`apiResponse.url`** - get URL
- **`string`** - returns string

---

## 11. Postman - API Testing

### Postman Variables (priority):

#### Variable Priority Order:

1. **Local** - highest priority
2. **Data variable** - from JSON or CSV, don't need to specify what it is
3. **Environment**
4. **Collection**
5. **Global variable** - lowest priority

---

## 12. Fetch API

### Description:

- **Fetch API** - modern way to send HTTP requests
- **Send requests and receive responses** in JavaScript

### Main Capabilities:

- **`Send request and return response`**
- **`JSON object can be passed to the request`**

### Usage Examples:

#### POST Request with JSON:

```javascript
await request.fetch('https://example.com', {
  method: 'post',
  data: {
    title: 'Book Title',
    author: 'John Doe',
  },
});
```

#### Sending Files:

- **`The common way to send files`**
- **`multipart/form-data encoding`**
- **`FormData parameter`**

```javascript
const form = new FormData();
form.set('name', 'John');
```

---

## 13. Mocks and Stubs

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

---

## 14. Test Automation Best Practices

### Main Principles:

#### 1. Start with Clear Automation Strategy

- **Strategy** - test automation plan

#### 2. Prioritize Tests for Automation

- **Based on value and ROI** - return on investment
- **Investment coefficient** - return on investment

#### 3. Use Right Tools

- **Choose appropriate frameworks** - for specific tasks

#### 4. Design Modular and Reusable Scripts

- **Modularity** - component separation
- **Reusability** - avoid duplication

#### 5. Implement Data-Driven Testing

- **Data-Driven Testing** - data-based tests

#### 6. Integrate Continuous Integration (CI)

- **Continuous Integration** - build automation

#### 7. Focus on Test Maintenance

- **Maintenance** - test support

#### 8. Use Parallel Testing

- **Leverage Parallel Testing** - execution speedup

#### 9. Implement Continuous Testing

- **Continuous Testing** - constant testing

#### 10. Adopt Shift-Left Approach

- **Early Testing** - testing at early stages

#### 11. Create Tests Adapting to UI Changes

- **Adaptability** - resilience to changes

#### 12. Use AI and Machine Learning

- **Artificial Intelligence** - for test improvement

#### 13. Ensure Cross-Browser and Cross-Platform Testing

- **Cross-Browser Testing** - testing in different browsers
- **Cross-Platform Testing** - testing on different platforms

#### 14. Maintain Balanced Testing Pyramid

- **Test Automation Pyramid** - proper test distribution

#### 15. Include Robust Reporting

- **Robust Reporting** - quality reports
- **Strong Analytics** - powerful analytics

#### 16. Develop Collaboration Between Teams

- **Collaboration Between Teams** - team interaction

---

## 15. Interview Preparation

### Interview List:

#### 1. Eye Contact

- **Sometimes** - eye contact sometimes

#### 2. Questions from Books

- **In Europe ask a lot of questions from books**

#### 3. Other Frameworks

- **May ask about Selenium** - how to click with selenium
- **How to input data** - how input
- **Cypress - opinion** - Cypress opinion
- **What do you think about it**

#### 4. Test Data Creation

- **How to create test data for automated tests**
- **We can mock our test data**
- **Security**
- **For API asynchronously** - For API async auto cool

#### 5. API or Back-end Testing

- **API or Back-end test?** - approach comparison

#### 6. Flaky Tests

- **Flaky story** - unstable tests story

#### 7. Spawn & Weight

- **Double/Triple sign?** - performance questions

---

**Related Topics:**
- [Networking & Protocols](01_networking_protocols_http.md)
- [Version Control & DevOps](03_version_control_devops_cicd.md)
- [Databases & Backend APIs](04_databases_backend_apis.md)
- [Programming Fundamentals](05_programming_fundamentals.md)
