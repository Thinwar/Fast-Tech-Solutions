import { Laptop, Smartphone, Watch } from "lucide-react";

const iconMap = {
  phones: Smartphone,
  laptops: Laptop,
  accessories: Watch,
};

export default function ProductVisual({ product, compact = false }) {
  const Icon = iconMap[product.category] || Smartphone;

  if (compact) {
    return (
      <div className="relative h-72 overflow-hidden rounded-t-[28px] border-b border-slate-100 bg-white">
        {product.badge ? (
          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <span className="rounded-lg bg-red-500 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              {product.badge}
            </span>
            {product.stock === "Low Stock" ? (
              <span className="rounded-lg bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Hot
              </span>
            ) : null}
          </div>
        ) : null}

        <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-br ${product.accent} opacity-10`} />
        <div className="relative flex h-full items-center justify-center p-8">
          <div className="absolute h-52 w-52 rounded-full bg-slate-100 blur-2xl" />
          <div className="relative flex items-end gap-3">
            <div className="flex h-52 w-24 items-center justify-center rounded-[1.8rem] border border-slate-800 bg-gradient-to-b from-slate-800 to-slate-950 shadow-xl">
              <div className="h-2 w-2 rounded-full bg-slate-600" />
            </div>
            <div className="relative flex h-56 w-28 items-center justify-center rounded-[2rem] border-[5px] border-slate-900 bg-gradient-to-br from-white via-slate-100 to-sky-100 shadow-2xl">
              <div className="absolute top-2 h-2 w-12 rounded-full bg-slate-900" />
              <div className="flex flex-col items-center justify-center text-center">
                <Icon size={30} className="text-slate-900" />
                <span className="mt-3 px-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {product.brand}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-[28rem] overflow-hidden rounded-[28px] bg-gradient-to-br ${product.accent}`}>
      <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="relative flex h-full flex-col justify-between p-6 text-white">
        <div className="flex items-start justify-between">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em]">
            {product.brand}
          </span>
          <span className="rounded-full border border-white/15 bg-white/10 p-3">
            <Icon size={24} />
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                {product.category}
              </p>
              <h3 className="mt-2 text-4xl font-semibold">{product.name}</h3>
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 p-4">
              <div className="h-12 w-12 rounded-full border border-white/20 bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.gallery.slice(0, 3).map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
