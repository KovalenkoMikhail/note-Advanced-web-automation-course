# Complete IT Lecture Notes - Part 4 (Final)

## 24. Dead Letter Queue (DLQ)

### DLQ Description:

- **Dead Letter Queue** - queue for messages that failed to process
- **Purpose** - isolation of problematic messages for analysis and reprocessing

### DLQ Entry Conditions:

1. **Processing time expiration** - "Failed to process message 5 min"
2. **Time to Live (TTL)** - if no response during message lifetime - goes to DLQ
3. **Processing errors** - messages that failed to process

### Workflow Scheme:

```
Invoices Q → [Failed to process] → DLQ
     ↓
Subscribe to invoices
     ↓
[No response in TTL] → DLQ
```

## 25. RabbitMQ - Message Broker

### RabbitMQ Description:

- **Message broker/intermediary**
- **Works with AMQP protocol** (Advanced Message Queuing Protocol)
- **For asynchronous message transmission between applications and services**
- **Reliable delivery, flexible routing and scalability**

### Key Components:

1. **Publisher** - creates message
2. **Connection** - TCP connection to RabbitMQ
3. **Channel** - all actions occur through this channel
4. **Message** - sent to exchange, contains routing key
5. **Exchange** - receives message with key and decides which queue to send to
6. **Binding** - rules that connect exchange and queue
7. **Queue** - message queue
8. **Consumer** - message receiver

## 26. REST API

### Main Principles:

#### 1. Stateless:

- **No connection**
- Server doesn't store session information or previous client requests

#### 2. HTTP Methods:

- **Define actions on resource** (What to do!)
- **Methods:** GET, POST, PUT, DELETE, PATCH, OPTIONS

#### 3. Resources:

- **URL (URI) addresses, endpoints**
- Can include: user id, role ID

#### 4. Body:

- **Formats:** JSON, (XML, YAML +)

#### 5. Links - HATEOAS:

- **Hypermedia as the Engine of Application State**
- Client doesn't need to know all URLs - can receive them from server

## 27. JWT and OAuth 2

### Bearer Authentication / JWT:

#### JWT (JSON Web Token):

- **Structure:** 3 parts - header, payload, signature
- **Authorization header:** `Authorization: Bearer <token>`
- **Storage:** Local Storage or Cookie

### Basic Authentication:

- **Insecure** method
- **Format:** login + password in Base64

### OAuth 2:

#### Participants:

1. **Client** - Login button
2. **Web** - acc.google.com

#### Authorization Flow:

1. **Click Login button**
2. **Redirect to Google** account.google.com
3. **Login to Google**, get permission
4. **Receive token** from Google and from our backend
5. **Redirect back** to our WEB
6. **Request** GET api/v1/home with Auth header

## 28. Jenkins - CI/CD Pipelines

### Jenkins Description:

- **Jenkinsfile** - pipelines, stores CI/CD
- **CI/CD** - Continuous Integration, Continuous Delivery/Deployment

### Main Components:

#### Agent:

- **Where pipeline will execute**
- `agent any` or `agent { docker { ... } }`

#### Stages:

- **build, test, deploy** - main stages

#### Steps:

- **Specific actions** in each stage

#### Post:

- **Action after pipeline completion**

### Plugins:

- **Git, Slack, Docker, Kubernetes**

### Triggers:

- **Git hooks** (on push to main)
- **Scheduled**

### Job Types:

- **Freestyle job** - configured through UI (poor scalability, not versioned)
- **Pipeline job** - code, provides versioning, readability, scalability

### Credentials:

- **Built-in credentials** - secure password storage
- **Store API-Keys, private keys outside code**

## 29. SSH - Secure Connection

### SSH Description:

- **Network management protocol** for secure connection to remote systems
- **Encrypted channel** for management

### Commands:

- **Connection:** `ssh user@hostname_or_ip`
- **File copying:** `scp file.txt user@host:path`
- **Key generation:** `ssh-keygen`

### SSH Keys:

- **Why are SSH keys more secure than passwords?**
- **Harder to guess, longer, and more reliable**

### SSH Agent:

- **Tool for caching key password**

### Port Forwarding:

- **Network traffic redirection**
- **Example:** connection to DB or web interface only on remote server's localhost

### SSH Tunneling:

- **Method of creating encrypted channel**
- **For data transmission between two machines**
- **Allows secure traffic transmission**

### SSH Access Restriction:

- **Configure sshd_config**
- **Disable passwords:** `PasswordAuthentication no`
- **Access only for specific users:** `AllowUsers`

## 30. JavaScript Functions Advanced

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

## 31. JavaScript Iteration Methods

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

## 32. Playwright Storage State

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

## 33. API Request Arguments

### Description:

- **API request arguments** - parameters and options for HTTP requests
- **Request configuration** with various data types

### Arguments:

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

## 34. API Response

### Description:

- **API response handling** - methods for working with HTTP responses
- **Various data formats** and processing methods

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

## 35. Fetch API

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

## 36. Test Automation Best Practices

### Description:

- **Test automation best practices** - effective testing principles
- **Strategies and approaches** - for quality automation

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

## 37. Kubernetes

### Description:

- **Kubernetes - container orchestrator** - containerized application management tool
- **Developed by Google** - for managing containers in various deployment environments

### Main Characteristics:

#### Orchestration Tool:

- **Orchestration tool** - container management
- **Helps manage containerized applications** - in different deployment environments

### Problems It Solves:

#### Context:

- **Can run applications in containers** - like Docker
- **Kubernetes provides control plane**

#### Functionality:

- **Schedules containers on servers** - called nodes
- **Monitors health and restarts containers** - on failures
- **Scales up/down** - based on load
- **Provides service discovery** - networking DNS
- **Allows containers to communicate** - with each other

### Advantages:

- **Includes rolling updates and rollbacks** - safely
- **Manages configuration and secrets** - security
- **Ensures high availability** - fault tolerance

## 38. Interview Preparation

### Description:

- **Interview preparation** - list of topics for discussion
- **Technical questions** - on test automation

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

## Conclusion

This complete IT lecture notes contains 38 main sections covering a wide range of IT disciplines:

- **Network Protocols and Security** (DNS, TCP/UDP, HTTP, SSH)
- **Version Control Systems** (Git)
- **Software Testing** (JUnit, Performance Testing, Test Design)
- **Web Automation** (Playwright, XPath, CSS selectors)
- **API Testing** (REST API, JWT, OAuth 2)
- **Containerization** (Docker, Kubernetes)
- **Databases** (SQL vs NoSQL, MongoDB)
- **JavaScript** (functions, iteration, data structures)
- **CI/CD** (Jenkins, GitLab CI/CD)
- **System Administration** (Linux commands, monitoring)
- **And much more**

The notes are based on analysis of 434 lecture screenshots and represent a comprehensive guide to modern IT technologies and practices.

---

_Complete IT Lecture Notes Finished_
