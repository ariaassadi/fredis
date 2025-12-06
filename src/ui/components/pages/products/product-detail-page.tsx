"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useCart } from "~/lib/hooks/use-cart";
import { Button } from "~/ui/primitives/button";
import { Separator } from "~/ui/primitives/separator";
import type { Product } from "~/db/schema/products/types";

/* -------------------------------------------------------------------------- */
/*                         Helpers (shared, memo-safe)                        */
/* -------------------------------------------------------------------------- */

const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} kr`;
};

/** `feature -> feature` ➜ `feature-feature` (for React keys) */
const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  /* ----------------------------- Routing --------------------------------- */
  const router = useRouter();

  /* ----------------------------- Cart hook ------------------------------- */
  const { addItem } = useCart();

  /* ----------------------------- Local state ----------------------------- */
  const [quantity, setQuantity] = React.useState(1);
  const [isAdding, setIsAdding] = React.useState(false);

  /* ------------------------ Normalize product data ----------------------- */
  const normalizedProduct = React.useMemo(() => {
    if (!product) return null;
    
    return {
      ...product,
      price: typeof product.price === "string" ? Number.parseFloat(product.price) : product.price,
      originalPrice: product.originalPrice ? (typeof product.originalPrice === "string" ? Number.parseFloat(product.originalPrice) : product.originalPrice) : undefined,
      features: Array.isArray(product.features) ? product.features : [],
    };
  }, [product]);

  /* ----------------------- Derived/computed values ----------------------- */
  const discountPercentage = React.useMemo(() => {
    if (!normalizedProduct?.originalPrice) return 0;
    return Math.round(
      ((normalizedProduct.originalPrice - normalizedProduct.price) / normalizedProduct.originalPrice) * 100
    );
  }, [normalizedProduct]);

  /* ------------------------------ Handlers ------------------------------- */
  const handleQuantityChange = React.useCallback((newQty: number) => {
    setQuantity((prev) => (newQty >= 1 ? newQty : prev));
  }, []);

  const handleAddToCart = React.useCallback(async () => {
    if (!normalizedProduct) return;

    setIsAdding(true);
    addItem(
      {
        category: normalizedProduct.category,
        id: normalizedProduct.id,
        image: normalizedProduct.image,
        name: normalizedProduct.name,
        price: normalizedProduct.price,
      },
      quantity
    );
    setQuantity(1);
    toast.success(`${normalizedProduct.name} tillagd i varukorg`);
    await new Promise((r) => setTimeout(r, 400)); // fake latency
    setIsAdding(false);
  }, [addItem, normalizedProduct, quantity]);

  /* -------------------------- Conditional UI ---------------------------- */
  if (!normalizedProduct) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 py-10">
          <div
            className={`
              container px-4
              md:px-6
            `}
          >
            <h1 className="text-3xl font-bold">Produkt hittades inte</h1>
            <p className="mt-4">
              Produkten du letar efter finns inte.
            </p>
            <Button className="mt-6" onClick={() => router.push("/products")}>
              Tillbaka till Produkter
            </Button>
          </div>
        </main>
      </div>
    );
  }

  /* ------------------------------ Markup --------------------------------- */
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-10">
        <div
          className={`
            container px-4
            md:px-6
          `}
        >
          {/* Back link */}
          <Button
            aria-label="Tillbaka till produkter"
            className="mb-6"
            onClick={() => router.push("/products")}
            variant="ghost"
          >
            ← Tillbaka till Produkter
          </Button>

          {/* Main grid */}
          <div
            className={`
              grid grid-cols-1 gap-8
              md:grid-cols-2
            `}
          >
            {/* ------------------------ Product image ------------------------ */}
            <div
              className={`
                relative aspect-square overflow-hidden rounded-lg bg-muted
              `}
            >
              <Image
                alt={normalizedProduct.name}
                className="object-cover"
                fill
                priority
                src={normalizedProduct.image}
              />
              {discountPercentage > 0 && (
                <div
                  className={`
                    absolute top-2 left-2 rounded-full bg-red-500 px-2 py-1
                    text-xs font-bold text-white
                  `}
                >
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* ---------------------- Product info -------------------------- */}
            <div className="flex flex-col">
              {/* Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold">{normalizedProduct.name}</h1>
              </div>

              {/* Category & prices */}
              <div className="mb-6">
                <p className="text-lg font-medium text-muted-foreground">
                  {normalizedProduct.category}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl font-bold">
                    {formatCurrency(normalizedProduct.price)}
                  </span>
                  {normalizedProduct.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatCurrency(normalizedProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-muted-foreground">
                {normalizedProduct.description}
              </p>

              {/* Stock */}
              <div aria-atomic="true" aria-live="polite" className="mb-6">
                {normalizedProduct.inStock ? (
                  <p className="text-sm font-medium text-green-600">I lager</p>
                ) : (
                  <p className="text-sm font-medium text-red-500">
                    Slut i lager
                  </p>
                )}
              </div>

              {/* Quantity selector & Add to cart */}
              <div
                className={`
                  mb-6 flex flex-col gap-4
                  sm:flex-row sm:items-center
                `}
              >
                {/* Quantity */}
                <div className="flex items-center">
                  <Button
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    size="icon"
                    variant="outline"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-12 text-center select-none">
                    {quantity}
                  </span>

                  <Button
                    aria-label="Increase quantity"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add to cart */}
                <Button
                  className="flex-1 cursor-pointer"
                  disabled={!normalizedProduct.inStock || isAdding}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isAdding ? "Lägger till…" : "Lägg i varukorg"}
                </Button>
              </div>

              {/* ---------------------- Features (moved here) ---------------------- */}
              {normalizedProduct.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold">Egenskaper</h3>
                  <div className="flex flex-wrap gap-2">
                    {normalizedProduct.features.map((feature) => (
                      <span
                        key={`feature-${normalizedProduct.id}-${slugify(feature)}`}
                        className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
