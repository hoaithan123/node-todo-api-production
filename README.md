# 🚀 Production-Ready Todo API (Express & Prisma)

[![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-v5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-v8.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-v6.2.1-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Jest Testing](https://img.shields.io/badge/Jest-v29.x-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![Swagger API Docs](https://img.shields.io/badge/Swagger_UI-OAS_3.0-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/)

A production-grade RESTful API for task management (Todo List) built with Node.js, Express, and MySQL. Optimized with industry-standard practices, this project showcases clean layered architecture, robust database relations, stateless JWT authentication, centralized error handling, request validations, automated integration testing, and interactive API documentation.

---

## 🌟 Key Architectural & Security Decisions (Giản đồ Kiến trúc & Bảo mật)

### 1. Separation of Concerns (Tách biệt các thành phần)
- **`app.js` vs `server.js`**: Separated the Express application configuration from the HTTP listener. This prevents port collision during testing and allows the test runner to launch the app in-memory seamlessly.
- **Controller-Model Pattern**: Kept controllers focused on request-response flow and HTTP statuses, delegating database queries to the model layer wrapper utilizing **Prisma ORM**.

### 2. Security Best Practices (Bảo mật tối ưu)
- **One-Way Password Hashing**: Utilizes `bcrypt` with `10` salt rounds to hash user credentials. Raw passwords are never stored.
- **Stateless Authorization (JWT)**: Implements route protection via JWT Bearer Tokens, decoded by the custom `protect` middleware.
- **IDOR Protection (Insecure Direct Object Reference)**: All CRUD actions on Todos validate the relationship between the `userId` in the JWT payload and the resource owner. Users are programmatically restricted to accessing only their own data.

### 3. Resilience & Standardization (Độ tin cậy & Chuẩn hóa)
- **Centralized Error Handling**: Employs a custom `AppError` class inheriting from JS `Error`. Operational errors are piped down to a single centralized `errorHandler` middleware.
- **Automatic Request Validation**: Protects routes using `Joi` schema validation middleware to block malformed request payloads (`400 Bad Request`) before reaching controllers.

---

## 🛠️ Tech Stack & Libraries

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Fast, scalable JavaScript runtime environment |
| **Framework** | Express.js | Minimalist and flexible web application framework |
| **Database** | MySQL | Robust relational database management system |
| **ORM** | Prisma | Modern database toolkit for type-safe database access |
| **Security** | JSON Web Tokens (JWT) | Stateless secure client authentication |
| **Hashing** | Bcrypt | Secure industry-standard password hashing |
| **Validation**| Joi | Object schema description language and validator |
| **Testing** | Jest & Supertest | Testing framework & HTTP assertion utility |
| **API Docs** | Swagger | Interactive OpenAPI 3.0 specification rendering |

---

## 📂 Project Structure

```text
├── prisma/
│   └── schema.prisma         # Prisma Schema & Database models
├── src/
│   ├── config/
│   │   └── prisma.js         # Global Prisma Client configuration singleton
│   ├── controllers/
│   │   ├── todocontroller.js # Request-response controller for Todos
│   │   └── usercontroller.js # Auth controllers (Register / Login)
│   ├── middlewares/
│   │   ├── middlewares.js    # Centralized errorHandler & protect middlewares
│   │   └── validateTodo.js   # Input validation schema using Joi
│   ├── models/
│   │   ├── todomodel.js      # Prisma abstraction for Todos CRUD
│   │   └── usermodel.js      # Prisma abstraction for Users query
│   ├── routes/
│   │   ├── todoRoutes.js     # Todo endpoints & Swagger YAML annotations
│   │   └── userRoutes.js     # User endpoints & Swagger YAML annotations
│   ├── utils/
│   │   └── AppError.js       # Custom operational error blueprint
│   ├── app.js                # App definition & middlewares registration
│   └── server.js             # Server startup entry point
├── tests/
│   ├── todo.test.js          # Authentication & Todo CRUD Integration Tests
│   └── user.test.js          # User Registration & Auth Integration Tests
├── .env                      # Environment Variables configuration (Database URL)
├── .gitignore                # Target files ignored by version control
├── package.json              # App dependencies, engines, and NPM scripts
└── README.md                 # Project Documentation (this file)
```

---

## ⚡ Setup & Installation

### 1. Prerequisites
- **Node.js** (v16.x or higher recommended)
- **MySQL** database server running locally or remotely

### 2. Clone & Install Dependencies
```bash
# Clone this repository
git clone <your-repository-url>

# Navigate into the project folder
cd todo-api

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure your MySQL connection details:
```env
DATABASE_URL="mysql://username:password@127.0.0.1:3306/todo_database"
```
*(Replace `username`, `password`, and `todo_database` with your actual MySQL credentials)*

### 4. Database Initialization (Prisma setup)
Sync your Prisma client with the database schema:
```bash
# Pull database structure into schema
npx prisma db pull

# Generate local Prisma Client
npx prisma generate
```

---

## 🚀 Running the Project

### Start Development Server
```bash
node src/server.js
```
The server will boot up and start listening on port `3000`.

### Interactive API Docs (Swagger UI)
Once the server is running, navigate to the following URL in your browser to inspect and try out the API endpoints:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## 🧪 Running the Test Suite (Auto Testing)

To run the automated integration tests managed by **Jest** and **Supertest**:
```bash
npm test
```
*Note: The test suite includes 11 test cases executing in-band (`--runInBand`) to avoid database race conditions, verifying:*
- [x] User Registration (Success case, Duplicate username handling)
- [x] User Login (Success JWT generation, Invalid password rejection)
- [x] Route Protection (Blocking unauthenticated requests)
- [x] Todo CRUD Operations (Creation, Read list, Read detail, Updates, and Deletion)
- [x] Deleted resource lookup validation (Proper 404 response on deleted elements)
