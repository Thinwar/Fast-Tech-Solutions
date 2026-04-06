/**
 * MongoDB Initialization Script
 * Run this once to set up your database: node mongodb-init.js
 */

import { connectToDatabase } from "./server/lib/mongo.js";
import { seedData } from "./server/data/seed.js";

async function initializeDatabase() {
  try {
    const db = await connectToDatabase();

    console.log("\n📦 Initializing MongoDB collections...\n");

    // Drop existing collections (for fresh start)
    const collectionNames = await db.listCollections().toArray();
    for (const { name } of collectionNames) {
      if (["users", "products", "orders"].includes(name)) {
        await db.collection(name).deleteMany({});
        console.log(`✓ Cleared ${name} collection`);
      }
    }

    // Insert seed data
    if (seedData.users.length > 0) {
      await db.collection("users").insertMany(seedData.users);
      console.log(`✓ Inserted ${seedData.users.length} users`);
    }

    if (seedData.products.length > 0) {
      await db.collection("products").insertMany(seedData.products);
      console.log(`✓ Inserted ${seedData.products.length} products`);
    }

    // Create indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("products").createIndex({ id: 1 }, { unique: true });
    await db.collection("products").createIndex({ slug: 1 }, { unique: true });
    await db.collection("orders").createIndex({ id: 1 }, { unique: true });
    await db.collection("orders").createIndex({ userId: 1 });

    console.log("✓ Indexes created\n");
    console.log("✅ Database initialized successfully!\n");

    // Display sample data
    console.log("📊 Sample Data:\n");
    const userCount = await db.collection("users").countDocuments();
    console.log(`Total users: ${userCount}`);

    const productCount = await db.collection("products").countDocuments();
    console.log(`Total products: ${productCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database:", error.message);
    process.exit(1);
  }
}

initializeDatabase();
