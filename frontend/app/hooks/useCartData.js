import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fast-tech-cart-data";

let currentCartItems = [];
let hasHydratedCart = false;
const listeners = new Set();

function normalizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      slug: String(item?.slug || ""),
      quantity: Math.max(1, Number(item?.quantity || 1)),
    }))
    .filter((item) => item.slug);
}

function readStoredCart() {
  if (typeof window === "undefined") {
    return currentCartItems;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeCartItems(JSON.parse(stored)) : [];
  } catch {
    return [];
  }
}

function ensureCartHydrated() {
  if (!hasHydratedCart) {
    currentCartItems = readStoredCart();
    hasHydratedCart = true;
  }

  return currentCartItems;
}

function emitCartChange() {
  listeners.forEach((listener) => listener(currentCartItems));
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeCart(nextItems) {
  currentCartItems = normalizeCartItems(nextItems);
  hasHydratedCart = true;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCartItems));
  }

  emitCartChange();
}

export function useCartData() {
  const [cartItems, setCartItems] = useState(() => ensureCartHydrated());

  useEffect(() => {
    setCartItems(ensureCartHydrated());

    const unsubscribe = subscribe((value) => {
      setCartItems(value);
    });

    const handleStorage = (event) => {
      if (event.key && event.key !== STORAGE_KEY) return;
      currentCartItems = readStoredCart();
      hasHydratedCart = true;
      emitCartChange();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const addToCart = (slug) => {
    writeCart(
      currentCartItems.some((item) => item.slug === slug)
        ? currentCartItems.map((item) =>
            item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...currentCartItems, { slug, quantity: 1 }],
    );
  };

  const removeFromCart = (slug) => {
    writeCart(currentCartItems.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }

    writeCart(
      currentCartItems.map((item) => (item.slug === slug ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    writeCart([]);
  };

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return {
    cartItems,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}
