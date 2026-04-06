import { createId } from "../lib/auth.js";
import {
  createProduct as insertProduct,
  deleteProductById,
  getProductByIdOrSlug,
  listProducts as fetchProducts,
  updateProductById,
} from "../lib/mongo.js";

function createSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listProducts(req, res) {
  const { category, brand, status } = req.query;
  const filters = {};

  if (category) filters.category = category;
  if (brand) filters.brand = brand;
  if (status) filters.status = status;

  const products = await fetchProducts(filters);
  return res.json({ count: products.length, products });
}

export async function getProduct(req, res) {
  const product = await getProductByIdOrSlug(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ product });
}

export async function createProduct(req, res) {
  const payload = req.body || {};

  if (
    !payload.name ||
    !payload.brand ||
    !payload.category ||
    payload.price === undefined
  ) {
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

  await insertProduct(product);
  return res.status(201).json({ message: "Product created.", product });
}

export async function updateProduct(req, res) {
  const payload = req.body || {};

  const update = {
    ...payload,
    slug: payload.slug ? createSlug(payload.slug) : undefined,
    price: payload.price !== undefined ? Number(payload.price) : undefined,
    originalPrice:
      payload.originalPrice !== undefined
        ? Number(payload.originalPrice)
        : undefined,
    stock: payload.stock !== undefined ? Number(payload.stock) : undefined,
    updatedAt: new Date().toISOString(),
  };

  Object.keys(update).forEach((key) => {
    if (update[key] === undefined) {
      delete update[key];
    }
  });

  const updatedProduct = await updateProductById(req.params.id, update);

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ message: "Product updated.", product: updatedProduct });
}

export async function deleteProduct(req, res) {
  const removed = await deleteProductById(req.params.id);

  if (!removed) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.json({ message: "Product deleted." });
}
