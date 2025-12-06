"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "~/lib/cn";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContext = React.createContext<{
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}>({
  openItems: new Set(),
  toggleItem: () => {},
});

export function Accordion({ children, className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = React.useCallback((id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ children, className }: AccordionItemProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function AccordionTrigger({
  children,
  className,
  disabled = false,
}: AccordionTriggerProps) {
  const { openItems, toggleItem } = React.useContext(AccordionContext);
  const itemId = React.useId();
  const isOpen = openItems.has(itemId);

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-border bg-background p-3 text-left transition-colors hover:bg-muted/50",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled}
      onClick={() => !disabled && toggleItem(itemId)}
      type="button"
    >
      <div className="flex-1">{children}</div>
      <ChevronDown
        className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  const { openItems } = React.useContext(AccordionContext);
  const itemId = React.useId();
  const isOpen = openItems.has(itemId);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className={cn("p-3 pt-0", className)}>{children}</div>
    </div>
  );
}
