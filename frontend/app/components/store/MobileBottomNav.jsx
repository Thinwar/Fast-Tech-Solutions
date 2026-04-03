import { Grid2x2, House, NotebookText, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { title: "Home", href: "/", icon: House },
  { title: "Shop", href: "/shop", icon: Grid2x2 },
  { title: "Guides", href: "/guides", icon: NotebookText },
  { title: "Cart", href: "/cart", icon: ShoppingCart },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href);

          return (
            <Link
              key={item.title}
              to={item.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition ${
                isActive ? "text-indigo-700" : "text-slate-500"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
