export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_48px_-24px_rgba(15,23,42,0.18)]">
      <div className="h-52 animate-pulse bg-slate-100" />
      <div className="space-y-3 p-3.5">
        <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-5 w-1/3 animate-pulse rounded-full bg-slate-200" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
