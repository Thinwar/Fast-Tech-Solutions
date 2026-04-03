import { priceRanges } from "~/data/catalog";

export default function FilterSidebar({
  brands,
  selectedBrand,
  selectedRange,
  onBrandChange,
  onRangeChange,
  onReset,
}) {
  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.22)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-600">
            Filters
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Narrow your picks</h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-slate-500 transition hover:text-indigo-700"
        >
          Reset
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Brand
        </h3>
        <div className="mt-4 space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === brand}
                onChange={() => onBrandChange(brand)}
                className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Price
        </h3>
        <div className="mt-4 space-y-3">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="radio"
                name="price"
                checked={selectedRange === range.value}
                onChange={() => onRangeChange(range.value)}
                className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
