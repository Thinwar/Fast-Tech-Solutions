import { ShoppingCart, Smartphone } from "lucide-react";
import { Link } from "react-router";
import { formatPrice } from "~/data/catalog";

function ProductImage({ product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full object-contain transition duration-300 group-hover:scale-105"
      />
    );
  }

  return (
    <div className={`flex h-44 w-full items-center justify-center rounded-xl bg-gradient-to-br ${product.accent}`}>
      <div className="flex h-36 w-20 items-center justify-center rounded-[1.5rem] border border-slate-800 bg-gradient-to-b from-slate-800 to-slate-950 shadow-xl">
        <div className="h-2 w-2 rounded-full bg-slate-600" />
      </div>
      <div className="relative -ml-4 flex h-40 w-24 items-center justify-center rounded-[1.8rem] border-[4px] border-slate-900 bg-gradient-to-br from-white via-slate-100 to-sky-100 shadow-2xl">
        <div className="absolute top-2 h-2 w-12 rounded-full bg-slate-900" />
        <Smartphone size={26} className="text-slate-900" />
      </div>
    </div>
  );
}

export default function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:shadow-lg">
      <div className="relative bg-gray-100 p-4">
        <ProductImage product={product} />
        <div className="absolute inset-0 bg-black/5 opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="space-y-2 p-3.5">
        <h2 className="font-display line-clamp-2 text-lg font-semibold leading-tight text-slate-900">
          {product.name}
        </h2>

        <p className="text-sm font-medium text-slate-500">{product.brand}</p>

        <p className="font-display text-lg font-semibold text-indigo-700">
          {formatPrice(product.price)}
        </p>

        <div className="flex items-center gap-2 pt-2">
          <Link
            to={`/shop/${product.slug}`}
            className="flex-1 rounded-lg border border-indigo-600 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600 transition hover:bg-indigo-50"
          >
            View Details
          </Link>

          <button className="flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-white transition hover:bg-indigo-700">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
