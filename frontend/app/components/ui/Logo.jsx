import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { useCatalogData } from "~/hooks/useCatalogData";

export default function Logo({ className = "", textClassName = "" }) {
  const { catalogData } = useCatalogData();

  return (
    <Link to="/" className={cn("group flex items-center gap-2.5 sm:gap-3.5", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/70 sm:h-12 sm:w-12">
        <img
          src="/logo.jpg"
          alt="Fast Tech Solutions logo"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 leading-none">
        <p
          className={cn(
            "truncate font-display text-base font-semibold tracking-[-0.04em] text-slate-950 transition group-hover:text-indigo-700 sm:text-lg",
            textClassName,
          )}
        >
          {catalogData.store.name}
        </p>
        <p className="mt-1 hidden truncate text-[10px] uppercase tracking-[0.26em] text-slate-400 sm:block">
          {catalogData.store.tagline}
        </p>
      </div>
    </Link>
  );
}
