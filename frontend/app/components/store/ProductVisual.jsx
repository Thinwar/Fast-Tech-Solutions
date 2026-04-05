import { Laptop, Smartphone, Watch } from "lucide-react";

const iconMap = {
  phones: Smartphone,
  laptops: Laptop,
  accessories: Watch,
};

export default function ProductVisual({ product, compact = false, activeIndex = 0 }) {
  const Icon = iconMap[product.category] || Smartphone;
  const activeView = product.gallery?.[activeIndex] || product.gallery?.[0];

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
    <div className="relative min-h-[26rem] overflow-hidden rounded-[28px] bg-[#202a39] shadow-[0_28px_70px_-34px_rgba(15,23,42,0.65)] sm:min-h-[30rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)]" />
      <div className="relative flex h-full min-h-[26rem] flex-col justify-between p-5 text-white sm:min-h-[30rem] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/80">
              {product.brand}
            </span>
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
              {product.category}
            </p>
          </div>

          <span className="inline-flex rounded-full border border-white/12 bg-white/8 p-3 text-white/80">
            <Icon size={20} />
          </span>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4 py-4 sm:px-8 sm:py-6">
          <div className="absolute h-56 w-56 rounded-full bg-white/8 blur-3xl sm:h-72 sm:w-72" />
          {product.image ? (
            <img
              src={product.image}
              alt={`${product.name} ${activeView || "product view"}`}
              className="relative z-10 max-h-[20rem] w-full max-w-[28rem] object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.45)] sm:max-h-[24rem]"
            />
          ) : (
            <div className="relative z-10 flex items-end gap-3">
              <div className="flex h-56 w-28 items-center justify-center rounded-[2rem] border border-slate-700 bg-gradient-to-b from-slate-700 to-slate-900 shadow-xl">
                <div className="h-2 w-2 rounded-full bg-slate-500" />
              </div>
              <div className="relative flex h-64 w-36 items-center justify-center rounded-[2.2rem] border-[5px] border-slate-900 bg-gradient-to-br from-white via-slate-100 to-sky-100 shadow-2xl">
                <div className="absolute top-2 h-2 w-14 rounded-full bg-slate-900" />
                <div className="flex flex-col items-center justify-center text-center">
                  <Icon size={34} className="text-slate-900" />
                  <span className="mt-3 px-3 text-3xl font-semibold tracking-tight text-slate-950">
                    {product.brand}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{product.name}</h3>
          <div className="grid grid-cols-3 gap-2">
            {product.gallery.slice(0, 3).map((item, index) => (
              <div
                key={item}
                className={`rounded-2xl border px-3 py-2 text-xs transition ${
                  index === activeIndex
                    ? "border-white/28 bg-white/14 text-white"
                    : "border-white/10 bg-white/6 text-white/70"
                }`}
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
