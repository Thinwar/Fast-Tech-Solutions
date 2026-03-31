// Assuming you're using shadcn/cn utility
import { Link } from "react-router";
import { cn } from "~/lib/utils";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group ">
      {/* 1. Set a fixed height for the logo image to keep the header slim.
          2. 'object-contain' ensures the logo doesn't stretch.
      */}
      <img
        src="logo.jpg"
        alt="Fast Tech Solutions Logo"
        className="w-10 h-10 object-contain rounded-md"
      />

      {/* 1. Removed mt-4 to align text horizontally with the image.
          2. Added font-bold and tracking-tight for a "premium tech" feel.
          3. Added a hover effect (group-hover) to make it feel interactive.
      */}
      <h2
        className={cn(
          "text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-indigo-600 cursor-pointer",
        )}
      >
        Fast <span className="text-indigo-600">Tech</span> Solutions
      </h2>
    </Link>
  );
}
