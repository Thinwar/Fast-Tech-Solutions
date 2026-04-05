import { SignIn } from "@clerk/react-router";
import { Link } from "react-router";
import Container from "~/components/ui/Container";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export function meta() {
  return [
    { title: "Sign In | Fast Tech" },
    { name: "description", content: "Sign in to track orders and review your purchases." },
  ];
}

export default function SignInPage() {
  if (!clerkEnabled) {
    return (
      <Container className="py-12 md:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">Authentication not configured</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Add `VITE_CLERK_PUBLISHABLE_KEY` to enable sign in, account access, and order tracking.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-[0_30px_80px_-34px_rgba(15,23,42,0.7)] md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-indigo-300">
            Account
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Sign in to track every order.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
            Save purchases to your account, revisit past orders, and keep your premium picks tied to one identity across devices.
          </p>
        </div>

        <div className="flex justify-center">
          <SignIn fallbackRedirectUrl="/account/orders" signUpUrl="/sign-up" />
        </div>
      </div>
    </Container>
  );
}
