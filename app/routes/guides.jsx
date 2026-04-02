import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import SectionHeading from "~/components/store/SectionHeading";
import Container from "~/components/ui/Container";
import { useCatalogData } from "~/hooks/useCatalogData";

export default function GuidesPage() {
  const { catalogData } = useCatalogData();

  return (
    <Container className="py-10 md:py-14">
      <SectionHeading
        eyebrow="Guides"
        title="Advice for premium tech buying"
        description="Short, practical reads that help shoppers compare devices with clarity before checkout."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {catalogData.guides.map((guide) => (
          <article
            key={guide.slug}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.22)]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-indigo-600">
              Buying guide
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{guide.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{guide.excerpt}</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700"
            >
              Browse products
              <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </Container>
  );
}
