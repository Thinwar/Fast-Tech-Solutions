import crypto from "node:crypto";

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export const seedData = {
  users: [
    {
      id: "admin-1",
      name: "Admin User",
      email: "admin@fasttechsolutions.co.ke",
      passwordHash: hashPassword("Admin@123"),
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: "customer-1",
      name: "Demo Customer",
      email: "customer@example.com",
      passwordHash: hashPassword("Customer@123"),
      role: "customer",
      createdAt: new Date().toISOString(),
    },
  ],
  sessions: [],
  products: [
    {
      id: "prod-iphone-16-pro-max",
      name: "iPhone 16 Pro Max",
      slug: "iphone-16-pro-max",
      brand: "Apple",
      category: "phones",
      price: 189999,
      originalPrice: 204999,
      stock: 12,
      status: "active",
      description:
        "Titanium flagship with pro camera controls and a brighter edge-to-edge display.",
      specs: [
        "6.9-inch Super Retina display",
        "A18 Pro performance chip",
        "5x optical zoom system",
        "256GB storage",
      ],
      image:
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-galaxy-s24-ultra",
      brand: "Samsung",
      category: "phones",
      price: 174999,
      originalPrice: 189999,
      stock: 8,
      status: "active",
      description:
        "Large premium display, S Pen productivity, and sharp low-light photography.",
      specs: [
        "6.8-inch QHD+ AMOLED",
        "Snapdragon flagship platform",
        "200MP pro-grade camera",
        "5000mAh battery",
      ],
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "prod-macbook-air-m3",
      name: "MacBook Air M3",
      slug: "macbook-air-m3",
      brand: "Apple",
      category: "laptops",
      price: 164999,
      originalPrice: 179999,
      stock: 6,
      status: "active",
      description:
        "Ultra-light premium laptop for study, travel, and focused creative work.",
      specs: [
        "13-inch Liquid Retina display",
        "Apple M3 chip",
        "16GB unified memory",
        "512GB SSD storage",
      ],
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  orders: [],
};
