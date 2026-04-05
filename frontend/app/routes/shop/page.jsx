import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import FilterSidebar from "~/components/store/FilterSidebar";
import ProductCard from "~/components/store/ProductCard";
import ProductSkeleton from "~/components/store/ProductSkeleton";
import SectionHeading from "~/components/store/SectionHeading";
import Container from "~/components/ui/Container";
import { filterProducts } from "~/data/catalog";
import { useCatalogData } from "~/hooks/useCatalogData";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Popularity", value: "popularity" },
];

export function meta() {
  return [
    { title: "Shop | Fast Tech" },
    { name: "description", content: "Browse premium phones, laptops, and accessories." },
  ];
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { catalogData } = useCatalogData();

  const selectedBrand = searchParams.get("brand") || "";
  const selectedRange = searchParams.get("price") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "featured";

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(timer);
  }, [selectedBrand, selectedRange, selectedSort, selectedCategory]);

  const products = useMemo(
    () =>
      filterProducts(catalogData, {
        brand: selectedBrand,
        range: selectedRange,
        sort: selectedSort,
        category: selectedCategory,
      }),
    [catalogData, selectedBrand, selectedRange, selectedSort, selectedCategory],
  );

  const updateParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  return (
    <Container className="py-8 sm:py-10 md:py-14">
      <SectionHeading
        eyebrow="Listing"
        title="Premium tech, filtered with less friction"
        description="An indigo-led listing layout with sidebar filters, modern cards, and product-first spacing."
      />

      <div className="mt-8 grid gap-5 sm:gap-6 lg:mt-10 lg:grid-cols-[18rem_1fr] lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <FilterSidebar
            brands={catalogData.brands}
            selectedBrand={selectedBrand}
            selectedRange={selectedRange}
            onBrandChange={(value) => updateParam("brand", value)}
            onRangeChange={(value) => updateParam("price", value)}
            onReset={() => setSearchParams(new URLSearchParams())}
          />
        </div>

        <div>
          <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <SlidersHorizontal size={16} className="text-indigo-600" />
                <span>{products.length} products available</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-500 sm:text-xs">
                <span className="rounded-full bg-slate-100 px-3 py-1.5">Pay on delivery options</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5">WhatsApp confirmation available</span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5">Store pickup in Nairobi</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <select
                value={selectedCategory}
                onChange={(event) => updateParam("category", event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-300"
              >
                <option value="">All categories</option>
                {catalogData.categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
              <select
                value={selectedSort}
                onChange={(event) => updateParam("sort", event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
              : products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </div>
    </Container>
  );
}
