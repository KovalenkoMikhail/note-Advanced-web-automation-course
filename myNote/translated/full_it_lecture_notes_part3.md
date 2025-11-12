# Full IT Lecture Notes - Part 3

_Translated from original Russian notes based on 434 screenshots. Original created: 2024._

## 19. Software Testing

### Test Case

#### Test case structure:

- **ID** - identifier
- **Title** - title
- **Type** - type
- **Priority** - priority
- **Preconditions** - preconditions
- **Steps** - steps
- **Expected Result** - expected result
- **Post conditions** - postconditions

### Definition of software quality:

**Software quality — a set of characteristics that satisfy established and assumed needs**

### Testing stages:

1. **Product Analysis**
2. **Work with requirements**
3. **Test Plan**
4. **Creation of test documentation**
5. **Testing**
6. **Test Report**
7. **Stabilization**
8. **Operation/Maintenance**

### Build Verification

#### Types of quick tests:

- **Smoke** — quick test of main functionality stability
- **Sanity** — more detailed functionality check

### Testing principles:

1. **Testing shows the presence of defects**
2. **Exhaustive testing is impossible**
3. **Early testing**
4. **Defect clustering**
5. **Pesticide paradox**
6. **Testing depends on context**
7. **Fallacy of no errors**

### Types of testing:

#### Functional testing types:

- **Functional Testing** - what does the system do? What functions does it perform?
- **GUI test** - Graphical User Interface
- **Security and Access Control Testing**
- **Interoperability test**

#### Non-functional testing:

- **Performance**:
  - **Load test** - many users
  - **Stress** - peak values
  - **Volume** - large amounts of data
- **Stability and Reliability**
- **Installation**
- **Failover and Recovery**
- **Usability**
- **Configuration test**

#### Change-related testing:

- **Smoke** - smoke testing
- **Regress** - regression testing
- **Re-test** - re-testing

#### Other types:

- **Exploratory** - exploratory testing (designing test cases from tester experience)
- **Ad-hoc** - informal testing (without formal test cases)

### Bug report structure:

#### Main fields:

- **ID** - identifier
- **Title** - problem description
- **Project** - project name
- **Component** - affected component
- **Version** - product version
- **Severity** - impact level
- **Priority** - urgency of fixing
- **Status** - current state
- **Author** - who reported the bug
- **Assignee** - who is assigned to fix
- **Env** - reproduction environment
- **Build version** - specific build

#### Reproduction details:

- **Steps to reproduce**
- **Actual Result**
- **Expected result**

#### Attachments to bug report:

- **Screenshots**
- **Video**
- **Credentials**
- **Browser logs / errors**
- **Server logs**
- **API request**
- **Analytics events**
- **Database data**
- **Database queries**
- **Comments / Notes**
- **Link to task**
- **HAR archive**

### Testing requirements:

1. **Correctness**
2. **Unambiguity**
3. **Completeness**
4. **Consistency**
5. **Ordering** (by importance/stability)
6. **Verifiability**
7. **Modifiability**
8. **Traceability**
9. **Understandability**

### Testing levels:

1. **Unit**
2. **Integration**
3. **System**
4. **Acceptance**

### Testing execution types:

#### Static testing:

- **Static test** - without running code

#### Dynamic testing:

- **Dynamic test** - with code execution

### Test design:

#### Test design techniques:

1. **Equivalence**

2. **Boundary Value Analysis**

   - **Valid values:** 1, 10
   - **Invalid values:** 0, 11
   - **Full boundaries:**
     - **Valid:** 1, 2, 9, 10
     - **Invalid:** 0, 11

3. **Cause / Effect**

4. **Error Guessing**

5. **Pair wise**

- **Testing pairs of combinations**
- **Not all combinations**

6. **Decision table**

- **A set of conditions**
- **Should lead to a specific action/decision**

### Diagrams and schemes:

#### State transition diagram:

- **State transition diagram**
- **Describes system behavior**
- **System has a finite number of states and transitions**
- **Can be translated into a Decision Table**

#### Use case:

- **Who?**
- **What do they want to do?**
- **Steps**
- **System reaction**

#### Block scheme:

- **Used for test design and clarity**

### Testing approaches:

- **Semi Exhaustive Test**
- **Discussion-driven**
- **Analytics-driven**
- **Bugs-driven**

### Ten QA commandments:

1. **Don't trust the developer: "it works on my machine"**
2. **Write test cases as if you'll forget them tomorrow**
3. **Check not only the happy path but also what should break**
4. **Ask. Always. About everything, even if you think you know**
5. **You don't block the release — you save the company**
6. **An undocumented bug is a legend, not a fact**
7. **Automated tests help but don't do everything for you**
8. **Never test with the same data as the developer**
9. **The fewer communications in a team — the more problems at release**
10. **Never trust "We tested it"**

## 20. Unique Identifiers

### UUID (Universally Unique Identifier)

#### Definition:

- **128-bit number represented by 32 hex characters**
- **Format:** 8-4-4-4-12 (standard dashed format)

#### UUID types:

- **Time-based** - contains timestamp and MAC address
- **Random-based** - contains random values
- **Name-based** - generated from a name such as a URL or DNS

### ULID (Universally Unique Lexicographically Sortable Identifier)

#### Definition:

- **Universal unique lexicographically sortable identifier**
- **Structure:** 26 characters in Base32

#### Components:

- **Timestamp:** 48 bits, first 10 characters
  - **Measured in microseconds** - provides sortability
- **Randomness:** 80 bits, next 16 characters are random

#### Properties:

- **Sortable**
- **Indexable**

## 21. OSI model

### 7 layers of the OSI model:

| Layer | Name (English)   | Protocols/Functions                              |
| ----- | ---------------- | ------------------------------------------------ |
| **7** | **Application**  | HTTP, FTP, SMTP                                  |
| **6** | **Presentation** | TLS, SSL                                         |
| **5** | **Session**      | Sockets (session handling)                       |
| **4** | **Transport**    | TCP, UDP (segments and datagrams)                |
| **3** | **Network**      | IP, ICMP, IPsec (packets)                        |
| **2** | **Data link**    | Ethernet, Wi-Fi (frames between network links)   |
| **1** | **Physical**     | Fiber, network cards (transmit bits over cables) |

## 22. Docker - containerization

### Basic Docker commands:

#### Container management:

- **`docker start`** - start a container
- **`docker stop`** - stop a container
- **`docker restart`** - restart a container

#### Execute commands:

- **`docker exec -it [container_name] [command]`** - run commands inside a container

#### View containers:

- **`docker ps`** - view running containers

#### Create and run:

- **`docker run -d -it ubuntu`** - create container and return its ID
  - **`-d`** - detached mode
  - **`-it`** - interactive + pseudo-TTY
  - **`ubuntu`** - image name

### Docker run options:

- **`docker run`** - run a container
- **`--name my-nginx`** - set a name
- **`-P 8880:80`** - map port 80 in container to 8080 on host
- **`-d`** - run detached
- **`--name my-nginx`** - set a name
- **`-P 8880:80`** - map port 80 in container to 8880 on host
- **`-d`** - run detached

### Manage containers:

- **`docker stop my-nginx`** - stop container
- **`docker rm my-nginx`** - remove container

### Images and containers:

- **Image** - template for application; when run, becomes a container
- **Container** - can run any app; e.g., Rabbit, DB

#### EXPOSE example:

- **`EXPOSE 5000`** - expose a port

### Docker notes:

- Containers usually run locally; remote connections possible
- Multiple containers can run simultaneously on different ports

## 23. Databases

### SQL vs NoSQL

#### Relational databases (SQL):

##### When to use:

- When structure matters
- Strict integrity required

##### Characteristics:

- Rigid relational structure
- Standardized query language
- Tables with fixed columns
- ACID guarantees

##### Scaling:

- Vertical scaling — more powerful server

##### Transactions and integrity:

- Provide ACID properties

#### NoSQL databases:

##### When to use:

- For large volumes
- For unstructured data

##### Characteristics:

- Schema-less, non-relational
- Different APIs per use case
- Document, key-value pairs
- BASE principles

##### Use cases:

- Web/mobile apps, Big Data, Caching, Realtime analytics

##### Scaling:

- Horizontal scaling — add servers to cluster

##### Transactions and integrity:

- Follow BASE: Basically Available, Soft State, Eventually Consistent

### MongoDB - NoSQL operations

#### Find by ID:

```javascript
db.users.find({ _id: new ObjectId("29574/3") });
```

#### Join using $lookup:

```javascript
db.authors.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "authorId",
      as: "post",
    },
  },
]);
```

#### Comparison operators:

- **`$eq`** = equal
- **`$ne`** != not equal
- **`$gte`** >= greater or equal
- **`$lte`** <= less or equal
- **`$gt`** > greater
- **`$lt`** < less

#### Logical operators:

- **`$and`**
- **`$or`**
- **`$not`**
- **`$nor`**

#### Example query:

```javascript
{
  $tags: {
    $in: ["Vasya"];
  }
}
```

---

_Continued in the next part..._
