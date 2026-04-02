import { Grid2x2, House, NotebookText, Tag, X } from "lucide-react";
import { Link } from "react-router";
import SocialMedia from "./SocialMedia.jsx";

const menuItems = [
  { title: "Home", href: "/", icon: House },
  { title: "Shop", href: "/shop", icon: Grid2x2 },
  { title: "Guides", href: "/guides", icon: NotebookText },
  { title: "Deals", href: "/deals", icon: Tag },
];

export default function SideMenu({ open, setOpen }) {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/40 transition ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-80 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-indigo-600">
              Navigate
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Fast Tech</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-slate-200 p-2 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-3 px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
              >
                <Icon size={18} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-slate-200 px-5 py-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Follow
          </p>
          <SocialMedia />
        </div>
      </div>
    </>
  );
}
