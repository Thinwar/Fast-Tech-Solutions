import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedData } from "../data/seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../data/db.json");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureDatabase() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(seedData, null, 2));
    return clone(seedData);
  }

  const raw = fs.readFileSync(dbPath, "utf-8");
  const parsed = raw ? JSON.parse(raw) : {};

  const hydrated = {
    users: parsed.users?.length ? parsed.users : clone(seedData.users),
    sessions: parsed.sessions || [],
    products: parsed.products?.length ? parsed.products : clone(seedData.products),
    orders: parsed.orders || [],
  };

  fs.writeFileSync(dbPath, JSON.stringify(hydrated, null, 2));
  return hydrated;
}

export function readDb() {
  return ensureDatabase();
}

export function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  return data;
}

export function updateDb(updater) {
  const current = readDb();
  const next = updater(clone(current));
  return writeDb(next);
}
