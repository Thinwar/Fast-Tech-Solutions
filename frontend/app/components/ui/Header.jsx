import { useAuth } from "@clerk/react-router";
import {
  ChevronDown,
  Grid2x2,
  Heart,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { useCatalogData } from "~/hooks/useCatalogData";
import { useCartData } from "~/hooks/useCartData";
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
const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export default function Header() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { catalogData } = useCatalogData();
  const { itemCount } = useCartData();
  const auth = clerkEnabled ? useAuth() : null;
  const megaMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!categoriesOpen || typeof window === "undefined") {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setCategoriesOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [categoriesOpen]);

  useEffect(() => {
    if (!categoriesOpen || typeof window === "undefined") {
      return undefined;
    }

    const closeOnScroll = () => setCategoriesOpen(false);

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [categoriesOpen]);

  useEffect(() => {
    if (!categoriesOpen || typeof document === "undefined") {
      return undefined;
    }

    const closeOnPointerDown = (event) => {
      if (!megaMenuRef.current?.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnPointerDown);
    return () => document.removeEventListener("mousedown", closeOnPointerDown);
  }, [categoriesOpen]);

  useEffect(() => {
    setCategoriesOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!categoriesOpen || typeof window === "undefined") {
      return undefined;
    }

    const closeOnResize = () => {
      if (window.innerWidth < 768) {
        setCategoriesOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [categoriesOpen]);

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
    <header className="sticky top-0 z-[90] isolate overflow-visible border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-2.5 sm:h-[4.5rem] sm:gap-3 md:h-20 md:gap-4">
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
          {clerkEnabled ? (
            <>
              {!auth?.isSignedIn ? (
                <Link
                  to="/sign-in"
                  className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 lg:inline-flex"
                >
                  Sign in
                </Link>
              ) : null}
              {auth?.isSignedIn ? (
                <Link
                  to="/account/orders"
                  className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700 lg:inline-flex"
                >
                  My orders
                </Link>
              ) : null}
            </>
          ) : null}
          <Link
            to="/shop"
            className="hidden rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:inline-flex"
          >
            <Heart size={18} />
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex rounded-full bg-indigo-600 p-2.5 text-white transition hover:bg-indigo-700 sm:p-3"
          >
            <ShoppingCart size={17} />
            {itemCount ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1 text-[10px] font-semibold">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>

      <div className="relative z-20 hidden overflow-visible border-t border-white/10 bg-slate-900 text-white md:block">
        <Container className="relative overflow-visible">
          <div className="flex h-16 items-center gap-8 overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={() => setCategoriesOpen((current) => !current)}
              aria-expanded={categoriesOpen}
              aria-controls="desktop-categories-menu"
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
            <>
              <button
                type="button"
                aria-label="Close categories menu"
                onClick={() => setCategoriesOpen(false)}
                className="fixed inset-x-0 bottom-0 top-36 z-[100] bg-slate-950/10 backdrop-blur-[1px]"
              />

              <div
                id="desktop-categories-menu"
                ref={megaMenuRef}
                className="fixed left-1/2 top-36 z-[110] max-h-[calc(100vh-10rem)] w-[min(80rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950 text-white shadow-[0_32px_90px_-28px_rgba(2,6,23,0.72)]"
              >
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
            </>
          ) : null}
        </Container>
      </div>

      <Container className="border-t border-slate-200/70 py-3 md:hidden">
        <SearchBar compact />
      </Container>
    </header>
  );
}
