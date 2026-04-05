import { ChevronRight, Laptop, Smartphone, Sparkles, Watch } from "lucide-react";
import { Link } from "react-router";
import Container from "~/components/ui/Container";
import ProductCard from "~/components/store/ProductCard";
import ProductSkeleton from "~/components/store/ProductSkeleton";
import SectionHeading from "~/components/store/SectionHeading";
import { getFeaturedProducts } from "~/data/catalog";
import { useCatalogData } from "~/hooks/useCatalogData";
import { useEffect, useState } from "react";

const categoryIcons = {
  phones: Smartphone,
  smartphones: Smartphone,
  tablets: Smartphone,
  laptops: Laptop,
  accessories: Watch,
  watches: Watch,
  audio: Watch,
};

export function meta() {
  return [
    { title: "Fast Tech | Premium Indigo Ecommerce" },
    {
      name: "description",
      content: "Premium indigo ecommerce experience for phones, laptops, and accessories.",
    },
  ];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { catalogData } = useCatalogData();
  const featuredProducts = getFeaturedProducts(catalogData);
  const categories = catalogData.categories;
  const brandSpotlight = catalogData.brandSpotlight;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-950 text-white">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <Container className="relative grid gap-10 py-12 sm:py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-indigo-100">
              <Sparkles size={14} />
              New premium storefront
            </div>
            <h1 className="font-display text-balanced mt-6 text-4xl font-semibold leading-[0.96] sm:text-5xl md:mt-8 md:text-6xl lg:text-7xl">
              Tech that feels premium before it even ships.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-indigo-50/88 sm:text-lg sm:leading-8">
              Discover flagship phones, clean laptop setups, and accessory upgrades in an indigo-first shopping experience inspired by modern device stores.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-indigo-50/85">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                Same-day Nairobi delivery
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                WhatsApp ordering available
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
                Official warranty support
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Shop collection
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/guides"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore buying guides
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <div
                key={product.slug}
                className={`rounded-[28px] border border-white/10 bg-white/10 p-4 backdrop-blur sm:rounded-[32px] sm:p-5 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-indigo-100">
                  {product.brand}
                </p>
                <h2 className="font-display mt-3 text-xl font-semibold leading-tight sm:text-2xl">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-indigo-50/80">{product.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-14 md:py-16">
        <SectionHeading
          eyebrow="Categories"
          title="Shop by category"
          description="A clean, card-based entry point into the main product families customers browse first."
        />
        <div className="mt-10 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug] || Smartphone;
            return (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_24px_70px_-30px_rgba(79,70,229,0.35)]"
              >
                <div className="inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-700">
                  <Icon size={22} />
                </div>
                <h3 className="font-display mt-6 text-2xl font-semibold leading-tight text-slate-950 group-hover:text-indigo-700">
                  {category.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="py-4">
        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-r from-white to-indigo-50 p-5 sm:rounded-[32px] sm:p-6 md:rounded-[36px] md:p-8">
          <SectionHeading
            eyebrow="Curated Picks"
            title="Shop by lifestyle, not just specs"
            description="A more memorable storefront starts by helping buyers see themselves in the product, not just compare numbers."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {[
              {
                title: "Student picks",
                copy: "Portable laptops, reliable phones, and accessories that fit campus life and tighter budgets.",
              },
              {
                title: "Gaming setup",
                copy: "Performance-focused devices with strong displays, clean thermals, and room to push harder.",
              },
              {
                title: "Creator desk",
                copy: "Premium laptops, audio gear, and accessories for editing, multitasking, and focused workflows.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white bg-white p-5 shadow-[0_18px_48px_-30px_rgba(15,23,42,0.2)] sm:rounded-[28px] sm:p-6"
              >
                <h3 className="font-display text-xl font-semibold leading-tight text-slate-950 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="py-8 sm:py-10">
        <SectionHeading
          eyebrow="Featured"
          title="Flagship picks with a softer, premium shopping flow"
          description="High-demand devices surfaced in a calm layout with generous spacing, visual breathing room, and clear pricing."
          action={
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700"
            >
              View all products
              <ChevronRight size={16} />
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <ProductSkeleton key={index} />)
            : featuredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
        </div>
      </Container>

      <Container className="py-12 sm:py-14 md:py-16">
        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:rounded-[32px] sm:p-7 md:rounded-[36px] md:p-10">
          <SectionHeading
            eyebrow="Brands"
            title="Trusted premium brands"
            description="A simple brand strip that feels curated instead of crowded."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
            {brandSpotlight.map((brand) => (
              <div
                key={brand}
                className="flex h-16 items-center justify-center rounded-[20px] border border-white bg-white px-3 text-center text-xs font-semibold tracking-[0.18em] text-slate-500 shadow-sm sm:h-20 sm:rounded-[24px] sm:text-sm sm:tracking-[0.22em]"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
