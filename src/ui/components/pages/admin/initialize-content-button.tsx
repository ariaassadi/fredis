"use client";

import { useState } from "react";
import { Button } from "~/ui/primitives/button";
import { toast } from "sonner";

export function InitializeContentButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/content/init", {
        method: "POST",
      });

      const data = await response.json() as { 
        error?: string; 
        details?: string; 
        message?: string;
        data?: unknown;
      };

      if (!response.ok) {
        const errorMsg = data.details || data.error || "okänt fel";
        console.error("initialization error:", data);
        throw new Error(errorMsg);
      }

      toast.success("Innehål initierat! Laddar om sidan...");
      // reload the page after a short delay to show the success message
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "okänt fel";
      console.error("error initializing content:", error);
      toast.error(`Misslyckades att initiera innehål: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleInitialize} disabled={isLoading}>
      {isLoading ? "Initierar..." : "Initiera standardinnehål"}
    </Button>
  );
}

