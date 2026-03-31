import { X } from "lucide-react";
import { Link } from "react-router";

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "Guides", href: "/guides" },
  { title: "Deals", href: "/deals" },
];

export default function SideMenu({ open, setOpen }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 ${
          open ? "block" : "hidden"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-indigo-600">
            Fast Tech
          </h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}