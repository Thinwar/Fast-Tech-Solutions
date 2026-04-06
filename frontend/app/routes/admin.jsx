import { useState } from "react";
import { SignIn, useAuth } from "@clerk/react-router";
import Container from "~/components/ui/Container";
import { createSlug } from "~/data/catalog";
import { useCatalogData } from "~/hooks/useCatalogData";

const emptyProduct = {
  id: "",
  slug: "",
  name: "",
  brand: "",
  category: "phones",
  price: "",
  originalPrice: "",
  image: "",
  rating: "4.8",
  reviews: "0",
  badge: "",
  stock: "In Stock",
  summary: "",
  description: "",
  specs: "",
  delivery: "",
  warranty: "",
  accent: "from-indigo-600 via-violet-600 to-slate-950",
  gallery: "",
  featured: true,
};

const emptyCategory = {
  id: "",
  title: "",
  slug: "",
  description: "",
};

const emptyGuide = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
};

function AdminSection({ title, description, children }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400"
      />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        {...props}
        className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400"
      />
    </label>
  );
}

function AdminLoginGate() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-600">
          Restricted access
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          Admin sign in required
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          This workspace is limited to approved admin accounts. Sign in with
          your account to continue.
        </p>

        <div className="mt-8 flex justify-center">
          <SignIn
            afterSignInUrl="/admin"
            fallbackRedirectUrl="/admin"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </Container>
  );
}

export default function AdminPage() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { catalogData, setCatalogData, resetCatalogData } = useCatalogData();
  const [productDraft, setProductDraft] = useState(emptyProduct);
  const [editingProductSlug, setEditingProductSlug] = useState("");
  const [categoryDraft, setCategoryDraft] = useState(emptyCategory);
  const [editingCategorySlug, setEditingCategorySlug] = useState("");
  const [guideDraft, setGuideDraft] = useState(emptyGuide);
  const [editingGuideSlug, setEditingGuideSlug] = useState("");

  if (!isLoaded) {
    return (
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm text-slate-600">Loading authentication…</p>
        </div>
      </Container>
    );
  }

  if (!isSignedIn) {
    return <AdminLoginGate />;
  }

  const upsertProduct = () => {
    const slug = createSlug(productDraft.slug || productDraft.name);
    const product = {
      ...productDraft,
      id: productDraft.id || Date.now(),
      slug,
      price: Number(productDraft.price || 0),
      originalPrice: Number(productDraft.originalPrice || 0),
      rating: Number(productDraft.rating || 0),
      reviews: Number(productDraft.reviews || 0),
      specs: String(productDraft.specs)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      gallery: String(productDraft.gallery)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    setCatalogData((current) => {
      const products = editingProductSlug
        ? current.products.map((item) =>
            item.slug === editingProductSlug ? product : item,
          )
        : [product, ...current.products];
      return { ...current, products };
    });

    setProductDraft(emptyProduct);
    setEditingProductSlug("");
  };

  const upsertCategory = () => {
    const category = {
      ...categoryDraft,
      id: categoryDraft.id || createSlug(categoryDraft.title),
      slug: createSlug(categoryDraft.slug || categoryDraft.title),
    };

    setCatalogData((current) => {
      const categories = editingCategorySlug
        ? current.categories.map((item) =>
            item.slug === editingCategorySlug ? category : item,
          )
        : [...current.categories, category];
      return { ...current, categories };
    });

    setCategoryDraft(emptyCategory);
    setEditingCategorySlug("");
  };

  const upsertGuide = () => {
    const guide = {
      ...guideDraft,
      id: guideDraft.id || createSlug(guideDraft.title),
      slug: createSlug(guideDraft.slug || guideDraft.title),
    };

    setCatalogData((current) => {
      const guides = editingGuideSlug
        ? current.guides.map((item) =>
            item.slug === editingGuideSlug ? guide : item,
          )
        : [...current.guides, guide];
      return { ...current, guides };
    });

    setGuideDraft(emptyGuide);
    setEditingGuideSlug("");
  };

  return (
    <Container className="space-y-8 py-10 md:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-indigo-600">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Manage real storefront data
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Replace the demo catalog with your actual products, categories,
            guides, and store contact details. Changes are saved in your browser
            immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={resetCatalogData}
          className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Reset demo data
        </button>
        <button
          type="button"
          onClick={async () => await signOut()}
          className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Sign out
        </button>
      </div>

      <AdminSection
        title="Store Details"
        description="Update the business name, tagline, and support channels used across the storefront."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Store name"
            value={catalogData.store.name}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                store: { ...current.store, name: event.target.value },
              }))
            }
          />
          <Input
            label="Tagline"
            value={catalogData.store.tagline}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                store: { ...current.store, tagline: event.target.value },
              }))
            }
          />
          <Input
            label="Support email"
            value={catalogData.store.supportEmail}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                store: { ...current.store, supportEmail: event.target.value },
              }))
            }
          />
          <Input
            label="Support phone"
            value={catalogData.store.supportPhone}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                store: { ...current.store, supportPhone: event.target.value },
              }))
            }
          />
          <Input
            label="WhatsApp phone"
            value={catalogData.store.whatsappPhone}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                store: { ...current.store, whatsappPhone: event.target.value },
              }))
            }
          />
          <Input
            label="Location"
            value={catalogData.store.location}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                store: { ...current.store, location: event.target.value },
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Brands"
        description="Edit the available filter brands and homepage spotlight brands."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Textarea
            label="All brands"
            value={catalogData.brands.join(", ")}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                brands: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
          />
          <Textarea
            label="Homepage spotlight brands"
            value={catalogData.brandSpotlight.join(", ")}
            onChange={(event) =>
              setCatalogData((current) => ({
                ...current,
                brandSpotlight: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
          />
        </div>
      </AdminSection>

      <AdminSection
        title="Categories"
        description="Manage the product families shown on the homepage and shop page."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-3">
            {catalogData.categories.map((category) => (
              <div
                key={category.slug}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-950">
                    {category.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {category.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategorySlug(category.slug);
                      setCategoryDraft(category);
                    }}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCatalogData((current) => ({
                        ...current,
                        categories: current.categories.filter(
                          (item) => item.slug !== category.slug,
                        ),
                      }))
                    }
                    className="rounded-full border border-red-200 px-3 py-1.5 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Input
              label="Title"
              value={categoryDraft.title}
              onChange={(event) =>
                setCategoryDraft((current) => ({
                  ...current,
                  title: event.target.value,
                  slug: createSlug(event.target.value),
                }))
              }
            />
            <Input
              label="Slug"
              value={categoryDraft.slug}
              onChange={(event) =>
                setCategoryDraft((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
            />
            <Textarea
              label="Description"
              value={categoryDraft.description}
              onChange={(event) =>
                setCategoryDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
            <button
              type="button"
              onClick={upsertCategory}
              className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {editingCategorySlug ? "Update category" : "Add category"}
            </button>
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Products"
        description="Create or edit the products powering the homepage, shop, search, and product detail views."
      >
        <div className="grid gap-6 xl:grid-cols-[1fr_30rem]">
          <div className="space-y-3">
            {catalogData.products.map((product) => (
              <div
                key={product.slug}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-start md:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-950">{product.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {`${product.brand} · ${product.category} · KSh ${product.price}`}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {product.summary}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProductSlug(product.slug);
                      setProductDraft({
                        ...product,
                        price: String(product.price),
                        originalPrice: String(product.originalPrice),
                        rating: String(product.rating),
                        reviews: String(product.reviews),
                        specs: product.specs.join(", "),
                        gallery: product.gallery.join(", "),
                      });
                    }}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCatalogData((current) => ({
                        ...current,
                        products: current.products.filter(
                          (item) => item.slug !== product.slug,
                        ),
                      }))
                    }
                    className="rounded-full border border-red-200 px-3 py-1.5 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <Input
                label="Product name"
                value={productDraft.name}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
              <Input
                label="Brand"
                value={productDraft.brand}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    brand: event.target.value,
                  }))
                }
              />
              <Input
                label="Category slug"
                value={productDraft.category}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              />
              <Input
                label="Image URL"
                value={productDraft.image}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    image: event.target.value,
                  }))
                }
              />
              <Input
                label="Price"
                value={productDraft.price}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    price: event.target.value,
                  }))
                }
              />
              <Input
                label="Original price"
                value={productDraft.originalPrice}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    originalPrice: event.target.value,
                  }))
                }
              />
              <Input
                label="Badge"
                value={productDraft.badge}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    badge: event.target.value,
                  }))
                }
              />
              <Input
                label="Stock"
                value={productDraft.stock}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    stock: event.target.value,
                  }))
                }
              />
              <Input
                label="Rating"
                value={productDraft.rating}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    rating: event.target.value,
                  }))
                }
              />
              <Input
                label="Reviews"
                value={productDraft.reviews}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    reviews: event.target.value,
                  }))
                }
              />
              <Input
                label="Delivery"
                value={productDraft.delivery}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    delivery: event.target.value,
                  }))
                }
              />
              <Input
                label="Warranty"
                value={productDraft.warranty}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    warranty: event.target.value,
                  }))
                }
              />
              <Input
                label="Accent classes"
                value={productDraft.accent}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    accent: event.target.value,
                  }))
                }
              />
            </div>

            <Textarea
              label="Summary"
              value={productDraft.summary}
              onChange={(event) =>
                setProductDraft((current) => ({
                  ...current,
                  summary: event.target.value,
                }))
              }
            />
            <Textarea
              label="Description"
              value={productDraft.description}
              onChange={(event) =>
                setProductDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
            <Textarea
              label="Specs (comma separated)"
              value={productDraft.specs}
              onChange={(event) =>
                setProductDraft((current) => ({
                  ...current,
                  specs: event.target.value,
                }))
              }
            />
            <Textarea
              label="Gallery labels (comma separated)"
              value={productDraft.gallery}
              onChange={(event) =>
                setProductDraft((current) => ({
                  ...current,
                  gallery: event.target.value,
                }))
              }
            />

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(productDraft.featured)}
                onChange={(event) =>
                  setProductDraft((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
              />
              Show on featured sections
            </label>

            <button
              type="button"
              onClick={upsertProduct}
              className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {editingProductSlug ? "Update product" : "Add product"}
            </button>
          </div>
        </div>
      </AdminSection>

      <AdminSection
        title="Guides"
        description="Edit the short guide cards used in search and the guides page."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-3">
            {catalogData.guides.map((guide) => (
              <div
                key={guide.slug}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-950">{guide.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{guide.excerpt}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingGuideSlug(guide.slug);
                      setGuideDraft(guide);
                    }}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCatalogData((current) => ({
                        ...current,
                        guides: current.guides.filter(
                          (item) => item.slug !== guide.slug,
                        ),
                      }))
                    }
                    className="rounded-full border border-red-200 px-3 py-1.5 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Input
              label="Title"
              value={guideDraft.title}
              onChange={(event) =>
                setGuideDraft((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
            />
            <Input
              label="Slug"
              value={guideDraft.slug}
              onChange={(event) =>
                setGuideDraft((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
            />
            <Textarea
              label="Excerpt"
              value={guideDraft.excerpt}
              onChange={(event) =>
                setGuideDraft((current) => ({
                  ...current,
                  excerpt: event.target.value,
                }))
              }
            />
            <button
              type="button"
              onClick={upsertGuide}
              className="w-full rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
            >
              {editingGuideSlug ? "Update guide" : "Add guide"}
            </button>
          </div>
        </div>
      </AdminSection>
    </Container>
  );
}
