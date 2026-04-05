import { Search, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useCatalogData } from "~/hooks/useCatalogData";

export default function SearchBar({ compact = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { catalogData } = useCatalogData();

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return {
        products: catalogData.products.slice(0, 4),
        guides: catalogData.guides.slice(0, 2),
      };
    }

    return {
      products: catalogData.products.filter((item) =>
        `${item.name} ${item.brand} ${item.category}`.toLowerCase().includes(normalizedQuery),
      ),
      guides: catalogData.guides.filter((item) =>
        `${item.title} ${item.excerpt}`.toLowerCase().includes(normalizedQuery),
      ),
    };
  }, [catalogData.guides, catalogData.products, query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex w-full items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 text-left text-slate-500 transition hover:border-indigo-200 hover:bg-white ${
          compact ? "h-12" : "h-12"
        }`}
      >
        <Search size={18} className="text-slate-400" />
        <span className="flex-1 truncate text-sm">
          Search for phones, laptops, accessories...
        </span>
        <span className="hidden rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-400 lg:inline-flex">
          Ctrl K
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/45 px-4 pt-16 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/20 bg-white shadow-[0_30px_120px_-32px_rgba(15,23,42,0.45)]">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <Search size={18} className="text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, brands, or buying guides"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
                  <Sparkles size={14} />
                  Products
                </div>
                <div className="mt-4 space-y-3">
                  {results.products.length ? (
                    results.products.slice(0, 4).map((item) => (
                      <Link
                        key={item.slug}
                        to={`/shop/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 transition hover:border-indigo-200 hover:bg-indigo-50"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {`${item.brand} - ${item.category}`}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-indigo-700">View</span>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
                      No products match that search yet.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Buying Guides
                </p>
                <div className="mt-4 space-y-3">
                  {results.guides.length ? (
                    results.guides.map((item) => (
                      <Link
                        key={item.slug}
                        to="/guides"
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-indigo-200 hover:bg-white"
                      >
                        <p className="font-medium text-slate-900">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{item.excerpt}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
                      No guides matched your search.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
