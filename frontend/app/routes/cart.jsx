import { CreditCard, ShieldCheck, Truck } from "lucide-react";
import Container from "~/components/ui/Container";
import { formatPrice, getFeaturedProducts } from "~/data/catalog";
import { useCatalogData } from "~/hooks/useCatalogData";

export default function CartPage() {
  const { catalogData } = useCatalogData();
  const items = getFeaturedProducts(catalogData).slice(0, 2);
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container className="py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-600">
            Cart
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Your premium picks</h1>
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.slug}
                className="flex items-center justify-between rounded-[24px] border border-slate-200 p-4"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.brand}</p>
                </div>
                <p className="text-lg font-semibold text-slate-950">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Order summary</h2>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{formatPrice(1500)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-950">
              <span>Total</span>
              <span>{formatPrice(subtotal + 1500)}</span>
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              <CreditCard size={18} />
              Proceed to checkout
            </button>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-indigo-600" />
              Fast delivery options
            </div>
            <div className="mt-3 flex items-center gap-3">
              <ShieldCheck size={18} className="text-indigo-600" />
              Warranty support included
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
