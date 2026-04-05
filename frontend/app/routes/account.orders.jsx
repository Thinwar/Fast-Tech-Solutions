import { useAuth, useUser } from "@clerk/react-router";
import { Package, ShieldCheck, Truck } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Container from "~/components/ui/Container";
import { formatPrice } from "~/data/catalog";
import { usePurchaseData } from "~/hooks/usePurchaseData";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export function meta() {
  return [
    { title: "My Orders | Fast Tech" },
    { name: "description", content: "Track your purchases and review recent orders." },
  ];
}

export default function AccountOrdersPage() {
  if (!clerkEnabled) {
    return (
      <Container className="py-12 md:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">Order tracking needs Clerk</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Add `VITE_CLERK_PUBLISHABLE_KEY` to enable customer accounts and order history.
          </p>
        </div>
      </Container>
    );
  }

  const auth = useAuth();
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const recentOrderId = searchParams.get("recent");
  const { purchases } = usePurchaseData(user?.id);

  if (!auth.isSignedIn) {
    return (
      <Container className="py-12 md:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">Sign in to view your orders</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Your purchases and future order updates will appear here once you sign in.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/sign-in"
              className="inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="inline-flex rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Create account
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-600">
              My Orders
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
                  Track your purchases
                </h1>
                <p className="mt-2 text-slate-600">
                  Every checkout made while signed in appears here for easy review.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
              >
                Continue shopping
              </Link>
            </div>

            {!purchases.length ? (
              <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Package size={24} />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  No tracked purchases yet
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-slate-600">
                  Complete a checkout while signed in and your order history will start appearing here automatically.
                </p>
                <Link
                  to="/shop"
                  className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className={`rounded-[24px] border p-5 shadow-sm transition ${
                      purchase.id === recentOrderId
                        ? "border-indigo-200 bg-indigo-50/40"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Order ID
                        </p>
                        <p className="mt-2 text-lg font-semibold text-slate-950">
                          {purchase.id}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Placed {new Date(purchase.placedAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                          {purchase.status}
                        </span>
                        <p className="mt-3 text-2xl font-semibold text-slate-950">
                          {formatPrice(purchase.total)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {purchase.items.map((item) => (
                        <div
                          key={`${purchase.id}-${item.slug}`}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-950">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.brand} · Qty {item.quantity}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-semibold text-slate-950">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Account details</h2>
            <p className="mt-4 text-sm text-slate-500">Signed in as</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">
              {user?.fullName || user?.firstName || "Fast Tech customer"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-indigo-600" />
              Track recent checkouts in one place
            </div>
            <div className="mt-3 flex items-center gap-3">
              <ShieldCheck size={18} className="text-indigo-600" />
              Purchases stay tied to your account
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
