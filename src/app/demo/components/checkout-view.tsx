"use client";

import { Check, CreditCard } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { useCart } from "~/lib/hooks/use-cart";
import { Card, CardContent, CardHeader, CardTitle } from "~/ui/primitives/card";
import { Separator } from "~/ui/primitives/separator";

import type { DeliveryOption } from "./delivery-options";

import { DeliveryOptions } from "./delivery-options";

interface CheckoutViewProps {
  deliveryOptions: DeliveryOption[];
  isCalculationsRunning: boolean;
  onDeliveryChange?: (deliveryId: string) => void;
  showResultsTable: boolean;
}

export function CheckoutView({
  deliveryOptions,
  isCalculationsRunning,
  onDeliveryChange,
  showResultsTable,
}: CheckoutViewProps) {
  const { items: cartItems } = useCart();
  const [selectedDeliveryId, setSelectedDeliveryId] = React.useState<
    string | undefined
  >(deliveryOptions.find((opt) => opt.isRecommended)?.id);

  const handleDeliverySelect = React.useCallback(
    (deliveryId: string) => {
      setSelectedDeliveryId(deliveryId);
      onDeliveryChange?.(deliveryId);
    },
    [onDeliveryChange]
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const selectedDelivery = deliveryOptions.find(
    (opt) => opt.id === selectedDeliveryId
  );
  const deliveryCost = Math.round(
    selectedDelivery?.discountedPrice ?? selectedDelivery?.price ?? 0
  );

  const total = subtotal + deliveryCost;

  // show waiting state while calculations are running or haven't completed yet
  if (isCalculationsRunning || !showResultsTable) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex-1 py-6">
          <div
            className={`
              container px-4
              md:px-6
            `}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">
                Review your order and complete your purchase
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 py-6">
        <div
          className={`
            container px-4
            md:px-6
          `}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">
              Review your order and complete your purchase
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* checkout form */}
            <div className="space-y-6">
              {/* payment method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`
                      flex items-center gap-3 rounded-lg border-2 border-primary
                      bg-primary/5 p-4
                    `}
                  >
                    <div
                      className={`
                        flex h-10 w-10 items-center justify-center rounded-md
                        bg-primary text-primary-foreground
                      `}
                    >
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-primary">
                        Credit card
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ending in 4242
                      </div>
                    </div>
                    <div
                      className={`
                        flex h-6 w-6 items-center justify-center rounded-full
                        bg-primary text-primary-foreground
                      `}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* delivery options */}
              <Card>
                <CardContent className="pt-6">
                  <DeliveryOptions
                    onSelect={handleDeliverySelect}
                    options={deliveryOptions}
                    selectedId={selectedDeliveryId}
                  />
                </CardContent>
              </Card>
            </div>

            {/* order summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* cart items */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div className="flex items-center gap-3" key={item.id}>
                          <div
                            className={`
                              relative h-16 w-16 overflow-hidden rounded-md
                              border
                            `}
                          >
                            <Image
                              alt={item.name}
                              className="object-cover"
                              fill
                              src={item.image}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              quantity: {item.quantity}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {(item.price * item.quantity).toFixed(2)} kr
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* pricing breakdown */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">
                          {subtotal.toFixed(2)} kr
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="font-medium">{deliveryCost} kr</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold">Total</span>
                        <span className="text-base font-semibold">
                          {total.toFixed(2)} kr
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
