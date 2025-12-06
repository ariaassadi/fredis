"use client";

import { useEffect, useState } from "react";

import { ACTION_CARD_STEPS, OPPORTUNITIES } from "../data";
import { Button } from "~/ui/primitives/button";
import { Card } from "~/ui/primitives/card";

interface ActionCardProps {
  onApprove: () => void;
  onDecline: () => void;
}

export function ActionCard({ onApprove, onDecline }: ActionCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const opportunity = OPPORTUNITIES[0]; // top opportunity

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          AI generates actionable plan (06:15)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each opportunity becomes an executable card with details.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-base font-medium text-foreground">Action:</h3>
          <p className="break-words text-sm text-foreground">{opportunity.description}</p>
        </div>

        <div>
          <h3 className="mb-2 text-base font-medium text-foreground">Steps:</h3>
          <ul className="list-inside list-disc space-y-1">
            {ACTION_CARD_STEPS.map((step, index) => (
              <li
                className="text-sm text-muted-foreground"
                key={index}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-md bg-primary/10 p-3">
          <p className="text-sm text-foreground">
            <span className="font-medium">Predicted completion:</span> 24 hours
          </p>
          <p className="text-sm text-foreground">
            <span className="font-medium">Profit gain:</span>{" "}
            {opportunity.profitImpact.toLocaleString("en-US")} kr
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 bg-green-600 text-white hover:bg-green-700"
            onClick={onApprove}
            size="lg"
          >
            Approve
          </Button>
          <Button
            className="flex-1"
            onClick={onDecline}
            size="lg"
            variant="outline"
          >
            Decline
          </Button>
        </div>
      </div>
    </Card>
  );
}

