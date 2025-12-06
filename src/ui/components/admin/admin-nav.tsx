"use client";

import { usePathname, useRouter } from "next/navigation";
import { Package, ShoppingCart, FileText } from "lucide-react";
import Link from "next/link";

import { cn } from "~/lib/cn";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: Package,
      label: "Products",
      href: "/admin/products",
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      href: "/admin/orders",
    },
    {
      icon: FileText,
      label: "Content",
      href: "/admin/content",
    },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center gap-8 px-4">
        <Link href="/admin/products" className="flex items-center gap-2">
          <span className="text-xl font-bold">Admin</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              pathname === item.href || 
              (pathname.startsWith(item.href + "/") && item.href !== "/admin");
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="ml-auto">
          <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </nav>
  );
}

