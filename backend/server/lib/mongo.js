import { MongoClient } from "mongodb";
import { seedData } from "../data/seed.js";

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB_NAME || "fast-tech-db";

let client;
let db;

export async function connectToDatabase() {
  if (!mongoUri) {
    console.warn("MONGODB_URI is not configured. MongoDB connection skipped.");
    return null;
  }

  if (db) {
    return db;
  }

  client = new MongoClient(mongoUri, {
    serverApi: {
      version: "1",
    },
  });

  await client.connect();
  db = client.db(mongoDbName);

  // Create indexes for better query performance
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("products").createIndex({ id: 1 }, { unique: true }),
    db.collection("products").createIndex({ slug: 1 }, { unique: true }),
    db.collection("orders").createIndex({ id: 1 }, { unique: true }),
    db.collection("orders").createIndex({ userId: 1 }),
  ]);

  await seedInitialData();
  console.log(`Connected to MongoDB database "${mongoDbName}".`);
  return db;
}

function assertDb() {
  if (!db) {
    throw new Error(
      "MongoDB is not connected. Set MONGODB_URI and call connectToDatabase().",
    );
  }
}

function collection(name) {
  assertDb();
  return db.collection(name);
}

async function seedInitialData() {
  const users = collection("users");
  const products = collection("products");
  const orders = collection("orders");

  if ((await users.countDocuments({})) === 0) {
    await users.insertMany(seedData.users);
    console.log(`✓ Seeded ${seedData.users.length} users`);
  }

  if ((await products.countDocuments({})) === 0) {
    await products.insertMany(seedData.products);
    console.log(`✓ Seeded ${seedData.products.length} products`);
  }

  if ((await orders.countDocuments({})) === 0 && seedData.orders.length > 0) {
    await orders.insertMany(seedData.orders);
    console.log(`✓ Seeded ${seedData.orders.length} orders`);
  }
}

export async function findUserByEmail(email) {
  return collection("users").findOne({ email });
}

export async function createUser(user) {
  await collection("users").insertOne(user);
  return user;
}

export async function getUserById(id) {
  return collection("users").findOne({ id });
}

export async function createSession(session) {
  await collection("sessions").insertOne(session);
  return session;
}

export async function findSessionByToken(token) {
  return collection("sessions").findOne({ token });
}

export async function deleteSessionByToken(token) {
  const result = await collection("sessions").deleteOne({ token });
  return result.deletedCount > 0;
}

export async function listProducts(filters = {}) {
  return collection("products").find(filters).toArray();
}

export async function getProductByIdOrSlug(idOrSlug) {
  return collection("products").findOne({
    $or: [{ id: idOrSlug }, { slug: idOrSlug }],
  });
}

export async function createProduct(product) {
  await collection("products").insertOne(product);
  return product;
}

export async function updateProductById(id, update) {
  const result = await collection("products").findOneAndUpdate(
    { id },
    { $set: update },
    { returnDocument: "after" },
  );
  return result.value;
}

export async function deleteProductById(id) {
  const result = await collection("products").deleteOne({ id });
  return result.deletedCount > 0;
}

export async function createOrder(order) {
  await collection("orders").insertOne(order);
  return order;
}

export async function listOrders(filters = {}) {
  return collection("orders").find(filters).toArray();
}

export async function updateOrderStatusById(orderId, status) {
  const result = await collection("orders").findOneAndUpdate(
    { id: orderId },
    { $set: { status, updatedAt: new Date().toISOString() } },
    { returnDocument: "after" },
  );
  return result.value;
}
