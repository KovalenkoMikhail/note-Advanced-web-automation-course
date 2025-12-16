# Databases, Backend & APIs

**Complete IT Lecture Notes - Theme 4**

This document covers databases, message queues, REST APIs, and authentication.

---

## Table of Contents

1. [Logging and System Monitoring](#1-logging-and-system-monitoring)
2. [Databases (SQL vs NoSQL)](#2-databases-sql-vs-nosql)
3. [MongoDB Operations](#3-mongodb-operations)
4. [Unique Identifiers (UUID, ULID)](#4-unique-identifiers-uuid-ulid)
5. [Dead Letter Queue (DLQ)](#5-dead-letter-queue-dlq)
6. [RabbitMQ - Message Broker](#6-rabbitmq-message-broker)
7. [REST API](#7-rest-api)
8. [JWT and OAuth 2](#8-jwt-and-oauth-2)
9. [Telegram Bot API](#9-telegram-bot-api)

---

## 1. Logging and System Monitoring

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

---

## 2. Databases (SQL vs NoSQL)

### SQL vs NoSQL

#### Relational Databases (SQL):

##### Where to Use:

- **Where structure is important**
- **Strict integrity**

##### Characteristics:

- **Rigid relational structure**
- **Standardized language**
- **Tables with fixed columns**
- **Follows ACID model**

##### Scaling:

- **Vertical** - need more powerful server to increase performance

##### Transactions and Integrity:

- **Reliable, guarantee ACID properties:**
  - **A**tomicity
  - **C**onsistency
  - **I**solation
  - **D**urability

#### NoSQL Databases:

##### Where to Use:

- **For large volumes**
- **Unstructured data**

##### Characteristics:

- **Flexible schema-less non-relational**
- **Different languages for each application**
- **Documents, key-value pairs**
- **Follows BASE principles**

##### Application:

- **Web/mobile applications**
- **Big Data**
- **Caching**
- **Real-time Analytics**

##### Scaling:

- **Horizontal** - can add additional servers to cluster

##### Transactions and Integrity:

- **Follow BASE principles:**
  - **B**asically **A**vailable
  - **S**oft **S**tate
  - **E**ventually **C**onsistent

---

## 3. MongoDB Operations

### Find by ID:

```javascript
db.users.find({ _id: new ObjectId('29574/3') });
```

### Join using $lookup:

```javascript
db.authors.aggregate([
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'authorId',
      as: 'post',
    },
  },
]);
```

### Comparison Operators:

- **`$eq`** = equals
- **`$ne`** != not equals
- **`$gte`** >= greater than or equal
- **`$lte`** <= less than or equal
- **`$gt`** > greater than
- **`$lt`** < less than

### Logical Operators:

- **`$and`** (AND)
- **`$or`** (OR)
- **`$not`** (NOT)
- **`$nor`** (NOR)

### Query Example:

```javascript
{
  $tags: {
    $in: ['Vasya'];
  }
}
```

---

## 4. Unique Identifiers (UUID, ULID)

### UUID (Universally Unique Identifier)

#### Definition:

- **128-bit number consisting of 32 characters**
- **Format:** 8-4-4-4-12 (standard format with hyphens)

#### UUID Types:

- **Time-Based** - contains timestamp and MAC address
- **Random-Based** - contains absolutely random values
- **Name-Based** - generated from URL or DNS name

### ULID (Universally Unique Lexicographically Sortable Identifier)

#### Definition:

- **Universally Unique Lexicographically Sortable Identifier**
- **Structure:** consists of 26 characters in Base32 encoding

#### Components:

- **Timestamp:** 48 bits, first 10 characters
  - **Measured in microseconds** - ensures sortability
- **Randomness:** 80 bits, next 16 characters are random

#### Properties:

- **Sortability** (compactness)
- **Indexability**

---

## 5. Dead Letter Queue (DLQ)

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

---

## 6. RabbitMQ - Message Broker

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

---

## 7. REST API

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

---

## 8. JWT and OAuth 2

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

---

## 9. Telegram Bot API

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

---

**Related Topics:**
- [Networking & Protocols](01_networking_protocols_http.md)
- [Testing & QA Automation](02_testing_qa_automation.md)
- [Version Control & DevOps](03_version_control_devops_cicd.md)
- [Programming Fundamentals](05_programming_fundamentals.md)
