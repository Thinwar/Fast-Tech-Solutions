export default function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600 sm:text-sm sm:tracking-[0.32em]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-balanced mt-2 text-[2.15rem] font-semibold leading-[0.96] text-slate-950 sm:mt-3 sm:text-3xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
