"use client";

import { useEffect, useState } from "react";

import { VALIDATION_RESULT } from "../data";
import { Badge } from "~/ui/primitives/badge";
import { Card } from "~/ui/primitives/card";

interface PredictionValidationProps {
  onComplete: () => void;
}

export function PredictionValidation({ onComplete }: PredictionValidationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  const accuracy = VALIDATION_RESULT.accuracy;
  const accuracyDiff =
    VALIDATION_RESULT.realizedMarginGain -
    VALIDATION_RESULT.predictedMarginGain;

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Post-action validation (Next Day)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          AI compares prediction vs reality and adds confidence weighting to
          model.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Predicted margin gain</p>
            <p className="text-lg font-semibold text-foreground">
              {VALIDATION_RESULT.predictedMarginGain.toLocaleString("en-US")} kr
            </p>
          </div>
          <div className="rounded-md border border-border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Realized margin gain</p>
            <p className="text-lg font-semibold text-foreground">
              {VALIDATION_RESULT.realizedMarginGain.toLocaleString("en-US")} kr
            </p>
          </div>
        </div>

        <div className="rounded-md bg-primary/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-lg font-semibold text-foreground">
                {accuracy}% ({accuracyDiff > 0 ? "+" : ""}
                {accuracyDiff.toLocaleString("en-US")} kr difference)
              </p>
            </div>
            <Badge className="bg-primary text-primary-foreground">
              Predictive Accuracy: {accuracy}%
            </Badge>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Sell-through achieved in {VALIDATION_RESULT.sellThroughWeeks} weeks
            (forecast: {VALIDATION_RESULT.forecastWeeks} weeks)
          </p>
          <p className="mt-1">
            Model accuracy: +3% (confidence weighting updated)
          </p>
        </div>
      </div>
    </Card>
  );
}

