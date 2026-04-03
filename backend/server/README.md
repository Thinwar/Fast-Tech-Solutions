# Fast Tech API

Express API for auth, product management, and order processing.

## Run

1. Install backend dependencies:
   `cd backend && npm install`
2. Start the API:
   `npm run dev`

Default port: `4000`

## Default Accounts

- Admin:
  `admin@fasttechsolutions.co.ke` / `Admin@123`
- Customer:
  `customer@example.com` / `Customer@123`

## Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/mine`
- `GET /api/orders`
- `PATCH /api/orders/:id/status`

Protected routes require:
`Authorization: Bearer <token>`
