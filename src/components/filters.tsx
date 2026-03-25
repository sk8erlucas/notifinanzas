"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SENTIMIENTOS = ["POSITIVO", "NEGATIVO", "NEUTRO"] as const;
const IMPACTOS = ["FUERTE", "MODERADO", "DEBIL"] as const;

interface FilterBarProps {
  currentSentimiento?: string;
  currentImpacto?: string;
  currentFuente?: string;
  total?: number;
}

export function FilterBar({
  currentSentimiento,
  currentImpacto,
  currentFuente,
  total,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset pagination on filter change
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  const clearAll = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasFilters = currentSentimiento || currentImpacto || currentFuente;

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="size-4" />
          <span>Filtros</span>
          {total !== undefined && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {total} noticias
            </span>
          )}
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-muted-foreground hover:text-foreground gap-1.5 h-7 text-xs"
          >
            <X className="size-3" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Sentimiento filters */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Sentimiento:</span>
          {SENTIMIENTOS.map((s) => {
            const active = currentSentimiento === s;
            const chipClass: Record<typeof s, string> = {
              POSITIVO: active
                ? "bg-[oklch(0.65_0.17_155)] text-white border-[oklch(0.65_0.17_155)]"
                : "text-[oklch(0.72_0.17_155)] border-[oklch(0.65_0.17_155/0.4)] hover:bg-[oklch(0.65_0.17_155/0.15)]",
              NEGATIVO: active
                ? "bg-[oklch(0.65_0.22_27)] text-white border-[oklch(0.65_0.22_27)]"
                : "text-[oklch(0.72_0.22_27)] border-[oklch(0.65_0.22_27/0.4)] hover:bg-[oklch(0.65_0.22_27/0.15)]",
              NEUTRO: active
                ? "bg-[oklch(0.78_0.15_75)] text-background border-[oklch(0.78_0.15_75)]"
                : "text-[oklch(0.80_0.15_75)] border-[oklch(0.78_0.15_75/0.4)] hover:bg-[oklch(0.78_0.15_75/0.15)]",
            };
            return (
              <button
                key={s}
                onClick={() => updateParam("sentimiento", active ? null : s)}
                disabled={isPending}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${chipClass[s]} disabled:opacity-50`}
              >
                {s === "POSITIVO" ? "📈 " : s === "NEGATIVO" ? "📉 " : "➡️ "}
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>

        {/* Impacto filters */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Impacto:</span>
          {IMPACTOS.map((imp) => {
            const active = currentImpacto === imp;
            const chipClass: Record<typeof imp, string> = {
              FUERTE: active
                ? "bg-[oklch(0.65_0.22_27)] text-white border-[oklch(0.65_0.22_27)]"
                : "text-[oklch(0.72_0.22_27)] border-[oklch(0.65_0.22_27/0.4)] hover:bg-[oklch(0.65_0.22_27/0.15)]",
              MODERADO: active
                ? "bg-[oklch(0.78_0.15_75)] text-background border-[oklch(0.78_0.15_75)]"
                : "text-[oklch(0.80_0.15_75)] border-[oklch(0.78_0.15_75/0.4)] hover:bg-[oklch(0.78_0.15_75/0.15)]",
              DEBIL: active
                ? "bg-muted text-foreground border-muted-foreground/50"
                : "text-muted-foreground border-border hover:bg-muted/40",
            };
            return (
              <button
                key={imp}
                onClick={() => updateParam("impacto", active ? null : imp)}
                disabled={isPending}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${chipClass[imp]} disabled:opacity-50`}
              >
                {imp === "FUERTE" ? "⚡ " : imp === "MODERADO" ? "〰 " : "· "}
                {imp.charAt(0) + imp.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Cargando...
        </div>
      )}
    </div>
  );
}

export function FilterBarSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" />
      <div className="flex gap-2">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
    </div>
  );
}
