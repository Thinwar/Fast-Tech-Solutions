import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SideMenu from "./SideMenu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      >
        <Menu size={18} />
      </button>
      <SideMenu open={open} setOpen={setOpen} />
    </>
  );
}
