import { verifyToken } from "../lib/auth.js";

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

export function requireAuth(req, res, next) {
  const token = getBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }

  req.user = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
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
