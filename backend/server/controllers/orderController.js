import { createId } from "../lib/auth.js";
import { readDb, updateDb } from "../lib/store.js";

function calculateTotals(products, items) {
  const normalizedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found.`);
    }

    const quantity = Number(item.quantity || 1);
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      lineTotal: product.price * quantity,
    };
  });

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingFee = subtotal >= 100000 ? 0 : 1500;

  return {
    items: normalizedItems,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
  };
}

export function createOrder(req, res) {
  const { items, shippingAddress, paymentMethod = "cash_on_delivery" } = req.body || {};

  if (!Array.isArray(items) || !items.length) {
    return res.status(400).json({ message: "Order items are required." });
  }

  const db = readDb();

  let totals;
  try {
    totals = calculateTotals(db.products, items);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const order = {
    id: createId("order"),
    userId: req.user.id,
    items: totals.items,
    subtotal: totals.subtotal,
    shippingFee: totals.shippingFee,
    total: totals.total,
    shippingAddress: shippingAddress || {},
    paymentMethod,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  updateDb((current) => {
    current.orders.push(order);
    return current;
  });

  return res.status(201).json({ message: "Order placed successfully.", order });
}

export function listMyOrders(req, res) {
  const db = readDb();
  const orders = db.orders.filter((order) => order.userId === req.user.id);
  return res.json({ count: orders.length, orders });
}

export function listOrders(req, res) {
  const db = readDb();
  return res.json({ count: db.orders.length, orders: db.orders });
}

export function updateOrderStatus(req, res) {
  const { status } = req.body || {};
  if (!status) {
    return res.status(400).json({ message: "status is required." });
  }

  let updatedOrder = null;
  updateDb((current) => {
    current.orders = current.orders.map((order) => {
      if (order.id !== req.params.id) return order;
      updatedOrder = {
        ...order,
        status,
        updatedAt: new Date().toISOString(),
      };
      return updatedOrder;
    });
    return current;
  });

  if (!updatedOrder) {
    return res.status(404).json({ message: "Order not found." });
  }

  return res.json({ message: "Order updated.", order: updatedOrder });
}
