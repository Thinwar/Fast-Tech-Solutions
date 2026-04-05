import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fast-tech-purchase-history";

let currentPurchases = [];
let hasHydratedPurchases = false;
const listeners = new Set();

function normalizePurchases(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => ({
      id: String(entry?.id || ""),
      userId: String(entry?.userId || ""),
      customerName: String(entry?.customerName || ""),
      customerEmail: String(entry?.customerEmail || ""),
      subtotal: Number(entry?.subtotal || 0),
      shippingFee: Number(entry?.shippingFee || 0),
      total: Number(entry?.total || 0),
      status: String(entry?.status || "pending"),
      placedAt: String(entry?.placedAt || new Date().toISOString()),
      items: Array.isArray(entry?.items)
        ? entry.items
            .map((item) => ({
              slug: String(item?.slug || ""),
              name: String(item?.name || ""),
              brand: String(item?.brand || ""),
              price: Number(item?.price || 0),
              quantity: Math.max(1, Number(item?.quantity || 1)),
              image: String(item?.image || ""),
            }))
            .filter((item) => item.slug && item.name)
        : [],
    }))
    .filter((entry) => entry.id && entry.userId);
}

function readStoredPurchases() {
  if (typeof window === "undefined") {
    return currentPurchases;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? normalizePurchases(JSON.parse(stored)) : [];
  } catch {
    return [];
  }
}

function ensurePurchasesHydrated() {
  if (!hasHydratedPurchases) {
    currentPurchases = readStoredPurchases();
    hasHydratedPurchases = true;
  }

  return currentPurchases;
}

function emitPurchasesChange() {
  listeners.forEach((listener) => listener(currentPurchases));
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writePurchases(nextValue) {
  currentPurchases = normalizePurchases(nextValue);
  hasHydratedPurchases = true;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPurchases));
  }

  emitPurchasesChange();
}

function createPurchaseId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `purchase-${crypto.randomUUID()}`;
  }

  return `purchase-${Date.now()}`;
}

export function usePurchaseData(userId) {
  const [purchases, setPurchases] = useState(() => ensurePurchasesHydrated());

  useEffect(() => {
    setPurchases(ensurePurchasesHydrated());

    const unsubscribe = subscribe((value) => {
      setPurchases(value);
    });

    const handleStorage = (event) => {
      if (event.key && event.key !== STORAGE_KEY) return;
      currentPurchases = readStoredPurchases();
      hasHydratedPurchases = true;
      emitPurchasesChange();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const userPurchases = useMemo(() => {
    if (!userId) {
      return [];
    }

    return purchases
      .filter((entry) => entry.userId === userId)
      .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
  }, [purchases, userId]);

  const recordPurchase = (payload) => {
    const purchase = {
      id: createPurchaseId(),
      userId: String(payload.userId),
      customerName: String(payload.customerName || ""),
      customerEmail: String(payload.customerEmail || ""),
      subtotal: Number(payload.subtotal || 0),
      shippingFee: Number(payload.shippingFee || 0),
      total: Number(payload.total || 0),
      status: String(payload.status || "confirmed"),
      placedAt: new Date().toISOString(),
      items: Array.isArray(payload.items) ? payload.items : [],
    };

    writePurchases([purchase, ...currentPurchases]);
    return purchase;
  };

  return {
    purchases: userPurchases,
    recordPurchase,
  };
}
