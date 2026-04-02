import {
  ChevronDown,
  Grid2x2,
  Heart,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router";
import { useCatalogData } from "~/hooks/useCatalogData";
import Container from "./Container";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "Guides", href: "/guides" },
  { title: "Deals", href: "/deals" },
];

export default function Header() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { catalogData } = useCatalogData();

  const categoryColumns = useMemo(() => {
    const items = catalogData.categories || [];
    const columnSize = Math.max(1, Math.ceil(items.length / 3));

    return [
      items.slice(0, columnSize),
      items.slice(columnSize, columnSize * 2),
      items.slice(columnSize * 2),
    ].filter((column) => column.length);
  }, [catalogData.categories]);

  const quickCollections = [
    "Phones Under KSh 10,000",
    "Phones Under KSh 20,000",
    "5G Phones",
    "Student Picks",
    "Best Battery Phones",
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center gap-4">
        <div className="md:hidden">
          <MobileMenu />
        </div>

        <div className="min-w-0 flex-1 md:flex-none">
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-[-0.02em] transition ${
                  isActive ? "text-indigo-700" : "text-slate-600 hover:text-indigo-700"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/shop"
            className="hidden rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:inline-flex"
          >
            <Heart size={18} />
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex rounded-full bg-indigo-600 p-3 text-white transition hover:bg-indigo-700"
          >
            <ShoppingCart size={18} />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[10px] font-semibold">
              2
            </span>
          </Link>
        </div>
      </Container>

      <div className="hidden border-t border-white/10 bg-slate-900 text-white md:block">
        <Container className="relative">
          <div className="flex h-16 items-center gap-8 overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => setCategoriesOpen((current) => !current)}
              className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition ${
                categoriesOpen
                  ? "bg-white text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white">
                <Grid2x2 size={16} />
              </span>
              <span className="font-display text-base font-semibold tracking-[-0.03em]">
                All Categories
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <Link to="/shop" className="font-display text-lg font-semibold text-white">
              All
            </Link>

            {catalogData.categories.map((category) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="font-display text-lg font-semibold text-white/90 transition hover:text-white"
              >
                {category.title}
              </Link>
            ))}
          </div>

          {categoriesOpen ? (
            <div className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-slate-950 text-white shadow-2xl">
              <div className="grid gap-10 px-6 py-8 lg:grid-cols-[1.15fr_0.9fr_0.9fr_1fr]">
                <div className="space-y-5">
                  <h3 className="font-display text-2xl font-semibold text-white">
                    All Categories
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {categoryColumns.flat().map((category) => (
                      <Link
                        key={category.slug}
                        to={`/shop?category=${category.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="font-display text-lg text-slate-300 transition hover:text-white"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-semibold text-white">Top Brands</h4>
                  <div className="space-y-3">
                    {catalogData.brandSpotlight.map((brand) => (
                      <Link
                        key={brand}
                        to={`/shop?brand=${encodeURIComponent(brand)}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="font-display block text-lg text-slate-300 transition hover:text-white"
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-semibold text-white">Popular Tech</h4>
                  <div className="space-y-3">
                    {catalogData.categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.slug}
                        to={`/shop?category=${category.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="font-display block text-lg text-slate-300 transition hover:text-white"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-display text-xl font-semibold text-white">Navigate To</h4>
                  <div className="space-y-3">
                    {quickCollections.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="font-display block text-left text-lg text-slate-300 transition hover:text-white"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
                      <Sparkles size={14} />
                      Admin synced
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Any category you add in the admin panel appears here automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </div>

      <Container className="pb-3 md:hidden">
        <SearchBar compact />
      </Container>
    </header>
  );
}
