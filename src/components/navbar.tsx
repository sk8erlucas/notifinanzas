"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, TrendingUp, LogIn, UserPlus, ChevronDown, Lock } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/proximamente", label: "Análisis IA" },
];

interface Country {
  code: string;
  name: string;
  active: boolean;
  href: string;
}

const countries: Country[] = [
  { code: "ar", name: "Argentina", active: true, href: "/" },
  { code: "br", name: "Brasil", active: false, href: "/proximamente" },
  { code: "cl", name: "Chile", active: false, href: "/proximamente" },
  { code: "mx", name: "México", active: false, href: "/proximamente" },
  { code: "co", name: "Colombia", active: false, href: "/proximamente" },
  { code: "us", name: "Estados Unidos", active: false, href: "/proximamente" },
  { code: "pe", name: "Perú", active: false, href: "/proximamente" },
  { code: "uy", name: "Uruguay", active: false, href: "/proximamente" },
  { code: "es", name: "España", active: false, href: "/proximamente" },
];

function CountryDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <Image src="/flags/ar.svg" alt="Argentina" width={20} height={14} className="rounded-sm" unoptimized />
        <span>Argentina</span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-background border border-white/10 rounded-xl shadow-xl shadow-black/40 py-1 z-50">
          {countries.map((country) => (
            <Link
              key={country.code}
              href={country.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-white/5",
                country.active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Image src={`/flags/${country.code}.svg`} alt={country.name} width={22} height={16} className="rounded-sm shrink-0" unoptimized />
              <span className="flex-1">{country.name}</span>
              {country.active ? (
                <span className="flex items-center gap-1 text-xs text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  En vivo
                </span>
              ) : (
                <Lock className="size-3 text-muted-foreground/50" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden md:flex items-center gap-2">
          <CountryDropdown />
          <div className="w-px h-5 bg-white/10 mx-1" />
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
