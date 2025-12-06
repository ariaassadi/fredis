"use client";

import { Card } from "~/ui/primitives/card";

const supplierLogos = [
  "Postnord",
  "Volt",
  "DHL",
  "Schenker",
  "Bring",
  "FedEx",
  "UPS",
  "DB Schenker",
];

interface SupplierLogosProps {
  className?: string;
}

export function SupplierLogos({ className }: SupplierLogosProps) {
  return (
    <Card className={`border-border bg-background p-3 ${className || ""}`}>
      <p className="mb-2 text-sm font-medium text-foreground">Suppliers</p>
      <div className="grid grid-cols-2 gap-1">
        {supplierLogos.map((logo) => (
          <div className="text-xs text-muted-foreground" key={logo}>
            {logo}
          </div>
        ))}
      </div>
    </Card>
  );
}
