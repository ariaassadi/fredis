"use client";

import { useEffect, useState } from "react";

import { INITIAL_TRENDS, TREND_SUMMARY } from "../data";
import { Card } from "~/ui/primitives/card";

interface TrendDetectionCardProps {
  onComplete: () => void;
}

export function TrendDetectionCard({ onComplete }: TrendDetectionCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setShowSummary(true);
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
          Detects key sales trends (06:05)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Uses 7-day rolling regression to identify outliers and growth
          zones. Insights appear on screen as heatmaps and ranked lists.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Product
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Region
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Trend
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_TRENDS.map((trend, index) => (
              <tr
                className="border-b border-border/50"
                key={`${trend.product}-${trend.region}`}
              >
                <td className="px-4 py-3 text-sm text-foreground">
                  {trend.product}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {trend.region}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm font-semibold ${
                      trend.trend > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {trend.trend > 0 ? "+" : ""}
                    {trend.trend}% {trend.trend > 0 ? "↑" : "↓"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {trend.confidence}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSummary && (
        <div className="mt-4 rounded-md bg-primary/10 p-3">
          <p className="text-sm text-foreground">{TREND_SUMMARY}</p>
        </div>
      )}
    </Card>
  );
}

