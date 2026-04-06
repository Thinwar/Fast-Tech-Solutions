import {
  createId,
  createToken,
  hashPassword,
  verifyPassword,
} from "../lib/auth.js";
import { createUser, findUserByEmail, getUserById } from "../lib/mongo.js";

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const existingUser = await findUserByEmail(normalizedEmail);

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

  await createUser(newUser);

  const token = createToken({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  });

  return res.status(201).json({
    message: "Registration successful.",
    token,
    user: sanitizeUser(newUser),
  });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = await findUserByEmail(normalizedEmail);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return res.json({
    message: "Login successful.",
    token,
    user: sanitizeUser(user),
  });
}

export async function me(req, res) {
  const user = await getUserById(req.user.id);
  return res.json({ user: sanitizeUser(user) });
}

export async function logout(req, res) {
  return res.json({ message: "Logged out successfully." });
}

export function adminCheck(req, res) {
  const { email } = req.body || {};
  const normalizedEmail = String(email).toLowerCase().trim();

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.toLowerCase().trim())
    .filter(Boolean);

  if (!adminEmails.includes(normalizedEmail)) {
    return res.status(403).json({
      message: "This account does not have admin access.",
    });
  }

  return res.json({
    message: "Admin access verified.",
    user: {
      email: normalizedEmail,
      role: "admin",
    },
  });
}
