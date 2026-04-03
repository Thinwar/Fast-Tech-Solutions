import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ClerkProvider } from "@clerk/react-router";
import { clerkMiddleware, rootAuthLoader } from "@clerk/react-router/server";

import stylesheet from "./app.css?url";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import MobileBottomNav from "./components/store/MobileBottomNav";

export const middleware = [clerkMiddleware()];

export const loader = (args) => rootAuthLoader(args);

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans antialiased bg-[#f8fafc] text-gray-800">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }) {
  return (
    <ClerkProvider loaderData={loaderData}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-24 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </ClerkProvider>
  );
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-6 pt-16">
      <h1 className="text-3xl font-bold text-indigo-600">{message}</h1>
      <p className="mt-2 text-gray-600">{details}</p>

      {stack ? (
        <pre className="mt-4 w-full overflow-x-auto rounded-lg bg-gray-100 p-4">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
