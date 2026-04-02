import Container from "~/components/ui/Container";

const deals = [
  {
    title: "Flagship phone upgrade",
    detail: "Save up to KSh 15,000 on selected premium phones this week.",
  },
  {
    title: "Laptop setup bundle",
    detail: "Buy a premium laptop and unlock reduced pricing on mice and chargers.",
  },
  {
    title: "Audio desk refresh",
    detail: "Selected headphones and accessories at better bundle pricing.",
  },
];

export default function DealsPage() {
  return (
    <Container className="py-10 md:py-14">
      <div className="rounded-[36px] bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-950 p-8 text-white md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-indigo-100">
          Deals
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Timed offers with a cleaner premium feel.
        </h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {deals.map((deal) => (
            <div key={deal.title} className="rounded-[28px] border border-white/15 bg-white/10 p-6">
              <h2 className="text-xl font-semibold">{deal.title}</h2>
              <p className="mt-3 text-sm leading-7 text-indigo-50/85">{deal.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
