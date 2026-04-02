import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("admin", "routes/admin.jsx"),
  route("shop", "routes/shop/page.jsx"),
  route("shop/:slug", "routes/shop/details.jsx"),
  route("guides", "routes/guides.jsx"),
  route("deals", "routes/deals.jsx"),
  route("cart", "routes/cart.jsx"),
];
