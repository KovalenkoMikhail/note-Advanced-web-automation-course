# Networking, Protocols & HTTP

**Complete IT Lecture Notes - Theme 1**

This document covers all networking fundamentals, protocols, HTTP versions, and secure connections.

---

## Table of Contents

1. [DNS (Domain Name System)](#1-dns-domain-name-system)
2. [Network Protocols (TCP, UDP, QUIC)](#2-network-protocols)
3. [HTTP Protocols (HTTP/1, HTTP/2, HTTP/3)](#3-http-protocols)
4. [HTTP Methods (OPTIONS, HEAD)](#4-additional-http-methods)
5. [OSI Model](#5-osi-model)
6. [SSH - Secure Connection](#6-ssh-secure-connection)

---

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

---

## 2. Network Protocols

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

---

## 3. HTTP Protocols

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

---

## 4. Additional HTTP Methods

### HTTP Methods:

#### OPTIONS:

- **Request resource metadata** - to get information about which methods the resource handles

#### HEAD:

- **Works like GET, but without response body** - gets only headers

### Local Storage:

- **Local Storage** - data is saved even after closing browser

---

## 5. OSI Model

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

---

## 6. SSH - Secure Connection

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

---

**Related Topics:**
- [Testing & QA Automation](02_testing_qa_automation.md)
- [Version Control & DevOps](03_version_control_devops_cicd.md)
- [Databases & Backend APIs](04_databases_backend_apis.md)
- [Programming Fundamentals](05_programming_fundamentals.md)
