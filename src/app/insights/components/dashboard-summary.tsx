"use client";

import { SUMMARY_INSIGHTS } from "../data";
import { Card } from "~/ui/primitives/card";

export function DashboardSummary() {
  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Dashboard view for leadership team (Next Day 09:00)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Charts animate key impact metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <p className="text-sm text-muted-foreground">Profit</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            +{SUMMARY_INSIGHTS.profitChange}%
          </p>
        </div>
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
          <p className="text-sm text-muted-foreground">Delivery Time</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {SUMMARY_INSIGHTS.deliveryTimeChange}%
          </p>
        </div>
        <div className="rounded-md border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950">
          <p className="text-sm text-muted-foreground">CO₂</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {SUMMARY_INSIGHTS.co2Change}%
          </p>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/10 p-4">
          <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
          <p className="text-2xl font-bold text-primary">
            {SUMMARY_INSIGHTS.predictionAccuracy}%
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-md bg-muted/50 p-4">
        <h3 className="mb-3 text-base font-semibold text-foreground">
          AI auto-generates summary insights
        </h3>
        <ul className="space-y-2">
          {SUMMARY_INSIGHTS.insights.map((insight, index) => (
            <li
              className="text-sm text-foreground"
              key={index}
            >
              • {insight}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

