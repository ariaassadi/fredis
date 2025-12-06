"use client";

import type { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import { Package, DollarSign, Tag, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import type { Product } from "~/db/schema/products/types";

import { defineMeta, filterFn } from "~/lib/filters";
import { Button } from "~/ui/primitives/button";
import { DataTable } from "~/ui/primitives/data-table/data-table";
import { DataTableColumnHeader } from "~/ui/primitives/data-table/data-table-column-header";
import { Badge } from "~/ui/primitives/badge";

interface AdminProductsPageProps {
  products: Product[];
}

export default function AdminProductsPage({ products }: AdminProductsPageProps) {
  const router = useRouter();

  const handleDisableProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/disable`, {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to disable product");
      }
    } catch (error) {
      console.error("Error disabling product:", error);
    }
  };

  const handleEnableProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/enable`, {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to enable product");
      }
    } catch (error) {
      console.error("Error enabling product:", error);
    }
  };

  const columns = useMemo(
    (): ColumnDef<Product>[] => [
      {
        accessorKey: "image",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <img
              alt={product.name}
              className="h-12 w-12 rounded-md object-cover"
              loading="lazy"
              src={product.image}
            />
          );
        },
        header: "Bild",
        id: "image",
      },
      {
        accessorKey: "name",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Namn" />
        ),
        meta: defineMeta((row: Product) => row.name, {
          displayName: "Namn",
          icon: Package,
          type: "text",
        }) as ColumnMeta<Product, unknown>,
      },
      {
        accessorKey: "category",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Kategori" />
        ),
        meta: defineMeta((row: Product) => row.category, {
          displayName: "Kategori",
          icon: Tag,
          type: "text",
        }) as ColumnMeta<Product, unknown>,
      },
      {
        accessorKey: "price",
        cell: ({ row }) => {
          const price = row.original.price;
          return `${price.toFixed(2)} kr`;
        },
        filterFn: filterFn("number"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pris" />
        ),
        meta: defineMeta((row: Product) => row.price, {
          displayName: "Pris",
          icon: DollarSign,
          type: "number",
        }) as ColumnMeta<Product, unknown>,
      },
      {
        accessorKey: "inStock",
        cell: ({ row }) => {
          const inStock = row.original.inStock;
          return (
            <Badge variant={inStock ? "default" : "destructive"}>
              {inStock ? "I lager" : "Slut i lager"}
            </Badge>
          );
        },
        header: "Lagerstatus",
        id: "inStock",
      },
      {
        accessorKey: "isDisabled",
        cell: ({ row }) => {
          const isDisabled = row.original.isDisabled;
          return (
            <Badge variant={isDisabled ? "destructive" : "default"}>
              {isDisabled ? "Inaktiverad" : "Aktiv"}
            </Badge>
          );
        },
        header: "Status",
        id: "isDisabled",
      },
      {
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex gap-2">
              <Button
                onClick={() => router.push(`/admin/products/${product.id}`)}
                size="sm"
                variant="outline"
              >
                Redigera
              </Button>
              {product.isDisabled ? (
                <Button
                  onClick={() => handleEnableProduct(product.id)}
                  size="sm"
                  variant="default"
                >
                  Aktivera
                </Button>
              ) : (
                <Button
                  onClick={() => handleDisableProduct(product.id)}
                  size="sm"
                  variant="destructive"
                >
                  Inaktivera
                </Button>
              )}
            </div>
          );
        },
        header: "Åtgärder",
        id: "actions",
      },
    ],
    [router]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produkter</h1>
        <Button onClick={() => router.push("/admin/products/new")}>
          Lägg till produkt
        </Button>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}

