import { ShoppingCart, Smartphone } from "lucide-react";
import { Link } from "react-router";
import { formatPrice } from "~/data/catalog";
import { useCartData } from "~/hooks/useCartData";

function ProductImage({ product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-contain transition duration-300 group-hover:scale-105"
      />
    );
  }

  return (
    <div
      className={`flex  w-full items-center justify-center rounded-xl bg-gradient-to-br ${product.accent}`}
    >
      <div className="flex h-32 w-16 items-center justify-center rounded-[1.35rem] border border-slate-800 bg-gradient-to-b from-slate-800 to-slate-950 shadow-xl">
        <div className="h-2 w-2 rounded-full bg-slate-600" />
      </div>
      <div className="relative -ml-3 flex h-36 w-20 items-center justify-center rounded-[1.6rem] border-[4px] border-slate-900 bg-gradient-to-br from-white via-slate-100 to-sky-100 shadow-2xl">
        <div className="absolute top-2 h-2 w-12 rounded-full bg-slate-900" />
        <Smartphone size={2} className="text-slate-900" />
      </div>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCartData();

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:shadow-lg">
      <div className="relative bg-slate-50 px-3 py-4">
        <div className="mx-auto max-w-[11rem]">
          <ProductImage product={product} />
        </div>
        <div className="absolute inset-0 bg-black/5 opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="space-y-1.5 p-3">
        <h2 className="font-display line-clamp-2 text-base font-semibold leading-tight text-slate-900">
          {product.name}
        </h2>

        <p className="text-sm text-slate-500">{product.brand}</p>

        <p className="font-display text-base font-semibold text-indigo-700">
          {formatPrice(product.price)}
        </p>

        <div className="flex items-center gap-2 pt-1.5">
          <Link
            to={`/shop/${product.slug}`}
            className="flex-1 rounded-lg border border-indigo-600 py-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-600 transition hover:bg-indigo-50"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={() => addToCart(product.slug)}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center justify-center rounded-lg bg-indigo-600 px-2.5 py-1.5 text-white transition hover:bg-indigo-700"
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
