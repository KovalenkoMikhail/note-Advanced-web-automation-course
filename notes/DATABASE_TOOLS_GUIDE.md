# 🛠️ Database Tools for QA Automation

**Essential tools for viewing, managing, and testing databases**  
**Target**: Junior → Senior QA Engineers  
**Updated**: December 19, 2025  

---

## 📋 Table of Contents

1. [GUI Database Clients](#gui-clients)
2. [Command Line Tools](#cli-tools)
3. [Browser-Based Tools](#browser-tools)
4. [VS Code Extensions](#vscode-extensions)
5. [Database Management Tools](#management-tools)
6. [Testing-Specific Tools](#testing-tools)
7. [Recommended Setup](#recommended-setup)

---

## <a name="gui-clients"></a>1. GUI Database Clients

### 🥇 DBeaver (FREE, Cross-Platform) ⭐ RECOMMENDED

**Best for**: All databases, QA automation, beginners to experts

**Features:**
- Supports 80+ databases (PostgreSQL, MySQL, MongoDB, etc.)
- SQL editor with autocomplete
- Visual query builder
- Data export/import (CSV, JSON, XML)
- ER diagrams
- Free & open source

**Installation:**
```bash
# macOS
brew install --cask dbeaver-community

# Ubuntu/Linux
sudo snap install dbeaver-ce

# Windows
# Download from: https://dbeaver.io/download/
```

**Setup:**
1. Open DBeaver
2. Click "New Database Connection"
3. Select database type (PostgreSQL/MySQL)
4. Enter connection details:
   - Host: `localhost`
   - Port: `5432` (PostgreSQL) or `3306` (MySQL)
   - Database: `test_automation_db`
   - Username: `test_user`
   - Password: `test_password`
5. Click "Test Connection"
6. Click "Finish"

**Common Tasks:**
```sql
-- View all tables
SELECT * FROM information_schema.tables WHERE table_schema = 'public';

-- View user data
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- Check test data
SELECT * FROM users WHERE email LIKE '%test%';

-- Delete test data
DELETE FROM users WHERE email LIKE '%test%';
```

---

### TablePlus (Paid, macOS/Windows/Linux)

**Best for**: Beautiful UI, fast queries

**Features:**
- Native app, very fast
- Multi-tab queries
- Code review features
- $89 one-time purchase

**Installation:**
```bash
# macOS
brew install --cask tableplus
```

**Website**: https://tableplus.com/

---

### pgAdmin (FREE, PostgreSQL Only)

**Best for**: PostgreSQL-specific features

**Features:**
- Official PostgreSQL tool
- Advanced admin features
- Query planner visualization
- Free

**Installation:**
```bash
# macOS
brew install --cask pgadmin4

# Ubuntu/Linux
sudo apt install pgadmin4
```

---

### MySQL Workbench (FREE, MySQL Only)

**Best for**: MySQL-specific features

**Features:**
- Official MySQL tool
- Visual database design
- Server administration
- Free

**Installation:**
```bash
# macOS
brew install --cask mysqlworkbench

# Ubuntu/Linux
sudo apt install mysql-workbench
```

---

## <a name="cli-tools"></a>2. Command Line Tools

### PostgreSQL CLI: `psql`

**Connect to database:**
```bash
# Connect as user
psql -h localhost -U test_user -d test_automation_db

# Connect as admin
psql postgres
```

**Common Commands:**
```sql
-- List databases
\l

-- Connect to database
\c test_automation_db

-- List tables
\dt

-- Describe table structure
\d users

-- Describe table with details
\d+ users

-- List all users
\du

-- Run SQL file
\i /path/to/seed.sql

-- Export query to CSV
\copy (SELECT * FROM users) TO '/tmp/users.csv' CSV HEADER

-- Quit
\q
```

**Useful Queries:**
```sql
-- Show table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Show running queries
SELECT pid, usename, query, state 
FROM pg_stat_activity 
WHERE state = 'active';
```

---

### MySQL CLI: `mysql`

**Connect to database:**
```bash
# Connect as user
mysql -h localhost -u test_user -p test_automation_db

# Connect as root
mysql -u root -p
```

**Common Commands:**
```sql
-- Show databases
SHOW DATABASES;

-- Use database
USE test_automation_db;

-- Show tables
SHOW TABLES;

-- Describe table
DESCRIBE users;

-- Show table creation SQL
SHOW CREATE TABLE users;

-- Run SQL file
SOURCE /path/to/seed.sql;

-- Export to CSV (from command line)
-- mysql -u test_user -p -e "SELECT * FROM users" test_automation_db > users.csv

-- Quit
EXIT;
```

**Useful Queries:**
```sql
-- Show table sizes
SELECT 
  table_name AS 'Table',
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'test_automation_db'
ORDER BY (data_length + index_length) DESC;

-- Show running queries
SHOW FULL PROCESSLIST;
```

---

## <a name="browser-tools"></a>3. Browser-Based Tools

### Adminer (Single PHP File)

**Best for**: Quick setup, no installation

**Setup:**
```bash
# Download
wget https://www.adminer.org/latest.php -O adminer.php

# Start PHP server
php -S localhost:8080

# Open browser
# http://localhost:8080/adminer.php
```

**Features:**
- Single file
- Supports MySQL, PostgreSQL, SQLite, etc.
- Export/import
- Lightweight

---

### phpMyAdmin (MySQL Only)

**Best for**: MySQL web interface

**Installation:**
```bash
# macOS (with MAMP/XAMPP)
# Usually included

# Ubuntu/Linux
sudo apt install phpmyadmin
```

---

## <a name="vscode-extensions"></a>4. VS Code Extensions

### SQLTools ⭐ RECOMMENDED

**Installation:**
1. Open VS Code
2. Go to Extensions (Cmd+Shift+X)
3. Search "SQLTools"
4. Install "SQLTools" by Matheus Teixeira
5. Install driver: "SQLTools PostgreSQL/MySQL"

**Setup Connection:**
1. Click SQLTools icon in sidebar
2. Click "Add New Connection"
3. Select database type
4. Enter connection details
5. Click "Test Connection"
6. Save

**Features:**
- Run queries in VS Code
- Autocomplete
- View tables inline
- Export results
- Bookmarks for common queries

**Usage:**
1. Create file: `queries.sql`
2. Write SQL:
   ```sql
   SELECT * FROM users WHERE email LIKE '%test%';
   ```
3. Right-click → "Run on Active Connection"

---

### Database Client

**Alternative to SQLTools**

**Installation:**
1. Search "Database Client" in Extensions
2. Install by Weijan Chen

**Features:**
- Redis support
- MongoDB support
- SSH tunneling

---

## <a name="management-tools"></a>5. Database Management Tools

### Docker (Run Databases Locally)

**PostgreSQL with Docker:**
```bash
# Run PostgreSQL in Docker
docker run --name test-postgres \
  -e POSTGRES_PASSWORD=test_password \
  -e POSTGRES_USER=test_user \
  -e POSTGRES_DB=test_automation_db \
  -p 5432:5432 \
  -d postgres:15

# Stop
docker stop test-postgres

# Start again
docker start test-postgres

# Remove
docker rm -f test-postgres
```

**MySQL with Docker:**
```bash
# Run MySQL in Docker
docker run --name test-mysql \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=test_automation_db \
  -e MYSQL_USER=test_user \
  -e MYSQL_PASSWORD=test_password \
  -p 3306:3306 \
  -d mysql:8

# Access MySQL CLI
docker exec -it test-mysql mysql -u test_user -p
```

**Benefits:**
- Isolated test environment
- Easy cleanup
- Version control
- Reproducible

---

### Prisma Studio (Visual Database Editor)

**Best for**: Prisma projects

**Installation:**
```bash
# If using Prisma
npm install --save-dev prisma
npx prisma init
```

**Run:**
```bash
npx prisma studio
```

**Features:**
- Visual data editor
- Create/update/delete records
- Relationships visualization
- Auto-generated from schema

---

## <a name="testing-tools"></a>6. Testing-Specific Tools

### Faker.js (Generate Test Data)

**Installation:**
```bash
npm install --save-dev @faker-js/faker
```

**Usage:**
```typescript
import { faker } from '@faker-js/faker';

const testUser = {
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: faker.internet.password(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
};

console.log(testUser);
// {
//   email: 'john.doe@example.com',
//   firstName: 'John',
//   lastName: 'Doe',
//   ...
// }
```

---

### Testcontainers (Disposable Database Instances)

**Best for**: Isolated test databases per test run

**Installation:**
```bash
npm install --save-dev @testcontainers/postgresql
```

**Usage:**
```typescript
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { test } from '@playwright/test';

let container;
let connectionString;

test.beforeAll(async () => {
  // Start PostgreSQL container
  container = await new PostgreSqlContainer().start();
  connectionString = container.getConnectionUri();
  
  // Run migrations
  // await runMigrations(connectionString);
});

test.afterAll(async () => {
  await container.stop();
});

test('user registration', async ({ page }) => {
  // Use fresh database for each test run
  // connectionString points to temporary database
});
```

---

## <a name="recommended-setup"></a>7. Recommended Setup for QA Automation

### For Beginners:

**Tools to Install:**
1. ✅ **DBeaver** (GUI client)
2. ✅ **PostgreSQL** or **MySQL** (local installation)
3. ✅ **VS Code Extension**: SQLTools

**Workflow:**
1. Use DBeaver to explore database structure
2. Write queries in DBeaver first
3. Copy working queries to test files
4. Use SQLTools for quick checks during test development

---

### For Intermediate/Advanced:

**Additional Tools:**
1. ✅ **Docker** (containerized databases)
2. ✅ **Prisma** (type-safe database client)
3. ✅ **Faker.js** (test data generation)
4. ✅ **CLI tools** (`psql` or `mysql`)

**Workflow:**
1. Use Docker for isolated test databases
2. Write schema with Prisma
3. Generate test data with Faker
4. Run tests against Docker container
5. Use CLI for quick debugging

---

## 🎯 Quick Start Guide

### Day 1: Setup
```bash
# 1. Install DBeaver
brew install --cask dbeaver-community

# 2. Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# 3. Create test database
createdb test_automation_db

# 4. Open DBeaver and connect
```

### Day 2: First Queries
```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test user
INSERT INTO users (email, password, first_name, last_name)
VALUES ('test@example.com', 'hashed_password', 'Test', 'User');

-- Query users
SELECT * FROM users;

-- Delete test user
DELETE FROM users WHERE email = 'test@example.com';
```

### Day 3: Connect from Playwright
```typescript
// tests/utils/db.ts
import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'test_automation_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

// Test connection
export async function testConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    console.log('✅ Connected:', result.rows[0]);
  } finally {
    client.release();
  }
}
```

---

## 📚 Learning Resources

### Tutorials:
- **DBeaver Tutorial**: https://dbeaver.com/docs/
- **SQL Tutorial**: https://www.postgresql.org/docs/current/tutorial.html
- **Prisma Docs**: https://www.prisma.io/docs

### Practice:
1. Create tables in DBeaver
2. Insert/update/delete records manually
3. Export data to CSV
4. Import CSV data
5. Write complex JOIN queries
6. Practice transactions

---

## 🚀 Next Steps

After mastering these tools:

1. ✅ Complete **DATABASE_TESTING.md** exercises
2. ✅ Build test data seeding scripts
3. ✅ Create database fixtures for tests
4. ✅ Implement end-to-end verification (UI → DB)
5. ✅ Add database cleanup in test teardown

---

**Recommended Tool Stack for QA:**
```
DBeaver         → Visual exploration & management
SQLTools        → Quick queries in VS Code
Docker          → Isolated test databases
Prisma          → Type-safe queries in tests
Faker.js        → Test data generation
pg/mysql2       → Direct database access
```

**Cost**: $0 (All free/open source!) 🎉

---

**Last Updated**: December 19, 2025  
**Created by**: Mykhailo  
**Related**: DATABASE_TESTING.md, LEARNING_ROADMAP.md
