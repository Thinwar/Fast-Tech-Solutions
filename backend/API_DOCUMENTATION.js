/**
 * FAST TECH API - Backend Integration Summary
 * ============================================
 *
 * This document outlines the complete backend implementation with MongoDB
 * and JWT authentication.
 */

// ============================================================
// 1. ENVIRONMENT SETUP
// ============================================================

/*
Backend/.env file contains:
- MONGODB_URI=mongodb://localhost:27017
- MONGODB_DB_NAME=fast-tech-db
- JWT_SECRET=your-secret-key-change-in-production-12345
- ADMIN_EMAILS=admin@fasttechsolutions.co.ke,admin@example.com
- PORT=4000
*/

// ============================================================
// 2. INSTALLED DEPENDENCIES
// ============================================================

/*
npm packages:
- express@^5.1.0 - Web framework
- mongodb@^6.0.0 - MongoDB driver
- jsonwebtoken@^9.0.0 - JWT authentication
- cors@^2.8.5 - CORS middleware
- dotenv@^16.0.0 - Environment variables
*/

// ============================================================
// 3. API ENDPOINTS - AUTHENTICATION
// ============================================================

/*
POST /api/auth/register
Creates a new user account and returns JWT token

Request body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (201):
{
  "message": "Registration successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-04-06T12:00:00.000Z"
  }
}
*/

/*
POST /api/auth/login
Authenticates user and returns JWT token

Request body:
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-04-06T12:00:00.000Z"
  }
}
*/

/*
GET /api/auth/me
Get current authenticated user profile
Headers: Authorization: Bearer <token>

Response (200):
{
  "user": {
    "id": "user-abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "createdAt": "2026-04-06T12:00:00.000Z"
  }
}
*/

/*
POST /api/auth/logout
Logout user (token becomes invalid on frontend)
Headers: Authorization: Bearer <token>

Response (200):
{
  "message": "Logged out successfully."
}
*/

// ============================================================
// 4. API ENDPOINTS - PRODUCTS
// ============================================================

/*
GET /api/products
Retrieve all products with optional filters

Query parameters:
- category: "phones", "laptops", etc.
- brand: "Apple", "Samsung", etc.
- status: "active", "draft"

Example: /api/products?category=phones&brand=Apple

Response (200):
{
  "count": 2,
  "products": [
    {
      "id": "prod-iphone-16-pro-max",
      "name": "iPhone 16 Pro Max",
      "slug": "iphone-16-pro-max",
      "brand": "Apple",
      "category": "phones",
      "price": 189999,
      "originalPrice": 204999,
      "stock": 12,
      "status": "active",
      "description": "Titanium flagship with pro camera controls...",
      "specs": ["6.9-inch Super Retina display", "A18 Pro chip"],
      "image": "https://images.unsplash.com/...",
      "createdAt": "2026-04-06T12:00:00.000Z",
      "updatedAt": "2026-04-06T12:00:00.000Z"
    }
  ]
}
*/

/*
GET /api/products/:id
Get a single product by ID or slug

Response (200):
{
  "product": { ... product object ... }
}
*/

/*
POST /api/products
Create a new product (ADMIN ONLY)
Headers: Authorization: Bearer <admin-token>

Request body:
{
  "name": "New Product",
  "brand": "Brand Name",
  "category": "electronics",
  "price": 99999,
  "originalPrice": 129999,
  "stock": 50,
  "status": "active",
  "description": "Product description",
  "specs": ["Spec 1", "Spec 2"],
  "image": "https://image-url.com/image.jpg"
}

Response (201):
{
  "message": "Product created.",
  "product": { ... created product ... }
}
*/

/*
PUT /api/products/:id
Update a product (ADMIN ONLY)
Headers: Authorization: Bearer <admin-token>

Request body:
{
  "price": 89999,
  "stock": 30,
  "status": "active"
}

Response (200):
{
  "message": "Product updated.",
  "product": { ... updated product ... }
}
*/

/*
DELETE /api/products/:id
Delete a product (ADMIN ONLY)
Headers: Authorization: Bearer <admin-token>

Response (200):
{
  "message": "Product deleted."
}
*/

// ============================================================
// 5. API ENDPOINTS - ORDERS
// ============================================================

/*
POST /api/orders
Create a new order
Headers: Authorization: Bearer <token>

Request body:
{
  "items": [
    {
      "productId": "prod-iphone-16-pro-max",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "Nairobi",
    "postalCode": "00100",
    "country": "Kenya"
  },
  "paymentMethod": "cash_on_delivery"
}

Response (201):
{
  "message": "Order placed successfully.",
  "order": {
    "id": "order-xyz789",
    "userId": "user-abc123",
    "items": [
      {
        "productId": "prod-iphone-16-pro-max",
        "name": "iPhone 16 Pro Max",
        "price": 189999,
        "quantity": 2,
        "lineTotal": 379998
      }
    ],
    "subtotal": 379998,
    "shippingFee": 0,
    "total": 379998,
    "shippingAddress": { ... },
    "paymentMethod": "cash_on_delivery",
    "status": "pending",
    "createdAt": "2026-04-06T12:00:00.000Z",
    "updatedAt": "2026-04-06T12:00:00.000Z"
  }
}
*/

/*
GET /api/orders/mine
Get current user's orders
Headers: Authorization: Bearer <token>

Response (200):
{
  "count": 1,
  "orders": [ ... array of user's orders ... ]
}
*/

/*
GET /api/orders
Get all orders (ADMIN ONLY)
Headers: Authorization: Bearer <admin-token>

Response (200):
{
  "count": 10,
  "orders": [ ... array of all orders ... ]
}
*/

/*
PATCH /api/orders/:id/status
Update order status (ADMIN ONLY)
Headers: Authorization: Bearer <admin-token>

Request body:
{
  "status": "shipped"
}

Response (200):
{
  "message": "Order updated.",
  "order": { ... updated order .. . }
}
*/

// ============================================================
// 6. TESTING WITH CURL
// ============================================================

/*
// Register a new user
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Demo User",
    "email": "demo@example.com",
    "password": "DemoPass123!"
  }'

// Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "DemoPass123!"
  }'

// Get all products
curl http://localhost:4000/api/products

// Get authenticated user
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer <your-jwt-token>"

// Create an order
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "items": [{"productId": "prod-iphone-16-pro-max", "quantity": 1}],
    "shippingAddress": {
      "fullName": "Demo User",
      "address": "123 Main St",
      "city": "Nairobi",
      "country": "Kenya"
    },
    "paymentMethod": "cash_on_delivery"
  }'

// Get user's orders
curl http://localhost:4000/api/orders/mine \
  -H "Authorization: Bearer <your-jwt-token>"
*/

// ============================================================
// 7. MongoDB COLLECTIONS
// ============================================================

/*
Collections created in 'fast-tech-db':

1. users
   Indexes: email (unique)
   Fields: id, name, email, passwordHash, role, createdAt

2. products
   Indexes: id (unique), slug (unique)
   Fields: id, slug, name, brand, category, price, originalPrice,
           stock, status, description, specs, image, createdAt, updatedAt

3. orders
   Indexes: id (unique), userId (for querying user orders)
   Fields: id, userId, items[], subtotal, shippingFee, total,
           shippingAddress, paymentMethod, status, createdAt, updatedAt

4. sessions (deprecated - no longer used with JWT)
*/

// ============================================================
// 8. JWT TOKEN FORMAT
// ============================================================

/*
JWT tokens contain the following claims:
{
  "id": "user-abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "iat": 1680000000,
  "exp": 1680604800
}

Token expires in 7 days by default.
*/

// ============================================================
// 9. ERROR RESPONSES
// ============================================================

/*
400 Bad Request
{
  "message": "Name, email, and password are required."
}

401 Unauthorized
{
  "message": "Invalid or expired token."
}

403 Forbidden
{
  "message": "Admin access required."
}

404 Not Found
{
  "message": "Product not found."
}

409 Conflict
{
  "message": "Email is already in use."
}

500 Internal Server Error
{
  "message": "Internal server error."
}
*/

// ============================================================
// 10. NEXT STEPS
// ============================================================

/*
1. ✅ MongoDB integration complete
2. ✅ JWT authentication implemented
3. ✅ Product API endpoints working
4. TODO: Shopping cart functionality (frontend)
5. TODO: Order processing refinements
6. TODO: Payment integration
7. TODO: Email notifications
*/
