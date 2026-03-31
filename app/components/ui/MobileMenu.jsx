import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router";
import SideMenu from "./SideMenu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-gray-700 hover:text-indigo-600"
      >
        <Menu size={24} />
      </button>

      <SideMenu open={open} setOpen={setOpen} />
    </>
  );
}
