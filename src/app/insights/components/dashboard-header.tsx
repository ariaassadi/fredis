"use client";

import { Badge } from "~/ui/primitives/badge";
import { Button } from "~/ui/primitives/button";

interface DashboardHeaderProps {
  currentTime: string;
  isRunning: boolean;
  onResetDemo: () => void;
  onStartDemo: () => void;
  phase: string;
}

export function DashboardHeader({
  currentTime,
  isRunning,
  onResetDemo,
  onStartDemo,
  phase,
}: DashboardHeaderProps) {
  const getStatusText = () => {
    if (!isRunning) return "Waiting";
    if (phase === "initialization") return "Scanning data";
    if (phase === "trends") return "Detecting trends";
    if (phase === "profitability") return "Analyzing profitability";
    if (phase === "opportunities") return "Identifying opportunities";
    if (phase === "simulation") return "Running simulations";
    if (phase === "action") return "Awaiting approval";
    if (phase === "execution") return "Executing action";
    if (phase === "validation") return "Validating results";
    if (phase === "summary") return "Summary complete";
    return "Processing";
  };

  return (
    <div className="border-b border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge
            className={
              isRunning
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }
            variant={isRunning ? "default" : "secondary"}
          >
            {getStatusText()}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Current time: {currentTime}
          </span>
        </div>

        <div className="flex gap-2">
          {!isRunning && phase === "initialization" && (
            <Button
              className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
              onClick={onStartDemo}
              size="sm"
            >
              Start dashboard
            </Button>
          )}

          {isRunning && (
            <Button
              className="rounded-md border border-border bg-muted px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted/90"
              onClick={onResetDemo}
              size="sm"
              variant="outline"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

