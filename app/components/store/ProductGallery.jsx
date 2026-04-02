import { useState } from "react";
import ProductVisual from "./ProductVisual";

export default function ProductGallery({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      <ProductVisual product={product} />

      <div className="grid grid-cols-3 gap-3">
        {product.gallery.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-3xl border p-4 text-left transition ${
              activeIndex === index
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200"
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-[0.22em]">
              View {index + 1}
            </p>
            <p className="mt-2 text-sm font-medium">{item}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
