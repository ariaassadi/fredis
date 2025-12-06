"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "~/lib/cn";
import { useMounted } from "~/lib/hooks/use-mounted";
import { Button } from "~/ui/primitives/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = () => {
    // toggle between light and dark, ignoring system
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button
        className={cn("h-9 w-9 rounded-full", className)}
        disabled
        size="icon"
        variant="ghost"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-70" />
        <span className="sr-only">Laddar temabytare</span>
      </Button>
    );
  }

  return (
    <Button
      className={cn(
        `
          h-9 w-9 rounded-full bg-background transition-colors
          hover:bg-muted
        `,
        className
      )}
      onClick={toggleTheme}
      size="icon"
      variant="ghost"
    >
      <Sun
        className={`
          h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all
          duration-300
          dark:scale-0 dark:-rotate-90
        `}
      />
      <Moon
        className={`
          absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all
          duration-300
          dark:scale-100 dark:rotate-0
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
