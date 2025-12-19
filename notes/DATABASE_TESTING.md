# 🗄️ Database Testing with Playwright (PostgreSQL/MySQL)

**Priority**: Week 7-8 of Learning Roadmap  
**Goal**: Verify UI actions are correctly reflected in database  
**Why**: Senior QA must validate end-to-end data integrity  

---

## 📋 Table of Contents

1. [Why Database Testing?](#why-database-testing)
2. [Setup: PostgreSQL with Node.js](#setup-postgresql)
3. [Setup: MySQL with Node.js](#setup-mysql)
4. [Database Clients for Node.js](#database-clients)
5. [Test Pattern: UI → Database Verification](#test-pattern)
6. [Database Fixtures & Cleanup](#fixtures-cleanup)
7. [Advanced: Test Data Seeding](#test-data-seeding)
8. [Common Patterns](#common-patterns)
9. [Homework Exercises](#homework)

---

## <a name="why-database-testing"></a>1. Why Database Testing?

### Real-World Scenario:
```
User registers on website:
1. Fills form → clicks "Register"
2. UI shows "Registration Successful"
3. ❓ But is the user ACTUALLY in the database?
4. ❓ Is password hashed correctly?
5. ❓ Is email verified flag set to false?
```

**Without DB verification**: You only know UI works, not data integrity.

### What Senior QA Tests:
✅ UI action → Database record created  
✅ Update form → Database record updated  
✅ Delete action → Database record deleted (or soft-deleted)  
✅ Role/permissions stored correctly  
✅ Timestamps (created_at, updated_at)  
✅ Foreign key relationships  

---

## <a name="setup-postgresql"></a>2. Setup: PostgreSQL with Node.js

### Step 1: Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Download installer: https://www.postgresql.org/download/windows/

### Step 2: Create Test Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE test_automation_db;

# Create user
CREATE USER test_user WITH PASSWORD 'test_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE test_automation_db TO test_user;

# Exit
\q
```

### Step 3: Install Node.js Client

```bash
npm install --save-dev pg
npm install --save-dev @types/pg
```

### Step 4: Test Connection

Create `tests/utils/db.ts`:

```typescript
import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'test_automation_db',
  user: 'test_user',
  password: 'test_password',
});

// Test connection
export async function testConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connected:', result.rows[0]);
  } finally {
    client.release();
  }
}
```

**Run test:**
```typescript
import { test } from '@playwright/test';
import { testConnection } from './utils/db';

test('database connection', async () => {
  await testConnection();
});
```

---

## <a name="setup-mysql"></a>3. Setup: MySQL with Node.js

### Step 1: Install MySQL

**macOS (Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Linux:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### Step 2: Create Test Database

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE test_automation_db;

# Create user
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password';

# Grant privileges
GRANT ALL PRIVILEGES ON test_automation_db.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;

# Exit
EXIT;
```

### Step 3: Install Node.js Client

```bash
npm install --save-dev mysql2
npm install --save-dev @types/mysql2
```

### Step 4: Test Connection

Create `tests/utils/db-mysql.ts`:

```typescript
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'test_automation_db',
  user: 'test_user',
  password: 'test_password',
});

export async function testConnection() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT NOW()');
    console.log('✅ Database connected:', rows);
  } finally {
    connection.release();
  }
}
```

---

## <a name="database-clients"></a>4. Database Clients for Node.js

### Option 1: Raw SQL (pg, mysql2)
**Pros**: Full control, fast  
**Cons**: Manual SQL, no type safety  

### Option 2: Prisma ORM ⭐ (RECOMMENDED)
**Pros**: Type-safe, migrations, easy queries  
**Cons**: Learning curve  

**Install Prisma:**
```bash
npm install --save-dev prisma @prisma/client
npx prisma init
```

**schema.prisma example:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Generate client:**
```bash
npx prisma migrate dev --name init
```

**Use in tests:**
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Find user
const user = await prisma.user.findUnique({
  where: { email: 'test@example.com' }
});
```

---

## <a name="test-pattern"></a>5. Test Pattern: UI → Database Verification

### Example: User Registration

```typescript
import { test, expect } from '@playwright/test';
import { pool } from './utils/db';

test('user registration creates database record', async ({ page }) => {
  // 1. ARRANGE: Generate unique test data
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'SecurePass123!';
  
  // 2. ACT: Fill registration form and submit
  await page.goto('https://example.com/register');
  await page.getByLabel('Email').fill(testEmail);
  await page.getByLabel('Password').fill(testPassword);
  await page.getByLabel('First Name').fill('John');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByRole('button', { name: 'Register' }).click();
  
  // 3. ASSERT: Check UI feedback
  await expect(page.getByText('Registration successful')).toBeVisible();
  
  // 4. VERIFY DATABASE: Check user exists
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [testEmail]
    );
    
    expect(result.rows.length).toBe(1);
    
    const user = result.rows[0];
    expect(user.email).toBe(testEmail);
    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.password).not.toBe(testPassword); // Should be hashed!
    expect(user.created_at).toBeTruthy();
    
    console.log('✅ User in database:', user);
  } finally {
    // 5. CLEANUP: Delete test user
    await client.query('DELETE FROM users WHERE email = $1', [testEmail]);
    client.release();
  }
});
```

---

## <a name="fixtures-cleanup"></a>6. Database Fixtures & Cleanup

### Pattern 1: Fixture with Cleanup

```typescript
import { test as base } from '@playwright/test';
import { pool } from './utils/db';

type TestFixtures = {
  testUser: { email: string; id: number };
};

export const test = base.extend<TestFixtures>({
  testUser: async ({}, use) => {
    const client = await pool.connect();
    const email = `test-${Date.now()}@example.com`;
    
    try {
      // Setup: Create user
      const result = await client.query(
        'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, 'hashed_password', 'Test', 'User']
      );
      
      const user = { email, id: result.rows[0].id };
      
      // Provide to test
      await use(user);
      
      // Cleanup: Delete user
      await client.query('DELETE FROM users WHERE id = $1', [user.id]);
    } finally {
      client.release();
    }
  },
});

// Usage:
test('login with existing user', async ({ page, testUser }) => {
  await page.goto('https://example.com/login');
  await page.getByLabel('Email').fill(testUser.email);
  // testUser is automatically created and cleaned up!
});
```

---

## <a name="test-data-seeding"></a>7. Advanced: Test Data Seeding

### Seed Script: `tests/utils/seed.ts`

```typescript
import { pool } from './db';

export async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    // Create users
    await client.query(`
      INSERT INTO users (email, password, first_name, last_name)
      VALUES 
        ('admin@example.com', 'hashed_pass', 'Admin', 'User'),
        ('user1@example.com', 'hashed_pass', 'John', 'Doe'),
        ('user2@example.com', 'hashed_pass', 'Jane', 'Smith')
      ON CONFLICT (email) DO NOTHING
    `);
    
    // Create products
    await client.query(`
      INSERT INTO products (name, price, stock)
      VALUES 
        ('Laptop', 999.99, 50),
        ('Mouse', 29.99, 200),
        ('Keyboard', 79.99, 150)
      ON CONFLICT (name) DO NOTHING
    `);
    
    console.log('✅ Database seeded');
  } finally {
    client.release();
  }
}

export async function clearDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('TRUNCATE users, products, orders CASCADE');
    console.log('✅ Database cleared');
  } finally {
    client.release();
  }
}
```

### Use in playwright.config.ts:

```typescript
import { defineConfig } from '@playwright/test';
import { seedDatabase, clearDatabase } from './tests/utils/seed';

export default defineConfig({
  globalSetup: async () => {
    await clearDatabase();
    await seedDatabase();
  },
  globalTeardown: async () => {
    await clearDatabase();
  },
});
```

---

## <a name="common-patterns"></a>8. Common Patterns

### Pattern 1: Query Helper Functions

```typescript
// tests/utils/db-helpers.ts
import { pool } from './db';

export async function getUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM users WHERE email = $1', [email]);
  } finally {
    client.release();
  }
}

export async function getOrdersByUserId(userId: number) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    return result.rows;
  } finally {
    client.release();
  }
}
```

**Usage:**
```typescript
test('user can place order', async ({ page }) => {
  const user = await getUserByEmail('test@example.com');
  
  // ... UI actions ...
  
  const orders = await getOrdersByUserId(user.id);
  expect(orders.length).toBe(1);
  expect(orders[0].status).toBe('pending');
});
```

---

## <a name="homework"></a>9. Homework Exercises

### Exercise 1: Setup Database (30 min)
1. Install PostgreSQL or MySQL
2. Create test database
3. Install Node.js client
4. Write connection test

### Exercise 2: User Registration Verification (1 hour)
1. Find a test site with registration (or use demo app)
2. Write test that:
   - Registers new user via UI
   - Verifies user exists in database
   - Checks password is hashed
   - Validates timestamps
   - Cleans up test data

### Exercise 3: Update Profile (1 hour)
1. Create user in database
2. Login via UI
3. Update profile (name, email)
4. Verify database updated correctly

### Exercise 4: Delete User (45 min)
1. Create user in database
2. Login and delete account via UI
3. Verify user deleted (or soft-deleted with `deleted_at`)

### Exercise 5: Order Flow (2 hours)
1. Seed products in database
2. Add product to cart via UI
3. Complete checkout
4. Verify:
   - Order created in `orders` table
   - Order items in `order_items` table
   - Product stock decremented
   - User's order history shows order

### Exercise 6: Database Fixtures (1 hour)
1. Create reusable fixture for test user
2. Use in 3 different tests
3. Verify automatic cleanup

### Exercise 7: Seed & Cleanup (1 hour)
1. Write seed script for test data
2. Add globalSetup/globalTeardown
3. Run tests with seeded data

---

## 🎯 Expected Learning Outcomes

After completing this guide, you should be able to:

✅ Connect to PostgreSQL/MySQL from Node.js  
✅ Write tests that verify UI actions in database  
✅ Create reusable database fixtures  
✅ Seed and cleanup test data  
✅ Use Prisma ORM (optional)  
✅ Write helper functions for common queries  
✅ Validate data integrity end-to-end  

---

## 📚 Additional Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Node.js**: https://node-postgres.com/
- **MySQL2 Docs**: https://github.com/sidorares/node-mysql2
- **Database Testing Patterns**: Martin Fowler's articles

---

## 🚀 Next Steps

1. Complete Exercise 1 (setup) today
2. Complete Exercises 2-4 this week
3. Complete Exercises 5-7 next week
4. Then move to Week 1-2 of LEARNING_ROADMAP.md (Real App Testing)

---

**Last Updated**: December 19, 2025  
**Status**: Ready to Learn 🎓  
**Priority**: HIGH - Foundation for Senior-Level Testing  

---

**Attribution**: Created by Mykhailo with guidance from Ilarion Halushka's Playwright course
