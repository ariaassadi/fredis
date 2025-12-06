"use client";

import { useEffect, useState } from "react";

import { Card } from "~/ui/primitives/card";

interface DataScanStatusProps {
  onComplete: () => void;
}

const DATA_FEEDS = [
  "Sales (POS + e-commerce)",
  "Inventory levels per store and DC",
  "Courier performance and costs",
  "Staff schedules and idle-time ratios",
  "Customer order heatmaps (geo + time)",
  "Weather, calendar events, and local campaigns",
];

export function DataScanStatus({ onComplete }: DataScanStatusProps) {
  const [completedFeeds, setCompletedFeeds] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    if (completedFeeds.size === DATA_FEEDS.length) {
      setIsComplete(true);
      return;
    }

    const delay = 1500;
    const timer = setTimeout(() => {
      setCompletedFeeds((prev) => {
        const next = new Set(prev);
        next.add(prev.size);
        return next;
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [completedFeeds]);

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          AI initializes the daily data scan (06:00)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pulls and merges all live data feeds
        </p>
      </div>

      <div className="space-y-2">
        {DATA_FEEDS.map((feed, index) => {
          const isCompleted = completedFeeds.has(index);
          return (
            <div
              className="flex items-center gap-2"
              key={feed}
            >
              {isCompleted ? (
                <span className="text-green-600">✓</span>
              ) : (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              )}
              <span className={isCompleted ? "text-foreground" : "text-muted-foreground"}>
                {feed}
              </span>
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="mt-4 rounded-md bg-green-50 p-3 dark:bg-green-950">
          <p className="text-sm text-green-800 dark:text-green-200">
            ✓ Result: Cleans, validates, and reindexes the entire data model in
            under 90 seconds. Creates the snapshot: all KPIs up to 6:00 today.
          </p>
        </div>
      )}
    </Card>
  );
}

