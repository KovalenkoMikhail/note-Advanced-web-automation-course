# Complete IT Lecture Notes

## 1. DNS (Domain Name System)

### Basic Concepts

**DNS** - like a phone book, converts human-readable domain names (e.g., google.com) into IP addresses (e.g., 172.217.160.142).

### DNS Query Resolution Process

#### Caching Levels:

1. **Local DNS Resolver Cache** - stored in the operating system
2. **Router Cache**
3. **ISP DNS Server** (Internet Service Provider DNS Server)
4. **Recursive DNS Server** (if NOT ISP) - third-party DNS servers instead of ISP

#### DNS Server Hierarchy:

- **Root DNS Servers** - 13 groups of servers (from A to M)
- **TLD - Top-Level Domain** - .com, .org, .net
- **Authoritative DNS servers** - store actual IP addresses of the domain

### DNS Caching

- Recursive DNS server caches the response
- Router caches
- Operating system caches

### IP Address Changes

When changing IP address:

- Keep both old and new versions open
- Minimum 24-48 hours to account for maximum TTL (Time To Live - DNS cache storage time)
- Users gradually transition to the new IP as DNS cache updates

### DNS Record Types

- **A-record** - links domain name with IPv4 address (e.g., example.com → 192.0.1.1)
- **AAAA-Record** - for IPv6 (e.g., 2001:0db8:1)
- **CNAME-record** - alias (e.g., www.example.com → example.com)
- **MX-Mail Exchange Record** - specifies server for receiving mail (mail.example.com)
- **NS-record (Name Server)** - specifies DNS server that is authoritative for domains

### DNS Tools

- **nslookup google.com** - basic command for DNS queries
- **dig google.com** - more powerful alternative for DNS queries

## 2. Logging and System Monitoring

### Types and Levels of Logging

#### Application Logs

Most important. Contains:

- Errors
- Business logic
- Database queries

#### Server Logs

- **Apache, Nginx** - web servers
- **Tomcat, WildFly** - show request-response, access errors

#### DB Logs (Database Logs)

- Database queries
- Transactions
- Database errors

#### System Logs

- Operating system logs
- Resource issues
- Network issues

#### Container Logs

### Log Structure

Logs contain the following attributes (metadata):

- **Severity level:** INFO, DEBUG, FATAL, Critical
- **Service/module name:** Authentication Service, Payment Service
- **Message text**
- **User/server IP**
- **HTTP method**
- **Status code**
- **Any metrics you configure**
- **Search attributes:**
  - user_id (user identifier)
  - product_id (product identifier)
  - chat_id (chat identifier)
  - role_id (role identifier)

### Performance Metrics

#### Latency/Duration

- Time from when server receives request until sending response to client
- HTTP request execution time
- DB Query Time (database query time)

#### Volume/Frequency Metrics

- **RPS/RPM** (Requests Per Second/Requests Per Minute) - number of requests per minute or second

#### Resource Usage Indicators

- **Load metrics:**
  - Out of memory messages
  - **Timeout** - exceeding wait time
  - **Locks** (Deadlocks/Lock contention) - messages about mandatory locks (e.g., in SQL or code)
  - **Error rate** - increasing with load is a bad sign

### Alerts and On-Call Duties

#### System Monitoring

When service fails or critical deviation from metrics, **Monitoring systems** (Grafana, Zabbix) generate alerts and send them to communication channels like Slack, Email.

#### Critical Incidents (require a call):

- When exceeding 5% of 500x errors - Call
- Significant increase in response time (**Latency**) for key requests exceeds 1 sec
- Frequent timeouts when connecting to DB or other microservices
- **Resource Exhaustion** CPU > 80%

#### Business Metrics

- Sharp decrease in number of transactions per minute
- Growth in number of hanging transactions

### Log Analysis and Search

- **Trend analysis:** Regular metrics review reveals performance regressions
- **Business metrics:** help track performance impact on user experience
- **Search by time:** last 10 minutes, last day, last month
- **Search by endpoints**

## 3. Network Protocols

### TCP (Transmission Control Protocol)

- **Reliable** - guarantees packet delivery in correct order without loss
- **Slower than UDP**
- **Three-way handshake** - for establishing connection
- **Flow control** - manages data sending speed to avoid overwhelming receiver
- **Congestion Control** - adapts to network congestion to avoid overload
- **Retransmission** - resends when packet is lost

#### TCP Usage Examples:

- **Web HTTPS** - full page loading
- **File transfer FTP**
- **Email SMTP, POP3, IMAP**

### UDP (User Datagram Protocol)

- **Unreliable** - doesn't guarantee delivery
- **Fast** - absence of checks and confirmations makes it faster
- **Connectionless**
- **Low Overhead** - less technical information

#### UDP Applications:

- **Online games**
- **Voice chat**
- **Video streaming**

### QUIC (Quick UDP Internet Connection)

- **New transport protocol from Google** on top of UDP
- **Fast connection** - combines TCP and TLS into one
- **Can transmit multiple streams** avoiding Head-of-Line Blocking, unlike TCP
- **If packet is stuck - doesn't block streams**
- **Network change resilience** - has unique ID, maintains connection even when IP changes on phone
- **Built-in TLS encryption** (+ transport layer security)

## 4. Software Testing

### Automated Tests for Calculator

Project written in **Java (21)**, uses **JUnit 5** for testing, built with **Maven**.

### EchoCommandExecutor.java

Central class, responsible for executing mathematical expressions. Uses **ProcessBuilder** to run commands `sh -c 'echo ...'`.

#### ProcessBuilder - how it works:

1. **ProcessBuilder** allows launching a separate terminal process to perform all calculations and return to standard output
2. Uses `scale = 4` for formatting to 4 decimal places
3. Captures output (`getInputStream`) to get results and `getErrorStream` to get error messages
4. Handles possible timeouts and parses output to ensure it's a number

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

## 5. Java Programming

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

## 6. HTTP Protocols

### HTTP/1

- **No prioritization**
- **Browser establishes multiple TCP connections** (up to 6)
- **Head of Line Blocking** - request hung, blocked stream

### HTTP/2

- **Multiplexing** - 1 TCP for all requests
- **Head of Line Blocking - pain point** - still works on top of TCP. 1 request hung - blocking stream
- **Stream Multiplexing** - one TCP for multiple requests

### HTTP/3

- **UDP (QUIC)** and QUIC connection for multiple stream multiplexing
- **Stream Multiplexing**
- **Head of Line Blocking** - absent
- **QUIC (1-RTT) + built-in TLS, 0-RTT for resumed connection**

### Protocol Comparison

| Feature                   | TCP       | HTTP/1.1                             | HTTP/2                                 | HTTP/3                        |
| ------------------------- | --------- | ------------------------------------ | -------------------------------------- | ----------------------------- |
| **Connections**           | 1 connect | Sequential                           | One connection for multiple requests   | UDP (QUIC)                    |
| **Parallelism**           | -         | Limited, requires many connections   | Stream Multiplexing                    | Stream Multiplexing           |
| **Head of Line Blocking** | -         | Yes                                  | Yes (pain point)                       | No                            |
| **Handshake**             | TCP 3way  | TCP 3way + TLS/2 RTT                 | TCP 3way + TLS/2 RTT                   | QUIC (1-RTT) + built-in TLS   |
| **Request**               | No        | No                                   | Yes                                    | Yes                           |
| **Priority**              | Yes       | No                                   | Yes                                    | Yes                           |
| **Server Push**           | No        | No                                   | Yes                                    | Yes                           |
| **Headers Compression**   | Yes       | Yes                                  | Yes                                    | Yes                           |

### HTTP Headers and Cookies

#### Request Headers:

- **User-Agent** - user agent
- **Content-Type** - content type
- **Authorization** - authorization

#### Response Headers:

- **Content-Type** - content type
- **Set-Cookie** - set cookie
- **Cache-Control** - cache control

#### Cookies:

- **Small data fragments** for remembering client state (sessions)

### HTTP/3 and QUIC Request Prioritization

#### QUIC HTTP/3 Request Priorities:

- **HTTP/3 in QUIC has no Head-of-Line Blocking**
- **Each stream block is independent** - packet loss in one stream doesn't affect others
- **Client passes in header:**
  - **urgency: from 0 to 7** (highest Priority)

#### Best Practice Priority:

**HTML, CSS:**

- urgency = 0, incremental = false

**Fonts:**

- urgency = 1, incremental = false

**JavaScript:**

- If script blocks render: urgency = 2/3
- Doesn't block: urgency = 0

**Images:**

- Visible part: urgency = 3
- Below the fold: urgency = 4/5
- For below the fold can use incremental = true

### Dependencies & Weights (HTTP/2)

- **Dependencies build hierarchy (Tree)**
- **Style.css depends on index.html** - CSS is delivered after html
- **Weights: assigned from 1 to 256** - determines what bandwidth they get relative to other resources

## 7. Git - Version Control System

### Basic Git Commands

#### Initialization and Cloning:

- **`git init`** - initialize repository
- **`git clone <url>`** - clone repository
- **`git status`** - check status
- **`git log`** - view commit history

#### Working with Changes:

- **`git add .`** - add changes
- **`git commit -m "message"`** - create commit
- **`git stash`** - temporarily save uncommitted changes
- **`git stash pop`** - pull from Stash
- **Stash stores locally** in .git

#### Working with Branches:

- **`git branch:`** - view branches
- **`git branch <name>`** - create branch
- **`git checkout <name>`** - switch to branch
- **`git checkout -b <name>`** - create and switch
- **`git merge <name>`** - merge branches
- **`git branch -d <name>`** - delete branch

### Working with Remote Repositories

#### Repository Commands:

- **`git remote -v`** - list repositories
- **`git push origin <name>`** - push changes to remote repository

#### Getting Changes:

- **`git pull`** - download and merge
- **`git fetch`** - download, doesn't merge

#### Working with Commits and History:

- **`git commit --amend`** - rewrite previous commit
- **`git rebase`** - rewrites history, moves commits on top of main branch
- **`git merge`** - creates new commit that merges code, preserves history

### Git Flow

#### Main Branches:

- **`main`** - stable, ready for release
- **`develop`** - for integrating new features
- **`feature`** - for developing new functions (from develop branch)
- **`release`** - preparation for release, pulled from develop and pushed to main

#### Hotfix (urgent fix):

- **hotfix** - for quick fixes pulled from and pushed to main (simple Flow)

#### Best Flow hotfix:

1. **Create hotfix branch from main**
2. **Fixes and PR to main**
3. **Testing in main**
4. **Cherry-pick to release (Release/5)**

### Detached HEAD

- **Detached HEAD: State when** current commit points to the commit itself, not to a branch
- **Example:** (with git checkout <commit ID>)
- **To fix - switch to branch**

### Bug Finding and Debugging

#### git bisect:

- **`git bisect`** - helps find bug in commits by dividing range in half
- **`git bisect start`** - start process
- **`git bisect good [commit ID]`** - where there definitely was no bug
- **← bad [commit ID]** indicates commit where bug definitely exists

#### git cherry-pick:

- **`git cherry-pick [commit ID]`** - changes from one commit to another, as if they were made in main

### Tags and Hooks

#### Tags:

- **Needed for release versions** and marking important moments
- **Contain metadata:** email, tag author name, date
- **Example:** `git tag -a v.1.0.0 -m "initials"` - create annotated tag version 1.0.0
- **stable release** - stable release

#### Hooks:

- **Executable scripts**

##### Hook Types:

- **pre-commit** - check code formatting, linting, run Unit tests
- **prepare-commit-msg** - after entering commit message file
- **commit-msg** - process commit message
- **pre-push** - before push
- **post-receive** - on repository after Push (for automatic deployment)

## 8. Performance Testing (Load Testing)

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

_To be continued..._
