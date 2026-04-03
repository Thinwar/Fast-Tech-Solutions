import { Link, useLocation } from "react-router";
import { Headerdata } from "../../../constants/data";

export default function HeaderMenu() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="hidden md:inline-flex w-1/3 gap-7 text-sm font-semibold text-gray-700 capitalize">
      {Headerdata?.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.title}
            to={item.href}
            className={`relative group transition-colors cursor-pointer ${
              isActive
                ? "text-indigo-600"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            {item.title}

            {/* Left line */}
            <span
              className={`absolute -bottom-0.5 left-1/2 w-1/2 h-0.5 bg-indigo-600 origin-right transition-transform duration-300 ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />

            {/* Right line */}
            <span
              className={`absolute -bottom-0.5 right-1/2 w-1/2 h-0.5 bg-indigo-600 origin-left transition-transform duration-300 ${
                isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
