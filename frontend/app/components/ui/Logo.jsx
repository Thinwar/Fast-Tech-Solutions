import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { useCatalogData } from "~/hooks/useCatalogData";

export default function Logo({ className = "", textClassName = "" }) {
  const { catalogData } = useCatalogData();

  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30">
        FT
      </div>
      <div className="min-w-0">
        <p
          className={cn(
            "truncate text-base font-semibold tracking-tight text-slate-950 transition group-hover:text-indigo-700",
            textClassName,
          )}
        >
          {catalogData.store.name}
        </p>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
          {catalogData.store.tagline}
        </p>
      </div>
    </Link>
  );
}
