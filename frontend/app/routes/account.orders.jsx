import { useAuth, useUser } from "@clerk/react-router";
import { useEffect, useState } from "react";
import { Package, ShieldCheck, Truck } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import Container from "~/components/ui/Container";
import { formatPrice } from "~/data/catalog";
import { getMyOrders } from "~/hooks/useOrderApi";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export function meta() {
  return [
    { title: "My Orders | Fast Tech" },
    {
      name: "description",
      content: "Track your purchases and review recent orders.",
    },
  ];
}

export default function AccountOrdersPage() {
  const auth = useAuth();
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const recentOrderId = searchParams.get("recent");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.isSignedIn) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = await auth.getToken();
        const data = await getMyOrders(token);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to load orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth]);

  // 🔒 Clerk not configured
  if (!clerkEnabled) {
    return (
      <Container className="py-12 md:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">
            Order tracking needs Clerk
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Add `VITE_CLERK_PUBLISHABLE_KEY` to enable customer accounts and
            order history.
          </p>
        </div>
      </Container>
    );
  }

  // 🔐 Not signed in
  if (!auth.isSignedIn) {
    return (
      <Container className="py-12 md:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">
            Sign in to view your orders
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Your purchases and future order updates will appear here once you
            sign in.
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
                <h1 className="text-4xl font-semibold text-slate-950">
                  Track your purchases
                </h1>
                <p className="mt-2 text-slate-600">
                  Every checkout made while signed in appears here.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700"
              >
                Continue shopping
              </Link>
            </div>

            {/* 🔄 Loading */}
            {loading ? (
              <div className="mt-8 p-8 text-center">
                <p className="text-lg font-semibold text-slate-950">
                  Loading your orders...
                </p>
              </div>
            ) : !orders.length ? (
              /* 📦 Empty */
              <div className="mt-8 p-8 text-center">
                <Package className="mx-auto text-indigo-600" size={30} />
                <h2 className="mt-4 text-2xl font-semibold">No orders yet</h2>
              </div>
            ) : (
              /* ✅ Orders list */
              <div className="mt-8 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`rounded-[24px] border p-5 ${
                      order.id === recentOrderId
                        ? "border-indigo-200 bg-indigo-50"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Order ID</p>
                        <p className="font-semibold">{order.id}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(order.total)}
                        </p>
                        <p className="text-sm text-slate-500">{order.status}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.slug}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="p-6 border rounded-[32px] bg-white">
            <h2 className="text-xl font-semibold">Account</h2>
            <p className="mt-2">{user?.fullName}</p>
            <p className="text-sm text-slate-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

          <div className="p-6 border rounded-[32px] bg-slate-50 text-sm">
            <div className="flex items-center gap-2">
              <Truck size={16} /> Track orders
            </div>
            <div className="flex items-center gap-2 mt-2">
              <ShieldCheck size={16} /> Secure purchases
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
