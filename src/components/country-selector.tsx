import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Country {
  code: string;
  name: string;
  active: boolean;
  href: string;
}

const countries: Country[] = [
  { code: "ar", name: "Argentina", active: true, href: "/noticias" },
  { code: "br", name: "Brasil", active: false, href: "/proximamente" },
  { code: "cl", name: "Chile", active: false, href: "/proximamente" },
  { code: "mx", name: "México", active: false, href: "/proximamente" },
  { code: "co", name: "Colombia", active: false, href: "/proximamente" },
  { code: "us", name: "Estados Unidos", active: false, href: "/proximamente" },
  { code: "pe", name: "Perú", active: false, href: "/proximamente" },
  { code: "uy", name: "Uruguay", active: false, href: "/proximamente" },
];

export function CountrySelector() {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Mercados disponibles
          </h2>
          <p className="text-muted-foreground text-sm">
            Seleccioná el mercado que querés explorar
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {countries.map((country) => (
            <Link
              key={country.code}
              href={country.href}
              className={cn(
                "relative group flex flex-col items-center gap-3 p-6 rounded-xl border transition-all duration-300",
                country.active
                  ? "border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
                  : "border-border bg-card hover:border-border/60 opacity-70 hover:opacity-80"
              )}
            >
              {/* Flag */}
              <div className="w-16 h-10 rounded overflow-hidden shadow-sm border border-border/30">
                <Image
                  src={`/flags/${country.code}.svg`}
                  alt={`Bandera de ${country.name}`}
                  width={64}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <span
                className={cn(
                  "text-sm font-semibold",
                  country.active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {country.name}
              </span>

              {/* Status */}
              {country.active ? (
                <span className="flex items-center gap-1.5 text-xs text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  En vivo
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock className="size-3" />
                  Próximamente
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
