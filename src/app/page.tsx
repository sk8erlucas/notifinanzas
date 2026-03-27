import { Suspense } from "react";
import { TrendingUp, Newspaper } from "lucide-react";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { NewsCard } from "@/components/news-card";
import { FilterBar, FilterBarSkeleton } from "@/components/filters";
import { Pagination } from "@/components/pagination";
import { getNoticias } from "@/lib/api";

export const revalidate = 300;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    sentimiento?: string;
    impacto?: string;
    fuente?: string;
  }>;
}


export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const sentimiento = params.sentimiento;
  const impacto = params.impacto;
  const fuente = params.fuente;

  let data;
  try {
    const raw = await getNoticias({ page, limit: 12, sentimiento, impacto, fuente, pais: "AR" });
    // Filter out news that only have a title (empty resumen)
    const filtered = raw.data.filter((n) => n.resumen && n.resumen.trim().length > 0);
    data = { ...raw, data: filtered };
  } catch {
    data = null;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* News section */}
        <section className="py-12 px-4 sm:px-8 lg:px-16 border-b border-border">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Section header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Newspaper className="size-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-semibold mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Argentina 🇦🇷
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  Noticias financieras
                </h2>
              </div>
            </div>

            {data ? (
              <>
                {/* Filters */}
                <Suspense fallback={<FilterBarSkeleton />}>
                  <FilterBar
                    currentSentimiento={sentimiento}
                    currentImpacto={impacto}
                    currentFuente={fuente}
                    total={data.meta.total}
                  />
                </Suspense>

                {/* Grid */}
                {data.data.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <Newspaper className="size-12 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">No se encontraron noticias</p>
                    <p className="text-sm mt-1">Intentá cambiar los filtros</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.data.map((noticia) => (
                      <NewsCard key={noticia.id} noticia={noticia} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="pt-4">
                  <Suspense>
                    <Pagination
                      currentPage={data.meta.page}
                      totalPages={data.meta.totalPages}
                    />
                  </Suspense>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <Newspaper className="size-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No se pudieron cargar las noticias</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <TrendingUp className="size-3.5 text-background" />
              </div>
              <span className="font-semibold">
                <span className="text-foreground">Noti</span>
                <span className="text-primary">finanzas</span>
              </span>
              <span className="hidden sm:inline">— El pulso del mercado argentino</span>
            </div>
            <span>© 2026 NotiFinanzas</span>
          </div>
        </footer>
      </main>
    </>
  );
}

