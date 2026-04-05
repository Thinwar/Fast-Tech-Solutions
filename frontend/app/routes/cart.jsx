import { useAuth, useUser } from "@clerk/react-router";
import {
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import Container from "~/components/ui/Container";
import { formatPrice, getProductBySlug } from "~/data/catalog";
import { useCartData } from "~/hooks/useCartData";
import { useCatalogData } from "~/hooks/useCatalogData";
import { usePurchaseData } from "~/hooks/usePurchaseData";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export default function CartPage() {
  const navigate = useNavigate();
  const { catalogData } = useCatalogData();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCartData();
  const auth = clerkEnabled ? useAuth() : null;
  const userState = clerkEnabled ? useUser() : null;
  const userId = auth?.userId || "";
  const { recordPurchase } = usePurchaseData(userId);

  const items = cartItems
    .map((item) => {
      const product = getProductBySlug(catalogData, item.slug);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 1500;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    if (!items.length) {
      return;
    }

    if (clerkEnabled && !auth?.isSignedIn) {
      navigate("/sign-in");
      return;
    }

    if (!userId) {
      return;
    }

    const purchase = recordPurchase({
      userId,
      customerName: userState?.user?.fullName || userState?.user?.firstName || "Fast Tech customer",
      customerEmail: userState?.user?.primaryEmailAddress?.emailAddress || "",
      subtotal,
      shippingFee,
      total,
      status: "confirmed",
      items: items.map((item) => ({
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    });

    clearCart();
    navigate(`/account/orders?recent=${encodeURIComponent(purchase.id)}`);
  };

  if (!items.length) {
    return (
      <Container className="py-10 md:py-14">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <ShoppingBag size={28} />
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-slate-950">Your cart is empty</h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Start with a product you love, then come back here to review quantities and checkout details.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

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
                className="flex flex-col gap-4 rounded-[24px] border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.brand} · {item.stock}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center rounded-full border border-slate-200">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="px-3 py-2 text-slate-600 transition hover:text-indigo-700"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="px-3 py-2 text-slate-600 transition hover:text-indigo-700"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="text-lg font-semibold text-slate-950">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.slug)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
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
                <span>{formatPrice(shippingFee)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-950">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!clerkEnabled}
              className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition ${
                clerkEnabled
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              <CreditCard size={18} />
              {!clerkEnabled
                ? "Enable Clerk to checkout"
                : !auth?.isSignedIn
                  ? "Sign in to checkout"
                  : "Complete checkout"}
            </button>
            {clerkEnabled ? (
              <p className="mt-3 text-center text-xs text-slate-500">
                Signed-in checkouts are saved to your order history automatically.
              </p>
            ) : (
              <p className="mt-3 text-center text-xs text-slate-500">
                Add `VITE_CLERK_PUBLISHABLE_KEY` to enable signed-in checkout and order tracking.
              </p>
            )}
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
            >
              Clear cart
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
