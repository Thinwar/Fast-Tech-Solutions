import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import { ClerkProvider } from "@clerk/react-router";
import { clerkMiddleware, rootAuthLoader } from "@clerk/react-router/server";

import stylesheet from "./app.css?url";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import MobileBottomNav from "./components/store/MobileBottomNav";

// Middleware
export const middleware = [clerkMiddleware()];

// Loader
export const loader = (args) => rootAuthLoader(args);

// Links
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

// 🔥 Layout (HTML shell + Page)
export function Layout({ children }) {
  const loaderData = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="font-sans antialiased bg-[#f8fafc] text-gray-800">
        <ClerkProvider loaderData={loaderData}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-24 md:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
          </div>
        </ClerkProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// 🔥 App
export default function App() {
  return <Outlet />;
}

// Error Boundary
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
    <main className="pt-16 p-6 container mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600">{message}</h1>
      <p className="text-gray-600 mt-2">{details}</p>

      {stack && (
        <pre className="w-full p-4 mt-4 overflow-x-auto bg-gray-100 rounded-lg">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
