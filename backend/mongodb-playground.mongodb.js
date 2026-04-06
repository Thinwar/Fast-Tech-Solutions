// MongoDB Playground - Fast Tech Database
// Use this to explore and test your database queries
// Run by selecting code and pressing Ctrl+Shift+Enter

// Switch to the database
use("fast-tech-db");

// ============================================
// USERS COLLECTION
// ============================================

// View all users
db.users.find({});

// Find a specific user by email
db.users.findOne({ email: "admin@fasttechsolutions.co.ke" });

// Count total users
db.users.countDocuments({});

// ============================================
// PRODUCTS COLLECTION
// ============================================

// View all products
db.products.find({});

// Find products by category
db.products.find({ category: "phones" });

// Find products by brand
db.products.find({ brand: "Apple" });

// Get a specific product by slug
db.products.findOne({ slug: "iphone-16-pro-max" });

// Count total products
db.products.countDocuments({});

// Update product stock
// db.products.updateOne(
//   { id: "prod-iphone-16-pro-max" },
//   { $set: { stock: 20 } }
// );

// ============================================
// ORDERS COLLECTION
// ============================================

// View all orders
db.orders.find({});

// Find user's orders
// db.orders.find({ userId: "user-1" });

// Count total orders
db.orders.countDocuments({});

// ============================================
// AGGREGATION EXAMPLES
// ============================================

// Total sales by category
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "id",
      as: "product",
    },
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$product.category",
      totalSales: { $sum: "$items.lineTotal" },
      count: { $sum: 1 },
    },
  },
]);

// Top selling products
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      name: { $first: "$items.name" },
      totalQuantity: { $sum: "$items.quantity" },
      totalRevenue: { $sum: "$items.lineTotal" },
    },
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 10 },
]);

// Orders summary
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
      totalAmount: { $sum: "$total" },
    },
  },
]);
