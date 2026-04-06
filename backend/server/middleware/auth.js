import { findSessionByToken, getUserById } from "../lib/mongo.js";

function getBearerToken(header = "") {
  if (!header.startsWith("Bearer ")) return null;
  return header.slice(7).trim();
}

export function requireBearerToken(req, res, next) {
  const token = getBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  req.token = token;
  return next();
}

export async function requireAuth(req, res, next) {
  const token = getBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const session = await findSessionByToken(token);
  if (!session) {
    return res.status(401).json({ message: "Invalid or expired session." });
  }

  const user = await getUserById(session.userId);
  if (!user) {
    return res.status(401).json({ message: "User no longer exists." });
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  req.token = token;
  return next();
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
}
