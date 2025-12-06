"use client";

import { ChevronDown, Eye } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";

interface Message {
  delay?: number;
  description?: string;
  id: string;
  showLogos?: boolean;
  showTable?: boolean;
  text: string;
  type: "calculation" | "complete" | "result";
}

interface MessageAccordionProps {
  isActive?: boolean;
  isCompleted?: boolean;
  isNikeAirMax?: boolean;
  isSmartphoneProMax?: boolean;
  isWirelessHeadphones?: boolean;
  message: Message;
}

const EXCEL_SHEET_URL =
  "https://netorgft15539232-my.sharepoint.com/:x:/g/personal/felix_salvini_juicysolutions_se/EZgwEVjYf1hKkpwRQbuELQcBKb8fct7iGu7a8eT6Vr_KOQ?rtime=bp8Sq8AW3kg";

const LoadingSpinner = () => (
  <div className="inline-flex items-center">
    <div
      className={`
        mr-1 size-3 animate-spin rounded-full border-b-2 border-primary
      `}
    />
  </div>
);

const MessageIcon = ({
  isCompleted,
  type,
}: {
  isCompleted?: boolean;
  type: Message["type"];
}) => {
  if (isCompleted) {
    return <span className="text-green-600">●</span>;
  }

  switch (type) {
    case "calculation":
      return <LoadingSpinner />;
    case "complete":
      return <span className="font-bold text-primary-foreground">●</span>;
    case "result":
      return <span className="font-semibold text-green-600">●</span>;
    default:
      return null;
  }
};

const MessageDescription = ({ message }: { message: Message }) => {
  return (
    <div className="text-sm text-muted-foreground">
      {message.description ||
        "Processing information to find the best delivery solution."}
    </div>
  );
};

export function MessageAccordion({
  isActive = false,
  isCompleted = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isNikeAirMax = false,
  isSmartphoneProMax = false,
  isWirelessHeadphones = false,
  message,
}: MessageAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isUserControlled, setIsUserControlled] = React.useState(false);

  // close accordion when streaming is over, but only if user hasn't manually controlled it
  React.useEffect(() => {
    if (isCompleted && isOpen && !isUserControlled) {
      setIsOpen(false);
    }
  }, [isCompleted, isOpen, isUserControlled]);

  const toggleOpen = () => {
    setIsUserControlled(true);
    setIsOpen(!isOpen);
  };

  const showExcelButton =
    (isSmartphoneProMax || isWirelessHeadphones) && message.id === "6";

  return (
    <div className="rounded-lg border border-border/50 bg-background shadow-sm">
      <button
        className={cn(
          `
            flex w-full items-center justify-between rounded-t-lg p-3 text-left
            transition-all
            hover:bg-muted/30
          `,
          message.type === "result" && "bg-muted/50",
          message.type === "complete" && "bg-primary/10",
          isActive && "bg-muted/70"
        )}
        onClick={toggleOpen}
        type="button"
      >
        <div className="flex items-center space-x-2">
          <MessageIcon isCompleted={isCompleted} type={message.type} />
          <span className="flex-1 text-sm font-medium">{message.text}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-3 pt-2">
          <MessageDescription message={message} />
          {showExcelButton && (
            <div className="mt-3 border-t border-border pt-3">
              <Button
                className="w-full justify-start gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(EXCEL_SHEET_URL, "_blank");
                }}
                size="sm"
                variant="outline"
              >
                <Eye className="h-4 w-4" />
                <span>View table with MAV and Provision</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
