"use client";

import { useState } from "react";

import { DashboardHeader } from "~/app/insights/components/dashboard-header";
import { DataScanStatus } from "~/app/insights/components/data-scan-status";
import { TrendDetectionCard } from "~/app/insights/components/trend-detection-card";
import { ProfitabilityScan } from "~/app/insights/components/profitability-scan";
import { OpportunityRanking } from "~/app/insights/components/opportunity-ranking";
import { BeforeAfterComparison } from "~/app/insights/components/before-after-comparison";
import { ActionCard } from "~/app/insights/components/action-card";
import { ExecutionTimeline } from "~/app/insights/components/execution-timeline";
import { PredictionValidation } from "~/app/insights/components/prediction-validation";
import { DashboardSummary } from "~/app/insights/components/dashboard-summary";

export function DashboardPage() {
  const [currentTime, setCurrentTime] = useState("06:00");
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<
    | "initialization"
    | "trends"
    | "profitability"
    | "opportunities"
    | "simulation"
    | "action"
    | "execution"
    | "validation"
    | "summary"
  >("initialization");
  const [approvedOpportunity, setApprovedOpportunity] = useState<number | null>(
    null
  );

  const handleStartDemo = () => {
    setIsRunning(true);
    setCurrentTime("06:00");
    setPhase("initialization");
    setApprovedOpportunity(null);
    // demo progression will be handled by individual components
  };

  const handleResetDemo = () => {
    setIsRunning(false);
    setCurrentTime("06:00");
    setPhase("initialization");
    setApprovedOpportunity(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <DashboardHeader
        currentTime={currentTime}
        isRunning={isRunning}
        onResetDemo={handleResetDemo}
        onStartDemo={handleStartDemo}
        phase={phase}
      />

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          {phase === "initialization" && (
            <DataScanStatus
              onComplete={() => {
                setPhase("trends");
                setCurrentTime("06:05");
              }}
            />
          )}

          {(phase === "trends" ||
            phase === "profitability" ||
            phase === "opportunities" ||
            phase === "simulation" ||
            phase === "action" ||
            phase === "execution" ||
            phase === "validation" ||
            phase === "summary") && (
            <>
              <TrendDetectionCard
                onComplete={() => {
                  if (phase === "trends") {
                    setPhase("profitability");
                    setCurrentTime("06:07");
                  }
                }}
              />
            </>
          )}

          {(phase === "profitability" ||
            phase === "opportunities" ||
            phase === "simulation" ||
            phase === "action" ||
            phase === "execution" ||
            phase === "validation" ||
            phase === "summary") && (
            <ProfitabilityScan
              onComplete={() => {
                if (phase === "profitability") {
                  setPhase("opportunities");
                  setCurrentTime("06:10");
                }
              }}
            />
          )}

          {(phase === "opportunities" ||
            phase === "simulation" ||
            phase === "action" ||
            phase === "execution" ||
            phase === "validation" ||
            phase === "summary") && (
            <OpportunityRanking
              onOpportunitySelect={(rank) => {
                setPhase("simulation");
                setCurrentTime("06:13");
              }}
            />
          )}

          {(phase === "simulation" ||
            phase === "action" ||
            phase === "execution" ||
            phase === "validation" ||
            phase === "summary") && (
            <BeforeAfterComparison
              onComplete={() => {
                if (phase === "simulation") {
                  setPhase("action");
                  setCurrentTime("06:15");
                }
              }}
            />
          )}

          {(phase === "action" ||
            phase === "execution" ||
            phase === "validation" ||
            phase === "summary") && (
            <ActionCard
              onApprove={() => {
                setApprovedOpportunity(1);
                setPhase("execution");
                setCurrentTime("06:16");
              }}
              onDecline={() => {
                setPhase("validation");
              }}
            />
          )}

          {(phase === "execution" ||
            phase === "validation" ||
            phase === "summary") && (
            <ExecutionTimeline
              approved={approvedOpportunity !== null}
              onComplete={() => {
                if (phase === "execution") {
                  setPhase("validation");
                  setCurrentTime("Next day");
                }
              }}
            />
          )}

          {(phase === "validation" || phase === "summary") && (
            <PredictionValidation
              onComplete={() => {
                if (phase === "validation") {
                  setPhase("summary");
                  setCurrentTime("Next day 09:00");
                }
              }}
            />
          )}

          {phase === "summary" && <DashboardSummary />}
        </div>
      </div>
    </div>
  );
}

