import { ShieldCheck, Star, Truck } from "lucide-react";
import { Link, useParams } from "react-router";
import ProductCard from "~/components/store/ProductCard";
import ProductGallery from "~/components/store/ProductGallery";
import SectionHeading from "~/components/store/SectionHeading";
import Container from "~/components/ui/Container";
import { useCartData } from "~/hooks/useCartData";
import {
  formatPrice,
  getProductBySlug,
  getRelatedProducts,
} from "~/data/catalog";
import { useCatalogData } from "~/hooks/useCatalogData";

export function meta() {
  return [
    { title: "Product | Fast Tech" },
    { name: "description", content: "View premium product details, specs, delivery, and warranty information." },
  ];
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { catalogData } = useCatalogData();
  const { addToCart } = useCartData();
  const product = getProductBySlug(catalogData, slug);
  const relatedProducts = getRelatedProducts(catalogData, slug);
  const { store } = catalogData;

  if (!product) {
    return (
      <Container className="py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">Product not found</h1>
          <p className="mt-3 text-slate-600">
            This item may have been removed or updated from the admin panel.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 sm:py-10 md:py-14">
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <ProductGallery product={product} />

        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:rounded-[28px] sm:p-6 md:rounded-[32px] md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-600">
            {product.brand}
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {product.rating} rating
            </span>
            <span>{product.reviews} verified reviews</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
              {product.stock}
            </span>
          </div>

          <div className="mt-8">
            <p className="text-2xl font-semibold text-slate-950 sm:text-3xl">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          </div>

          <p className="mt-8 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {product.description}
          </p>

          <div className="mt-8 rounded-[22px] bg-slate-50 p-4 sm:rounded-[28px] sm:p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Key specs
            </p>
            <div className="mt-4 grid gap-3">
              {product.specs.map((spec) => (
                <div key={spec} className="rounded-2xl border border-white bg-white px-4 py-3 text-sm text-slate-700">
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(product.slug)}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Add to cart
            </button>
            <a
              href={`https://wa.me/${store.whatsappPhone}?text=Hi%20${encodeURIComponent(store.name)},%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Order on WhatsApp
            </a>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
            >
              Continue shopping
            </Link>
          </div>

          <div className="mt-8 space-y-4 rounded-[22px] border border-slate-200 p-4 text-sm text-slate-600 sm:rounded-[28px] sm:p-5">
            <div className="flex items-start gap-3">
              <Truck size={18} className="mt-0.5 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900">Delivery</p>
                <p className="mt-1">{product.delivery}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="mt-0.5 text-indigo-600" />
              <div>
                <p className="font-semibold text-slate-900">Warranty</p>
                <p className="mt-1">{product.warranty}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700">
              Visit {store.location} or call {store.supportPhone} if you want direct purchase confirmation before payment.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <SectionHeading
          eyebrow="Related"
          title="You may also like"
          description="More products chosen to feel consistent with the premium category and brand direction."
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </div>
    </Container>
  );
}
