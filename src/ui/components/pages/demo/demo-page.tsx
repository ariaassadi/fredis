"use client";

import { useCallback, useEffect, useState } from "react";

import { CustomerSide } from "~/app/demo/components/customer-side";
import { JuicyReasoning } from "~/app/demo/components/juicy-reasoning";
import { getDeliveryOptions } from "~/app/demo/components/delivery-options-utils";
import type { ProductTypeFlags } from "~/app/demo/components/delivery-options-utils";

export function DemoPage() {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isCalculationsRunning, setIsCalculationsRunning] = useState(false);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | undefined>();
  const [showResultsTable, setShowResultsTable] = useState(false);
  const [productTypeFlags, setProductTypeFlags] = useState<ProductTypeFlags>({
    isSmartphoneProMax: false,
    isWirelessHeadphones: false,
    isNikeAirMax: false,
  });

  const handleCheckoutTrigger = useCallback((e: Event) => {
    const customEvent = e as CustomEvent<string[]>;
    const productNames = customEvent.detail || [];

    // check if "smartphone pro max" is in cart
    const hasSmartphone = productNames.some((name) =>
      name.toLowerCase().includes("smartphone pro max")
    );

    // check if "wireless headphones" is in cart
    let hasWirelessHeadphones = productNames.some((name) =>
      name.toLowerCase().includes("wireless headphones")
    );

    // check if "nike air max" is in cart
    let hasNikeAirMax = productNames.some((name) =>
      name.toLowerCase().includes("nike air max")
    );

    // ensure only one can be true - prioritize: smartphone > wireless headphones > nike
    if (hasSmartphone && hasWirelessHeadphones) {
      hasWirelessHeadphones = false;
    }
    if (hasSmartphone && hasNikeAirMax) {
      hasNikeAirMax = false;
    }
    if (hasWirelessHeadphones && hasNikeAirMax) {
      hasNikeAirMax = false;
    }

    setProductTypeFlags({
      isSmartphoneProMax: hasSmartphone,
      isWirelessHeadphones: hasWirelessHeadphones,
      isNikeAirMax: hasNikeAirMax,
    });
    setIsCheckoutMode(true);
  }, []);

  useEffect(() => {
    window.addEventListener("checkout-triggered", handleCheckoutTrigger);
    return () =>
      window.removeEventListener("checkout-triggered", handleCheckoutTrigger);
  }, [handleCheckoutTrigger]);

  const deliveryOptions = getDeliveryOptions(productTypeFlags);

  const handleCalculationStateChange = useCallback(
    (isRunning: boolean, showResults: boolean) => {
      setIsCalculationsRunning(isRunning);
      setShowResultsTable(showResults);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.pageX;
    const startLeft = leftWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.pageX - startX;
      const newLeft = Math.min(
        80,
        Math.max(20, startLeft + (deltaX / window.innerWidth) * 100)
      );
      setLeftWidth(newLeft);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex w-full flex-col bg-white">
      {/* Main Content - Panels */}
      <div className="flex flex-1">
        {/* Left Panel - Customer Experience */}
        <div
          className="relative flex flex-col border-r border-border bg-white"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="flex-1 overflow-auto">
            <CustomerSide
              deliveryOptions={deliveryOptions}
              isCalculationsRunning={isCalculationsRunning}
              isCheckoutMode={isCheckoutMode}
              onDeliveryChange={setSelectedDeliveryId}
              showResultsTable={showResultsTable}
            />
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className={`
            group flex w-1 cursor-col-resize items-center justify-center
            bg-muted transition-colors
            hover:bg-muted/90
          `}
          onMouseDown={handleMouseDown}
        >
          <div
            className={`
              h-12 w-0.5 rounded bg-border
              group-hover:bg-primary
            `}
          />
        </div>

        {/* Right Panel - Juicy Reasoning */}
        <div className="flex flex-1 flex-col bg-muted/30">
          <div className="flex-1 overflow-hidden">
            <JuicyReasoning
              isNikeAirMax={productTypeFlags.isNikeAirMax}
              isSmartphoneProMax={productTypeFlags.isSmartphoneProMax}
              isWirelessHeadphones={productTypeFlags.isWirelessHeadphones}
              onCalculationStateChange={handleCalculationStateChange}
              selectedDeliveryId={selectedDeliveryId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
