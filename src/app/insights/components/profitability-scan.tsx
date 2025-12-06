"use client";

import { useEffect, useState } from "react";

import { PROFITABILITY_FLAGS } from "../data";
import { Card } from "~/ui/primitives/card";

interface ProfitabilityScanProps {
  onComplete: () => void;
}

export function ProfitabilityScan({ onComplete }: ProfitabilityScanProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setShowHeatmap(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          AI runs profitability scan per region (06:07)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cross-references margin data, markdown history, and courier costs.
          Flags inefficiencies and calculates profitability forecast if Juicy
          optimizes distribution and courier mix.
        </p>
      </div>

      <div className="space-y-3">
        {PROFITABILITY_FLAGS.map((flag, index) => (
          <div
            className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950"
            key={index}
          >
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              ⚠ {flag.flags[0]}
            </p>
          </div>
        ))}
      </div>

      {showHeatmap && (
        <div className="mt-4 rounded-md bg-green-50 p-3 dark:bg-green-950">
          <p className="text-sm text-green-800 dark:text-green-200">
            Dashboard chart: Profit Heatmap turns red-to-green as potential
            savings are simulated.
          </p>
        </div>
      )}
    </Card>
  );
}

