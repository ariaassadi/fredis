"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import type { Product } from "~/db/schema/products/types";
import { PRODUCT_FEATURES } from "~/db/schema/products/types";

import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Label } from "~/ui/primitives/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Switch } from "~/ui/primitives/switch";
import { Badge } from "~/ui/primitives/badge";

interface AdminProductFormPageProps {
  product?: Product;
}

export default function AdminProductFormPage({
  product,
}: AdminProductFormPageProps) {
  const router = useRouter();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "",
    price: product?.price.toString() || "",
    originalPrice: product?.originalPrice?.toString() || "",
    image: product?.image || "",
    inStock: product?.inStock ?? true,
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    product?.features || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/products/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json() as { imageUrl?: string; error?: string };

      if (response.ok && data.imageUrl) {
        setFormData((prev) => ({ ...prev, image: data.imageUrl! }));
      } else {
        setError(data.error || "Misslyckades med att ladda upp bilden");
      }
    } catch (err) {
      setError("Ett fel uppstod vid uppladdning av bilden");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        originalPrice: formData.originalPrice || undefined,
        image: formData.image,
        inStock: formData.inStock,
        features: selectedFeatures,
      };

      const url = isEditing
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json() as { success?: boolean; error?: string };

      if (response.ok && data.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(data.error || "Misslyckades med att spara produkt");
      }
    } catch (err) {
      setError("Ett fel uppstod. Vänligen försök igen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isEditing ? "Redigera produkt" : "Skapa produkt"}
        </h1>
        <Button onClick={() => router.push("/admin/products")} variant="outline">
          Tillbaka till produkter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produktdetaljer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Namn</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivning</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Pris</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">Ordinarie pris (Valfritt)</Label>
                <Input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Produktbild</Label>
              <div className="space-y-3">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
                {isUploadingImage && (
                  <p className="text-sm text-muted-foreground">Laddar upp bild...</p>
                )}
                {formData.image && (
                  <div className="space-y-2">
                    <img
                      src={formData.image}
                      alt="Produktbild förhandsvisning"
                      className="h-32 w-32 rounded-md object-cover border"
                    />
                    <p className="text-xs text-muted-foreground break-all">
                      {formData.image}
                    </p>
                  </div>
                )}
                {!formData.image && (
                  <p className="text-sm text-muted-foreground">
                    Välj en bild att ladda upp (max 5MB)
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, inStock: checked }))
                }
              />
              <Label htmlFor="inStock">I lager</Label>
            </div>

            <div className="space-y-3">
              <Label>Egenskaper</Label>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground mb-2">
                  Välj tillämpliga kost- och produktegenskaper:
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_FEATURES.map((feature) => (
                    <Badge
                      key={feature}
                      variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleFeature(feature)}
                    >
                      {selectedFeatures.includes(feature) && (
                        <X className="mr-1 h-3 w-3" />
                      )}
                      {feature}
                    </Badge>
                  ))}
                </div>
                {selectedFeatures.length > 0 && (
                  <div className="text-sm text-muted-foreground mt-2">
                    Valda: {selectedFeatures.join(", ")}
                  </div>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sparar..." : isEditing ? "Uppdatera produkt" : "Skapa produkt"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/products")}
              >
                Avbryt
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

