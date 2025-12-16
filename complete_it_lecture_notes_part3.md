# Complete IT Lecture Notes - Part 3

## 19. Software Testing

### Test Case:

#### Test Case Structure:

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

### Test Design:

#### Test Design Techniques:

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

### 10 QA Commandments:

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

## 20. Unique Identifiers

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

## 21. OSI Model

### 7 Layers of OSI Model:

| Layer   | Name                    | Protocols/Functions                                       |
| ------- | ----------------------- | --------------------------------------------------------- |
| **7**   | **Application**         | HTTP, FTP, SMTP                                           |
| **6**   | **Presentation**        | TLS, SSL                                                  |
| **5**   | **Session**             | Sockets (transmits data)                                  |
| **4**   | **Transport**           | TCP, UDP (transmits segments and datagrams)               |
| **3**   | **Network**             | IP, ICMP, IPsec (transmits packets)                       |
| **2**   | **Data Link**           | Ethernet, Wi-Fi (transmits frames between one network)    |
| **1**   | **Physical**            | Fiber (transmits bits through cables, network cards)      |

## 22. Docker - Containerization

### Basic Docker Commands:

#### Container Management:

- **`docker start`** - start container
- **`docker stop`** - stop container
- **`docker restart`** - restart container

#### Command Execution:

- **`docker exec -it [container_name] [command]`** - execute commands inside container

#### View Containers:

- **`docker ps`** - view running containers

#### Create and Run:

- **`docker run -d -it ubuntu`** - create container and return its ID
  - **`-d`** - detached mode (background mode)
  - **`-it`** - interactive and pseudo-TTY
  - **`ubuntu`** - image name

### Docker Run Commands:

#### Main Parameters:

- **`docker run`** - run container
- **`--name my-nginx`** - give name
- **`-p 8080:80`** - forward port 80 from inside container to port 8080 on PC
- **`-d`** - run in background mode

#### Container Management:

- **`docker stop my-nginx`** - stop container
- **`docker rm my-nginx`** - remove container

### Images and Containers:

#### Image:

- **Template for application, essentially a container**
- **Archive that becomes a container when launched**

#### Container:

- **Can contain any application**
- **RabbitMQ, DB (even 10 databases)**
- **Database runs on specific port inside container**

#### Expose Command:

- **Can expose specific database**
- **`EXPOSE 5000`** - exposes port for connections

### Docker Features:

- **Containers mainly run locally**
- **Remote connection possible**
- **Can run multiple containers simultaneously on different ports**

## 23. Databases

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

### MongoDB - NoSQL Operations

#### Find by ID:

```javascript
db.users.find({ _id: new ObjectId('29574/3') });
```

#### Join using $lookup:

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

#### Comparison Operators:

- **`$eq`** = equals
- **`$ne`** != not equals
- **`$gte`** >= greater than or equal
- **`$lte`** <= less than or equal
- **`$gt`** > greater than
- **`$lt`** < less than

#### Logical Operators:

- **`$and`** (AND)
- **`$or`** (OR)
- **`$not`** (NOT)
- **`$nor`** (NOR)

#### Query Example:

```javascript
{
  $tags: {
    $in: ['Vasya'];
  }
}
```

---

_Continued in next part..._
