"use client";

import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "~/ui/primitives/button";
import { Card, CardContent } from "~/ui/primitives/card";

export default function AdminWelcomePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-2xl border-2">
        <CardContent
          className={`
            p-8
            sm:p-12
          `}
        >
          <div className="space-y-6 text-center">
            {/* Greeting */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 animate-pulse text-primary" />
                <h1
                  className={`
                    text-3xl font-bold text-primary
                    sm:text-4xl
                  `}
                >
                  السلام عليكم
                </h1>
                <Sparkles className="h-6 w-6 animate-pulse text-primary" />
              </div>
              <p className="text-lg text-muted-foreground italic">
                As-salamu alaykum
              </p>
            </div>

            {/* Dua */}
            <div className="space-y-4 py-6">
              <div className="flex justify-center">
                <Heart className="h-8 w-8 fill-red-500 text-red-500" />
              </div>

              <div
                className={`
                  space-y-3 text-base leading-relaxed
                  sm:text-lg
                `}
              >
                <p className="font-medium text-foreground">بارك الله فيكم</p>
                <p className="text-muted-foreground italic">
                  Må Allah välsigna er
                </p>
              </div>

              <div className="mx-auto max-w-xl space-y-2 pt-4">
                <p className="leading-relaxed text-muted-foreground">
                  Tack för er omsorg och dedikation till vårt älskade bageri. Må
                  Allah belöna er för ert arbete och ge er framgång i allt ni
                  gör.
                </p>

                <div
                  className={`space-y-1 text-sm text-muted-foreground/80 italic`}
                >
                  <p>اللهم بارك لهم في رزقهم وعملهم</p>
                  <p className="text-xs">
                    O Allah, välsigna deras försörjning och deras arbete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
