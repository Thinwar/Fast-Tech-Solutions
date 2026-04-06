import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export function createId(prefix) {
  return `${prefix}-${crypto.randomBytes(6).toString("hex")}`;
}

export function hashPassword(
  password,
  salt = crypto.randomBytes(16).toString("hex"),
) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, passwordHash) {
  const [salt, storedHash] = String(passwordHash).split(":");
  if (!salt || !storedHash) return false;
  const computedHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(storedHash, "hex"),
    Buffer.from(computedHash, "hex"),
  );
}

export function createToken(payload = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
