"use client";

import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { ProductCard } from "~/ui/components/product-card";
import { Button } from "~/ui/primitives/button";
import type { Product } from "~/db/schema/products/types";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Category = string;

/* -------------------------------------------------------------------------- */
/*                            Helpers / utilities                             */
/* -------------------------------------------------------------------------- */

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

interface ProductsPageProps {
  initialProducts: Product[];
}

export function ProductsPage({ initialProducts }: ProductsPageProps) {
  const { addItem } = useCart();
  const products = initialProducts;

  /* ----------------------- Categories (derived) ------------------------- */
  const categories: Category[] = React.useMemo(() => {
    const dynamic = Array.from(new Set(products.map((p) => p.category))).sort();
    return ["Alla", ...dynamic];
  }, [products]);

  /* ----------------------------- State ---------------------------------- */
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>("All");

  /* --------------------- Filtered products (memo) ----------------------- */
  const filteredProducts = React.useMemo(
    () =>
      selectedCategory === "Alla"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [selectedCategory, products]
  );

  /* --------------------------- Handlers --------------------------------- */
  const handleAddToCart = React.useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        addItem(
          {
            category: product.category,
            id: product.id,
            image: product.image,
            name: product.name,
            price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
          },
          1 // (quantity) always adds 1 item to the cart
        );
      }
    },
    [addItem, products]
  );

  const handleAddToWishlist = React.useCallback((productId: string) => {
    // TODO: integrate with Wishlist feature
    console.log(`Added ${productId} to wishlist`);
  }, []);

  /* ----------------------------- Render --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div
          className={`
            container px-4
            md:px-6
          `}
        >
          {/* Heading & filters */}
          <div
            className={`
              mb-8 flex flex-col gap-4
              md:flex-row md:items-center md:justify-between
            `}
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Våra Produkter</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Utforska våra senaste bakverk och hitta något du kommer att älska.
              </p>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  aria-pressed={category === selectedCategory}
                  className="rounded-full"
                  key={slugify(category)}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  title={`Filtrera efter ${category}`}
                  variant={
                    category === selectedCategory ? "default" : "outline"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div
              className={`
                grid grid-cols-1 gap-6
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
              `}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                  product={{
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    image: product.image,
                    price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
                    originalPrice: product.originalPrice ? (typeof product.originalPrice === "string" ? parseFloat(product.originalPrice) : product.originalPrice) : undefined,
                    inStock: product.inStock,
                  }}
                />
              ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Inga produkter hittades i denna kategori.
              </p>
            </div>
          )}

          {/* Pagination */}
          <nav
            aria-label="Sidnumrering"
            className="mt-12 flex items-center justify-center gap-2"
          >
            <Button disabled variant="outline">
              Föregående
            </Button>
            <Button aria-current="page" variant="default">
              1
            </Button>
            <Button disabled variant="outline">
              Nästa
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
}
