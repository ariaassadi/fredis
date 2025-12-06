import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

import { SEO_CONFIG } from "~/app";
import { cn } from "~/lib/cn";
import { Button } from "~/ui/primitives/button";

interface FooterProps {
  categories?: string[];
  className?: string;
}

export function Footer({ categories = [], className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div
        className={`
          container mx-auto max-w-7xl px-4 py-12
          sm:px-6
          lg:px-8
        `}
      >
        <div
          className={`
            grid grid-cols-1 gap-8
            md:grid-cols-4
          `}
        >
          <div className="space-y-4">
            <Link className="flex items-center gap-2" href="/">
              <span
                className={`
                  bg-gradient-to-r from-primary to-primary/70 bg-clip-text
                  text-xl font-bold tracking-tight text-transparent
                `}
              >
                {SEO_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Ditt bageri för halalcertifierade bakverk. Färskt bakat varje dag
              med kärlek och omsorg.
            </p>
            <div className="flex space-x-4">
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button
                className="h-8 w-8 rounded-full"
                size="icon"
                variant="ghost"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Handla</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="/products"
                >
                  Alla Produkter
                </Link>
              </li>
              {categories.slice(0, 5).map((category) => (
                <li key={category}>
                  <Link
                    className={`
                      text-muted-foreground
                      hover:text-foreground
                    `}
                    href={`/products?category=${encodeURIComponent(category)}`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Organisation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Om Oss
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Karriär
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Blogg
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Hjälpcenter
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Frakt & Returer
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Garanti
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link
                  className={`
                    text-muted-foreground
                    hover:text-foreground
                  `}
                  href="https://muslimerforfred.org/sv/om-muslimskafreds/"
                >
                  Användarvillkor
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div
            className={`
              flex flex-col items-center justify-between gap-4
              md:flex-row
            `}
          >
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Muslimska Fredsrörelsen. Alla
              rättigheter förbehållna.
            </p>
            <div
              className={
                "flex items-center gap-4 text-sm text-muted-foreground"
              }
            >
              <Link
                className="hover:text-foreground"
                href="https://muslimerforfred.org/sv/om-muslimskafreds/"
              >
                Integritet
              </Link>
              <Link
                className="hover:text-foreground"
                href="https://muslimerforfred.org/sv/om-muslimskafreds/"
              >
                Villkor
              </Link>
              <Link
                className="hover:text-foreground"
                href="https://muslimerforfred.org/sv/om-muslimskafreds/"
              >
                Kakor
              </Link>
              <Link
                className="hover:text-foreground"
                href="https://muslimerforfred.org/sv/om-muslimskafreds/"
              >
                Webbplatskarta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
