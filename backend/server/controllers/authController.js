import { createId, createToken, hashPassword, verifyPassword } from "../lib/auth.js";
import { readDb, updateDb } from "../lib/store.js";

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export function register(req, res) {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const db = readDb();
  const existingUser = db.users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return res.status(409).json({ message: "Email is already in use." });
  }

  const newUser = {
    id: createId("user"),
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  const token = createToken();
  const session = {
    token,
    userId: newUser.id,
    createdAt: new Date().toISOString(),
  };

  updateDb((current) => {
    current.users.push(newUser);
    current.sessions.push(session);
    return current;
  });

  return res.status(201).json({
    message: "Registration successful.",
    token,
    user: sanitizeUser(newUser),
  });
}

export function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const db = readDb();
  const user = db.users.find((item) => item.email === normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken();
  updateDb((current) => {
    current.sessions.push({
      token,
      userId: user.id,
      createdAt: new Date().toISOString(),
    });
    return current;
  });

  return res.json({
    message: "Login successful.",
    token,
    user: sanitizeUser(user),
  });
}

export function me(req, res) {
  const db = readDb();
  const user = db.users.find((item) => item.id === req.user.id);
  return res.json({ user: sanitizeUser(user) });
}

export function logout(req, res) {
  updateDb((current) => {
    current.sessions = current.sessions.filter((item) => item.token !== req.token);
    return current;
  });

  return res.json({ message: "Logged out successfully." });
}
