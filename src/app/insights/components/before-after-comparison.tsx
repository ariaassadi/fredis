"use client";

import { useEffect, useState } from "react";

import { BEFORE_AFTER_DATA } from "../data";
import { Card } from "~/ui/primitives/card";

interface BeforeAfterComparisonProps {
  onComplete: () => void;
}

export function BeforeAfterComparison({
  onComplete,
}: BeforeAfterComparisonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          AI simulates business outcome for top suggestion (06:13)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visualization: Split-screen "Before vs After"
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <h3 className="mb-2 text-base font-semibold text-red-800 dark:text-red-200">
            Before
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300">
            Location: {BEFORE_AFTER_DATA.before.location}
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">
            Stock Level: {BEFORE_AFTER_DATA.before.stockLevel}
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">
            Markdown Risk: {BEFORE_AFTER_DATA.before.markdownRisk}%
          </p>
        </div>

        <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <h3 className="mb-2 text-base font-semibold text-green-800 dark:text-green-200">
            After
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Location: {BEFORE_AFTER_DATA.after.location}
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">
            Stock Level: {BEFORE_AFTER_DATA.after.stockLevel}
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">
            Markdown Risk: {BEFORE_AFTER_DATA.after.markdownRisk}%
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-primary/10 p-3">
        <p className="mb-2 text-sm font-medium text-foreground">
          Predicted results:
        </p>
        <ul className="space-y-1 text-sm text-foreground">
          <li>
            Margin increase: +
            {BEFORE_AFTER_DATA.predictedResults.marginIncrease.toLocaleString(
              "en-US"
            )}{" "}
            kr
          </li>
          <li>
            Stock turnover: +
            {BEFORE_AFTER_DATA.predictedResults.stockTurnover}%
          </li>
          <li>
            Delivery CO₂ reduction: −
            {BEFORE_AFTER_DATA.predictedResults.co2Reduction} g/order
          </li>
          <li>
            Customer satisfaction: +
            {BEFORE_AFTER_DATA.predictedResults.customerSatisfaction} stars
            average
          </li>
        </ul>
      </div>
    </Card>
  );
}

