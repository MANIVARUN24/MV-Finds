# MV Finds — Full-Stack Product Discovery Platform

A curated product discovery website and content-commerce platform built with **React / Vite**, **Spring Boot 3 (Java 21)**, and **PostgreSQL**.

---

## 🏛 Architecture Overview

```text
       Pinterest Pin
             ↓ (links to https://mvfinds.in/product/:slug)
┌───────────────────────────────────────────────────────────┐
│                    React / Vite Frontend                  │
│                     (http://localhost:5173)               │
│                                                           │
│  • Public Discovery Pages: Home, Shop, Categories, Search │
│  • Dynamic Product Pages: /product/:slug                  │
│  • Private Admin Product Manager: /admin/products         │
└────────────────────────────┬──────────────────────────────┘
                             │ REST API (JSON & Multipart)
                             ▼
┌───────────────────────────────────────────────────────────┐
│                   Spring Boot 3 Backend                   │
│                     (http://localhost:8080)               │
│                                                           │
│  • REST Endpoints: /api/products, /api/products/search    │
│  • JPA & Hibernate Repository                             │
│  • Multipart Image Upload: /api/products/upload-image     │
└────────────────────────────┬──────────────────────────────┘
                             │ JDBC
                             ▼
┌───────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                    │
│                      (Database: mv_finds)                 │
│                                                           │
│  • Table: products (Single Source of Truth)               │
└───────────────────────────────────────────────────────────┘
```

---

## 📦 Project Structure

```text
MV Finds/
├── backend/                       # Spring Boot 3 REST API
│   ├── src/main/java/com/mvfinds/
│   │   ├── MvFindsApplication.java
│   │   ├── config/                # CORS and DataSeeder configuration
│   │   ├── controller/            # ProductController REST endpoints
│   │   ├── dto/                   # ProductDto & UploadResponse
│   │   ├── entity/                # Product JPA entity
│   │   ├── exception/             # GlobalExceptionHandler
│   │   └── repository/            # ProductRepository (PostgreSQL queries)
│   ├── src/main/resources/
│   │   └── application.yml        # PostgreSQL & file upload configuration
│   ├── .env.example               # Backend environment variables template
│   ├── mvnw.cmd / mvnw            # Maven Wrapper
│   └── pom.xml                    # Maven build file (Java 21, Spring Boot 3.3.4)
│
├── database/
│   └── schema.sql                 # PostgreSQL DDL schema & demo seed script
│
├── public/
│   └── products/                  # Local storage directory for product images
│
├── src/                           # React Frontend
│   ├── components/                # Header, ProductCard, SearchBar, Modals
│   ├── context/                   # ProductContext & AuthContext
│   ├── data/                      # categories.js, articles.js, products.js
│   ├── pages/                     # Home, Shop, Category, ProductDetail, Admin
│   └── services/                  # api.js (REST API service client)
│
└── package.json                   # Vite & React dependencies
```

---

## 🚀 Step-by-Step Setup & Running Guide

### Step 1: Create the PostgreSQL Database

1. Ensure the PostgreSQL service is active on your machine.
2. Open your terminal or `psql` and create the `mv_finds` database:
   ```sql
   CREATE DATABASE mv_finds;
   ```
3. (Optional) Run `database/schema.sql` to initialize tables and indexes manually, or let Spring Boot automatically create the table via Hibernate `ddl-auto: update`:
   ```bash
   psql -U postgres -d mv_finds -f database/schema.sql
   ```

---

### Step 2: Configure Backend Database Credentials

Inside the `backend/` directory, configure your database credentials. You can set environment variables or edit `backend/src/main/resources/application.yml`:

```properties
# Environment Variables (Optional):
DB_URL=jdbc:postgresql://localhost:5432/mv_finds
DB_USERNAME=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
```

---

### Step 3: Start the Spring Boot Backend

From the project root:

```bash
# Windows
cd backend
.\mvnw.cmd spring-boot:run

# macOS / Linux
cd backend
./mvnw spring-boot:run
```

The Spring Boot REST API will start on **[http://localhost:8080](http://localhost:8080)**.
Upon first startup, the database is automatically seeded with 3 initial demo products (*Minimal Desk Lamp*, *Wireless Mouse*, *Laptop Stand*).

---

### Step 4: Start the React Frontend

In a separate terminal window from the project root:

```bash
npm install
npm run dev
```

The React frontend will be live on **[http://localhost:5173](http://localhost:5173)**.

---

## 🛠 Product Manager (Admin Workflow)

1. Open your browser to **[http://localhost:5173/admin/login](http://localhost:5173/admin/login)**.
2. Sign in with development credentials:
   - **Email**: `admin@mvfinds.in`
   - **Password**: `admin123`
3. Click **"+ Add New Product"** on the dashboard.
4. Fill in the details:
   - **Product Name**: (e.g. `Minimal Desk Lamp` $\rightarrow$ auto-generates slug `/product/minimal-desk-lamp`)
   - **Category**: Select from dropdown (*Home Finds*, *Style Finds*, *Tech Finds*, *Study & Desk*, *Gift Ideas*)
   - **Retailer**: Select from dropdown (*Amazon*, *Flipkart*, *Myntra*, *Croma*, *Nykaa*, *Other*)
   - **Product URL**: Paste legitimate retailer link (`https://...`)
   - **Image**: Upload image file from your computer (auto-saved to `public/products/<slug>.<ext>`)
   - **Description, Why We Picked It, Pros & Cons, Price, Best For**
5. Click **"Add Product"**.
6. The product is immediately saved to **PostgreSQL** and appears live across:
   - Shop page (`/shop`)
   - Respective category page (`/study-desk-finds`, `/tech-finds`, etc.)
   - Search modal
   - Homepage "Currently Loving" section (if marked *Featured*)
   - Dedicated product page (`/product/:slug`)

---

## 📌 Pinterest & Affiliate Link Workflow

```text
Pinterest Pin Destination:
  https://mvfinds.in/product/minimal-desk-lamp
                    ↓
Customer lands on MV Finds Product Page
                    ↓
Customer clicks: "View on Amazon" (or "View on Flipkart")
                    ↓
Customer is redirected to the verified retailer URL stored in PostgreSQL.
```

- **Social Sharing**: The "Save to Pinterest", "WhatsApp", and "Copy Link" buttons always share the **MV Finds product page URL**, never redirecting pins directly to Amazon.
- **Affiliate Compliance**: The `product_url` field stores exact retailer links without injecting unverified affiliate tags until officially approved by the relevant affiliate program.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all products ordered by creation date |
| `GET` | `/api/products/{id}` | Retrieve single product by numeric ID |
| `GET` | `/api/products/slug/{slug}` | Retrieve single product by unique URL slug |
| `GET` | `/api/products/category/{category}` | Retrieve products filtered by category |
| `GET` | `/api/products/featured` | Retrieve featured products |
| `GET` | `/api/products/search?q={query}` | Search products across name, category, retailer, and description |
| `POST` | `/api/products` | Create a new product (validates required fields and unique slug) |
| `PUT` | `/api/products/{id}` | Update an existing product |
| `DELETE` | `/api/products/{id}` | Delete a product |
| `POST` | `/api/products/upload-image` | Upload product image to `public/products/` and return image URL |

---

## 🔑 Key Configurations & Ports

- **Frontend Port**: `5173` (`http://localhost:5173`)
- **Backend API Port**: `8080` (`http://localhost:8080`)
- **PostgreSQL Database Name**: `mv_finds`
- **Product Images Location**: `public/products/`
- **Retailer URLs Location**: Stored securely in PostgreSQL `products.product_url` column
