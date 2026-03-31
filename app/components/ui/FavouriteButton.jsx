import { Heart } from "lucide-react";
import { Link } from "react-router";

export default function FavouriteButton() {
  return (
    <div>
      <Link
        to="/cart"
        className="relative text-gray-700 hover:text-indigo-600 transition cursor-pointer"
      >
        <Heart size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          0
        </span>
      </Link>
    </div>
  );
}
