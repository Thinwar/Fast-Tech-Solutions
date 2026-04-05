import { SignUp } from "@clerk/react-router";
import { Link } from "react-router";
import Container from "~/components/ui/Container";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export function meta() {
  return [
    { title: "Create Account | Fast Tech" },
    { name: "description", content: "Create an account to track orders and purchases." },
  ];
}

export default function SignUpPage() {
  if (!clerkEnabled) {
    return (
      <Container className="py-12 md:py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">Authentication not configured</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Add `VITE_CLERK_PUBLISHABLE_KEY` to enable account creation and order tracking.
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
        <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-indigo-600">
            Join Fast Tech
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Create an account for purchase history and tracking.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            A signed-in account keeps every checkout, purchase summary, and future order update attached to you automatically.
          </p>
        </div>

        <div className="flex justify-center">
          <SignUp fallbackRedirectUrl="/account/orders" signInUrl="/sign-in" />
        </div>
      </div>
    </Container>
  );
}
