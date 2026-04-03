import { createId } from "../lib/auth.js";
import { readDb, updateDb } from "../lib/store.js";

function createSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function listProducts(req, res) {
  const { category, brand, status } = req.query;
  let products = [...readDb().products];

  if (category) {
    products = products.filter((item) => item.category === category);
  }
  if (brand) {
    products = products.filter((item) => item.brand === brand);
  }
  if (status) {
    products = products.filter((item) => item.status === status);
  }

  return res.json({ count: products.length, products });
}

export function getProduct(req, res) {
  const db = readDb();
  const product = db.products.find(
    (item) => item.id === req.params.id || item.slug === req.params.id,
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ product });
}

export function createProduct(req, res) {
  const payload = req.body || {};

  if (!payload.name || !payload.brand || !payload.category || payload.price === undefined) {
    return res.status(400).json({
      message: "name, brand, category, and price are required.",
    });
  }

  const product = {
    id: createId("prod"),
    slug: createSlug(payload.slug || payload.name),
    name: payload.name,
    brand: payload.brand,
    category: payload.category,
    price: Number(payload.price),
    originalPrice: Number(payload.originalPrice || payload.price),
    stock: Number(payload.stock ?? 0),
    status: payload.status || "draft",
    description: payload.description || "",
    specs: Array.isArray(payload.specs) ? payload.specs : [],
    image: payload.image || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updateDb((current) => {
    current.products.push(product);
    return current;
  });

  return res.status(201).json({ message: "Product created.", product });
}

export function updateProduct(req, res) {
  const payload = req.body || {};
  let updatedProduct = null;

  updateDb((current) => {
    current.products = current.products.map((product) => {
      if (product.id !== req.params.id) return product;

      updatedProduct = {
        ...product,
        ...payload,
        slug: payload.slug ? createSlug(payload.slug) : product.slug,
        price: payload.price !== undefined ? Number(payload.price) : product.price,
        originalPrice:
          payload.originalPrice !== undefined
            ? Number(payload.originalPrice)
            : product.originalPrice,
        stock: payload.stock !== undefined ? Number(payload.stock) : product.stock,
        updatedAt: new Date().toISOString(),
      };
      return updatedProduct;
    });
    return current;
  });

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ message: "Product updated.", product: updatedProduct });
}

export function deleteProduct(req, res) {
  let removed = false;

  updateDb((current) => {
    const nextProducts = current.products.filter((product) => {
      if (product.id === req.params.id) {
        removed = true;
        return false;
      }
      return true;
    });
    current.products = nextProducts;
    return current;
  });

  if (!removed) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ message: "Product deleted." });
}
