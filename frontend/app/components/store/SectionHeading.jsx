export default function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-balanced mt-3 text-3xl font-semibold leading-[0.98] text-slate-950 md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
