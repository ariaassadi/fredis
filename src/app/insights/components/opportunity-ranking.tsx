"use client";

import { useEffect, useState } from "react";

import { OPPORTUNITIES } from "../data";
import { Card } from "~/ui/primitives/card";

interface OpportunityRankingProps {
  onOpportunitySelect: (rank: number) => void;
}

export function OpportunityRanking({
  onOpportunitySelect,
}: OpportunityRankingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  const handleRowClick = (rank: number) => {
    setSelectedRank(rank);
    setTimeout(() => {
      onOpportunitySelect(rank);
    }, 500);
  };

  return (
    <Card className="border-border bg-background p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Displays AI Opportunity List (06:12)
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each insight includes direct financial impact, delivery efficiency
          gain, and sustainability improvement.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Rank
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Opportunity
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Predicted Profit Impact
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Time to Implement
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody>
            {OPPORTUNITIES.map((opportunity) => {
              const isSelected = selectedRank === opportunity.rank;
              return (
                <tr
                  className={`cursor-pointer border-b border-border/50 transition-colors hover:bg-muted/50 ${
                    isSelected ? "bg-primary/10" : ""
                  }`}
                  key={opportunity.rank}
                  onClick={() => handleRowClick(opportunity.rank)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    {opportunity.rank}
                  </td>
                  <td className="break-words px-4 py-3 text-sm text-foreground">
                    {opportunity.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
                    +{opportunity.profitImpact.toLocaleString("en-US")} kr
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {opportunity.timeToImplement}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {opportunity.confidence}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

