import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  // 🔥 Optional: Ctrl + K shortcut
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* 🔍 Navbar Icon */}
      <button
        onClick={() => setOpen(true)}
        className="text-gray-700 hover:text-indigo-600 transition cursor-pointer"
      >
        <Search size={20} />
      </button>

      {/* 🔍 Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center pt-24">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-5">
            {/* Top Bar */}
            <div className="flex items-center gap-3 border-b pb-3 ">
              <Search className="text-gray-400" size={20} />
              <input
                autoFocus
                type="text"
                placeholder="Search products, guides..."
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
              <button onClick={() => setOpen(false)}>
                <X className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-4 space-y-4 max-h-80 overflow-y-auto">
              {/* 🔥 Popular */}
              <div>
                <p className="text-xs text-gray-400 mb-2">POPULAR</p>
                <div className="flex flex-wrap gap-2">
                  {["iPhone", "Gaming Laptop", "AirPods", "Smart TV"].map(
                    (item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* 🛍 Products */}
              <div>
                <p className="text-xs text-gray-400 mb-2">PRODUCTS</p>

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-md" />
                    <div>
                      <p className="text-sm font-medium">HP Pavilion Laptop</p>
                      <p className="text-xs text-indigo-600 font-semibold">
                        KSh 65,000
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 📘 Guides */}
              <div>
                <p className="text-xs text-gray-400 mb-2">GUIDES</p>

                <p className="text-sm hover:text-indigo-600 cursor-pointer">
                  Best Phones Under 30K
                </p>
                <p className="text-sm hover:text-indigo-600 cursor-pointer">
                  How to Choose a Laptop
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
