"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, TrendingUp, LogIn, UserPlus } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";


const navLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/proximamente", label: "Mercados" },
  { href: "/proximamente", label: "Análisis IA" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="size-5 text-background" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            <span className="text-foreground">Noti</span>
            <span className="text-primary">finanzas</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/proximamente"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
          >
            <LogIn className="size-4" />
            Iniciar sesión
          </Link>
          <Link
            href="/proximamente"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <UserPlus className="size-4" />
            Registrarse
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/8 bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.href}-${link.label}`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-foreground",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/8 mt-2 pt-3 flex flex-col gap-2">
              <Link
                href="/proximamente"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "justify-start gap-2")}
              >
                <LogIn className="size-4" />
                Iniciar sesión
              </Link>
              <Link
                href="/proximamente"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ size: "sm" }), "justify-start gap-2")}
              >
                <UserPlus className="size-4" />
                Registrarse
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
