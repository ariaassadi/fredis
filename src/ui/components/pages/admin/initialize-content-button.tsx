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

      if (!response.ok) {
        throw new Error("failed to initialize content");
      }

      toast.success("Innehål initierat! Laddar om sidan...");
      // reload the page after a short delay to show the success message
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("error initializing content:", error);
      toast.error("Misslyckades att initiera innehål");
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

