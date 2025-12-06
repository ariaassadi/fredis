"use client";

import { Check } from "lucide-react";
import * as React from "react";

import { Badge } from "~/ui/primitives/badge";
import { Card } from "~/ui/primitives/card";

export interface DeliveryOption {
  discountedPrice?: number;
  id: string;
  isRecommended: boolean;
  location?: string;
  name: string;
  price: number;
}

interface DeliveryOptionsProps {
  onSelect: (deliveryId: string) => void;
  options: DeliveryOption[];
  selectedId?: string;
}

export function DeliveryOptions({
  onSelect,
  options,
  selectedId,
}: DeliveryOptionsProps) {
  const recommended = options.find((opt) => opt.isRecommended);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Choose delivery</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          const isRecommended = option.id === recommended?.id;
          const discount =
            option.discountedPrice !== undefined &&
            option.price !== undefined &&
            option.discountedPrice < option.price
              ? option.price - option.discountedPrice
              : 0;

          return (
            <Card
              className={`
                relative cursor-pointer border-2 p-4 transition-all
                hover:border-primary
                ${isSelected ? "border-primary bg-primary/5" : "border-border"}
                ${isRecommended && !isSelected ? "border-primary/50" : ""}
              `}
              key={option.id}
              onClick={() => onSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {option.name}
                    </span>
                    {isRecommended && (
                      <Badge className="bg-primary text-primary-foreground">
                        Recommended
                      </Badge>
                    )}
                    {discount > 0 && (
                      <Badge className="bg-green-600 text-white">
                        {discount} kr cheaper
                      </Badge>
                    )}
                  </div>
                  {option.location && (
                    <div className="mt-1 text-sm text-muted-foreground">
                      {option.location}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    {option.discountedPrice !== undefined &&
                    option.discountedPrice < option.price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {option.price} kr
                        </span>
                        <span className="text-lg font-bold text-foreground">
                          {option.discountedPrice} kr
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-foreground">
                        {option.price} kr
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
