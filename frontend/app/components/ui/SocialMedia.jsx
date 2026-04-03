import {
  AtSign,
  BriefcaseBusiness,
  CirclePlay,
  MessageCircle,
} from "lucide-react";

const socials = [
  {
    title: "Instagram",
    href: "https://www.instagram.com/fasttechsolutionske",
    icon: AtSign,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/fasttechsolutionske",
    icon: MessageCircle,
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@fasttechsolutionske",
    icon: CirclePlay,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/fast-tech-solutions",
    icon: BriefcaseBusiness,
  },
];

export default function SocialMedia({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      {socials.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.title}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
