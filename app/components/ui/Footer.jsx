import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router";
import { useCatalogData } from "~/hooks/useCatalogData";
import Container from "./Container";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia.jsx";

export default function Footer() {
  const { catalogData } = useCatalogData();
  const { store, categories } = catalogData;

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-950 text-slate-200">
      <Container className="grid gap-8 border-b border-white/10 py-10 md:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <Truck className="text-indigo-400" />
          <h3 className="mt-4 text-lg font-semibold text-white">Fast delivery</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Same-day delivery across select Nairobi zones and smooth nationwide dispatch.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <ShieldCheck className="text-indigo-400" />
          <h3 className="mt-4 text-lg font-semibold text-white">Warranty support</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Premium after-sales support for setup, warranty questions, and product guidance.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 text-white">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-100">
            Need recommendations?
          </p>
          <h3 className="mt-4 text-2xl font-semibold">Talk to our team before you buy.</h3>
          <a
            href={`mailto:${store.supportEmail}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700"
          >
            Contact support
            <ArrowRight size={16} />
          </a>
        </div>
      </Container>

      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <Logo textClassName="text-white" />
          <p className="max-w-md text-sm leading-7 text-slate-400">
            A premium ecommerce front built for discovery, comparison, and confident device buying.
          </p>
          <div className="space-y-2 text-sm text-slate-400">
            <p>{store.location}</p>
            <p>{store.supportPhone}</p>
            <p>{store.supportEmail}</p>
          </div>
          <SocialMedia />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
            Explore
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link to="/shop" className="block transition hover:text-white">
              Shop all products
            </Link>
            <Link to="/guides" className="block transition hover:text-white">
              Buying guides
            </Link>
            <Link to="/deals" className="block transition hover:text-white">
              Latest deals
            </Link>
            <Link to="/cart" className="block transition hover:text-white">
              Cart
            </Link>
            <Link to="/admin" className="block transition hover:text-white">
              Admin panel
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
            Categories
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="block transition hover:text-white"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <Container className="border-t border-white/10 py-5 text-xs text-slate-500">
        Premium tech shopping with an indigo-first experience.
      </Container>
    </footer>
  );
}
