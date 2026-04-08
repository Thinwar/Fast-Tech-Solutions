export const priceRanges = [
  { label: "Under KSh 50,000", value: "under-50000", max: 50000 },
  { label: "KSh 50,000 - 100,000", value: "50000-100000", min: 50000, max: 100000 },
  { label: "KSh 100,000 - 150,000", value: "100000-150000", min: 100000, max: 150000 },
  { label: "Above KSh 150,000", value: "150000-plus", min: 150000 },
];

export const defaultCatalogData = {
  store: {
    name: "Fast Tech",
    tagline: "Premium Storefront",
    supportEmail: "support@fasttechsolutions.co.ke",
    supportPhone: "+254 700 000 000",
    location: "Kimathi Street, Nairobi CBD",
    whatsappPhone: "254721997879",
  },
  categories: [
    {
      id: "phones",
      title: "Phones",
      slug: "phones",
      description: "Flagship cameras, long battery life, and polished software.",
    },
    {
      id: "laptops",
      title: "Laptops",
      slug: "laptops",
      description: "Premium performance for work, study, and creative flow.",
    },
    {
      id: "accessories",
      title: "Accessories",
      slug: "accessories",
      description: "Chargers, audio, wearables, and daily carry essentials.",
    },
  ],
  brands: ["Apple", "Samsung", "Google", "Dell", "Sony", "Logitech", "Anker"],
  brandSpotlight: ["Apple", "Samsung", "Google", "Sony", "Dell", "Logitech"],
  guides: [
    {
      id: "best-phones-under-100k",
      slug: "best-phones-under-100k",
      title: "Best phones under KSh 100K",
      excerpt: "How to balance camera quality, battery life, and long-term value.",
    },
    {
      id: "how-to-pick-a-laptop",
      slug: "how-to-pick-a-laptop",
      title: "How to choose a laptop for work or school",
      excerpt: "What matters most between RAM, battery, display, and portability.",
    },
    {
      id: "premium-accessory-checklist",
      slug: "premium-accessory-checklist",
      title: "Premium accessory checklist",
      excerpt: "The small upgrades that make a tech setup feel finished.",
    },
  ],
  products: [
    {
      id: 1,
      slug: "iphone-16-pro-max",
      name: "iPhone 16 Pro Max",
      brand: "Apple",
      category: "phones",
      price: 189999,
      originalPrice: 204999,
      image:
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      reviews: 128,
      badge: "Top Pick",
      stock: "In Stock",
      summary: "Titanium flagship with pro camera controls and a brighter edge-to-edge display.",
      description:
        "Built for buyers who want a polished premium device with effortless performance, dependable battery life, and standout video quality.",
      specs: [
        "6.9-inch Super Retina display",
        "A18 Pro performance chip",
        "5x optical zoom system",
        "256GB storage",
      ],
      delivery: "Same-day Nairobi delivery available before 3PM.",
      warranty: "12-month official warranty with setup assistance.",
      accent: "from-indigo-600 via-violet-600 to-slate-950",
      gallery: ["Titanium finish", "Camera control", "Always-on display"],
      featured: true,
    },
    {
      id: 2,
      slug: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      category: "phones",
      price: 174999,
      originalPrice: 189999,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      reviews: 96,
      badge: "AI Favorite",
      stock: "Low Stock",
      summary: "Large premium display, S Pen productivity, and sharp low-light photography.",
      description:
        "A power-user phone with premium build quality and a feature-rich camera system made for content, work, and everyday speed.",
      specs: [
        "6.8-inch QHD+ AMOLED",
        "Snapdragon flagship platform",
        "200MP pro-grade camera",
        "5000mAh battery",
      ],
      delivery: "Express delivery across Nairobi and next-day nationwide shipping.",
      warranty: "12-month warranty and software setup support.",
      accent: "from-indigo-700 via-sky-600 to-slate-950",
      gallery: ["Armor aluminum frame", "S Pen notes", "Nightography camera"],
      featured: true,
    },
    {
      id: 3,
      slug: "macbook-air-m3",
      name: "MacBook Air M3",
      brand: "Apple",
      category: "laptops",
      price: 164999,
      originalPrice: 179999,
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      reviews: 74,
      badge: "Best Seller",
      stock: "In Stock",
      summary: "Ultra-light premium laptop for study, travel, and focused creative work.",
      description:
        "Thin, quiet, and responsive with the kind of battery life that makes it easy to work from anywhere without compromise.",
      specs: [
        "13-inch Liquid Retina display",
        "Apple M3 chip",
        "16GB unified memory",
        "512GB SSD storage",
      ],
      delivery: "Free same-day delivery in Nairobi CBD.",
      warranty: "12-month warranty with onboarding support.",
      accent: "from-slate-900 via-indigo-700 to-indigo-500",
      gallery: ["Feather-light body", "All-day battery", "Studio-grade keyboard"],
      featured: true,
    },
    {
      id: 4,
      slug: "dell-xps-13",
      name: "Dell XPS 13",
      brand: "Dell",
      category: "laptops",
      price: 149999,
      originalPrice: 159999,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      rating: 4.7,
      reviews: 51,
      badge: "Creator Pick",
      stock: "In Stock",
      summary: "Refined Windows ultrabook with premium materials and strong portability.",
      description:
        "A polished everyday machine for remote work, multitasking, and premium build quality lovers.",
      specs: [
        "13.4-inch InfinityEdge display",
        "Intel Core Ultra processor",
        "16GB RAM",
        "512GB NVMe SSD",
      ],
      delivery: "Next-day delivery in Nairobi metro.",
      warranty: "1-year limited warranty with support referral.",
      accent: "from-slate-950 via-indigo-800 to-fuchsia-500",
      gallery: ["InfinityEdge view", "Machined aluminum", "Portable charger setup"],
      featured: true,
    },
    {
      id: 5,
      slug: "sony-wh-1000xm5",
      name: "Sony WH-1000XM5",
      brand: "Sony",
      category: "accessories",
      price: 45999,
      originalPrice: 51999,
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      reviews: 143,
      badge: "Premium Audio",
      stock: "In Stock",
      summary: "Quiet luxury headphones with rich sound and travel-ready comfort.",
      description:
        "A premium everyday carry piece for music lovers, commuters, and focused work sessions.",
      specs: [
        "Industry-leading noise canceling",
        "30-hour battery life",
        "Multipoint Bluetooth pairing",
        "Adaptive sound control",
      ],
      delivery: "Same-day rider delivery in key Nairobi zones.",
      warranty: "6-month warranty with replacement support guidance.",
      accent: "from-indigo-500 via-slate-900 to-slate-700",
      gallery: ["Soft-fit earcups", "Travel case", "Desk listening mode"],
      featured: false,
    },
    {
      id: 6,
      slug: "logitech-mx-master-3s",
      name: "Logitech MX Master 3S",
      brand: "Logitech",
      category: "accessories",
      price: 15499,
      originalPrice: 18499,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      rating: 4.7,
      reviews: 64,
      badge: "Workspace Upgrade",
      stock: "In Stock",
      summary: "Precision mouse for multitasking, spreadsheets, and creative workflows.",
      description:
        "Comfortable, accurate, and tuned for people building a premium desk setup around productivity.",
      specs: [
        "Quiet tactile clicks",
        "8K DPI tracking",
        "USB-C fast charging",
        "Multi-device switching",
      ],
      delivery: "Pickup and courier options available.",
      warranty: "6-month store warranty.",
      accent: "from-slate-800 via-indigo-600 to-cyan-500",
      gallery: ["Precision scroll wheel", "Multi-device flow", "Minimal desk setup"],
      featured: false,
    },
  ],
};

export function formatPrice(value) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function createSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getFeaturedProducts(catalogData) {
  const products = catalogData?.products || [];
  const featured = products.filter((product) => product.featured);
  return (featured.length ? featured : products).slice(0, 4);
}

export function getProductBySlug(catalogData, slug) {
  return (catalogData?.products || []).find((product) => product.slug === slug);
}

export function getRelatedProducts(catalogData, slug) {
  const current = getProductBySlug(catalogData, slug);
  if (!current) return [];

  return (catalogData?.products || [])
    .filter(
      (product) =>
        product.slug !== slug &&
        (product.category === current.category || product.brand === current.brand),
    )
    .slice(0, 4);
}

export function filterProducts(catalogData, { brand, range, sort, category }) {
  let results = [...(catalogData?.products || [])];

  if (category) results = results.filter((product) => product.category === category);
  if (brand) results = results.filter((product) => product.brand === brand);

  if (range) {
    const selectedRange = priceRanges.find((item) => item.value === range);
    if (selectedRange) {
      results = results.filter((product) => {
        const meetsMin =
          selectedRange.min === undefined || product.price >= selectedRange.min;
        const meetsMax =
          selectedRange.max === undefined || product.price <= selectedRange.max;
        return meetsMin && meetsMax;
      });
    }
  }

  switch (sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      results.sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      results.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
      break;
  }

  return results;
}
