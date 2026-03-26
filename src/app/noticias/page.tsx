import { Suspense } from "react";
import type { Metadata } from "next";
import { getNoticias } from "@/lib/api";
import { NewsCard } from "@/components/news-card";
import { FilterBar, FilterBarSkeleton } from "@/components/filters";
import { Pagination } from "@/components/pagination";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Todas las noticias financieras argentinas analizadas con IA",
};

// revalidate every 5 minutes
export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sentimiento?: string;
    impacto?: string;
    fuente?: string;
  }>;
}

export default async function NoticiasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const sentimiento = params.sentimiento;
  const impacto = params.impacto;
  const fuente = params.fuente;

  const data = await getNoticias({ page, limit: 12, sentimiento, impacto, fuente });
  // Filter out news that only have a title (empty resumen)
  const filteredData = {
    ...data,
    data: data.data.filter((n) => n.resumen && n.resumen.trim().length > 0),
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Page header */}
        <div className="border-b border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Newspaper className="size-4 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Noticias financieras
              </h1>
              <span className="text-lg">🇦🇷</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Análisis de impacto y sentimiento generado con inteligencia artificial
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* Filters */}
          <Suspense fallback={<FilterBarSkeleton />}>
            <FilterBar
              currentSentimiento={sentimiento}
              currentImpacto={impacto}
              currentFuente={fuente}
              total={filteredData.meta.total}
            />
          </Suspense>

          {/* Grid */}
          {filteredData.data.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Newspaper className="size-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No se encontraron noticias</p>
              <p className="text-sm mt-1">Intentá cambiar los filtros</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredData.data.map((noticia) => (
                <NewsCard key={noticia.id} noticia={noticia} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="pt-4">
            <Suspense>
              <Pagination
                currentPage={filteredData.meta.page}
                totalPages={filteredData.meta.totalPages}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
