import Container from "./container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white mt-10">
      {/* Top Features */}
      <FooterTop />

      <Container>
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-10">
          {/* Logo + About */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-200">
              Your one-stop shop for the latest tech in Kenya. Phones, laptops,
              accessories & more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Shop</li>
              <li className="hover:text-white cursor-pointer">Guides</li>
              <li className="hover:text-white cursor-pointer">Deals</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li className="hover:text-white cursor-pointer">Smartphones</li>
              <li className="hover:text-white cursor-pointer">Laptops</li>
              <li className="hover:text-white cursor-pointer">Accessories</li>
              <li className="hover:text-white cursor-pointer">Headphones</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-200 mb-3">
              Get the latest deals & tech news
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-lg text-black outline-none"
              />
              <button className="bg-black px-4 rounded-r-lg hover:bg-gray-800 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-200">
          <p>
            © {new Date().getFullYear()} Fast Tech Solutions. All rights
            reserved.
          </p>

          <div className="flex gap-4">
            <Facebook className="cursor-pointer hover:text-white transition" size={20} />
            <Twitter className="cursor-pointer hover:text-white transition" size={20} />
            <Instagram className="cursor-pointer hover:text-white transition" size={20} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
