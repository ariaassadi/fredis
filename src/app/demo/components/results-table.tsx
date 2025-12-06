"use client";

import { getDeliveryOptions, getJuicyProfit } from "./delivery-options-utils";
import { Card } from "~/ui/primitives/card";

interface ResultsTableProps {
  className?: string;
  isSmartphoneProMax?: boolean;
  isWirelessHeadphones?: boolean;
  isNikeAirMax?: boolean;
  selectedDeliveryId?: string;
}

// excel data for smartphone pro max (kista row)
const SMARTPHONE_DATA = {
  location: "Kista",
  mav: 15000,
  monthsOld: 7,
  provision: 30,
  stock: 230,
};

// excel data for wireless headphones (malmö row)
const WIRELESS_HEADPHONES_DATA = {
  location: "Malmö",
  mav: 5000,
  monthsOld: 24,
  provision: 80,
  stock: 42,
};

// nike air max data from weekend delivery scenario
const NIKE_AIR_MAX_DATA = {
  location: "Gränby Centrum",
  bestCost: 150.5,
  centralCost: 204,
  savings: 54,
  courier: "WOLT",
};

export function ResultsTable({
  className,
  isSmartphoneProMax = false,
  isWirelessHeadphones = false,
  isNikeAirMax = false,
  selectedDeliveryId,
}: ResultsTableProps) {
  const deliveryOptions = getDeliveryOptions({
    isSmartphoneProMax,
    isWirelessHeadphones,
    isNikeAirMax,
  });

  const centralOption = deliveryOptions.find(
    (opt) => opt.id === "central-warehouse"
  );
  const bestOption = deliveryOptions.find((opt) => opt.isRecommended);
  const pickupOption = deliveryOptions.find((opt) => opt.id === "pickup-granby");

  const centrallagerCost = Math.round(centralOption?.price ?? 149);
  const bestCost = Math.round(
    bestOption?.discountedPrice ?? bestOption?.price ?? centrallagerCost
  );
  const savings = centrallagerCost - bestCost;

  // calculate juicy profit - only if recommended option is selected
  const isRecommendedSelected = selectedDeliveryId === bestOption?.id;
  const juicyProfit = isRecommendedSelected
    ? getJuicyProfit({
        isSmartphoneProMax,
        isWirelessHeadphones,
        isNikeAirMax,
      })
    : 0;

  // get product-specific data for display
  let productData:
    | null
    | typeof SMARTPHONE_DATA
    | typeof WIRELESS_HEADPHONES_DATA = null;
  let courierName: string = "Volt";

  if (isSmartphoneProMax) {
    productData = SMARTPHONE_DATA;
    courierName = "Volt";
  } else if (isWirelessHeadphones) {
    productData = WIRELESS_HEADPHONES_DATA;
    courierName = "Volt";
  } else if (isNikeAirMax) {
    courierName = NIKE_AIR_MAX_DATA.courier;
  }

  return (
    <Card
      className={`
        border-border bg-background p-3
        ${className || ""}
      `}
    >
      <h3 className="mb-3 text-base font-semibold text-foreground">
        Delivery Options
      </h3>

      <div className="space-y-2">
        <div
          className={`
            flex items-center justify-between rounded border border-border
            bg-muted p-2
          `}
        >
          <span className="text-sm text-muted-foreground">
            {centralOption?.name}
          </span>
          <span className="font-semibold text-foreground">
            {centrallagerCost} kr
          </span>
        </div>

        <div
          className={`
            flex items-center justify-between rounded border border-primary
            bg-primary p-2 text-primary-foreground
          `}
        >
          <span className="font-medium">{bestOption?.name}</span>
          <span className="font-bold">{bestCost} kr</span>
        </div>

        {pickupOption && (
          <div
            className={`
              flex items-center justify-between rounded border border-border
              bg-muted p-2
            `}
          >
            <span className="text-sm text-muted-foreground">
              {pickupOption.name}
            </span>
            <span className="font-semibold text-foreground">
              {Math.round(pickupOption.price)} kr
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 rounded-md bg-primary p-3 text-center text-white">
        <div className="mb-2 text-base font-bold">
          We save {isRecommendedSelected ? savings + juicyProfit : 0} kr
        </div>
        <div className="space-y-1 text-xs text-primary-foreground">
          <div>Customer saves {isRecommendedSelected ? savings : 0} kr</div>
          <div>Juicy saves {juicyProfit} kr</div>
        </div>
        {productData ? (
          <div className="mt-2 text-xs text-primary-foreground">
            Calculated from Excel: MAV {productData.mav.toLocaleString("en-US")}{" "}
            kr, Provision {productData.provision}%, Stock: {productData.stock}{" "}
            units ({productData.monthsOld} months)
          </div>
        ) : isNikeAirMax ? (
          <div className="mt-2 text-xs text-primary-foreground">
            Weekend delivery via {courierName}, same-day delivery
          </div>
        ) : (
          <div className="mt-2 text-xs text-primary-foreground">
            We subsidize Volt with 15 kr
          </div>
        )}
      </div>
    </Card>
  );
}