# POS REST API

A simple RESTful API built with **Express.js** and **TypeScript** to manage products (id, name, price) with **MySQL** database.  
This API follows clean modular architecture (separated into modules: controller, service, repository, model, and routes).

---

## 🚀 Features

- CRUD operations for products
- Modular folder structure
- Error handling with standardized API response
- Database seeding (automatic database & table creation + sample data)
- Docker ready

---

## 📁 Project Structure

```
src/
├── config/           # Database connection setup
├── modules/
│ └── product/
│   ├── controllers/    # Product controllers
│   ├── services/       # Product services
│   ├── repositories/   # Product repositories
│   ├── models/         # Product models
│   └── routes/         # Product routes
├── routes/           # Combine all module routes
├── seeder/           # Database seeder script
├── app.ts            # Express app configuration
├── server.ts         # Entry point to start server
.env                  # Environment variables
Dockerfile            # Docker setup
docker-compose.yml    # Docker Compose for app and database
tsconfig.json         # TypeScript configuration
package.json          # NPM dependencies and scripts
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/IsnuMdr/pos-api.git
cd pos-api
```

### 2. Instalation

```bash
npm install
```

### 3. Setup environment variables

Create a .env file based on .env.example:

```bash
NODE_ENV=development
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=pos-app
DB_PORT=3306
PORT=3000
```

### 4. Run Seeder (Local)

```
npm run seed
```

This will create the database, tables, and insert sample products.

💻 Running in Development (without Docker)

```bash
npm run dev
```

## 🐳 Running with Docker

### 1. Build and run the containers

```bash
docker-compose up --build
```

Docker will start:

- MySQL database
- REST API server

### 2. Run Seeder (inside Docker)

```bash
docker-compose exec api npm run seed
```

Server will start on http://localhost:3000
