export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_48px_-24px_rgba(15,23,42,0.18)]">
      <div className="flex justify-center bg-slate-50 px-3 py-4">
        <div className="h-40 w-full max-w-[11rem] animate-pulse rounded-xl bg-slate-100" />
      </div>
      <div className="space-y-2 p-3">
        <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-1/3 animate-pulse rounded-full bg-slate-200" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-8 w-10 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
