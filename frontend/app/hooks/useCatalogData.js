import { useEffect, useMemo, useState } from "react";
import { defaultCatalogData } from "~/data/catalog";

const STORAGE_KEY = "fast-tech-admin-data";

function cloneDefaultCatalog() {
  return JSON.parse(JSON.stringify(defaultCatalogData));
}

function normalizeCatalogData(data) {
  return {
    ...cloneDefaultCatalog(),
    ...data,
    store: { ...cloneDefaultCatalog().store, ...(data?.store || {}) },
    categories: Array.isArray(data?.categories)
      ? data.categories
      : cloneDefaultCatalog().categories,
    brands: Array.isArray(data?.brands) ? data.brands : cloneDefaultCatalog().brands,
    brandSpotlight: Array.isArray(data?.brandSpotlight)
      ? data.brandSpotlight
      : cloneDefaultCatalog().brandSpotlight,
    guides: Array.isArray(data?.guides) ? data.guides : cloneDefaultCatalog().guides,
    products: Array.isArray(data?.products) ? data.products : cloneDefaultCatalog().products,
  };
}

let currentCatalogData = cloneDefaultCatalog();
let hasHydratedCatalog = false;
const listeners = new Set();

function emitCatalogChange() {
  listeners.forEach((listener) => listener(currentCatalogData));
}

function readStoredCatalog() {
  if (typeof window === "undefined") {
    return currentCatalogData;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? normalizeCatalogData(JSON.parse(stored)) : cloneDefaultCatalog();
  } catch {
    return cloneDefaultCatalog();
  }
}

function ensureCatalogHydrated() {
  if (!hasHydratedCatalog) {
    currentCatalogData = readStoredCatalog();
    hasHydratedCatalog = true;
  }

  return currentCatalogData;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeCatalogData(nextValue) {
  currentCatalogData = normalizeCatalogData(nextValue);
  hasHydratedCatalog = true;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentCatalogData));
  }

  emitCatalogChange();
}

function resetCatalogStore() {
  currentCatalogData = cloneDefaultCatalog();
  hasHydratedCatalog = true;

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  emitCatalogChange();
}

export function useCatalogData() {
  const [catalogData, setCatalogDataState] = useState(() => ensureCatalogHydrated());
  const [hydrated, setHydrated] = useState(hasHydratedCatalog);

  useEffect(() => {
    const nextValue = ensureCatalogHydrated();
    setCatalogDataState(nextValue);
    setHydrated(true);

    const unsubscribe = subscribe((value) => {
      setCatalogDataState(value);
      setHydrated(true);
    });

    const handleStorage = (event) => {
      if (event.key && event.key !== STORAGE_KEY) return;
      currentCatalogData = readStoredCatalog();
      hasHydratedCatalog = true;
      emitCatalogChange();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateCatalogData = (nextValue) => {
    const resolvedValue =
      typeof nextValue === "function" ? nextValue(currentCatalogData) : nextValue;
    writeCatalogData(resolvedValue);
  };

  return useMemo(
    () => ({
      catalogData,
      hydrated,
      setCatalogData: updateCatalogData,
      resetCatalogData: resetCatalogStore,
    }),
    [catalogData, hydrated],
  );
}
