"use client";

import { useEffect, useState } from "react";

import { EXECUTION_TIMELINE } from "../data";
import type { ExecutionStep } from "../types";
import { Card } from "~/ui/primitives/card";

interface ExecutionTimelineProps {
  approved: boolean;
  onComplete: () => void;
}

const getStatusColor = (status: ExecutionStep["status"]) => {
  switch (status) {
    case "scheduled":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "confirmed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "en route":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "logged":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function ExecutionTimeline({
  approved,
  onComplete,
}: ExecutionTimelineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (approved) {
      setIsVisible(true);
    }
  }, [approved]);

  useEffect(() => {
    if (completedSteps.size === EXECUTION_TIMELINE.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (completedSteps.size < EXECUTION_TIMELINE.length) {
      const delay = 2000;
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => {
          const next = new Set(prev);
          next.add(prev.size);
          return next;
        });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [completedSteps, onComplete]);

  if (!isVisible) return null;

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Dashboard shifts to "Execution View" (06:16)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visual timeline appears. Predicted vs Actual results will be validated
          automatically at completion.
        </p>
      </div>

      <div className="space-y-3">
        {EXECUTION_TIMELINE.map((step, index) => {
          const isCompleted = completedSteps.has(index);
          return (
            <div
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              key={index}
            >
              <div className="flex-1 rounded-md border border-border bg-muted/50 p-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="break-words text-sm font-medium text-foreground">
                    {step.step}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {step.eta}
                  </span>
                </div>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                  step.status
                )}`}
              >
                {isCompleted ? "✓ " : ""}
                {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

