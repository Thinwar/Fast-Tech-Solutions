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

export function useCatalogData() {
  const [catalogData, setCatalogData] = useState(() => cloneDefaultCatalog());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCatalogData(normalizeCatalogData(JSON.parse(stored)));
      }
    } catch {}
    setHydrated(true);
  }, []);

  const updateCatalogData = (nextValue) => {
    setCatalogData((current) => {
      const resolvedValue =
        typeof nextValue === "function" ? nextValue(current) : nextValue;
      const normalizedValue = normalizeCatalogData(resolvedValue);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedValue));
      }
      return normalizedValue;
    });
  };

  const resetCatalogData = () => {
    const nextValue = cloneDefaultCatalog();
    setCatalogData(nextValue);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return useMemo(
    () => ({
      catalogData,
      hydrated,
      setCatalogData: updateCatalogData,
      resetCatalogData,
    }),
    [catalogData, hydrated],
  );
}
