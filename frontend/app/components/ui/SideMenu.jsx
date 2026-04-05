import { Grid2x2, House, NotebookText, Tag, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Link } from "react-router";
import SocialMedia from "./SocialMedia.jsx";

const menuItems = [
  { title: "Home", href: "/", icon: House },
  { title: "Shop", href: "/shop", icon: Grid2x2 },
  { title: "Guides", href: "/guides", icon: NotebookText },
  { title: "Deals", href: "/deals", icon: Tag },
];

export default function SideMenu({ open, setOpen }) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [open]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[120] transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-slate-950/55 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute inset-y-0 left-0 flex h-screen w-[88vw] max-w-[340px] min-w-0 flex-col overflow-hidden border-r border-slate-200 bg-white shadow-[0_30px_90px_-32px_rgba(15,23,42,0.6)] ring-1 ring-slate-950/5 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative z-20 shrink-0 border-b border-slate-200 bg-white px-5 py-5 shadow-[0_1px_0_rgba(148,163,184,0.18)]">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-indigo-600">
                Navigate
              </p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-950">
                Fast Tech
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-full border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto overscroll-contain bg-white px-4 py-5">
          <div className="space-y-2 rounded-[28px] border border-slate-200 bg-slate-50 p-3 shadow-sm">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-700 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-200"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                    <Icon size={18} />
                  </span>
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Follow
            </p>
            <SocialMedia />
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
