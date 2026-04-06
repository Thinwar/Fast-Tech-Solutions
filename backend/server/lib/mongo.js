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

  await Promise.all([
    db.collection("users").createIndexes([{ key: { email: 1 }, unique: true }]),
    db
      .collection("sessions")
      .createIndexes([{ key: { token: 1 }, unique: true }]),
    db.collection("products").createIndexes([
      { key: { id: 1 }, unique: true },
      { key: { slug: 1 }, unique: true },
    ]),
    db.collection("orders").createIndexes([{ key: { id: 1 }, unique: true }]),
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
  const sessions = collection("sessions");
  const products = collection("products");
  const orders = collection("orders");

  if ((await users.countDocuments({})) === 0) {
    await users.insertMany(seedData.users);
  }

  if ((await products.countDocuments({})) === 0) {
    await products.insertMany(seedData.products);
  }

  if ((await orders.countDocuments({})) === 0) {
    await orders.insertMany(seedData.orders);
  }

  if ((await sessions.countDocuments({})) === 0) {
    await sessions.deleteMany({});
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
